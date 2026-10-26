'use strict';
// Real train identities, with a repeatable clock for research sessions.
// Source intervals are preserved; the seed advances with the participant's phone.
const stationClockStart=Math.floor(Date.now()/60000)*60000;
let stationDay=0,selectedStationDeparture=null;
function stationScheduleDate(now){return new Date(now).toLocaleDateString('sv-SE',{timeZone:'Europe/Moscow'})}
function stationDepartures(now=Date.now(),dayOffset=0){
  const station=trainStationContext();if(!station)return [];
  if(station.timetableDate){
    if(dayOffset)return [];
    const historical=stationScheduleDate(now)!==station.timetableDate;
    // Keep a dated research snapshot usable after its service day, without
    // inventing new departure dates or claiming that these are live arrivals.
    const start=historical?Date.parse(`${station.timetableDate}T${station.snapshotTime}:00+03:00`):now;
    return station.departures.map((r,i)=>({...r,key:`${station.timetableDate}:${i}`,historical,
      at:Date.parse(`${station.timetableDate}T${r.sourceTime}:00+03:00`)}))
      .filter(r=>r.at>=start).sort((a,b)=>a.at-b.at).slice(0,12);
  }
  const cycleMs=(station.cycleMinutes||20)*60000;
  const anchor=dayOffset?new Date(new Date(now).setHours(0,0,0,0)).getTime()+86400000:stationClockStart;
  const start=dayOffset?anchor:now;
  const cycle=dayOffset?0:Math.max(0,Math.floor((start-anchor)/cycleMs));
  return Array.from({length:Math.ceil(12/station.departures.length)+1},(_,i)=>cycle+i).flatMap(c=>station.departures.map((r,i)=>({...r,key:`${c}:${i}`,at:anchor+c*cycleMs+r.offset*60000})))
    .filter(r=>r.at>=start).sort((a,b)=>a.at-b.at).slice(0,12);
}
function stationTime(at){return new Date(at).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit',...(trainStationContext()?.timetableDate?{timeZone:'Europe/Moscow'}:{})})}
function stationRunRow(r,full=false){
  const minutes=Math.max(0,Math.ceil((r.at-Date.now())/60000));
  return `<article class="station-run ${r.express?'station-express':''}" aria-label="${esc(r.from)} — ${esc(r.to)}, № ${esc(r.number)}, ${stationTime(r.at)}${r.noBoarding?', Нет посадки':''}"><span class="mode-icon station-train-icon">${asset('train-active.svg')}</span><span class="station-run-text"><span>${full&&trainStationContext()?.timetableDate?esc(r.from+' — '+r.to):'Электричка'}</span><small title="${esc(r.from+' — '+r.to)}">${full&&trainStationContext()?.timetableDate?'Электричка · № '+esc(r.number):esc(r.from+' — '+r.to)}</small>${r.noBoarding?'<em class="station-no-boarding">Нет посадки</em>':''}</span><span class="station-run-time"><time datetime="${new Date(r.at).toISOString()}">${stationTime(r.at)}</time>${full&&!r.historical?`<small>${minutes<=1?'прибывает':'через '+minutes+' мин'}</small>`:''}</span></article>`;
}
function stationPreviewDepartures(){return stationDepartures().filter(r=>!r.noBoarding).slice(0,2)}
function stationPreviewCard(){
  const s=trainStationContext();
  return `<article class="stop-card station-preview" aria-label="Станция ${esc(s.name)}"><div class="stop-heading"><button class="stop-title" data-station-open title="${esc(s.name)}"><span class="stop-title-text">${esc(s.name)}</span>${asset('chevron.png','chevron-disc')}</button><button class="heart" data-station-favorite aria-label="Станция ${esc(s.name)} в избранное" aria-pressed="${favStops.has(s.name)}">${icon('heart',26,favStops.has(s.name))}</button></div><div class="station-preview-rows">${stationPreviewDepartures().map(r=>stationRunRow(r)).join('')}</div></article>`;
}
function bindStationBoard(){
  $$('[data-station-open]').forEach(b=>b.onclick=()=>{stationDay=0;showStationBoard()});
  $$('[data-station-favorite]').forEach(b=>b.onclick=()=>{toggleSet(favStops,trainStationContext().name);screen==='station-board'?showStationBoard():renderHome()});
}
function showStationBoard(){
  const s=trainStationContext();if(!s)return;
  clearRouteDetail();screen='station-board';collapsed=false;expanded=true;
  $('#overlay').hidden=true;$('#overlay').className='';
  [...$('#app').children].forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden')});
  $('#app').classList.add('stop-view');
  $('#sheet-body').innerHTML=`<div class="stop-detail-heading"><div><h1>${esc(s.name)}</h1><p>${s.timetableLabel?'Расписание на '+esc(s.timetableLabel):'Станция · Табло электричек'}</p></div><button class="heart" data-station-favorite aria-label="Станция ${esc(s.name)} в избранное" aria-pressed="${favStops.has(s.name)}">${icon('heart',26,favStops.has(s.name))}</button></div><div class="station-board-runs"></div>`;
  if(!$('#stop-back')){const b=document.createElement('button');b.id='stop-back';b.className='round';b.setAttribute('aria-label','Назад к станциям');b.innerHTML=icon('back');$('#app').append(b)}
  $('#stop-back').onclick=()=>{expanded=false;renderHome()};
  refreshStationRows();syncSheet();updatePins();drawWalk();
}
function refreshStationRows(){
  if(!trainStationContext())return;
  const preview=$('.station-preview-rows'),board=$('.station-board-runs');
  const update=(target,rows,full=false)=>{if(!target)return;const html=rows.map(r=>stationRunRow(r,full)).join('')||(trainStationContext()?.timetableDate?'<p class="station-no-departures">На сегодня рейсов больше нет</p>':'');if(target.dataset.rows!==html){target.dataset.rows=html;target.innerHTML=html}};
  update(preview,stationPreviewDepartures());
  update(board,stationDepartures(Date.now(),stationDay),true);
  bindStationBoard();
}
function showStationRun(r){
  selectedStationDeparture=r;screen='station-run';
  page(`${esc(r.name)} №${esc(r.number)}`,`<section class="station-run-detail"><span class="mode-icon station-train-icon">${asset('train-active.svg')}</span><h2>${esc(r.from)} → ${esc(r.to)}</h2><div class="station-departure-info"><span>${r.noBoarding?'Прибытие на станцию':'Отправление со станции'}<br><b>${esc(trainStationContext().name)}</b></span><time>${stationTime(r.at)}</time></div>${r.noBoarding?'<p class="station-no-boarding">Нет посадки</p>':'<button class="primary" id="station-run-buy">Купить билет</button>'}</section>`,showStationBoard);
  if(!r.noBoarding)$('#station-run-buy').onclick=()=>{trainOrigin=trainStationContext().name;trainDestination=r.to;trainDay=stationDay;railSelectedDeparture=0;showTrainCheckout()};
}
const stationCheckoutBefore=showTrainCheckout;
showTrainCheckout=function(){
  stationCheckoutBefore();
  if(!trainStationContext()||!selectedStationDeparture)return;
  const run=selectedStationDeparture;
  // Keep the existing demonstration checkout, but carry the selected station/run
  // through it instead of leaking the old Belorussky fixture's departure.
  const upcoming=$('.rail-checkout-heading p');if(upcoming)upcoming.textContent=`${run.name} №${run.number} · ${stationTime(run.at)}`;
  const pay=$('#pay'),prior=pay.onclick;
  pay.onclick=()=>{prior();const ticket=purchased[0];if(ticket?.type==='train'){ticket.departure=stationTime(run.at);ticket.trainNumber=run.number;showSuccess(ticket)}};
  $('#page-back').onclick=()=>showStationRun(run);
};
const stationTicketsBefore=showTickets;
showTickets=function(){
  if(trainStationContext()){selectedStationDeparture=null;trainOrigin=trainStationContext().name;trainDestination='';trainDay=0;railTicketQuantity=1;showTrainSearch(true)}
  else stationTicketsBefore();
};
setInterval(()=>{if(trainStationContext()&&['home','station-board'].includes(screen))refreshStationRows()},1000);
