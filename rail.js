'use strict';
// Station choices share one origin value with the single metro map pin.
const metroStations=[
  {name:'Пятницкое шоссе',line:'Арбатско-Покровская линия',badge:'3',color:'#007fc0',pos:[350,175]},
  {name:'Павелецкая',line:'Кольцевая линия',badge:'5',color:'#8d5034',pos:[1148,959]},
  {name:'Павшино',line:'МЦД-2',badge:'D2',color:'#ef3388',pos:[224,303]},
  {name:'Студенческая',line:'Филёвская линия',badge:'4А',color:'#2dc3e8',pos:[696,838]},
  {name:'Парк Победы',line:'Арбатско-Покровская линия',badge:'3',color:'#007fc0',pos:[545,921]},
  {name:'Парк Культуры',line:'Сокольническая линия',badge:'1',color:'#fa3e2c',note:'Ремонт эскалатора',pos:[808,955]},
  {name:'Студенческая',line:'Филёвская линия',badge:'4А',color:'#00985f',pos:[696,838]},
  {name:'Панфиловская',line:'Московское центральное кольцо',badge:'14',color:'#fa3e2c',pos:[637,467]}
];
const fullMetroPositions={'Сходненская':[720,620],'Митино':[530,620],'Строгино':[530,1085],'Сокол':[1064,910],'Спартак':[797,855],'Зеленоград — Крюково':[340,260],'Пятницкое шоссе':[530,500],'Павелецкая':[1739,1746],'Павшино':[340,700],'Студенческая':[989,1556],'Парк Победы':[819,1669],'Парк Культуры':[1233,1705],'Панфиловская':[958,955],'Красные Ворота':[1675,1266],'Октябрьская':[1378,1818],'Фрунзенская':[1173,1764]};
function metroStationPosition(name){if(nearestMetroContext()?.map){const s=nearestMetroContext(),p=fullMetroPositions[name];return p?p.map((v,i)=>v*s.schemeScale+s.schemeOffset[i]):s.pos;}return metroStations.find(s=>s.name.toLowerCase()===(name||'').toLowerCase())?.pos||({'Красные Ворота':[1115,663],'Октябрьская':[918,1017],'Фрунзенская':[780,981]}[name])||[808,955]}
const railIcon=(name,cls='')=>`<img src="assets/${name}?v=16" class="rail-icon ${cls}" alt="" draggable="false">`;
let metroField='to',trainField='to',trainDay=0,trainFilter=false;
function pickerField(field,active,value,kind){
  const from=field==='from',symbol=from?(kind==='train'?railIcon('train-active.svg'):railIcon('metro-active.svg')):railIcon('finish.png');
  return `<div class="station-field ${active?'editing':''}"><span class="station-field-symbol">${symbol}</span><label><small>${from?'Откуда':'Куда'}</small>${active?`<input id="station-input" aria-label="${from?'Станция отправления':'Станция назначения'}" placeholder="${kind==='metro'?'Выберите станцию':'Станция или город'}" autocomplete="off">`:`<button data-edit-field="${field}" aria-label="${from?'Откуда':'Куда'}: ${esc(value||'Выберите станцию')}">${esc(value||'Выберите станцию')}</button>`}</label></div>`;
}
showStationPicker=function(field){
  if(layer==='train'){showTrainSearch(field==='from');return}
  screen='metro-stations';metroField=field;
  page('',`<section class="metro-station-sheet"><div class="picker-handle"></div><div class="station-fields">${pickerField('from',field==='from',tripFrom||currentStop().name,'metro')}${pickerField('to',field==='to',tripTo,'metro')}<button id="station-close" aria-label="Закрыть выбор станции">${icon('close',18)}</button></div><div id="metro-station-list"></div></section>`);
  $('#overlay').className='metro-stations-screen';$('#station-close').onclick=renderHome;
  $$('[data-edit-field]').forEach(b=>b.onclick=()=>showStationPicker(b.dataset.editField));
  $('#station-input').oninput=renderMetroStations;renderMetroStations();
};
function renderMetroStations(){
  const q=$('#station-input').value.trim().toLowerCase(),items=(nearestMetroContext()?.map?[nearestMetroContext(),...metroStations]:metroStations).filter(s=>!q||`${s.name} ${s.line}`.toLowerCase().includes(q));
  $('#metro-station-list').innerHTML=items.map((s,i)=>`<button class="metro-station-row" data-metro-station="${i}"><span class="line-badge" style="background:${s.color}">${s.badge}</span><span><span>${s.name}</span><small>${s.line}${s.note?` · <em>${s.note}</em>`:''}</small></span></button>`).join('')||'<p class="orders-label">Станция не найдена</p>';
  $$('[data-metro-station]').forEach(b=>b.onclick=()=>{const s=items[+b.dataset.metroStation];$('#station-input').blur();if(metroField==='from'){tripFrom=s.name;selected=0}else tripTo=s.name;renderHome();updateMap();syncKeyboardViewport()});
}

