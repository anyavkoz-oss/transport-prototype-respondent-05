'use strict';
const goAsset=name=>`<img src="assets/${name}" alt="" draggable="false">`;
const homeBeforeGo=renderHome;
renderHome=function(){
  $('#go-home')?.remove();$('#transport-home-back')?.remove();
  homeBeforeGo();
  $('#app').insertAdjacentHTML('beforeend',`<button id="transport-home-back" class="round" aria-label="На главную Go">${icon('back',24)}</button>`);
  $('#transport-home-back').onclick=showGoHome;
};
function enterTransport(nextLayer='bus'){
  layer=nextLayer;selected=0;expanded=false;collapsed=false;renderHome();updateMap();
}
function showGoHome(){
  renderHome();screen='go-home';
  const app=$('#app');
  [...app.children].forEach(el=>{if(el.id!=='toast'&&el.id!=='research-entry'){el.inert=true;el.setAttribute('aria-hidden','true')}});
  const service=(index,label,extra='',cls='')=>`<div class="go-service"><span class="go-service-art ${cls}">${goAsset('go-service-'+index+'.png')}</span><span>${label}${extra?`<small> · ${extra}</small>`:''}</span></div>`;
  app.insertAdjacentHTML('beforeend',`<section id="go-home" aria-label="Главная Go"><div class="go-toolbar">${goAsset('go-logo.svg')}<div class="go-toolbar-right"><div class="go-widgets"><span>${goAsset('go-yandex.svg')}</span><span>${goAsset('go-split-exact.png')}</span><span>${goAsset('go-plus.svg')}</span></div><span class="go-menu">${goAsset('go-menu.svg')}</span></div></div><div class="go-nav"><div class="go-main-services">${service(0,'Рестораны')}${service(2,'Самокаты и велики','','scooter')}${service(1,'Лавка')}${service(3,'Такси','от 6 мин')}</div><div class="go-small-services"><button class="go-service" id="go-transport"><span class="go-service-art">${goAsset('go-service-4.png')}</span><span>Транспорт</span></button>${service(5,'Доставка')}${service(6,'Маркет')}${service(7,'Моё авто')}${service(8,'Драйв','','drive')}</div><div class="go-pagination" aria-hidden="true"><i></i><i></i></div></div><div class="go-shortcuts"><button id="go-find" class="go-find">Найти в Go</button><button class="go-shortcut" id="go-yandex"><span>${goAsset('go-pin.svg')}</span><span>${participantProfile?'Моё место':'Яндекс'}<small>${esc(config.familiar)}</small></span></button><button class="go-shortcut" id="go-metro"><span>${goAsset('go-metro-exact.png')}</span><span>Библиотека им. Ленина<small>Станция метро · Библиотека им. Ленина</small></span></button></div><div class="go-feed"><article><div class="go-product-photo">${goAsset('go-cheese.png')}</div><div class="go-product-copy">Ванильный сырок<small>Лавка</small></div></article><article><div class="go-product-photo">${goAsset('go-watermelon.png')}</div><div class="go-product-copy">Арбуз<small>Лавка</small></div></article></div></section>`);
  $('#go-transport').onclick=()=>enterTransport();
  $('#go-find').onclick=()=>{enterTransport();showSearch()};
  $('#go-yandex').onclick=()=>{scenario='familiar';enterTransport()};
  $('#go-metro').onclick=()=>{tripFrom='Библиотека им. Ленина';tripTo='';enterTransport('metro')};
}
// Research setup remains accessible through its existing dedicated link.
// All participant links begin at the shared transport entry, including older deep links.
if(!researcher)showGoHome();
