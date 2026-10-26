'use strict';
// Stable research departures: two forecasted buses, then a service without live data.
// Delay fixtures are not map vehicles, and only become overdue after their planned time.
function buildBusBoard(services,firstArrival,seconds,epoch,now=epoch+seconds*1000,dwell=6){
  const end=new Date(now);end.setHours(24,0,0,0);
  const endSeconds=(+end-epoch)/1000,live=[];
  const scheduled=[];
  for(const service of services){
    if(!(service.gap>0))continue;
    // Legacy delay doubles are replaced by recurring fixtures. Unique scheduled
    // routes (e.g. 454) retain their full timetable without creating map vehicles.
    if(service.scheduleOnly&&services.some(other=>!other.scheduleOnly&&other.n===service.n&&other.to===service.to))continue;
    const first=firstArrival(service);
    for(let cycle=0,at=first;at<endSeconds;cycle++,at=first+cycle*service.gap){
      (service.scheduleOnly?scheduled:live).push({fixedSchedule:!!service.scheduleOnly,service,key:`${service.id}:${cycle}`,at,scheduledAt:epoch+at*1000,endAt:at+dwell,cycle,delay:false});
    }
  }
  live.sort((a,b)=>a.at-b.at||a.service.id-b.service.id);
  const all=[];
  for(let index=0;index<live.length;index++){
    const entry=live[index];all.push(entry);
    if(index%2===1){
      const first=live[index-1],at=entry.at+30;
      if(at<endSeconds)all.push({service:first.service,key:`delay:${first.key}`,at,scheduledAt:first.scheduledAt-120000,endAt:at+60,delay:true});
    }
  }
  if(scheduled.length){all.push(...scheduled);all.sort((a,b)=>a.at-b.at||a.service.id-b.service.id)}
  return all.filter(e=>seconds<e.endAt).map(e=>({...e,remaining:Math.max(0,e.at-seconds),delayActive:e.delay&&now>=e.scheduledAt,atStop:!e.delay&&!e.fixedSchedule&&seconds>=e.at}));
}
// Keep another route beside an overdue bus without changing any departure or ETA.
// Match public route numbers, including services for opposite directions.
function mixDelayedNeighbours(rows){
  if(new Set(rows.map(row=>row.r.n)).size<2)return rows;
  const compatible=(left,right)=>!left||!right||(!(left.r.delayActive||right.r.delayActive)||left.r.n!==right.r.n);
  const pending=[...rows],mixed=[];
  while(pending.length){
    const index=pending.findIndex(row=>compatible(mixed.at(-1),row));
    if(index>=0){mixed.push(pending.splice(index,1)[0]);continue}
    // A same-number tail is placed earlier, never dropped from the timetable.
    const row=pending.shift();
    let slot=mixed.findIndex((next,i)=>compatible(mixed[i-1],row)&&compatible(row,next));
    if(slot<0){
      // Move one alternative to the edge so the overdue row has a different neighbour.
      const alternative=mixed.findIndex(other=>other.r.n!==row.r.n&&!other.r.delayActive);
      if(alternative<0)return rows;
      const other=mixed.splice(alternative,1)[0];mixed.unshift(other);
      slot=0;
    }
    mixed.splice(slot,0,row);
  }
  return mixed;
}
// Retained export for the simple timetable contract used by the geometry checks.
function remainingDayDepartures(services,nextArrival,now=Date.now()){
  return buildBusBoard(services,nextArrival,0,now,now).filter(e=>!e.delay).map(e=>({service:e.service,at:e.scheduledAt}));
}
let busBoardSession=null,busBoardEpoch=0;
const busBoardCache=new Map();
function extendedBusRows(i=selected,previewOnly=false){
  if(busBoardSession!==sessionStarted){busBoardSession=sessionStarted;busBoardEpoch=Date.now()-simulationTime*1000;busBoardCache.clear()}
  const key=`${scenario}:${i}:${Math.floor(simulationTime)}:${delayed}:${previewOnly}`,cached=busBoardCache.get(key);
  if(cached)return cached;
  if(busBoardCache.size>12)busBoardCache.clear();
  const services=routes(i),specs=TransportSimulation.specs.filter(r=>r.offsets[i]!==undefined&&(!previewOnly||!r.previewHidden));
  const rows=buildBusBoard(specs,r=>TransportSimulation.arrival(r.id,i,0,delayed).at,simulationTime,busBoardEpoch).map(e=>{
    const j=services.findIndex(r=>r.id===e.service.id),service=services[j];
    return {j,r:{...service,key:e.key,remaining:e.remaining,atStop:e.atStop,scheduleOnly:e.delay||e.fixedSchedule,delayActive:e.delayActive,
      scheduledAt:e.scheduledAt,timetableOnly:!e.delay&&e.remaining>3600,mins:[Math.ceil(e.remaining/60),Math.ceil((e.remaining+e.service.gap)/60)]}};
  });
  const mixed=mixDelayedNeighbours(rows);busBoardCache.set(key,mixed);return mixed;
}
function showBusDaySchedule(r,index,key){
  const spec=TransportSimulation.specs[r.id];
  const live=spec.scheduleOnly?TransportSimulation.specs.find(s=>!s.scheduleOnly&&s.n===spec.n&&s.to===spec.to&&s.offsets[selected]!==undefined):spec;
  screen='bus-schedule';
  page(`${routeLabel(r)} ${r.n}`,`<div class="stop-detail-routes bus-board-page" data-bus-board-route="${live?.id??r.id}"></div>`,()=>showRoute(index,key));
  $('#overlay').className='bus-schedule-screen';refreshBusBoardPage();
}
function refreshBusBoardPage(){
  const el=$('[data-bus-board-route]');if(!el||screen!=='bus-schedule')return;
  const rows=extendedBusRows().filter(({r})=>r.id===+el.dataset.busBoardRoute);
  syncDepartureList(el,rows,selected);
}
function syncDepartureList(el,rows,stop){
  const order=rows.map(x=>x.r.key||x.r.id).join(',');if(order===el.dataset.order)return false;
  const scroller=el.closest('.day-schedule-scroll')||el.closest('#overlay');
  const top=scroller?.getBoundingClientRect().top||0;
  const anchor=[...el.querySelectorAll('[data-departure]')].find(b=>b.getBoundingClientRect().bottom>top);
  const anchorKey=anchor?.dataset.departure,offset=anchor?.getBoundingClientRect().top;
  el.dataset.order=order;el.innerHTML=rows.map(({r,j})=>routeRow(r,j,false,stop)).join('');
  const restored=[...el.querySelectorAll('[data-departure]')].find(b=>b.dataset.departure===anchorKey);
  if(scroller&&restored)scroller.scrollTop+=restored.getBoundingClientRect().top-offset;
  bindRoutes();return true;
}
if(typeof module!=='undefined')module.exports={remainingDayDepartures,buildBusBoard,mixDelayedNeighbours};
