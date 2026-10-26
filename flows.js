'use strict';
// Detail screens share the live route model and the participant's session.
const homeBeforeFlows=renderHome,routeBeforeFlows=showRoute;
let routeDepartureKey=null,routeDetailId=null,routeReturn=()=>renderHome(),orderFilter='Всё';
const uiAsset=(name,cls='')=>`<img src="assets/${name}?v=13" class="${cls}" alt="" draggable="false">`;
function clearRouteDetail(){routeDepartureKey=null;routeDetailId=null;routeLine?.remove();$('#app').classList.remove('route-view','route-view-tram');}
renderHome=function(){const wasRoute=routeDetailId!==null;clearRouteDetail();homeBeforeFlows();if(wasRoute)drawWalk();$('#topup').disabled=true;$('#topup').onclick=null;$('#troika-settings').onclick=showTransportCards;
  const count=purchased.reduce((n,t)=>n+(t.quantity||1),0),card=$('.ticket-card');
  if(count){card.classList.add('has-active');card.querySelector('.wallet-label').remove();card.insertAdjacentHTML('afterbegin',uiAsset('ticket-active.png','active-ticket-art'));$('#my-tickets-open').textContent=`${count} ${count===1?'активный':'активных'}`;}
};
const stopBeforeFlows=showStop;
showStop=function(){clearRouteDetail();stopBeforeFlows();};
showRoute=function(i,departureKey){
  if(!departureKey&&screen==='route')departureKey=routeDepartureKey;
  if(layer!=='bus')return routeBeforeFlows(i);
  const from=screen;const r=arrivalRows().find(x=>x.r.key===departureKey&&x.r.id===routes()[i]?.id)?.r||routes()[i]||routes()[0];if(!r)return;
  if(from!=='route')routeReturn=from==='stop'?()=>showStop():()=>renderHome();
  stopBeforeFlows();screen='route';routeIndex=i;routeDetailId=r.id;routeDepartureKey=departureKey||null;$('#app').classList.add('route-view');$('#app').classList.toggle('route-view-tram',r.mode==='tram');
  const spec=TransportSimulation.specs[r.id];
  const heading=spec.routeHeading||participantLocation(scenario)?.routeHeadings?.[r.n]||[currentStop().name,r.to.replace(/^(?:В сторону |до )/,'')];
  $('#sheet-body').innerHTML=`<div class="bus-route-heading"><div><h1>${routeLabel(r)} ${esc(r.n)}${spec.routeQualifier?` <span class="route-qualifier">· ${esc(spec.routeQualifier)}</span>`:''}</h1><p>${heading.map(esc).join(' <span>▸</span> ')}</p></div><button class="heart" data-fav="${esc(r.n)}" aria-label="${routeLabel(r)} ${esc(r.n)} в избранное" aria-pressed="${favRoutes.has(r.n)}">${icon('heart',26,favRoutes.has(r.n))}</button></div><div class="route-stops-list" id="route-stops-list"></div>`;
  $('#stop-back').onclick=()=>routeReturn();
  bindRoutes();renderRouteStops();
  if(map&&layer==='bus'){walkingLine?.remove();walkLabel?.remove();routeLine?.remove();routeLine=L.polyline(spec.path.map(p=>point(...p)),{color:r.mode==='tram'?'#ff3e2c':'#009ff5',weight:6,opacity:1}).addTo(map);routeLine.bringToBack();map.invalidateSize({pan:true});}
  syncSheet();
};
function skippedStopsLabel(n){const last=n%10,teen=n%100;return `${n} ${teen>=11&&teen<=14?'остановок':last===1?'остановка':last>=2&&last<=4?'остановки':'остановок'}`}
function renderRouteStops(){
  const target=$('#route-stops-list');if(!target||screen!=='route')return;
  const r=arrivalRows().find(x=>x.r.key===routeDepartureKey&&x.r.id===routeDetailId)?.r||routes().find(r=>r.id===routeDetailId);if(!r)return;const spec=TransportSimulation.specs[r.id],here=spec.offsets[selected];
  if(spec.fullItinerary?.length){
    // Retain the list DOM while the clock ticks so native scrolling stays smooth.
    const key=`${r.id}:${spec.itineraryIndex}`;
    if(target.dataset.itineraryRoute!==key){
      target.innerHTML=spec.fullItinerary.map((name,index)=>`<div class="route-stop ${index<spec.itineraryIndex?'passed':index===spec.itineraryIndex?'current-route-stop':''}"><span>${esc(name)}${spec.itineraryNotes?.[index]?`<small class="route-stop-here">${esc(spec.itineraryNotes[index])}</small>`:index===spec.itineraryIndex?'<small class="route-stop-here">Вы здесь</small>':''}</span>${index===spec.itineraryIndex?'<span class="arrival"></span>':index>spec.itineraryIndex&&spec.itineraryMinutes?.[index]!==undefined?`<time data-itinerary-time="${index}"></time>`:''}</div>`).join('');
      target.dataset.itineraryRoute=key;
    }
    const arrival=target.querySelector('.current-route-stop .arrival');
    arrival.className=`arrival ${r.delayActive?'scheduled-delay':r.scheduleOnly?'scheduled-time':''}`;
    arrival.innerHTML=arrivalMarkup(r);
    // Screenshot travel intervals follow the existing research arrival clock.
    target.querySelectorAll('[data-itinerary-time]').forEach(time=>{
      const delta=spec.itineraryMinutes[time.dataset.itineraryTime]-spec.itineraryMinutes[spec.itineraryIndex];
      const at=Date.now()-simulationTime*1000+TransportSimulation.arrival(r.id,selected,simulationTime,delayed).at*1000;
      time.textContent=ScheduledDelay.format((r.scheduleOnly||r.key?r.scheduledAt:at)+delta*60000);
    });
    return;
  }
  if(spec.routeOverview?.length){
    const currentIndex=spec.routeOverview.findIndex(item=>item.current),key=`overview:${r.id}:${currentIndex}`;
    if(target.dataset.itineraryRoute!==key){
      target.innerHTML=spec.routeOverview.map((item,index)=>item.skipped?`<div class="route-stop route-stop-gap ${index<currentIndex?'passed':''}"><span>${skippedStopsLabel(item.skipped)}</span></div>`:`<div class="route-stop ${index<currentIndex?'passed':item.current?'current-route-stop':''}"><span>${esc(item.name)}${item.note?`<small class="route-stop-here">${esc(item.note)}</small>`:item.current?'<small class="route-stop-here">Вы здесь</small>':''}</span>${item.current?'<span class="arrival"></span>':index>currentIndex&&item.minute!==undefined&&spec.routeOverview[currentIndex].minute!==undefined?`<time data-overview-time="${index}"></time>`:''}</div>`).join('');
      target.dataset.itineraryRoute=key;
    }
    const arrival=target.querySelector('.current-route-stop .arrival');
    arrival.className=`arrival ${r.delayActive?'scheduled-delay':r.scheduleOnly?'scheduled-time':''}`;
    arrival.innerHTML=arrivalMarkup(r);
    target.querySelectorAll('[data-overview-time]').forEach(time=>{
      const delta=spec.routeOverview[time.dataset.overviewTime].minute-spec.routeOverview[currentIndex].minute;
      const at=Date.now()-simulationTime*1000+TransportSimulation.arrival(r.id,selected,simulationTime,delayed).at*1000;
      time.textContent=ScheduledDelay.format((r.scheduleOnly||r.key?r.scheduledAt:at)+delta*60000);
    });
    return;
  }
  if(spec.itinerary?.length){
    target.innerHTML=spec.itinerary.map((name,index)=>`<div class="route-stop ${index===0?'current-route-stop':''}"><span>${esc(name)}${index===0?'<small class="route-stop-here">Вы здесь</small>':''}</span>${index===0?`<span class="arrival ${r.delayActive?'scheduled-delay':r.scheduleOnly?'scheduled-time':''}">${arrivalMarkup(r)}</span>`:''}</div>`).join('');
    return;
  }
  const served=Object.keys(spec.offsets).map(Number).sort((a,b)=>spec.offsets[a]-spec.offsets[b]);
  const arrival=TransportSimulation.arrival(r.id,selected,simulationTime,delayed),start=Date.now()-simulationTime*1000;
  target.innerHTML=served.map(i=>{const past=spec.offsets[i]<here,time=ScheduledDelay.format((r.scheduleOnly||r.key?r.scheduledAt:start+arrival.at*1000)+(spec.offsets[i]-here)*1000);return `<button class="route-stop ${past?'passed':''}" data-route-stop="${i}"><span>${esc(stops()[i].name)}</span><span class="${r.delayActive&&i===selected?'arrival scheduled-delay':''}">${past?'':r.delayActive&&i===selected?arrivalMarkup(r):`<time>${time}</time>`}</span></button>`}).join('')+`<div class="route-end">${esc(r.to.replace(/^(?:В сторону |до )/,''))}</div>`;
  $$('[data-route-stop]').forEach(b=>b.onclick=()=>{selected=+b.dataset.routeStop;const idx=routes().findIndex(x=>x.id===r.id);showRoute(idx);updatePins();fitSelectedStop()});
}
setInterval(()=>{if(screen==='route')renderRouteStops()},1000);