// The two train fields open the same picker with the requested field focused.
showTrainSearch=function(editingOrigin=false){
  screen='train-search';ticketType='train';trainField=editingOrigin?'from':'to';
  page('Маршрут',`<div class="rail-search-fields">${pickerField('from',editingOrigin,trainOrigin,'train')}${pickerField('to',!editingOrigin,trainDestination,'train')}<button id="rail-swap" aria-label="Поменять станции местами">${railIcon('swap.png')}</button></div><div id="rail-station-list"></div>`);
  $('#overlay').className='rail-search-screen';$$('[data-edit-field]').forEach(b=>b.onclick=()=>showTrainSearch(b.dataset.editField==='from'));
  $('#rail-swap').onclick=()=>{[trainOrigin,trainDestination]=[trainDestination,trainOrigin];showTrainSearch(editingOrigin)};
  $('#station-input').oninput=renderRailStations;renderRailStations();$('#station-input').focus();
};
function renderRailStations(){
  const q=$('#station-input').value.trim().toLowerCase(),names=(trainStationContext()?[...new Set([trainStationContext().name,...trainStationContext().departures.flatMap(r=>[r.from,r.to])])]:['Аэропорт Шереметьево','Москва (все вокзалы)','Аэропорт Домодедово','Белорусский вокзал','Одинцово']).filter(n=>!q||n.toLowerCase().includes(q));
  $('#rail-station-list').innerHTML=names.map((n,i)=>`<button class="rail-station-row" data-rail-station="${i}"><span>${n.startsWith('Аэропорт')?railIcon('airport.svg'):railIcon('train-active.svg')}</span><span>${n}</span></button>`).join('')||'<p class="orders-label">Станция не найдена</p>';
  $$('[data-rail-station]').forEach(b=>b.onclick=()=>{const n=names[+b.dataset.railStation];$('#station-input').blur();if(trainField==='from'){trainOrigin=n;tripFrom=n;showTrainSearch(false)}else{trainDestination=n;tripTo=n;showTrainSchedule()}syncKeyboardViewport()});
}
function scheduleField(value,field){return `<button class="schedule-field" data-schedule-field="${field}">${railIcon('train-active.svg')}<span>${esc(value)}</span></button>`}
const trainDepartures=[['04:27','05:02',6101,'2'],['04:30','05:08',6103,'2'],['04:45','05:23',6105,'5'],['04:52','05:30',6107,'2']];
showTrainSchedule=function(){
  screen='train-schedule';
  page('Расписание',`<div class="rail-local-time">Указано местное время</div><button id="rail-refresh" aria-label="Обновить расписание">${railIcon('refresh.svg')}</button><div class="schedule-fields">${scheduleField(trainOrigin,'from')}${scheduleField(trainDestination,'to')}<button id="schedule-swap" aria-label="Поменять станции местами">${railIcon('swap.png')}</button></div><div class="rail-filters"><button id="rail-day">${trainDay?'Завтра':'Сегодня'}</button><button id="rail-filter">${trainFilter?'Стандарт плюс':'Все поезда'}</button></div><div class="rail-results">${trainDepartures.map(([start,end,id,platform],i)=>{const minutes=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};return `<article class="rail-result"><div class="rail-times"><div><strong>${start}</strong><small>13 путь</small></div><span>${minutes(end)-minutes(start)} мин</span><div><strong>${end}</strong><small>${platform} путь</small></div></div><div class="rail-track" aria-hidden="true"><span></span></div><div class="rail-result-footer"><div><b>Стандарт плюс</b><small>№${id}, ${esc(trainOrigin)} → ${esc(trainDestination)}</small></div><button data-rail-buy="${i}">124₽</button></div></article>`}).join('')}</div>`,()=>showTrainSearch(false));
  $('#overlay').className='rail-schedule-screen';
  $('#rail-refresh').onclick=showTrainSchedule;$('#rail-day').onclick=()=>{trainDay=1-trainDay;showTrainSchedule()};$('#rail-filter').onclick=()=>{trainFilter=!trainFilter;showTrainSchedule()};
  $('#schedule-swap').onclick=()=>{[trainOrigin,trainDestination]=[trainDestination,trainOrigin];[tripFrom,tripTo]=[trainOrigin,trainDestination];showTrainSchedule()};
  $$('[data-schedule-field]').forEach(b=>b.onclick=()=>showTrainSearch(b.dataset.scheduleField==='from'));
  $$('[data-rail-buy]').forEach(b=>b.onclick=()=>{railSelectedDeparture=+b.dataset.railBuy;railTicketQuantity=1;showTrainCheckout()});
};
// The layer button's inactive export includes 50% fills; the active export
// removes only that opacity, retaining the train windows and geometry.
// mode is a shared const; replace the train image at its existing callsites.
const railHomeBefore=renderHome;
renderHome=function(){railHomeBefore();const train=$('.layer-switch [data-layer="train"] img');if(train)train.src='assets/train-active.svg?v=16';if(layer==='train'&&$('#swap'))$('#swap').onclick=()=>{[tripFrom,tripTo]=[tripTo,tripFrom];if(tripFrom)trainOrigin=tripFrom;if(tripTo)trainDestination=tripTo;renderHome()};};
$('#search-open').onclick=showSearch;$('#origin').onclick=showOrigins;
renderHome();updateMap();

