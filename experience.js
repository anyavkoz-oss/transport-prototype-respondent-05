'use strict';
let mapFitTimer, mapExtensionLayer, mapLabelsLayer;
const chipPreview=params.get('stopPreview')==='chips';
let walkLabel, farPrompt = true, tripFrom = '', tripTo = '', quantity = 1, payment = 0;
let trainOrigin = 'Белорусский вокзал';
let trainDestination = 'Одинцово', qrStarted = 0, carouselTimer;
let sessionStarted = performance.now();
const asset = (name, cls='') => `<img class="${cls}" src="assets/${name}?v=6" alt="" draggable="false">`;
const mode = (name, size=24) => `<span class="asset-icon" style="width:${size}px;height:${size}px">${asset(name==='tram'?'tram-icon.png':name==='minibus'?'minibus-icon.png':name+'-icon.svg')}</span>`;
const routeMode = r => r.mode||layer;
const routeLabel = r => routeMode(r)==='tram'?'Трамвай':routeMode(r)==='minibus'?'Маршрутка':'Автобус';
const point = (x,y) => [1544-y,x];
function base(){if(trainMapContext())return point(...trainMapContext().origin);return scenario==='far'?point(...farArea.origin):point(...TransportSimulation.origin)}
function stops(){
  const profile=participantLocation(scenario),station=trainStationContext(),metro=nearestMetroContext();
  if(station)return [{name:station.name,meta:'',pos:point(...station.pos),path:[],meters:0,walk:0}];
  const railMap=trainMapContext();
  if(railMap?.pos)return [{name:railMap.name,meta:'',pos:point(...railMap.pos),path:[],meters:0,walk:0}];
  if(metro)return [{name:tripFrom||metro.name,meta:tripFrom&&tripFrom!==metro.name?'':metro.line,pos:point(...(typeof metroStationPosition==='function'?metroStationPosition(tripFrom||metro.name):metro.pos)),path:[],meters:0,walk:0}];
  if(profile&&layer==='bus')return profile.stopNames.map((name,i)=>{const w=TransportSimulation.walking(i);return {name,mode:profile.stopModes?.[i]||'bus',mixed:profile.mixedStops?.includes(i)||false,shortName:profile.stopShortNames?.[i],meta:(i===(profile.frequentStopIndex??0)||(!chipPreview&&profile.rowPreviewFrequentStops?.includes(i)))?'Уже уезжали':profile.stopHints?.[i]||'',pos:point(...TransportSimulation.platforms[i]),walk:w.minutes,meters:w.meters,path:w.path.map(p=>point(...p))}});
  const names=layer==='metro'?[tripFrom||'Парк культуры','Октябрьская','Фрунзенская']:layer==='train'?['Белорусский вокзал','Одинцово','Беговая']:scenario==='far'?farArea.stops.map(s=>s.name):[scenario==='familiar'?config.stop:'Дом Музыки','Якиманский сквер','Большая Якиманка'];
  // Metro coordinates are registered to the station circles in the schematic.
  const positions=layer==='metro'?[(typeof metroStationPosition==='function'?metroStationPosition(tripFrom):[808,955]),[918,1017],[780,981]].map(p=>point(...p)):scenario==='far'?farArea.stops.map(s=>point(...s.path.at(-1))):TransportSimulation.platforms.map(p=>point(...p));
  return names.map((name,i)=>{const w=TransportSimulation.walking(i,scenario==='far');return {name,meta:layer==='bus'&&scenario==='familiar'&&i===0?'Уже уезжали':'',pos:positions[i],walk:w.minutes,meters:w.meters,path:w.path.map(p=>point(...p))}});
}
function routeNumber(id){if(personalTransportLocation(scenario,layer))return TransportSimulation.specs[id].n;return scenario==='familiar'&&id<2?[config.route,config.route2][id]:TransportSimulation.specs[id].n}
function delayContext(i=selected){return `${params.get('participant')||'default'}:${scenario}:${i}`}
function updateScheduledDelay(i=selected){
  if(layer!=='bus'||prototypeDefaults.extendedBusSchedule)return;
  const services=TransportSimulation.specs.filter(r=>r.offsets[i]!==undefined);
  if(!services.some(r=>r.scheduleOnly))return;
  // Include repeated departures of the same route when a stop has only one live service.
  const queue=ScheduledDelay.state(delayContext(i),simulationTime);
  const from=queue.events.length?Math.max(simulationTime,queue.endAt):simulationTime;
  const arrivals=services.filter(r=>!r.scheduleOnly).flatMap(r=>{
    const first=TransportSimulation.arrival(r.id,i,from,delayed);
    return [0,1].map(cycle=>({id:r.id,at:first.at+cycle*r.gap,cycle:first.cycle+cycle}));
  });
  ScheduledDelay.plan(delayContext(i),simulationTime,arrivals,TransportSimulation.dwell);
}
function routes(i=selected){
  if(layer==='bus'){
    const queue=ScheduledDelay.state(delayContext(i),simulationTime);
    return TransportSimulation.specs.filter(r=>r.offsets[i]!==undefined).map(r=>{
      const t=TransportSimulation.arrival(r.id,i,simulationTime,delayed);
      const event=r.scheduleOnly?queue.events.find(e=>e.kind==='delay'):null;
      return {id:r.id,n:routeNumber(r.id),mode:r.mode||'bus',to:r.to,noBoarding:!!r.noBoarding,mins:[t.minutes,t.nextMinutes],remaining:r.scheduleOnly?(event?.remaining??Infinity):t.remaining,
        atStop:!r.scheduleOnly&&t.atStop,scheduleOnly:r.scheduleOnly,delayActive:!!event?.active,
        scheduledAt:r.scheduleOnly?(event?.scheduledAt??Date.now()+t.remaining*1000):null};
    });
  }
  return (layer==='metro'?['1','5']:['D1','РЭКС']).map((n,id)=>({id,n,to:layer==='metro'?'В сторону центра':'В сторону Одинцово',mins:[3+id*5,9+id*5],remaining:(3+id*5)*60}));
}
function etaText(r){return r.scheduleOnly?ScheduledDelay.format(r.scheduledAt)+(r.delayActive?' · Опаздывает':''):r.atStop?'На остановке':r.mins[0]+' мин'}
function liveArrivalMarkup(r){return `<span class="live-eta"><span class="live-eta-dot" aria-hidden="true">${asset('stop-chip-dot.svg')}</span><span>${esc(etaText(r))}</span></span>`}
function arrivalMarkup(r){return r.delayActive?`<time datetime="${new Date(r.scheduledAt).toISOString()}">${ScheduledDelay.format(r.scheduledAt)}</time><small>Опаздывает</small>`:r.scheduleOnly||r.timetableOnly?ScheduledDelay.format(r.scheduledAt):liveArrivalMarkup(r)}
function arrivalRows(i=selected,previewOnly=false){
  if(layer==='bus'&&prototypeDefaults.extendedBusSchedule)return extendedBusRows(i,previewOnly);
  updateScheduledDelay(i);
  const services=routes(i),queue=layer==='bus'?ScheduledDelay.state(delayContext(i),simulationTime):{events:[]};
  if(queue.events.length)return queue.events.map(event=>{
    const j=services.findIndex(r=>event.kind==='delay'?r.scheduleOnly:r.id===event.id),service=services[j];
    if(!service)return null;
    return {j,r:{...service,key:event.key,scheduledAt:event.scheduledAt,remaining:event.remaining,atStop:event.atStop,
      mins:[Math.ceil(event.remaining/60),service.mins[1]],delayActive:event.active}};
  }).filter(Boolean);
  return services.map((r,j)=>({r,j})).filter(({r})=>!r.scheduleOnly).sort((a,b)=>a.r.remaining-b.r.remaining);
}
function stopDetailRows(i=selected){
  const queue=arrivalRows(i);
  if(layer==='bus'&&prototypeDefaults.extendedBusSchedule)return queue;
  const location=personalTransportLocation(scenario,layer);
  if(location?.groupStopRoutes)return routes(i).map((r,j)=>({r,j})).filter(({r})=>!r.scheduleOnly).sort((a,b)=>a.r.remaining-b.r.remaining);
  if(!location?.mixedStops?.includes(i)&&!location?.services?.some(r=>r.itinerary))return queue;
  const queued=new Set(queue.map(({r})=>r.id));
  const others=routes(i).map((r,j)=>({r,j})).filter(({r})=>!r.scheduleOnly&&!queued.has(r.id));
  return [...queue,...others.sort((a,b)=>a.r.remaining-b.r.remaining)];
}
function serviceTimes(r,limit=4){
  if(r.scheduleOnly){const first=new Date(r.scheduledAt);if(day){first.setDate(first.getDate()+1);first.setHours(0,0,0,0)}return Array.from({length:limit},(_,i)=>new Date(+first+i*TransportSimulation.specs[r.id].gap*1000))}
  const start=new Date(Date.now()-simulationTime*1000), tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);tomorrow.setHours(0,0,0,0);
  const from=day?(tomorrow-start)/1000:simulationTime;
  const first=layer==='bus'?TransportSimulation.arrival(r.id,selected,from,delayed).at:from+r.mins[0]*60;
  const gap=layer==='bus'?TransportSimulation.specs[r.id].gap:360;
  return Array.from({length:limit},(_,i)=>new Date(+start+(first+i*gap)*1000));
}
function fullSchedule(r){
  const times=serviceTimes(r,720), date=times[0].toDateString(), hours=new Map();
  for(const t of times){if(t.toDateString()!==date)break;const hour=String(t.getHours()).padStart(2,'0');if(!hours.has(hour))hours.set(hour,[]);hours.get(hour).push(String(t.getMinutes()).padStart(2,'0'))}
  return [...hours].map(([h,minutes])=>`<strong>${h}</strong><span>${[...new Set(minutes)].join(' ')}</span>`).join('');
}
function routeTimeline(r){
  if(layer!=='bus')return stops().map(s=>`<div>${esc(s.name)}</div>`).join('');
  const offsets=TransportSimulation.specs[r.id].offsets,here=offsets[selected];
  return Object.entries(offsets).filter(([,time])=>time>=here).sort((a,b)=>a[1]-b[1]).map(([i,time])=>`<div>${esc(stops()[i].name)}<small>${+i===selected?'Вы здесь':Math.ceil((time-here)/60)+' мин в пути'}</small></div>`).join('');
}
function routeRow(r,j,full=false,stop=selected){return `<div class="route-row" data-service="${r.id}"><button class="route-main" data-route="${j}" data-departure="${r.key||''}" data-card-stop="${stop}" aria-label="Расписание ${esc(r.n)}"><span class="mode-icon ${routeMode(r)}">${mode(routeMode(r),routeMode(r)==='minibus'?32:21)}</span><span class="route-info"><span class="route-num">${esc(r.n)}${favRoutes.has(r.n)?`<span class="mini-heart">${icon('heart',12,true)}</span>`:''}</span><span class="sub">${esc(r.to)}</span>${r.noBoarding?'<small class="no-boarding">Нет посадки</small>':''}</span><span class="arrival ${r.delayActive?'scheduled-delay':r.scheduleOnly||r.timetableOnly?'scheduled-time':delayed&&r.id===0?'late':''}" data-eta="${j}" data-eta-event="${r.key||''}" data-eta-stop="${stop}">${arrivalMarkup(r)}</span></button>${full?`<button class="heart ${favRoutes.has(r.n)?'on':''}" data-fav="${esc(r.n)}" aria-pressed="${favRoutes.has(r.n)}" aria-label="В избранное ${esc(r.n)}">${icon('heart',21,favRoutes.has(r.n))}</button>`:''}</div>`}
function nearestRows(i){return arrivalRows(i,true).slice(0,2)}
function chipRows(i){
  if(layer==='bus'&&prototypeDefaults.extendedBusSchedule)return extendedBusRows(i,true);
  const events=arrivalRows(i),services=routes(i),groups=new Map();
  // Keep one bubble per route where possible, and fill from its real next arrivals.
  for(const row of [...events,...services.map((r,j)=>({r,j}))]){
    if(groups.has(row.r.id))continue;
    const r={...row.r},spec=TransportSimulation.specs[r.id];
    if(!r.key&&layer==='bus')r.key=`service:${r.id}:${TransportSimulation.arrival(r.id,i,simulationTime,delayed).cycle}`;
    r.nextScheduledAt=r.scheduledAt+(spec?.gap||360)*1000;
    r.nextMinutes=Math.ceil((r.remaining+(spec?.gap||360))/60);
    groups.set(r.id,{...row,r});
  }
  const result=[...groups.values()].sort((a,b)=>a.r.remaining-b.r.remaining);
  // Some participant stops have only two routes: the third bubble is the next
  // actual queued departure, never a fictional route added to that location.
  for(const row of events){
    if(result.length>=3)break;
    if(result.some(x=>x.r.key===row.r.key))continue;
    result.push(row);
  }
  return result;
}
function previewRows(i){return chipPreview?chipRows(i).slice(0,3):nearestRows(i)}
function chipExtra(i,rows){return Math.max(0,chipRows(i).length-rows.length)}
function chipArrivalMarkup(r){
  if(r.delayActive)return `<time datetime="${new Date(r.scheduledAt).toISOString()}">${ScheduledDelay.format(r.scheduledAt)}</time>`;
  const pair=values=>values[0]+(values.length>1?`<span class="chip-next-time">, ${values[1]}</span>`:'');
  if(r.scheduleOnly)return `<span>${pair([r.scheduledAt,r.nextScheduledAt].filter(Number.isFinite).map(ScheduledDelay.format))}</span>`;
  const times=[...new Set([r.mins[0],r.nextMinutes].filter(Number.isFinite))];
  return `<span class="live-eta"><span class="live-eta-dot" aria-hidden="true">${asset('stop-chip-dot.svg')}</span><span>${r.atStop?'Сейчас':pair(times)+' мин'}</span></span>`;
}
function routeChip({r,j},i,slot){return `<button class="route-chip route-chip-${routeMode(r)}" data-chip-slot="${slot}" data-chip-key="${esc(r.key||String(r.id))}" data-route="${j}" data-departure="${r.key||''}" data-card-stop="${i}" aria-label="Расписание ${esc(r.n)}${r.delayActive?', опаздывает':''}"><span class="chip-lead"><span class="chip-icon">${r.mode==='tram'?asset('tram-icon.png','tram-glyph'):asset('stop-chip-bus.svg')}${asset('stop-chip-delay.svg','chip-delay-badge')}</span></span><span class="chip-number">${esc(r.n)}</span><span class="arrival chip-eta ${r.delayActive?'scheduled-delay':r.scheduleOnly?'scheduled-time':''}" data-eta="${j}" data-eta-event="${r.key||''}" data-eta-stop="${i}">${chipArrivalMarkup(r)}</span></button>`}
function previewContent(i,rows=previewRows(i)){
  if(!chipPreview)return rows.map(({r,j})=>routeRow(r,j,false,i)).join('');
  const extra=chipExtra(i,rows);
  return rows.map((row,slot)=>routeChip(row,i,slot)).join('')+`<button class="chip-more" data-more-stop="${i}" aria-label="Ещё${extra?' '+extra:''}, открыть расписание остановки">ещё${extra?' '+extra:''}</button>`;
}
function previewOrder(i,rows){return rows.map(x=>x.r.key||x.r.id).join(',')+(chipPreview?':'+chipExtra(i,rows):'')}
function stopCard(i){const s=stops()[i],nearest=previewRows(i);return `<article class="stop-card ${chipPreview?'stop-card-chips':''}" data-card="${i}" aria-label="Остановка ${esc(s.name)}"><div class="stop-heading"><button class="stop-title" data-open-stop="${i}" aria-label="${esc(s.name)}" title="${esc(s.name)}"><span class="stop-title-text">${esc(s.shortName||s.name)}</span>${chipPreview?'':asset('chevron.png','chevron-disc')}</button><button class="heart ${favStops.has(s.name)?'on':''}" data-stop-fav="${i}" aria-pressed="${favStops.has(s.name)}" aria-label="Остановка ${esc(s.name)} в избранное">${icon('heart',chipPreview?24:26,favStops.has(s.name))}</button></div><div class="live-rows ${chipPreview?'chip-list':''}" data-live-stop="${i}" data-order="${previewOrder(i,nearest)}">${previewContent(i,nearest)}</div></article>`}

