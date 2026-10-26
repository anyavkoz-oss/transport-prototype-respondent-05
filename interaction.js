'use strict';
// One vertical gesture advances one detent. Horizontal carousel gestures keep
// their own pointer handling; a tap remains a tap until direction is known.
const sheetElement=$('#sheet'), handleElement=$('#handle');
const sheetShade=document.createElement('button');
sheetShade.id='sheet-shade';sheetShade.setAttribute('aria-label','Свернуть шторку');
$('#app').insertBefore(sheetShade,sheetElement);
let sheetGesture=null, suppressSheetClickUntil=0;
const sheetLevel=()=>expanded?2:collapsed?0:1;
function setSheetLevel(level){
  expanded=level===2;collapsed=level===0;
  sheetElement.style.height='';sheetElement.classList.remove('dragging');
  syncSheet();
}
function detentHeights(){const h=$('#app').clientHeight;return [h*.25,h*($('#app').classList.contains('far-journey')?.534:$('#app').classList.contains('route-view')?.38:h<700?.55:.51),Math.min(h*.84,h-120)]}
handleElement.onpointerdown=null;handleElement.onpointerup=null;
handleElement.onclick=()=>setSheetLevel(sheetLevel()===2?1:sheetLevel()+1);
handleElement.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setSheetLevel(Math.max(0,Math.min(2,sheetLevel()+(e.key==='ArrowUp'?1:-1))))}};
sheetShade.onclick=()=>setSheetLevel(1);
sheetElement.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0)return;
  if(e.target.closest('.route-stops-list,.day-schedule-scroll')){sheetGesture=null;return}
  sheetGesture={id:e.pointerId,x:e.clientX,y:e.clientY,level:sheetLevel(),height:sheetElement.getBoundingClientRect().height,vertical:false};
},true);
sheetElement.addEventListener('pointermove',e=>{
  const g=sheetGesture;if(!g||g.id!==e.pointerId)return;
  const dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(!g.vertical){
    if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){sheetGesture=null;return}
    if(Math.abs(dy)<8||Math.abs(dy)<Math.abs(dx))return;
    g.vertical=true;sheetElement.setPointerCapture(e.pointerId);sheetElement.classList.add('dragging');
    // Cancel any pending horizontal swipe before taking over its pointer.
    $('#carousel')?.onpointercancel?.(e);
  }
  e.preventDefault();e.stopPropagation();
  const levels=detentHeights(),low=levels[Math.max(0,g.level-1)],high=levels[Math.min(2,g.level+1)];
  sheetElement.style.height=Math.max(low,Math.min(high,g.height-dy))+'px';
},true);
function endSheetGesture(e){
  const g=sheetGesture;if(!g||g.id!==e.pointerId)return;sheetGesture=null;
  if(!g.vertical)return;
  e.preventDefault();e.stopPropagation();suppressSheetClickUntil=performance.now()+400;
  const dy=e.clientY-g.y,step=e.type==='pointercancel'||Math.abs(dy)<24?0:dy<0?1:-1;
  setSheetLevel(Math.max(0,Math.min(2,g.level+step)));
  if(sheetElement.hasPointerCapture(e.pointerId))sheetElement.releasePointerCapture(e.pointerId);
}
sheetElement.addEventListener('pointerup',endSheetGesture,true);
sheetElement.addEventListener('pointercancel',endSheetGesture,true);
sheetElement.addEventListener('click',e=>{if(performance.now()<suppressSheetClickUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
// Wheel/trackpad follows the same detents, without scrolling hidden content.
let lastSheetWheel=0;
sheetElement.addEventListener('wheel',e=>{if(e.target.closest('.route-stops-list,.day-schedule-scroll'))return;if(Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;e.preventDefault();const now=performance.now();if(now-lastSheetWheel<650||Math.abs(e.deltaY)<6)return;lastSheetWheel=now;setSheetLevel(Math.max(0,Math.min(2,sheetLevel()+(e.deltaY>0?1:-1))))},{passive:false});
window.addEventListener('resize',scheduleMapFit);

// Retain the scenario of a saved stop, so favorites work after changing address.
const savedStopContexts=new Map(initialFavoriteStops().map(name=>[name,{scenario:'familiar',layer:'bus',index:participantProfile.frequentStopIndex??0}])),toggleBeforeInteraction=toggleSet;
toggleSet=function(set,value){
  if(set===favStops){const i=stops().findIndex(s=>s.name===value);if(set.has(value))savedStopContexts.delete(value);else if(i>=0)savedStopContexts.set(value,{scenario,layer,index:i});}
  toggleBeforeInteraction(set,value);
};
function inSavedStop(context,callback){const before=[scenario,layer,selected];try{scenario=context.scenario;layer=context.layer;selected=context.index;return callback()}finally{[scenario,layer,selected]=before}}
function openSavedStop(context,routeId,departureKey){
  layer=context.layer;scenario=context.scenario;selected=context.index;renderHome();updateMap();
  if(trainStationContext())showStationBoard();else if(routeId===undefined)showStop();else showRoute(routes().findIndex(r=>r.id===routeId),departureKey);
  updatePins();if(routeId===undefined)drawWalk();fitSelectedStop();
}
let favoriteLastMarkup='';
showFavorites=function(){
  favoriteLastMarkup='';screen='favorites';
  page('Избранное','<div class="favorite-segments" aria-label="Разделы избранного"><span class="selected">Остановки</span><span>Маршруты</span></div><div id="favorite-stops"></div>');
  $('#overlay').className='favorites-screen';renderFavoriteStops();
};
function renderFavoriteStops(){
  const target=$('#favorite-stops');if(!target||screen!=='favorites')return;
  const entries=[...favStops].map(name=>({name,context:savedStopContexts.get(name)||{scenario,layer,index:Math.max(0,stops().findIndex(s=>s.name===name))}}));
  const markup=entries.length?entries.map(({name,context},index)=>inSavedStop(context,()=>{
    if(trainStationContext())return `<article class="favorite-stop-card"><button class="favorite-stop-heading" data-saved-stop="${index}"><span><strong>${esc(name)}</strong><small>Станция · Табло электричек</small></span>${uiAsset('favorite-chevron.svg','favorite-chevron')}</button>${stationDepartures().slice(0,2).map(r=>stationRunRow(r).replace('data-station-run=',`data-saved-stop="${index}" data-station-run=`)).join('')}</article>`;
    const s=currentStop(),rows=arrivalRows().slice(0,3).map(({r})=>r);
    const distance=s.meters>=1000?(s.meters/1000).toLocaleString('ru-RU',{maximumFractionDigits:1})+' км':s.meters+' м';
    return `<article class="favorite-stop-card"><button class="favorite-stop-heading" data-saved-stop="${index}"><span><strong>${esc(name)}</strong><small>${icon('locate',11)} ${distance} · Остановка</small></span>${uiAsset('favorite-chevron.svg','favorite-chevron')}</button>${rows.map(r=>`<button class="favorite-route" data-saved-stop="${index}" data-saved-route="${r.id}" data-saved-departure="${r.key||''}"><span class="mode-icon ${routeMode(r)}">${mode(routeMode(r),21)}</span><span class="route-info"><span class="route-num">${esc(r.n)}</span><span class="sub">${esc(r.to)}</span></span><span class="arrival ${r.delayActive?'scheduled-delay':r.scheduleOnly?'scheduled-time':''}">${arrivalMarkup(r)}</span></button>`).join('')}</article>`;
  })).join(''):'<div class="empty">'+icon('heart',40)+'<h2>Избранные остановки</h2><p>Нажмите на сердечко в карточке остановки</p></div>';
  if(markup===favoriteLastMarkup)return;favoriteLastMarkup=markup;target.innerHTML=markup;
  target.querySelectorAll('[data-saved-stop]').forEach(b=>b.onclick=()=>openSavedStop(entries[+b.dataset.savedStop].context,b.hasAttribute('data-saved-route')?+b.dataset.savedRoute:undefined,b.dataset.savedDeparture));
}
$('#favorites-open').onclick=showFavorites;
setInterval(renderFavoriteStops,1000);
syncSheet();requestAnimationFrame(()=>fitSelectedStop(false));