// Checkout reuses the selected route and departure from the schedule.
let railSelectedDeparture=0,railTicketQuantity=1,railPayment=0;
const railFare=124;
const railPayAsset=name=>`<img src="assets/rail-pay-${name}.svg" alt="" draggable="false">`;
showTrainCheckout=function(){
  ticketType='train';screen='checkout';
  const validFrom=new Date();validFrom.setDate(validFrom.getDate()+trainDay);
  const validUntil=new Date(validFrom);validUntil.setDate(validUntil.getDate()+1);
  const dateLabel=d=>d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'});
  const upcoming=trainDepartures.slice(railSelectedDeparture).map(d=>d[0]).slice(0,3).join(', ');
  const cards=[['alfa','· 1006','Карта 1006','visa'],['plus-card','Карта Плюса','Карта Плюса',null],['tbank','· 2366','Карта 2366','mastercard']];
  page('',`<div class="rail-checkout-scroll"><section class="rail-ticket-info"><div class="rail-checkout-heading"><span>${railPayAsset('train-spot')}</span><div><h1>Электричка</h1><p>Скоро ${upcoming}${railSelectedDeparture<2?', …':''}</p></div></div><div class="rail-ticket-details"><div class="rail-ticket-route"><small>Маршрут</small><p>${esc(trainOrigin)} → ${esc(trainDestination)}</p></div><div class="rail-ticket-validity"><div><small>Действует с</small><p>${dateLabel(validFrom)}</p></div><div><small>До</small><p>${dateLabel(validUntil)} до 02:43</p></div></div><button class="rail-ticket-tariff" id="rail-tariff"><span><strong>Стандарт плюс</strong><small>Действует на «РЭКС», «Спутник», «Скорый», обычные электрички, гибридные фирменные экспрессы</small></span>${railPayAsset('chevron')}</button></div><div class="rail-ticket-quantity"><span>Количество билетов</span><div><button id="rail-qty-minus" aria-label="Уменьшить количество" ${railTicketQuantity===1?'disabled':''}>−</button><output id="rail-quantity" aria-live="polite">${railTicketQuantity}</output><button id="rail-qty-plus" aria-label="Увеличить количество" ${railTicketQuantity===6?'disabled':''}>+</button></div></div></section><section class="rail-payment-section"><h2>Способы оплаты</h2><div class="rail-payment-cards">${cards.map(([logo,label,name,brand],i)=>`<button class="rail-payment-card ${railPayment===i?'active':''}" data-rail-payment="${i}" aria-pressed="${railPayment===i}" aria-label="${name}"><span class="rail-bank-logo">${railPayAsset(logo)}</span><span class="rail-bank-bottom"><span>${label}</span>${brand?railPayAsset(brand):''}</span>${i===1?`<span class="rail-plus-badge">${railPayAsset('plus')}<span>123</span></span>`:''}</button>`).join('')}<button class="rail-payment-card rail-add-card" id="rail-add-card" aria-label="Добавить карту"><span class="rail-bank-logo">${railPayAsset('add-card')}</span><span class="rail-bank-bottom">Добавить<br>карту</span></button></div><button class="rail-payment-cashback" id="rail-cashback">${railPayAsset('yandex')}<span><strong>Кешбэк 10% на поездку</strong><small>Платите картой Яндекс Пэй</small></span>${railPayAsset('chevron')}</button></section><p class="rail-payment-terms">Продолжая, вы соглашаетесь с <u>Правилами покупки</u> и <u>Условиями сервиса</u></p></div><div class="rail-pay-footer"><strong id="rail-pay-total">${railFare*railTicketQuantity} ₽</strong><button class="primary" id="pay">Оплатить</button></div>`,showTrainSchedule);
  $('#overlay').className='train-checkout rail-checkout';$('#page-back').innerHTML=railPayAsset('back');
  const updateQuantity=delta=>{railTicketQuantity=Math.max(1,Math.min(6,railTicketQuantity+delta));$('#rail-quantity').textContent=railTicketQuantity;$('#rail-pay-total').textContent=`${railFare*railTicketQuantity} ₽`;$('#rail-qty-minus').disabled=railTicketQuantity===1;$('#rail-qty-plus').disabled=railTicketQuantity===6};
  $('#rail-qty-minus').onclick=()=>updateQuantity(-1);$('#rail-qty-plus').onclick=()=>updateQuantity(1);
  const selectPayment=i=>{railPayment=i;$$('[data-rail-payment]').forEach(b=>{const active=+b.dataset.railPayment===i;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})};
  $$('[data-rail-payment]').forEach(b=>b.onclick=()=>selectPayment(+b.dataset.railPayment));$('#rail-cashback').onclick=()=>selectPayment(1);
  $('#rail-add-card').onclick=()=>toast('Для исследования доступны три демонстрационные карты');
  $('#rail-tariff').onclick=()=>toast('Стандарт плюс: РЭКС, Спутник, Скорый и обычные электрички');
  $('#pay').onclick=()=>{const t={type:'train',product:'single',origin:trainOrigin,destination:trainDestination,quantity:railTicketQuantity,unitPrice:railFare,total:railFare*railTicketQuantity,departure:trainDepartures[railSelectedDeparture][0],validFrom:validFrom.toISOString(),validUntil:new Date(validUntil.setHours(2,43,0,0)).toISOString(),tariff:'Стандарт плюс',payment:railPayment,id:Date.now()};purchased.unshift(t);showSuccess(t)};
};