function routeFields(){return `<div class="route-fields"><button id="route-from">${layer==='metro'?asset('metro-active.svg','field-icon'):'<b class="origin-ring"></b>'}<span class="${tripFrom||layer==='metro'?'':'muted'}">${esc(tripFrom||(layer==='metro'?currentStop().name:'Откуда'))}</span></button><button id="route-to">${asset('finish.png','field-icon')}<span class="${tripTo?'':'muted'}">${esc(tripTo||'Куда поедете?')}</span></button><button id="swap" aria-label="Поменять местами отправление и назначение">${asset('swap.png','field-icon')}</button></div>`}
let activeStopGroup=0;
function cardStopIndices(){
 const groups=participantLocation(scenario)?.cardGroups;
 if(layer!=='bus'||!groups)return stops().map((_,i)=>i);
 if(!groups[activeStopGroup]?.includes(selected))activeStopGroup=Math.max(0,groups.findIndex(g=>g.includes(selected)));
 return groups[activeStopGroup];
}
function swipeStop(direction){const group=cardStopIndices();selectStop(group[(group.indexOf(selected)+direction+group.length)%group.length])}
function renderHome(){
  $('#app').classList.remove('stop-view');$('#stop-back')?.remove();screen='home';$('#overlay').hidden=true;$('#overlay').className='';[...$('#app').children].forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden')});
  $('#origin').innerHTML=`<span class="service-icon">${asset('transport-service.png')}</span><span>${esc(layer==='metro'?currentStop().name:config[scenario])}</span>${asset('chevron.png','chevron-disc')}`;
  $$('button[data-layer]').forEach(b=>{b.classList.toggle('selected',b.dataset.layer===layer);b.setAttribute('aria-pressed',String(b.dataset.layer===layer));b.innerHTML=mode(b.dataset.layer)});
  $('#favorites-open').innerHTML=icon('heart',26);$('#favorites-open').classList.remove('on');
  $('#search-open').innerHTML=`<span class="asset-icon" style="width:24px;height:24px">${asset('scan.svg')}</span><span>${layer==='bus'?(personalTransportLocation(scenario,layer)?.mixedStops?'Транспорт или маршрут':'Автобус или маршрут'):layer==='metro'?'Станция метро':'Станция'}</span>`;
  $('#locate').innerHTML=icon('locate',24,true);
  const busContent=`<div id="carousel" class="carousel" role="region" aria-label="Остановки. Свайпайте влево или вправо" tabindex="0"><div id="carousel-track" class="carousel-track">${(cardStopIndices().length===1?[0]:[cardStopIndices().at(-1),...cardStopIndices(),cardStopIndices()[0]]).map(stopCard).join('')}</div></div><div class="dots" ${stops().length===1?'hidden':''}>${cardStopIndices().map(i=>{const s=stops()[i];return `<button data-stop="${i}" class="${i===selected?'active':''}" aria-label="Выбрать ${esc(s.name)}" aria-pressed="${i===selected}"></button>`}).join('')}</div>`;
  $('#sheet-body').innerHTML=`${trainStationContext()?stationPreviewCard():layer==='bus'?busContent:routeFields()}<div class="ticket-grid"><div class="wallet-card troika"><div class="wallet-label">${asset('troika.svg','troika-logo')} Карта «Тройка» <button id="troika-settings" aria-label="Настройки Тройки">${asset('settings.svg','settings-icon')}</button></div><strong>${balance.toLocaleString('ru-RU')} ₽</strong><button id="topup">Пополнить</button></div><div class="wallet-card ticket-card"><div class="wallet-label">${asset('trips.png','trips-icon')} Поездки</div><button id="my-tickets-open" class="wallet-title">Мои билеты${purchased.length?` · ${purchased.length}`:''}</button><button class="buy" id="buy-ticket">Купить билет</button></div></div><div class="promo">${asset('ad.png')}<strong>Кофе и печеньки<br>в подарок</strong><p>В поездке с Яндекс Пэй</p></div>`;
  $('#sheet-body').scrollTop=0;
  $$('[data-open-stop]').forEach(b=>b.onclick=()=>{selected=+b.dataset.openStop;showStop()});
  $$('[data-stop-fav]').forEach(b=>b.onclick=()=>{toggleSet(favStops,stops()[+b.dataset.stopFav].name);renderHome()});
  $$('[data-stop]').forEach(b=>b.onclick=()=>selectStop(+b.dataset.stop));
  bindRoutes();$('#buy-ticket').onclick=showTickets;$('#my-tickets-open').onclick=showMyTickets;$('#topup').onclick=showTopup;$('#troika-settings').onclick=showTransportCardsImage;
  if(layer==='bus'){positionCarousel(false);bindSwipe($('#carousel'));fitChipPreviews()}else if(trainStationContext()){bindStationBoard()}else{
    $('#route-from').onclick=()=>layer==='train'?showTrainSearch(true):showStationPicker('from');$('#route-to').onclick=()=>layer==='train'?showTrainSearch(false):showStationPicker('to');
    $('#swap').onclick=()=>{[tripFrom,tripTo]=[tripTo,tripFrom||(layer==='metro'?'Парк культуры':'')];renderHome();if(layer==='metro')updateMap()};
  }
  $('#research-entry').hidden=!researcher;syncSheet();updatePins();
}
function showTransportCardsImage(){
  if($('#troika-modal'))return;
  const previous=[...$('#app').children].map(el=>({el,inert:el.inert,hidden:el.getAttribute('aria-hidden')}));
  const focusBefore=document.activeElement;
  const modal=document.createElement('div');modal.id='troika-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Транспортные карты');
  modal.innerHTML='<button class="troika-modal-dismiss" aria-label="Закрыть транспортные карты"><img src="assets/troika-sheet.png?v=12" alt="Транспортные карты: Карта «Тройка», Тройка мамы, Добавить карту, Готово" draggable="false"></button>';
  previous.forEach(({el})=>{el.inert=true;el.setAttribute('aria-hidden','true')});$('#app').append(modal);
  const close=()=>{modal.remove();document.removeEventListener('keydown',onKey,true);previous.forEach(({el,inert,hidden})=>{el.inert=inert;if(hidden===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',hidden)});if(focusBefore?.isConnected)focusBefore.focus({preventScroll:true})};
  const onKey=e=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close()}};
  modal.onclick=e=>{e.stopPropagation();close()};document.addEventListener('keydown',onKey,true);modal.querySelector('button').focus({preventScroll:true});
}
// The stop detail uses the same sheet, route identities and simulation clock as home.
function showStop(){
  if(trainStationContext())return showStationBoard();
  const keepExpanded=screen==='stop'&&expanded;
  screen='stop';$('#overlay').hidden=true;$('#overlay').className='';
  [...$('#app').children].forEach(el=>{el.inert=false;el.removeAttribute('aria-hidden')});
  $('#app').classList.add('stop-view');expanded=keepExpanded;collapsed=false;
  const s=currentStop(),rows=stopDetailRows();
  $('#sheet-body').innerHTML=`<div class="stop-detail-heading"><div><h1>${esc(s.name)}</h1><p>Остановка · ${icon('walk',14)} ${s.walk} мин</p></div><button class="heart" id="detail-favorite" aria-label="Остановка ${esc(s.name)} в избранное" aria-pressed="${favStops.has(s.name)}">${icon('heart',26,favStops.has(s.name))}</button></div><div class="stop-detail-routes ${prototypeDefaults.extendedBusSchedule?'day-schedule-scroll':''}"><div data-detail-stop="${selected}" data-order="${rows.map(x=>(x.r.key||x.r.id)).join(',')}">${rows.map(({r,j})=>routeRow(r,j)).join('')}</div></div><div class="stop-directions"><button id="stop-to">Сюда</button><button id="stop-from">Отсюда</button></div>`;
  $('#sheet-body').scrollTop=0;
  if(!$('#stop-back')){const b=document.createElement('button');b.id='stop-back';b.className='round';b.setAttribute('aria-label','Назад к остановкам');b.innerHTML=icon('back');$('#app').append(b)}
  $('#stop-back').onclick=renderHome;
  $('#detail-favorite').onclick=()=>{toggleSet(favStops,s.name);showStop()};
  $('#stop-to').onclick=()=>{renderHome();collapsed=true;syncSheet();drawWalk();fitSelectedStop()};
  $('#stop-from').onclick=()=>{tripFrom=s.name;showSearch()};
  bindRoutes();syncSheet();updatePins();drawWalk();
}
function bindRoutes(){$$('[data-more-stop]').forEach(b=>b.onclick=()=>{selected=+b.dataset.moreStop;showStop()});$$('[data-route]').forEach(b=>b.onclick=()=>{if(b.dataset.cardStop)selected=+b.dataset.cardStop;showRoute(+b.dataset.route,b.dataset.departure)});$$('[data-fav]').forEach(b=>b.onclick=()=>{toggleSet(favRoutes,b.dataset.fav);screen==='favorites'?showFavorites():screen==='route'?showRoute(routeIndex):showStop()})}
function positionCarousel(animate=true,dx=0){const el=$('#carousel'),track=$('#carousel-track');if(!el)return;const active=cardStopIndices().indexOf(selected)+(cardStopIndices().length>1?1:0);[...track.children].forEach((card,i)=>{card.inert=i!==active;card.setAttribute('aria-hidden',String(i!==active))});const offset=track.children[active]?.offsetLeft||0;track.style.transition=animate?'transform .28s cubic-bezier(.2,.8,.2,1)':'none';track.style.transform=`translateX(${16-offset+dx}px)`;$$('.dots [data-stop]').forEach(b=>{b.classList.toggle('active',+b.dataset.stop===selected);b.setAttribute('aria-pressed',String(+b.dataset.stop===selected))});}
function selectStop(i,pan=true){if(trainStationContext()){showStationBoard();return}selected=(i+stops().length)%stops().length;if(layer!=='bus')tripFrom=currentStop().name;if(screen==='stop'&&layer==='bus')showStop();else if(screen!=='home'||layer!=='bus')renderHome();positionCarousel();updatePins();drawWalk();if(map&&pan)fitSelectedStop();}
function bindSwipe(el){if(stops().length<2)return;let start=null,dx=0,dragging=false;
  el.onpointerdown=e=>{start=[e.clientX,e.clientY];dx=0;dragging=false};
  el.onpointermove=e=>{if(!start)return;dx=e.clientX-start[0];if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(e.clientY-start[1])){dragging=true;el.setPointerCapture(e.pointerId);positionCarousel(false,dx)}};
  const finish=()=>{if(!start)return;start=null;if(dragging&&Math.abs(dx)>40)swipeStop(dx<0?1:-1);else positionCarousel();if(dragging){el.addEventListener('click',e=>{e.stopPropagation();e.preventDefault()},{once:true,capture:true});setTimeout(()=>dragging=false,0)}};
  el.onpointerup=finish;el.onpointercancel=()=>{start=null;positionCarousel()};
  el.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();swipeStop(e.key==='ArrowRight'?1:-1)}};
}
function syncSheet(){$('#sheet').classList.toggle('expanded',expanded);$('#sheet').classList.toggle('collapsed',collapsed);$('#handle').setAttribute('aria-label',expanded?'Свернуть шторку':'Развернуть шторку');$('#handle').setAttribute('aria-expanded',String(expanded));$('#app').dataset.layer=layer;const shade=$('#sheet-shade');if(shade){shade.inert=!expanded;shade.setAttribute('aria-hidden',String(!expanded))}scheduleMapFit();positionCarousel(false)}
function initMap(){
  map=L.map('map',{crs:L.CRS.Simple,zoomControl:false,attributionControl:false,minZoom:-4,maxZoom:1.5,zoomSnap:.1,maxBoundsViscosity:1}).setView(point(1040,540),-.8);
  map.on('zoomend',sizeTrainOriginMarker);
  $('#zoom-in').onclick=()=>map.zoomIn(.3);$('#zoom-out').onclick=()=>map.zoomOut(.3);$('#locate').onclick=()=>resetMapView();updateMap();requestAnimationFrame(animateVehicles);
}
function resetMapView(){fitSelectedStop()}
function sizeTrainOriginMarker(){
  const station=trainStationContext()||trainMapContext(),el=originMarker?.getElement()?.querySelector('.origin-pin,.origin-location');
  if(!station?.originDotRadius||!el||!map)return;
  const size=Math.max(24,Math.ceil(station.originDotRadius*2*Math.pow(2,map.getZoom()))+10);
  el.style.width=el.style.height=size+'px';el.style.transform=`translate(${(24-size)/2}px,${(24-size)/2}px)`;
}