function showTransportCards(){
  if($('#troika-modal'))return;
  const previous=[...$('#app').children].map(el=>({el,inert:el.inert,hidden:el.getAttribute('aria-hidden')})),focusBefore=document.activeElement;
  const modal=document.createElement('div');modal.id='troika-modal';modal.className='troika-live';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Транспортные карты');
  modal.innerHTML=`<button class="cards-backdrop" aria-label="Закрыть транспортные карты"></button><section class="transport-cards-sheet"><h2>Транспортные карты</h2>${['Карта «Тройка»','Тройка мамы'].map((name,i)=>`<div class="transport-card-row"><div class="transport-card-info"><span class="troika-card-art">${uiAsset('troika-card.png')}<small>Т Р О Й К А</small></span><div><span>${name}</span><small>Баланс: 1000 ₽</small></div><span class="card-check ${i?'':'checked'}">${i?'':icon('check',24)}</span></div><div class="card-static-actions"><span>Пополнить</span><span>Управлять</span></div></div>`).join('')}<div class="card-add"><span>＋</span>Добавить карту <b>›</b></div><div class="cards-footer"><button id="cards-done">Готово</button><div class="home-indicator"></div></div></section>`;
  previous.forEach(({el})=>{el.inert=true;el.setAttribute('aria-hidden','true')});$('#app').append(modal);
  const close=()=>{modal.remove();document.removeEventListener('keydown',onKey,true);previous.forEach(({el,inert,hidden})=>{el.inert=inert;if(hidden===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',hidden)});focusBefore?.focus({preventScroll:true})};
  const onKey=e=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();close()}};
  modal.onclick=close;document.addEventListener('keydown',onKey,true);$('#cards-done').focus({preventScroll:true});
}

const orderHistory=[{name:'Автобус 766',sub:'Дом Музыки → Парк Культуры',price:32,type:'bus'},{name:'Поезд-аэроэкспресс',sub:'До 19 марта 03:00 · Стандарт',price:650,type:'aero'},{name:'Электричка',sub:'До 25 июня 03:00 · Стандарт (пригород)',price:100,type:'train'}];
function orderIcon(type,vehicleMode){if(vehicleMode==='tram')return `<span class="order-tram">${uiAsset('tram-icon.png')}</span>`;return type==='bus'?uiAsset('transport-service.png'):type==='aero'?uiAsset('order-aero.svg'):`<span class="order-train">${uiAsset('train-active.svg')}</span>`;}
showMyTickets=function(){screen='mytickets';page('Мои заказы',`<div class="order-filters">${['Всё','Такси','Еда','Лавка'].map((name,i)=>`<button data-order-filter="${name}" class="${orderFilter===name?'active':''}">${i?uiAsset(['','filter-taxi.svg','filter-food.svg','filter-shop.svg'][i]):''}${name}</button>`).join('')}</div><div id="orders-list"></div>`);$('#overlay').className='orders-screen';renderOrders();$$('[data-order-filter]').forEach(b=>b.onclick=()=>{orderFilter=b.dataset.orderFilter;showMyTickets()});};
function renderOrders(){const show=orderFilter==='Всё';$('#orders-list').innerHTML=!show?'<p class="orders-label">Здесь пока нет заказов</p>':`${purchased.length?'<p class="orders-label">В процессе</p>':''}${purchased.map((t,i)=>`<article class="order-card active-order"><div class="order-info">${orderIcon(t.type,t.vehicleMode)}<div><strong>${t.type==='bus'?(t.vehicleMode==='tram'?'Трамвай ':'Автобус ')+esc(t.route||'м5'):t.type==='metro'?'Метро':'Электричка'}</strong><small>${t.type==='bus'?'До «'+esc(t.destination||'Щедрино')+'»':t.type==='metro'?'Проход по QR-коду':esc(t.destination||trainDestination)}${(t.quantity||1)>1?' · '+t.quantity+' билета':''}</small></div><span>${t.type==='bus'?(t.total||38*(t.quantity||1)):t.type==='metro'?65:(t.total||124*(t.quantity||1))} ₽</span></div><div class="order-actions"><button data-owned="${i}">${uiAsset('order-qr.svg')}<span>Билет</span></button><button data-order-help>${uiAsset('order-help.svg')}<span>Помощь</span></button></div></article>`).join('')}<p class="orders-label">Сегодня</p>${orderHistory.map(t=>`<article class="order-card"><div class="order-info">${orderIcon(t.type,t.vehicleMode)}<div><strong>${t.name}</strong><small>${t.sub}</small></div><span>${t.price} ₽</span></div></article>`).join('')}`;$$('[data-owned]').forEach(b=>b.onclick=()=>showSuccess(purchased[+b.dataset.owned]));$$('[data-order-help]').forEach(b=>b.onclick=()=>toast('Билет для исследования. Реальной оплаты не было.'));}

showSearch=function(){screen='search';page('',`<div class="search-location"><small>Я здесь</small><button id="search-origin">${esc(config[scenario])} ${icon('arrow',14)}</button></div><div class="search-tabs"><button class="selected" id="search-all"><span>${uiAsset('search-list.svg')}</span>Все</button><button id="search-goods"><span>${uiAsset('search-flower.svg')}<b>Wow</b></span>Товары</button></div><div id="search-results" class="search-suggestions"></div><form class="search-input-dock" id="search-form">${uiAsset('search-compass.svg')}<input id="query" placeholder="Что ищете?" aria-label="Поиск транспорта" autocomplete="off"><button type="button" id="clear-search" aria-label="Очистить поиск">${icon('close',16)}</button></form>`);$('#overlay').className='search-screen';$('#query').oninput=renderSearch;$('#search-origin').onclick=showOrigins;$('#clear-search').onclick=()=>{$('#query').value='';renderSearch()};$('#search-form').onsubmit=e=>{e.preventDefault();$('#query').blur()};$('#search-all').onclick=()=>{renderSearch()};$('#search-goods').onclick=()=>toast('В исследовании доступны транспорт и адреса');renderSearch();};
renderSearch=function(){
  const q=$('#query').value.trim().toLowerCase(),station=trainStationContext();
  const stationRuns=station?stationDepartures():[];
  const transportItems=station?stationRuns.map(r=>({name:'№ '+r.number,sub:r.from+' — '+r.to,type:'train-run',run:r,ico:'train-active.svg'})):routes().map((r,i)=>({name:r.n,sub:r.to,type:'route',id:i,mode:r.mode,ico:r.mode==='tram'?'tram-icon.png':'bus-icon.svg'}));
  const items=[...(participantProfile?.restrictAddresses?[]:[{name:'Домой',sub:config.home,type:'home',ico:'search-home.png'},{name:'На работу',sub:config.familiar,type:'origin',id:'familiar',ico:'search-work.png'}]),...stops().map((s,i)=>({name:s.name,sub:station?'Табло электричек':`${s.meters} м · Рядом с вами`,type:'stop',id:i,ico:station?'train-active.svg':'search-stop.png'})),...validScenarios.map(s=>({name:config[s],sub:participantLocation(s)?.city||(s==='far'?'Московская область':'Москва'),type:'origin',id:s,ico:'search-address.png'})),...transportItems].filter((r,i,all)=>all.findIndex(x=>x.name===r.name&&x.sub===r.sub)===i).filter(x=>!q||`${x.name} ${x.sub}`.toLowerCase().includes(q));
  $('#search-results').innerHTML=items.length?items.map((x,i)=>`<button class="suggestion-row" data-result="${i}"><span class="suggestion-icon ${x.type==='route'?'route-search-icon '+(x.mode==='tram'?'route-search-tram':''):''}">${uiAsset(x.ico,x.type==='route'?'':'supplied-search-icon')}</span><span class="suggestion-content"><span>${esc(x.name)}</span>${x.type==='home'||x.name==='На работу'?'':`<small>${esc(x.sub)}</small>`}${x.type==='stop'?`<span class="search-arrivals">${station?stationRuns.filter(r=>!r.noBoarding).slice(0,2).map(r=>`<b>${stationTime(r.at)}</b>`).join(''):nearestRows(x.id).map(({r})=>`<b class="${r.mode==='tram'?'tram-arrival':''}">${esc(r.n)} · ${etaText(r)}</b>`).join('')}</span>`:''}</span>${uiAsset('poi-pin.svg','suggestion-trail')}</button>`).join(''):'<p class="orders-label">Ничего не найдено</p>';
  $$('[data-result]').forEach(b=>b.onclick=()=>{const x=items[+b.dataset.result];$('#query').blur();if(x.type==='origin')setScenario(x.id);if(x.type==='stop'){selected=x.id;showStop()}if(x.type==='route')showRoute(x.id);if(x.type==='train-run')showStationRun(x.run);if(x.type==='home')showJourney()});
};

showOrigins=function(){screen='origins';page('',`<div class="origin-picker"><button class="picker-handle" id="origin-handle" aria-label="Свернуть шторку адресов"><span></span></button><div class="origin-input-row"><span class="origin-input-icon">${uiAsset('address-pin.png')}</span><label><span>Откуда</span><input id="origin-query" aria-label="Адрес отправления" autocomplete="off"></label><button id="origin-cancel" aria-label="Закрыть выбор адреса">${icon('close',18)}</button><button id="origin-map">Карта</button></div><div id="origin-results"></div></div>`);$('#overlay').className='origin-screen';$('#origin-cancel').onclick=renderHome;$('#origin-map').onclick=renderHome;$('#origin-query').oninput=renderOrigins;bindOriginPicker();renderOrigins();};
function bindOriginPicker(){
  const picker=$('.origin-picker'),handle=$('#origin-handle'),overlay=$('#overlay');
  let gesture=null,suppressClick=false;
  const close=()=>{document.activeElement?.blur();renderHome();$('#origin').focus({preventScroll:true})};
  const reset=()=>{picker.classList.remove('dragging');picker.style.transform='';gesture=null};
  handle.onclick=()=>{if(!suppressClick)close()};
  overlay.onclick=e=>{if(screen==='origins'&&e.target===overlay)close()};
  handle.onpointerdown=e=>{
    if(!e.isPrimary||e.button!==0)return;
    suppressClick=false;gesture={id:e.pointerId,y:e.clientY,start:performance.now(),dy:0};
    handle.setPointerCapture(e.pointerId);picker.classList.add('dragging');
  };
  handle.onpointermove=e=>{
    if(!gesture||e.pointerId!==gesture.id)return;
    gesture.dy=Math.max(0,e.clientY-gesture.y);
    if(gesture.dy>6)suppressClick=true;
    picker.style.transform=`translateY(${gesture.dy}px)`;
  };
  handle.onpointerup=e=>{
    if(!gesture||e.pointerId!==gesture.id)return;
    const {dy,start}=gesture,shouldClose=dy>=64||(dy>24&&dy/Math.max(1,performance.now()-start)>.5);
    handle.releasePointerCapture(e.pointerId);reset();
    if(shouldClose)close();
    // A short drag returns to the open position; its synthetic click must not close it.
    if(suppressClick)setTimeout(()=>suppressClick=false,0);
  };
  handle.onpointercancel=reset;
}
function renderOrigins(){const q=$('#origin-query').value.trim().toLowerCase();const items=[{name:config.far,sub:'Московская область',scenario:'far',type:'poi-home.svg'},{name:config.unfamiliar,sub:participantProfile?.alternate?.city||'Москва',scenario:'unfamiliar',type:'poi-pin.svg'},{name:config.familiar,sub:(participantProfile?.city||'Москва')+(participantProfile?.city==='Зеленоград'?'':' · Знакомое место'),scenario:'familiar',type:'poi-home.svg'}];$('#origin-results').innerHTML=items.filter(x=>!q||`${x.name} ${x.sub}`.toLowerCase().includes(q)).map(x=>`<button class="origin-result" data-origin="${x.scenario}">${uiAsset(x.type)}<span>${esc(x.name)}<small>${esc(x.sub)}</small></span></button>`).join('')||'<p class="orders-label">В прототипе доступны три подготовленных адреса</p>';$$('[data-origin]').forEach(b=>b.onclick=()=>{$('#origin-query').blur();setScenario(b.dataset.origin)});}
function syncKeyboardViewport(){const vv=window.visualViewport,app=$('#app');if(!vv)return;app.style.setProperty('--keyboard-inset',Math.max(0,window.innerHeight-vv.height-vv.offsetTop)+'px');}
window.visualViewport?.addEventListener('resize',syncKeyboardViewport);window.visualViewport?.addEventListener('scroll',syncKeyboardViewport);
$('#origin').onclick=showOrigins;$('#search-open').onclick=showSearch;
// Recreate the already mounted markers with the new map click interaction.
vehicles.forEach(v=>v.marker.remove());vehicles=[];
renderHome();
