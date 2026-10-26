/* A single clock drives road positions, stop dwell, departures and all ETA labels.
   Coordinates follow the cleaned Figma basemap. Services are research fixtures. */
const TransportSimulation = (() => {
  function createSimulation(profile=null){
  const pixel = ([x,y]) => [x*2108/1465,y*1544/1073];
  const main = [[629,1073],[615,760],[616,688],[639,635],[726,526],[874,354],[1010,202],[1190,0]].map(pixel);
  const branch = [[946,1073],[924,923],[903,760],[886,610],[887,500],[894,411],[891,381],[884,366],[874,354],[1010,202],[1190,0]].map(pixel);
  const platforms = profile?.platforms || [[713,526],[858,356],[900,610]].map(pixel);
  const origin = profile?.origin || pixel([827,271]);
  const walks = profile?.walks || [
    [[827,271],[833,337],[814,369],[795,390],[754,443],[713,496],[713,526]],
    [[827,271],[833,337],[846,351],[858,356]],
    [[827,271],[833,337],[850,359],[875,388],[875,500],[875,594],[900,610]]
  ].map(path=>path.map(pixel));
  const specs = profile ? profile.services.map(r=>({...r,to:r.directionLabel||"В сторону "+r.to,path:r.path||profile.roadPaths[r.stop],stops:{[r.stop]:r.stopWaypoint??profile.stopWaypoints?.[r.stop]??(r.stop===2?2:3)}})) : [
    {n:'213',to:'В сторону метро Владыкино',path:main,stops:{0:4,1:5},first:35,gap:150},
    {n:'с910',to:'В сторону Павелецкого вокзала',path:main,stops:{0:4,1:5},first:95,gap:210},
    {n:'Б',to:'В сторону Парка культуры',path:main,stops:{0:4,1:5},first:160,gap:240},
    {n:'м5',to:'В сторону Лубянской площади',path:branch,stops:{2:3,1:8},first:50,gap:165},
    {n:'с920',to:'В сторону метро Полянка',path:branch,stops:{2:3,1:8},first:125,gap:225},
    {n:'138',to:'В сторону Якиманской набережной',path:branch,stops:{2:3,1:8},first:190,gap:270}
  ];
  if(!profile&&typeof prototypeDefaults!=="undefined"&&prototypeDefaults.extendedBusSchedule)specs.forEach((r,i)=>{r.gap=300+(i%3)*60;r.first=60+(i%3)*120});
  const distance = path => path.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p[0]-path[i][0],p[1]-path[i][1]),0);
  const dwell=6, speed=6;
  specs.forEach((r,id)=>{
    r.id=id; r.scheduleOnly=r.scheduleOnly??(id===(profile?.scheduleDelay?.serviceId ?? 0)); r.timeline=[{time:0,pos:r.path[0]}]; r.offsets={}; let t=0;
    for(let i=1;i<r.path.length;i++){
      t+=distance([r.path[i-1],r.path[i]])/speed;
      r.timeline.push({time:t,pos:r.path[i]});
      const stop=Object.keys(r.stops).find(s=>r.stops[s]===i);
      if(stop!==undefined){r.offsets[stop]=t;t+=dwell;r.timeline.push({time:t,pos:r.path[i]})}
    }
    r.duration=t;
    r.phase=r.first-Math.min(...Object.values(r.offsets));
  });
  function phase(r,delayed){return r.phase+(delayed&&r.id===0?1080-r.first:0)}
  function arrival(id,stop,seconds,delayed=false){
    const r=specs[id]; if(r.offsets[stop]===undefined)return null;
    const first=phase(r,delayed)+r.offsets[stop];
    // Delayed research service starts later, rather than spawning earlier cycles.
    const cycle=Math.max(0,Math.floor((seconds-first-dwell+1e-8)/r.gap)+1);
    const at=first+cycle*r.gap, remaining=Math.max(0,at-seconds);
    return {at,cycle,remaining,minutes:Math.ceil(remaining/60),nextMinutes:Math.ceil((at+r.gap-seconds)/60),atStop:seconds>=at&&seconds<at+dwell};
  }
  function pose(r,age){
    for(let i=1;i<r.timeline.length;i++){
      const a=r.timeline[i-1],b=r.timeline[i];
      if(age<=b.time){
        const f=Math.max(0,(age-a.time)/(b.time-a.time||1));
        let tangent=[b.pos[0]-a.pos[0],b.pos[1]-a.pos[1]];
        if(!tangent[0]&&!tangent[1]){const before=r.timeline[Math.max(0,i-2)];tangent=[a.pos[0]-before.pos[0],a.pos[1]-before.pos[1]]}
        return {pos:a.pos.map((v,k)=>v+(b.pos[k]-v)*f),angle:Math.atan2(tangent[0],-tangent[1])*180/Math.PI};
      }
    }
    return {pos:r.path.at(-1),angle:0};
  }
  function vehicles(seconds,delayed=false){
    return specs.filter(r=>!r.scheduleOnly).flatMap(r=>{
      const p=phase(r,delayed),out=[];
      for(let cycle=Math.ceil((seconds-p-r.duration)/r.gap);cycle<=Math.floor((seconds-p)/r.gap);cycle++){
        if(cycle<0)continue;
        const age=seconds-(p+cycle*r.gap);
        if(age>=0&&age<=r.duration)out.push({key:r.id+':'+cycle,route:r.id,cycle,...pose(r,age)});
      }
      return out;
    });
  }
  function point(path,progress){
    let left=distance(path)*Math.max(0,Math.min(1,progress));
    for(let i=1;i<path.length;i++){const len=distance([path[i-1],path[i]]);if(left<=len)return path[i-1].map((v,k)=>v+(path[i][k]-v)*(len?left/len:0));left-=len}
    return path.at(-1);
  }
  function walking(stop,far=false){
    if(far){const stopData=farArea.stops[stop];return {path:stopData.path,meters:stopData.minutes*75,minutes:stopData.minutes}}
    const path=walks[stop];
    const meters=profile?profile.meters[stop]:Math.round(distance(path)*.8);
    return {path,meters,minutes:profile?.walkMinutes?.[stop]??Math.max(1,Math.ceil(meters/75))};
  }
  return {specs,origin,platforms,arrival,vehicles,walking,point,distance,dwell};
  }
  const baseSimulation=createSimulation(),personalSimulation=typeof participantProfile!=="undefined"&&participantProfile?createSimulation(participantProfile):null;
  const alternateSimulation=typeof participantProfile!=="undefined"&&participantProfile?.alternate?createSimulation(participantProfile.alternate):null;
  return new Proxy(baseSimulation,{get(target,key){const active=typeof scenario!=="undefined"&&personalTransportLocation(scenario,typeof layer!=="undefined"?layer:"bus");return (active?(scenario==="familiar"?personalSimulation:alternateSimulation):target)[key]}});
})();
if(typeof module !== 'undefined')module.exports=TransportSimulation;