function updateMap(){
  if(!map)return;markers.forEach(m=>m.remove());vehicles.forEach(v=>v.marker.remove());markers=[];vehicles=[];
  [routeLine,walkingLine,originMarker,walkLabel,tiles,mapExtensionLayer,mapLabelsLayer].forEach(m=>m?.remove());mapExtensionLayer=null;mapLabelsLayer=null;
  const station=trainStationContext(),scheme=nearestMetroContext()?.map?nearestMetroContext():null,profile=station||scheme||trainMapContext()||personalTransportLocation(scenario,layer),personalMap=!!scheme||(profile&&layer!=='metro');
  const file=personalMap?profile.map:layer==='metro'?'metro-map.png':scenario==='far'?'far-map.png':'map-clean.png';
  if(personalMap&&profile.mapExtension){
    const extensions=Array.isArray(profile.mapExtension)?profile.mapExtension:[profile.mapExtension];
    mapExtensionLayer=L.layerGroup(extensions.map(ext=>{
      const [[left,top],[right,bottom]]=ext.bounds;
      return L.imageOverlay('assets/'+ext.file,[[1544-bottom,left],[1544-top,right]],{interactive:false,zIndex:0,opacity:ext.opacity??1});
    })).addTo(map);
  }
  tiles=L.imageOverlay('assets/'+file+'?v=6',personalMap?[[1544-profile.mapSize[1],0],[1544,profile.mapSize[0]]]:[[0,0],[1544,2108]],{interactive:false}).addTo(map);
  if(scenario==='far'&&layer!=='metro')mapLabelsLayer=L.imageOverlay('assets/far-map-labels.svg?v=44',[[0,0],[1544,2108]],{interactive:false,zIndex:2}).addTo(map);
  map.setMaxBounds(null);
  if(layer!=='metro')originMarker=L.marker(station?point(...station.origin):base(),{icon:L.divIcon({className:'',html:station?.originLocationIcon?'<div class="origin-location">'+icon('locate',25,true)+'</div>':'<div class="origin-pin"></div>',iconSize:[24,24],iconAnchor:[12,12]}),interactive:false}).addTo(map);
  stops().forEach((s,i)=>{if((layer==='train'&&!station&&!trainMapContext()?.pos)||(layer==='metro'&&i!==selected))return;markers[i]=L.marker(s.pos,{icon:pinIcon(i),title:s.name,zIndexOffset:1000}).addTo(map).on('click',()=>selectMapStop(i))});
  sizeTrainOriginMarker();drawWalk();updatePins();requestAnimationFrame(()=>{fitSelectedStop(false);scheduleMapFit()});
}
function pinIcon(i){const s=stops()[i],active=i===selected;
  const tail='<svg class="bubble-tail" width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><path d="M0 0C7 0 10 3 13 12C16 3 19 0 26 0Z" fill="white"/></svg>';
  const subtitle=s.meta?`<small>${esc(s.meta)}</small>`:'';
  const html=scenario==='far'&&active&&farPrompt&&layer==='bus'?`<div class="far-bubble">${asset('stop.png','far-stop-icon')}<span>Далеко от вас,<br>поедем сюда?</span><div><button data-far-yes>Да</button><button data-far-no>Нет</button></div>${tail}</div><span class="stop-dot"></span>`:`<div style="--pin-offset-x:${trainStationContext()?.pinOffsetX||0}px" class="pin-inner ${layer} ${s.mode==='tram'?'tram-stop':''} ${active?'selected':''} ${stopPinBelow(i)?'pin-below':''}"><span class="pin-icon">${layer==='bus'?(s.mixed?`<span class="mixed-stop-icon">${asset('mixed-stop.png')}</span>`:s.mode==='tram'?asset(participantLocation(scenario)?.stopIcons?.[i]||'tram-icon.png'):asset('stop.png')):layer==='metro'?asset('metro-pin.svg'):(trainStationContext()||trainMapContext()?.pos)?asset('train-active.svg'):mode(layer,24)}</span>${active?`<span class="pin-label"><span class="pin-name" title="${esc(s.name)}">${esc(s.shortName||s.name)}</span>${subtitle}</span>${tail}`:''}</div>${active?'<span class="stop-dot"></span>':''}`;
  return L.divIcon({className:'stop-pin',html,iconSize:[28,28],iconAnchor:[14,14]});
}

