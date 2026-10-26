'use strict';
// Route summary (Figma 2:19052). These coordinates are a fixed research fixture
// on the Central Street map; the original stop-selection state is restored on exit.
let farJourneyMap=null;
let farRoad=farArea.stops[0].path.map(p=>point(...p)),farGeo=point(...farArea.origin);
const farImg=(name,cls='')=>`<img src="assets/${name}?v=19" class="${cls}" alt="" draggable="false">`;
function taxiArt(){return farImg('taxi-economy.png','taxi-art')}
const homeBeforeFarJourney=renderHome;
renderHome=function(){const leaving=$('#app').classList.contains('far-journey');farJourneyMap?.remove();farJourneyMap=null;$('#app').classList.remove('far-journey');$('#far-journey-footer')?.remove();$('#far-journey-back')?.remove();$('#far-points')?.remove();homeBeforeFarJourney();if(leaving)updateMap()};
const fitBeforeFarJourney=fitSelectedStop;
fitSelectedStop=function(animate=true){
  if(screen!=='farjourney')return fitBeforeFarJourney(animate);
  clearTimeout(mapFitTimer);map.invalidateSize({pan:false});
  const sheetHeight=$('#sheet').getBoundingClientRect().height;
  map.stop();map.fitBounds(L.latLngBounds([farGeo,...farRoad]),{paddingTopLeft:[72,expanded?30:130],paddingBottomRight:[72,sheetHeight+70],maxZoom:-1.7,animate:animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches,duration:.6});
};
showFarJourney=function(){
  farRoad=currentStop().path;farGeo=base();
  renderHome();screen='farjourney';expanded=false;collapsed=false;farPrompt=false;$('#app').classList.add('far-journey');
  $('#sheet-body').innerHTML=`<div class="journey-fields"><div>${farImg('address-pin.png')}<span>${esc(config.far)}</span></div><div>${farImg('finish.png')}<span>${esc(currentStop().name)}</span><button id="journey-add" aria-label="Добавить точку маршрута">${farImg('far-plus.svg')}</button></div></div><div class="journey-tabs" aria-label="Виды поездки"><button class="active" data-journey-tab="Все">ВСЕ <small>New</small></button>${['Транспорт','Такси','Ultima','С детьми','Доставка'].map(n=>`<button data-journey-tab="${n}">${n.toUpperCase()}</button>`).join('')}</div><p class="journey-advice">Удобно на такси, но местами пробки <span>${farImg('far-traffic.png')}</span></p><div class="journey-options"><button class="journey-taxi" aria-label="Эконом, 7 минут до подачи, 15 минут в пути, 580 рублей"><div class="journey-option-info"><span><strong>Эконом</strong><small>7 мин и приедет</small></span><span class="journey-duration">15<small> мин</small></span><span>580<small> ₽</small></span></div><div class="journey-vehicle">${taxiArt()}</div></button><div class="journey-own"><div class="journey-option-info"><span>Своё авто</span><span class="journey-duration">15<small> мин</small></span><span>11,7<small> км</small></span></div>${farImg('far-own-car.png','journey-own-art')}</div></div>`;
  $('#app').insertAdjacentHTML('beforeend',`<div id="far-points">640${farImg('far-points.svg')}</div><button id="far-journey-back" class="round" aria-label="К остановкам">${icon('back',24)}</button><div id="far-journey-footer"><div>${farImg('far-pay.svg')}<button id="taxi-demo">Заказать такси</button></div><span class="journey-home-indicator"></span></div>`);
  $('#far-journey-back').onclick=()=>{renderHome();drawWalk()};
  $('#journey-add').onclick=()=>toast('В прототипе доступна поездка до остановки');
  $$('[data-journey-tab]').forEach(b=>b.onclick=()=>{if(b.dataset.journeyTab==='Все'||b.dataset.journeyTab==='Такси'){$$('[data-journey-tab]').forEach(t=>t.classList.toggle('active',t===b))}else toast(b.dataset.journeyTab==='Транспорт'?`До остановки ${currentStop().walk} минут пешком`:'В прототипе доступен тариф «Эконом»')});
  $('.journey-taxi').onclick=()=>{$$('.journey-taxi').forEach(el=>el.classList.add('chosen'))};
  $('#taxi-demo').onclick=()=>{screen='taxi-confirmation';page('Поездка к остановке',`<div class="success"><div class="success-mark">${icon('check',32)}</div><h2>Машина приедет через 7 минут</h2><p>До остановки «${esc(currentStop().name)}»</p><p class="notice">Учебный сценарий. Машина не заказана.</p><button class="primary" id="far-done">На главную</button></div>`,showFarJourney);$('#far-done').onclick=renderHome};
  markers.forEach(m=>m.remove());[walkingLine,walkLabel,originMarker,routeLine].forEach(m=>m?.remove());
  const lineParts=[['#fc5230',farRoad.slice(0,3)],['#f4be18',farRoad.slice(2,5)],['#70b638',farRoad.slice(4)]];
  farJourneyMap=L.layerGroup([L.polyline(farRoad,{color:'#fff',weight:6}),...lineParts.map(([color,path])=>L.polyline(path,{color,weight:4}))]).addTo(map);
  L.marker(farGeo,{icon:L.divIcon({className:'journey-geo',html:'<div class="origin-pin"></div>',iconSize:[24,24],iconAnchor:[12,12]}),interactive:false}).addTo(farJourneyMap);
  L.marker(farRoad[0],{icon:L.divIcon({className:'journey-pickup',html:`<div><b>7</b><small>мин</small></div>${farImg('far-tail.svg','journey-pickup-tail')}${farImg('far-point.svg','journey-pickup-point')}`,iconSize:[48,72],iconAnchor:[24,65]}),interactive:false}).addTo(farJourneyMap);
  L.marker(farRoad[farRoad.length-1],{icon:L.divIcon({className:'journey-finish',html:`<span>${farImg('far-finish.svg')}</span>`,iconSize:[24,24],iconAnchor:[12,12]}),interactive:false}).addTo(farJourneyMap);
  syncSheet();fitSelectedStop(false);
};