let stopGroupLoading=false;
function selectMapStop(i){
 if(layer!=='bus'){selectStop(i);return}
 const profile=participantLocation(scenario),groups=profile?.cardGroups;
 if(!profile?.loadGroupOnMap||!groups||cardStopIndices().includes(i)){selectStop(i);return}
 if(stopGroupLoading)return;stopGroupLoading=true;
 const context=scenario;const body=$('#sheet-body');body.setAttribute('aria-busy','true');
 const loader=document.createElement('div');loader.className='stop-group-loading';loader.setAttribute('role','status');loader.textContent='Загружаем остановки…';body.prepend(loader);
 setTimeout(()=>{stopGroupLoading=false;body.removeAttribute('aria-busy');loader.remove();if(scenario!==context||layer!=='bus')return;activeStopGroup=groups.findIndex(g=>g.includes(i));selected=i;renderHome();updateMap();},900);
}
function updatePins(){markers.forEach((m,i)=>{if(stops()[i])m.setIcon(pinIcon(i));else m.remove()});$$('[data-far-yes]').forEach(b=>{L.DomEvent.disableClickPropagation(b);b.onclick=e=>{e.stopPropagation();showFarJourney()}});$$('[data-far-no]').forEach(b=>{L.DomEvent.disableClickPropagation(b);b.onclick=e=>{e.stopPropagation();farPrompt=false;updatePins()}})}
function drawWalk(){
  if(!map)return;walkingLine?.remove();walkLabel?.remove();if(layer!=='bus'){updatePins();return}
  const path=currentStop().path;
  const labelOffset=participantLocation(scenario)?.walkLabelOffsets?.[selected]||[0,0];
  walkingLine=L.layerGroup([L.polyline(path,{color:'#fff',weight:7,opacity:1}),L.polyline(path,{color:'#a6a6a1',weight:3,dashArray:'4 7',lineCap:'round'})]).addTo(map);
  if(!stopPinBelow(selected))walkLabel=L.marker(TransportSimulation.point(path,.44),{icon:L.divIcon({className:'walk-label',html:`${icon('walk',14)} ${currentStop().walk} мин`,iconSize:[65,28],iconAnchor:[32.5-labelOffset[0],14-labelOffset[1]]}),interactive:false,zIndexOffset:500}).addTo(map);
}
function vehicleLabelPosition(angle,width,height,labelWidth,labelHeight){
  const radians=angle*Math.PI/180,c=Math.cos(radians),s=Math.sin(radians);
  const side=width/2+2+Math.abs(c)*labelWidth/2+Math.abs(s)*labelHeight/2;
  const rear=height*.35;
  return {x:-c*side-s*rear,y:-s*side+c*rear};
}
function vehicleLabelRadius({x,y}){
  // The pointed corner is the corner nearest the vehicle, not a fixed corner.
  const corners=['16px','16px','16px','16px'];
  corners[y>0?(x>0?0:1):(x>0?3:2)]='0';
  return corners.join(' ');
}
function syncVehicles(){
  const frames=layer==='bus'&&scenario!=='far'?TransportSimulation.vehicles(simulationTime,delayed).filter(f=>TransportSimulation.specs[f.route].offsets[selected]!==undefined&&(typeof routeDetailId==='undefined'||routeDetailId===null||f.route===routeDetailId)):[];
  const keys=new Set(frames.map(f=>f.key));vehicles=vehicles.filter(v=>{if(keys.has(v.key))return true;v.marker.remove();return false});
  frames.forEach(f=>{
    let v=vehicles.find(v=>v.key===f.key);
    if(!v){const marker=L.marker(point(...f.pos),{icon:L.divIcon({className:'vehicle-marker '+(TransportSimulation.specs[f.route].mode==='tram'?'vehicle-tram':TransportSimulation.specs[f.route].mode==='minibus'?'vehicle-minibus':''),html:`<div class="vehicle-body">${asset(TransportSimulation.specs[f.route].mode==='tram'?'tram-3d.png':TransportSimulation.specs[f.route].mode==='minibus'?'minibus-3d.png':'bus-3d.png')}</div><div class="vehicle-label"><b>${esc(routeNumber(f.route))}</b></div>`,iconSize:[26,52],iconAnchor:[13,26]}),interactive:true,title:routeLabel(TransportSimulation.specs[f.route])+' '+routeNumber(f.route),zIndexOffset:400}).addTo(map).on('click',()=>{const j=routes().findIndex(r=>r.id===f.route);if(j>=0)showRoute(j)});v={key:f.key,marker};vehicles.push(v)}
    v.marker.setLatLng(point(...f.pos));const el=v.marker.getElement();
    if(el){
      const body=el.querySelector('.vehicle-body'),label=el.querySelector('.vehicle-label');
      body.style.transform=`rotate(${f.angle}deg)`;
      // Keep the upright number beside the rear, with its tail facing the body.
      const vehicleMode=TransportSimulation.specs[f.route].mode;
      const visibleWidth=body.offsetWidth*(vehicleMode==='tram'?.71:.51);
      const visibleHeight=body.offsetHeight*(vehicleMode==='minibus'?.67:.72);
      const position=vehicleLabelPosition(f.angle,visibleWidth,visibleHeight,label.offsetWidth,label.offsetHeight);
      label.style.left=`${body.offsetWidth/2+position.x}px`;
      label.style.top=`${body.offsetHeight/2+position.y}px`;
      label.style.borderRadius=vehicleLabelRadius(position);
    }
  });
}
let lastEtaSecond=-1;
function animateVehicles(time){
  simulationTime=(time-sessionStarted)/1000;syncVehicles();
  if(Math.floor(simulationTime)!==lastEtaSecond){
    lastEtaSecond=Math.floor(simulationTime);
    if(layer==='bus'){
      if(['home','stop','route','favorites'].includes(screen)&&document.visibilityState!=='hidden')updateScheduledDelay();
      let changed=false;$$('[data-live-stop]').forEach(el=>{const i=+el.dataset.liveStop,nearest=previewRows(i),order=previewOrder(i,nearest);if(order!==el.dataset.order){el.dataset.order=order;if(chipPreview)updateChipPreview(el,i,nearest);else{el.innerHTML=previewContent(i,nearest);el.classList.remove('rows-changed');void el.offsetWidth;el.classList.add('rows-changed');}changed=true}});$$('[data-detail-stop]').forEach(el=>{const i=+el.dataset.detailStop,rows=stopDetailRows(i),order=rows.map(x=>(x.r.key||x.r.id)).join(',');if(order!==el.dataset.order){if(prototypeDefaults.extendedBusSchedule)syncDepartureList(el,rows,i);else{el.dataset.order=order;el.innerHTML=rows.map(({r,j})=>routeRow(r,j,false,i)).join('')}changed=true}});if(changed)bindRoutes();
      if(prototypeDefaults.extendedBusSchedule)refreshBusBoardPage();
      $$('[data-eta]').forEach(el=>{const r=el.classList.contains('chip-eta')?previewRows(+el.dataset.etaStop).find(x=>x.r.key===el.dataset.etaEvent)?.r:el.dataset.etaEvent?arrivalRows(+el.dataset.etaStop).find(x=>x.r.key===el.dataset.etaEvent)?.r:routes(+el.dataset.etaStop)[+el.dataset.eta];if(r){el.classList.toggle('scheduled-delay',!!r.delayActive);el.classList.toggle('scheduled-time',!!(r.scheduleOnly||r.timetableOnly)&&!r.delayActive);const markup=el.classList.contains('chip-eta')?chipArrivalMarkup(r):arrivalMarkup(r);if(el.innerHTML!==markup)el.innerHTML=markup;if(el.classList.contains('chip-eta'))el.closest('.route-chip')?.setAttribute('aria-label',`Расписание ${r.n}${r.delayActive?', опаздывает':''}`)}});
      fitChipPreviews();
      $$('[data-single-eta]').forEach(el=>{const r=routes()[+el.dataset.singleEta];if(r)el.textContent=etaText(r)});
      $$('[data-next-eta]').forEach(el=>{const r=routes()[+el.dataset.nextEta];if(r)el.textContent='Следующий через '+r.mins[1]+' мин'});
    }
    if($('#qr-countdown')){const left=45-Math.floor((performance.now()-qrStarted)/1000)%45;$('#qr-countdown').textContent=`Код действует ещё 00:${String(left).padStart(2,'0')}`}
  }
  requestAnimationFrame(animateVehicles);
}
function setScenario(s){if(participantProfile?.alternate)ScheduledDelay.reset();sessionStarted=performance.now();simulationTime=0;scenario=s;activeStopGroup=0;selected=0;expanded=false;collapsed=false;farPrompt=true;tripFrom='';tripTo='';renderHome();updateMap()}
function page(title,html,back=renderHome){[...$('#app').children].forEach(el=>{if(!['overlay','toast'].includes(el.id)){el.inert=true;el.setAttribute('aria-hidden','true')}});$('#overlay').hidden=false;$('#overlay').className='';$('#overlay').innerHTML=`<div class="page-top"><button id="page-back" aria-label="Назад">${icon('back')}</button><h1>${title}</h1><button id="page-close" aria-label="На главную">${icon('close',21)}</button></div>${html}`;$('#overlay').scrollTop=0;$('#page-back').onclick=back;$('#page-close').onclick=renderHome}
function showStationPicker(field){page(field==='from'?'Откуда':'Куда поедете?',`<input id="station-query" class="search-input" placeholder="Станция или адрес"><div id="station-results"></div>`);const names=[...stops().map(s=>s.name),'Домой',config.home,'Павелецкая','Площадь Революции'];const draw=()=>{const q=$('#station-query').value.toLowerCase();$('#station-results').innerHTML=names.filter(n=>n.toLowerCase().includes(q)).map(n=>`<button class="choice" data-station="${esc(n)}">${mode(layer,22)}${esc(n)}</button>`).join('');$$('[data-station]').forEach(b=>b.onclick=()=>{if(field==='from'){tripFrom=b.dataset.station;renderHome()}else{tripTo=b.dataset.station;showJourney()}})};$('#station-query').oninput=draw;draw();$('#station-query').focus()}
function showFarJourney(){
  renderHome();screen='farjourney';farPrompt=false;updatePins();
  $('#sheet-body').innerHTML=`<div class="far-route-content"><div class="route-fields static"><div>◯ <span>${esc(config.far)}</span></div><div>⚑ <span>${esc(currentStop().name)}</span></div></div><div class="transport-chips"><button class="active" data-far-mode="all">Все</button><button data-far-mode="bus">Транспорт</button><button data-far-mode="taxi">Такси</button></div><h2>Удобно на такси,<br>но местами пробки</h2><div class="taxi-card"><div><strong>Эконом</strong><p>7 мин приедет</p></div><b>15 мин<br>580 ₽</b></div><div class="choice"><span class="choice-text"><strong>На своей машине</strong><span class="sub">15 мин · 11,7 км</span></span></div><button class="primary" id="taxi-demo">Заказать такси</button><button class="secondary" id="far-walk">Пешком · ${currentStop().walk} мин</button><button class="secondary" id="far-return">К остановкам</button><p class="research-tag">Сценарий исследования · заказ не отправляется</p></div>`;
  walkingLine?.remove();walkingLine=L.polyline(currentStop().path,{color:'#e5b633',weight:5}).addTo(map);
  $('#taxi-demo').onclick=()=>{page('Поездка к остановке',`<div class="success"><div class="success-mark">${icon('check',32)}</div><h2>Машина приедет через 7 минут</h2><p>До остановки «${esc(currentStop().name)}»</p><p class="notice">Учебный сценарий. Машина не заказана.</p><button class="primary" id="far-done">На главную</button></div>`);$('#far-done').onclick=renderHome};
  $('#far-return').onclick=()=>{renderHome();updateMap()};
  $('#far-walk').onclick=()=>{renderHome();collapsed=true;syncSheet();walkingLine?.remove();walkingLine=L.polyline(currentStop().path,{color:'#aaa',dashArray:'4 7',weight:4}).addTo(map);farPrompt=false;updatePins()};
  $$('[data-far-mode]').forEach(b=>b.onclick=()=>{if(b.dataset.farMode==='bus')toast(`До остановки ${currentStop().walk} минут пешком`);else showFarJourney()});
}
// Ticket entry follows the active transport layer, as in the Figma flows.
function showTickets(){ticketType=layer;product='single';quantity=1;if(layer==='metro')showMetroQr();else if(layer==='train')showTrainSearch();else showBusCheckout()}
function showBusCheckout(){
  const personal=personalTransportLocation(scenario,layer),service=routes().find(r=>r.id===routeDetailId)||routes()[0];
  const busNumber=personal?service.n:'м5',busDestination=personal?service.to.replace(/^(?:В сторону |до )/,'').replace(/^«(.*)»$/,'$1'):'Щедрино';
  const vehicleMode=personal?routeMode(service):'bus';
  screen='checkout';ticketType='bus';
  const cards=[['bank-alfa.svg','· 1006','Карта 1006'],['bank-plus.svg','Карта Плюса','Карта Плюса'],['bank-t.svg','· 2366','Карта 2366']];
  page('',`<div class="checkout-content"><div class="checkout-bus-heading"><span class="checkout-bus-icon ${vehicleMode}">${mode(vehicleMode,27)}</span><div><h1>${vehicleMode==='tram'?'Трамвай':'Автобус'} ${esc(busNumber)}</h1><p>Борт №2356</p></div></div><div class="boarding-card"><div class="boarding-route"><small>Маршрут</small><div>До «${esc(busDestination)}»</div></div><button id="boarding-stop"><span><small>Вы здесь</small><span>${esc(currentStop().name)}</span></span>${icon('arrow',20)}</button></div><div class="quantity-row"><span>Количество билетов</span><div><button id="qty-minus" aria-label="Уменьшить количество" ${quantity===1?'disabled':''}>−</button><span>${quantity}</span><button id="qty-plus" aria-label="Увеличить количество" ${quantity===6?'disabled':''}>+</button></div></div><section class="checkout-payment"><h2>Способы оплаты</h2><div class="payment-cards">${cards.map(([logo,label,name],i)=>`<button data-payment="${i}" class="${payment===i?'active':''}" aria-pressed="${payment===i}" aria-label="${name}"><img class="bank-logo" src="assets/${logo}?v=12" alt=""><span>${label}</span>${i===1?'<em class="plus-balance">✦ 123</em>':`<img class="payment-brand" src="assets/mastercard.svg?v=12" alt="Mastercard">`}</button>`).join('')}</div><div class="cashback"><img src="assets/bank-plus.svg?v=12" alt=""><div><strong>Кешбэк 10% на поездку</strong><small>Платите картой Яндекс Пэй</small></div>${icon('arrow',20)}</div></section><p class="payment-terms">Продолжая, вы соглашаетесь с <u>Правилами покупки</u> и <u>Условиями сервиса</u></p></div><div class="pay-bottom"><strong>${38*quantity} ₽</strong><button class="primary" id="pay">Оплатить</button></div>`);
  $('#overlay').className='bus-checkout';$('#qty-minus').onclick=()=>{quantity=Math.max(1,quantity-1);showBusCheckout()};$('#qty-plus').onclick=()=>{quantity=Math.min(6,quantity+1);showBusCheckout()};$$('[data-payment]').forEach(b=>b.onclick=()=>{payment=+b.dataset.payment;showBusCheckout()});$('#boarding-stop').onclick=showStop;let paying=false;$('#pay').onclick=()=>{if(paying)return;paying=true;$('#pay').disabled=true;const t={type:'bus',vehicleMode,product:'single',quantity,route:busNumber,destination:busDestination,carrier:personal?'Демонстрационный перевозчик':undefined,payment,unitPrice:38,total:38*quantity,expiresAt:Date.now()+30*60*1000,id:Date.now()};if(prototypeDefaults.directBusTicket){showBusPaymentLoading(t);return}purchased.unshift(t);orderFilter='Всё';showMyTickets()};
}
function showMetroQr(){screen='qr';qrStarted=performance.now();page('Оплата через турникет',`<div class="metro-qr-body"><div class="qr">${qrSvg()}<span class="qr-brand">Я</span></div><div class="metro-qr-copy"><h2>Покажите QR на турникете</h2><p id="qr-countdown">Код действует ещё 00:45</p><small>Учебный QR · не действует для проезда</small></div></div><div class="qr-bottom"><button id="qr-back" class="round" aria-label="Назад">${icon('back')}</button><button id="scan-qr">Сканировать QR-код</button><button id="flashlight" class="round" aria-label="Фонарик">ϟ</button></div>`);$('#overlay').className='metro-qr';$('#qr-back').onclick=renderHome;$('#scan-qr').onclick=()=>toast('В исследовании используется демонстрационный QR-код');$('#flashlight').onclick=()=>{const on=$('#flashlight').getAttribute('aria-pressed')==='true';$('#flashlight').setAttribute('aria-pressed',String(!on));toast(on?'Фонарик выключен':'Фонарик включён — демонстрация')};}
function showTrainSearch(editingOrigin=false){screen='train-search';ticketType='train';page('Маршрут',`<div class="train-fields"><button id="train-origin">◯ <span>${esc(trainOrigin)}</span></button><label><span>⚑</span><input id="train-query" placeholder="${editingOrigin?'Станция отправления':'Станция или город'}" autocomplete="off"></label></div><div id="train-results"></div>`);const names=['Аэропорт Шереметьево','Москва (все вокзалы)','Аэропорт Домодедово','Белорусский вокзал','Одинцово'];const draw=()=>{$('#train-results').innerHTML=names.filter(n=>n.toLowerCase().includes($('#train-query').value.toLowerCase())).map(n=>`<button class="choice station-choice" data-destination="${esc(n)}">${icon('train',20)}<span>${esc(n)}</span></button>`).join('');$$('[data-destination]').forEach(b=>b.onclick=()=>{if(editingOrigin){trainOrigin=b.dataset.destination;showTrainSearch()}else{trainDestination=b.dataset.destination;showTrainSchedule()}})};$('#train-query').oninput=draw;$('#train-origin').onclick=()=>showTrainSearch(true);draw();$('#train-query').focus()}
function showTrainSchedule(){screen='train-schedule';page('Расписание',`<p class="local-time">Указано местное время</p><div class="route-fields static"><div>◯ <span>${esc(trainOrigin)}</span></div><div>⚑ <span>${esc(trainDestination)}</span></div><button id="train-edit" aria-label="Изменить маршрут">⇅</button></div><div class="schedule-day"><button class="active" id="train-day">Сегодня</button><button id="train-filter">Все поезда ⌄</button></div>${[['04:27','05:02','37'],['04:30','05:08','38'],['04:45','05:23','38'],['05:00','05:38','38']].map((t,i)=>`<article class="train-result"><div class="train-times"><strong>${t[0]}</strong><span>${t[2]} мин</span><strong>${t[1]}</strong></div><div class="train-platform"><span>13 путь</span><i></i><span>2 путь</span></div><div class="train-result-bottom"><div><b>Стандарт плюс</b><small>${esc(trainOrigin)} → ${esc(trainDestination)}</small></div><button class="fare" data-train-buy="${i}">124 ₽</button></div></article>`).join('')}`,()=>showTrainSearch(false));$('#train-edit').onclick=()=>showTrainSearch(false);$('#train-day').onclick=e=>{e.currentTarget.textContent=e.currentTarget.textContent==='Сегодня'?'Завтра':'Сегодня'};$('#train-filter').onclick=e=>{e.currentTarget.textContent=e.currentTarget.textContent==='Все поезда ⌄'?'Только электрички ⌄':'Все поезда ⌄'};$$('[data-train-buy]').forEach(b=>b.onclick=showTrainCheckout)}
function showTrainCheckout(){ticketType='train';screen='checkout';page('Билет на электричку',`<div class="ticket-product"><div class="live-badge">Стандарт плюс</div><h2>${esc(trainOrigin)} → ${esc(trainDestination)}</h2><p>1 взрослый · в одну сторону</p></div><h2>Способ оплаты</h2><div class="choice">${icon('card')}<span>Карта •• 1006</span>${icon('check')}</div><p class="notice">Учебная покупка. Деньги не списываются.</p><div class="pay-bottom"><strong>124 ₽</strong><button class="primary" id="pay">Оплатить</button></div>`,showTrainSchedule);$('#overlay').className='train-checkout';$('#pay').onclick=()=>{const t={type:'train',product:'single',origin:trainOrigin,destination:trainDestination,id:Date.now()};purchased.push(t);showSuccess(t)}}
function showSuccess(t){if(t.type==='metro'){showMetroQr();return}screen='success';page('Мой билет',`<div class="success"><div class="success-mark">${icon('check',37)}</div><h2>Билет куплен</h2><p>${t.type==='bus'?'Автобус м5 · '+(t.quantity||1)+' '+((t.quantity||1)===1?'билет':t.quantity<5?'билета':'билетов'):esc(t.origin||trainOrigin)+' → '+esc(t.destination||trainDestination)}</p><div class="ticket-product">${icon(t.type,48)}<h2>Готов к поездке</h2><p>${t.type==='bus'?'До «Щедрино»':'Стандарт плюс'}</p></div><p class="notice demo">Учебный билет. Не действует для проезда.<br>Оплата не производилась.</p><button class="primary" id="success-home">На главную</button><button class="secondary" id="success-tickets">Мои билеты</button></div>`,showMyTickets);$('#success-home').onclick=renderHome;$('#success-tickets').onclick=showMyTickets}
$('#handle').onpointerup=e=>{const d=e.clientY-handleY;if(screen==='stop'||screen==='route'){if(d>25)renderHome();else{expanded=!expanded;collapsed=false;syncSheet()}return}if(Math.abs(d)>25){expanded=d<0;collapsed=d>0&&!expanded}else{expanded=!expanded;collapsed=false}renderHome()};
$('#handle').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();expanded=!expanded;collapsed=false;screen==='stop'||screen==='route'?syncSheet():renderHome()}};
window.addEventListener('resize',()=>positionCarousel(false));
$$('button[data-layer]').forEach(b=>b.onclick=()=>{layer=b.dataset.layer;selected=0;tripFrom='';tripTo='';renderHome();updateMap()});
renderHome();initMap();updatePins();if(researcher)showResearch();

// Keep the map's coordinate surface fixed while sheets cover it. Fit the two
// anchors including the stop bubble, rather than centering on the stop alone.
function scheduleMapFit(){clearTimeout(mapFitTimer);mapFitTimer=setTimeout(()=>fitSelectedStop(),340)}
function fitSelectedStop(animate=true){
  clearTimeout(mapFitTimer);if(!map)return;
  map.invalidateSize({pan:false});
  const app=$('#app'), sheet=$('#sheet'), width=app.clientWidth;
  const rightInset=trainStationContext()||trainMapContext()||((personalTransportLocation(scenario,layer)||scenario==='far')&&layer==='bus')?68:12;
  const visibleHeight=app.clientHeight-sheet.getBoundingClientRect().height;
  const bubble=markers[selected]?.getElement()?.querySelector('.selected,.far-bubble');
  const bw=bubble?.offsetWidth||80,bh=(bubble?.offsetHeight||48)+32;
  const top=expanded?10:90,bottom=visibleHeight-12;
  const below=stopPinBelow(selected);
  const pinOffsetX=trainStationContext()?.pinOffsetX||0;
  const points=layer==='train'&&!trainStationContext()&&!trainMapContext()?.pos?[]:[{pos:currentStop().pos,l:-bw/2-6+pinOffsetX,r:bw/2+6+pinOffsetX,t:below?-12:-bh,b:below?bh:12}];
  if(trainMapContext())trainMapContext().focusPoints.forEach(p=>points.push({pos:point(...p),l:-40,r:40,t:-15,b:28}));
  if(layer!=='metro')points.push({pos:trainStationContext()?point(...trainStationContext().origin):base(),l:-18,r:18,t:-18,b:18});
  if(scenario==='far'&&layer==='bus')stops().forEach((s,i)=>{if(i!==selected)points.push({pos:s.pos,l:-18,r:18,t:-18,b:18})});
  let z=(trainStationContext()||trainMapContext())?0:nearestMetroContext()?.map ? .7 : layer==='metro'?-.3:(participantLocation(scenario)?.mapMaxZoom??-.8),box;
  const boundsAt=zoom=>{const ps=points.map(p=>({...p,p:map.project(p.pos,zoom)}));return {l:Math.min(...ps.map(p=>p.p.x+p.l)),r:Math.max(...ps.map(p=>p.p.x+p.r)),t:Math.min(...ps.map(p=>p.p.y+p.t)),b:Math.max(...ps.map(p=>p.p.y+p.b))}};
  for(;z>-4;z-=.1){box=boundsAt(z);if(box.r-box.l<=width-12-rightInset&&box.b-box.t<=bottom-top)break}
  z=Math.max(-4,Math.round(z*10)/10);box=boundsAt(z);
  // Lift the station map above the layer switch, keeping both anchors below the header.
  const stationLift=trainStationContext()?Math.min(72,Math.max(0,(bottom-top-(box.b-box.t))/2)):0;
  const center=map.unproject([(box.l+box.r)/2+(rightInset-12)/2,(box.t+box.b)/2+app.clientHeight/2-(top+bottom)/2+stationLift],z);
  map.stop();const motion=animate&&!nearestMetroContext()&&!trainStationContext()&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(motion)map.flyTo(center,z,{duration:.6,easeLinearity:.3});else map.setView(center,z,{animate:false});
}
