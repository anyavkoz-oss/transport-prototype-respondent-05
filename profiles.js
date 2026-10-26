'use strict';
// One data profile per research link. No account, tracking, or cross-profile storage.
const participantProfiles={
  '01':{
    // Future profiles inherit a scheduled service that becomes briefly delayed.
    scheduleDelay:{serviceId:0},
    label:'Участник 01',city:'Санкт-Петербург',address:'Улица Маркина, 16А',
    favoriteStop:'Улица Воскова',map:'participant-01-map.png',mapSize:[1828,1440],
    origin:[1145,476],stopNames:['Улица Воскова','Введенская улица','Улица Шамшева'],
    platforms:[[789,625],[806,786],[446,223]],
    walks:[
      [[1145,476],[1122,449],[1070,508],[1005,581],[938,647],[881,697],[791,681],[789,625]],
      [[1145,476],[1122,449],[1070,508],[1005,581],[938,647],[881,697],[804,738],[806,786]],
      [[1145,476],[1122,449],[1180,377],[984,288],[923,329],[815,324],[800,344],[632,325],[462,304],[446,223]]
    ],
    // Geometry is registered to the supplied map; walking/arrival times are fixtures.
    meters:[410,480,670],
    services:[
      {n:'14',to:'метро Выборгская',stop:0,first:95,gap:480},
      {n:'230',to:'станции Пискарёвка',stop:0,first:35,gap:660},
      ...[['10','Крестовского острова'],['14','Крестовского острова'],['25','метро Чёрная речка'],['128','сквера Столыпина'],['227','Арцеуловской аллеи'],['249','станции Ручьи'],['275','улицы Жени Егоровой']].map(([n,to],i)=>({n,to,stop:1,first:60+i*65,gap:600+i*30})),
      ...[['10','Балтийского вокзала'],['14','метро Выборгская'],['25','Крестовского острова'],['128','Наличной улицы'],['185','метро Чкаловская'],['227','Крестовского острова'],['230','Уральской улицы'],['249','метро Приморская'],['275','метро Василеостровская']].map(([n,to],i)=>({n,to,stop:2,first:45+i*55,gap:600+i*30}))
    ],
    roadPaths:[
      [[755,1440],[780,1050],[793,880],[789,625],[803,350],[821,0]],
      [[800,0],[785,350],[778,620],[781,786],[768,880],[744,1440]],
      [[483,0],[462,125],[446,223],[445,400],[445,680],[438,1440]]
    ],
    sources:[
      'https://yandex.ru/maps/2/saint-petersburg/stops/4678552723/',
      'https://yandex.ru/maps/2/saint-petersburg/stops/stop__10066439/',
      'https://yandex.ru/maps/2/saint-petersburg/stops/stop__10077284/'
    ]
  }
};
// Respondent 1 has an isolated pair of locations; arrival times remain research fixtures.
participantProfiles['respondent-01']={
  label:'Респондент 1',city:'Зеленоград',address:'Зеленоград, к1126',restrictAddresses:true,
  favoriteStop:'Московская государственная академия делового администрирования',favoriteByDefault:false,frequentStopIndex:1,rowPreviewFrequentStops:[0],
  map:'respondent-01-zelenograd-map.png',mapSize:[1850,1502],origin:[888,110],
  mapExtension:{file:'respondent-01-zelenograd-extension.svg',bounds:[[-1800,-1600],[3800,3100]]},
  stopNames:['Улица Болдов Ручей','Московская государственная академия делового администрирования','Филаретовская улица'],
  stopShortNames:['Улица Болдов Ручей',null,'Филаретовская улица'],platforms:[[1380,465],[625,1010],[1785,1185]],
  walks:[
    [[888,110],[888,220],[1015,247],[1175,320],[1340,350],[1370,410],[1380,465]],
    [[888,110],[850,172],[790,240],[710,320],[650,550],[680,700],[730,950],[625,1010]],
    [[888,110],[888,220],[1015,247],[1175,320],[1340,350],[1370,410],[1380,465],[1400,650],[1440,880],[1460,1145],[1680,1160],[1785,1185]]
  ],meters:[400,650,1000],
  services:[
    {n:'4',to:'улицы Болдов Ручей',stop:0,first:35,gap:105,scheduleOnly:false},
    {n:'4',to:'улицы Болдов Ручей',stop:0,first:170,gap:180,scheduleOnly:true},
    {n:'4',to:'улицы Болдов Ручей',stop:1,first:45,gap:150,scheduleOnly:false},
    {n:'9',to:'МЦД Зеленоград-Крюково',stop:1,first:110,gap:180,scheduleOnly:false},
    {n:'9',to:'МЦД Зеленоград-Крюково',stop:1,first:180,gap:180,scheduleOnly:true},
    {n:'11',to:'Северной',stop:2,first:45,gap:150,scheduleOnly:false},
    {n:'29',to:'МЦД Зеленоград-Крюково · 8A',stop:2,first:110,gap:180,scheduleOnly:false},
    {n:'11',to:'Северной',stop:2,first:180,gap:180,scheduleOnly:true}
  ],
  stopWaypoints:[3,3,3],roadPaths:[
    [[1460,1180],[1440,880],[1400,650],[1380,465],[1370,370],[1450,220],[1640,0]],
    [[0,1370],[200,1260],[450,1120],[625,1010],[800,990],[1150,1100],[1460,1180],[1850,1190]],
    [[625,1010],[1150,1100],[1510,1170],[1785,1185],[1950,1190],[2100,1250]]
  ],sources:['https://yandex.ru/maps/213/moscow/stops/stop__9650012/','https://yandex.ru/maps/213/moscow/stops/stop__9650010/','https://yandex.ru/maps/213/moscow/stops/stop__9650068/'],
  alternate:{
    city:'Заречье, Московская область',address:'Торговая улица, с2',frequentStopIndex:-1,pinBelowStops:[0],
    nearestMetro:{name:'Говорово',line:'Солнцевская линия',badge:'8А',color:'#ffc61a',pos:[548.93,1132.994],source:'https://yandex.com/maps/org/gudrufing_krovlya_fasady/1134625903/?lang=ru'},
    map:'respondent-01-zarechye-map.png',mapSize:[2758,1482],origin:[2010,720],
    stopNames:['Торговый центр','Заречье-парк · к Яблоневому саду','Заречье-парк · к метро Кунцевская'],
    stopShortNames:['Торговый центр','Заречье-парк','Заречье-парк'],
    stopHints:['','',''],
    platforms:[[2054,783],[997,715],[892,609]],
    walks:[
      [[2010,720],[2010,758],[2054,783]],
      [[2010,720],[2010,758],[1820,815],[1640,850],[1560,915],[1350,800],[1100,720],[997,715]],
      [[2010,720],[2010,758],[1820,815],[1640,850],[1560,915],[1350,800],[1100,720],[997,715],[940,660],[892,609]]
    ],meters:[70,540,560],
    services:[
      {n:'205',to:'Яблоневого сада',stop:0,first:35,gap:120,scheduleOnly:false},
      {n:'205',to:'метро Кунцевская',stop:0,first:105,gap:180,scheduleOnly:false},
      {n:'205',to:'Яблоневого сада',stop:0,first:170,gap:180,scheduleOnly:true},
      {n:'205',to:'Яблоневого сада',stop:1,first:35,gap:150,scheduleOnly:false},
      {n:'Sk3',to:'метро Говорово',stop:1,first:105,gap:180,scheduleOnly:false},
      {n:'205',to:'Яблоневого сада',stop:1,first:170,gap:180,scheduleOnly:true},
      {n:'205',to:'метро Кунцевская',stop:2,first:40,gap:150,scheduleOnly:false},
      {n:'Sk3',to:'ТМК',stop:2,first:110,gap:180,scheduleOnly:false},
      {n:'205',to:'метро Кунцевская',stop:2,first:175,gap:180,scheduleOnly:true}
    ],stopWaypoints:[3,3,3],roadPaths:[
      [[1450,965],[1640,850],[1820,815],[2054,783],[2170,760],[2220,620],[2190,400]],
      [[0,540],[400,570],[750,645],[997,715],[1300,805],[1580,950],[1750,1130]],
      [[1750,1110],[1430,850],[1130,690],[892,609],[550,535],[0,500]]
    ],
    sources:["https://yandex.ru/maps/21653/zarech'e/stops/stop__9650492/","https://yandex.ru/maps/21653/zarech'e/stops/6113272335/","https://yandex.ru/maps/21653/zarech'e/stops/6924743814/"]
  }
};
// Torgovaya detail cards from the participant's 21 October screenshots.
// Arrival-board services/directions remain separate from these route details.
{
  const p=participantProfiles['respondent-01'].alternate;
  for(const r of p.services){
    if(r.n==='205'&&r.to==='Яблоневого сада'){
      r.routeHeading=['Метро Кунцевская · 1А_1В','Яблоневый сад'];
      r.routeOverview=[{name:'Метро Кунцевская · 1А_1В'},{skipped:20},{name:'Заречье-парк'},
        {name:'Торговый центр',minute:0},{name:'Апелляционный суд',minute:3},{skipped:5},
        {name:'МЦД Аминьевская · 2А',minute:11},{name:'Яблоневый сад',minute:13}];
    }else if(r.n==='205'){
      r.routeHeading=['Яблоневый сад','Метро Кунцевская · 1С'];
      r.routeOverview=[{name:'Яблоневый сад'},{name:'Метро Аминьевская · 3А'},{name:'ТЭЦ № 25'},
        {name:'Стройуправление ТЭЦ № 25'},{name:'Промзона Очаково'},{name:'Апелляционный суд'},
        {name:'Торговый центр'},{name:'Заречье-парк'},{skipped:18},
        {name:'МЦД Кунцевская · 7А'},{name:'Метро Кунцевская · 1С'}];
    }else if(r.n==='Sk3'&&r.to==='ТМК'){
      r.routeHeading=['Метро Говорово · 1А','ТМК'];
      r.routeOverview=[{name:'Метро Говорово · 1А'},{skipped:11},{name:'Княжеская улица'},
        {name:'Заречье-парк',minute:0},{name:'Каштановая улица',minute:2},{skipped:16},
        {name:'Школа СКОЛКА'},{name:'ТМК'}];
    }else if(r.n==='Sk3'){
      r.routeHeading=['Сибур','Метро Говорово · 1В'];
      r.routeOverview=[{name:'Сибур'},{skipped:18},{name:'Каштановая улица'},{name:'Заречье-парк'},
        {name:'Княжеская улица'},{skipped:8},{name:'Улица 50 лет Октября'},{name:'Метро Говорово · 1В'}];
    }
    for(const item of r.routeOverview||[])item.current=item.name===p.stopShortNames[r.stop];
  }
}
// Respondent 2: source route numbers/directions, simulated research arrivals.
// Geometry uses the wider supplied screenshots, with enough surrounding map for swipes.
participantProfiles['respondent-02']={
  label:'Респондент 2',city:'Москва',address:'Волоколамское шоссе, 75АкА9',restrictAddresses:true,
  nearestMetro:{name:'Спартак',line:'Таганско-Краснопресненская линия',badge:'7',color:'#8e479b',pos:[632.846,496.89],map:'metro-moscow-vector.svg',mapSize:[2038,1594],schemeScale:.518,schemeOffset:[220,54]},
  trainStation:{name:'Тушинская',map:'respondent-02-tushinskaya-map.png',mapSize:[2650,1780],pos:[2158,617],origin:[811,816],originDotRadius:17,source:'https://yandex.ru/maps/213/moscow/stops/station__lh_9600741/',
    departures:[
      {number:'7248/7247',name:'Электричка',from:'Подольск',to:'Нахабино',sourceTime:'20:28',offset:3},
      {number:'7360/7359',name:'Электричка',from:'Нахабино',to:'Подольск',sourceTime:'20:31',offset:6},
      {number:'6212/6211',name:'Электричка',from:'Шарапова Охота',to:'Дедовск',sourceTime:'20:34',offset:9}
    ]},
  routeHeadings:{'с348':['Метро Тушинская · 5А','Улица Фабрициуса','Метро Тушинская · 4В']},
  favoriteStop:'Чкаловский бульвар',favoriteByDefault:false,frequentStopIndex:0,
  map:'respondent-02-spartak-map.png',mapSize:[2748,1488],origin:[1165,410],
  stopNames:['Чкаловский бульвар','Небесный бульвар','Небесный бульвар · у Чкаловского бульвара'],
  stopShortNames:['Чкаловский бульвар','Небесный бульвар','Небесный бульвар'],
  stopHints:['','','У Чкаловского бульвара'],
  platforms:[[1626,970],[1208,718],[1546,754]],
  walks:[
    [[1165,410],[1150,445],[1180,520],[1205,600],[1250,665],[1390,725],[1590,780],[1610,870],[1626,970]],
    [[1165,410],[1150,445],[1180,520],[1205,600],[1185,655],[1208,718]],
    [[1165,410],[1150,445],[1180,520],[1205,600],[1250,665],[1390,725],[1546,754]]
  ],meters:[650,280,480],
  services:[0,1,2].flatMap(stop=>[
    {n:'с348',to:'улицы Фабрициуса',stop,first:35+stop*10,gap:115,scheduleOnly:false},
    {n:'с348',to:'улицы Фабрициуса',stop,first:175+stop*10,gap:180,scheduleOnly:true}
  ]),stopWaypoints:[3,3,3],roadPaths:[
    [[1635,1488],[1630,1295],[1628,1120],[1626,970],[1618,840],[1610,780],[1430,745],[1260,670],[1190,570],[1150,440],[1100,250]],
    [[1626,970],[1610,780],[1390,755],[1208,718],[1180,620],[1150,440],[1100,250],[1000,200]],
    [[1150,440],[1200,660],[1390,735],[1546,754],[1620,760],[1650,650],[1660,400],[1630,0]]
  ],sources:[
    'https://yandex.ru/maps/213/moscow/stops/4278543769/',
    'https://yandex.ru/maps/213/moscow/stops/4304222108/',
    'https://yandex.ru/maps/213/moscow/stops/4286895719/'
  ],
  alternate:{
    city:'Москва',address:'1-й Кожевнический переулок, 8',frequentStopIndex:-1,
    nearestMetro:{name:'Павелецкая',line:'Замоскворецкая линия',badge:'2',color:'#48b85e',pos:[1120.802,958.428]},
    map:'respondent-02-kozhevnicheskaya-map.png',mapSize:[2000,1462],origin:[818,993],
    stopNames:['Кожевническая улица','Кожевническая улица · обратное направление','Новоспасский мост'],
    stopShortNames:['Кожевническая улица','Кожевническая улица','Новоспасский мост'],
    stopHints:['Автобусы и трамваи','Обратное направление','Автобусы и трамваи'],mixedStops:[0,1,2],
    platforms:[[490,805],[350,795],[910,792]],
    walks:[
      [[818,993],[820,960],[760,960],[735,920],[720,820],[650,820],[550,820],[490,805]],
      [[818,993],[820,960],[760,960],[735,920],[720,820],[550,820],[470,820],[450,782],[350,795]],
      [[818,993],[820,960],[760,960],[735,920],[720,820],[840,816],[910,792]]
    ],meters:[390,470,420],
    services:[0,1,2].flatMap(stop=>[
      {n:'А',mode:'tram',to:stop===1?'метро Чистые пруды':'МЦД Калитники',stop,first:35,gap:180,scheduleOnly:false},
      {n:'913',to:'метро Павелецкая',stop,first:95,gap:180,scheduleOnly:false},
      {n:'с932',to:'метро Тульская',stop,first:175,gap:210,scheduleOnly:true},
      {n:'38',mode:'tram',to:stop===1?'Черёмушек':'ДК Компрессор',stop,first:140,gap:240,scheduleOnly:false},
      {n:'с932',to:'метро Тульская',stop,first:220,gap:240,scheduleOnly:false}
    ]),stopWaypoints:[3,3,3],roadPaths:[
      [[0,794],[170,799],[350,802],[490,805],[710,802],[910,792],[960,815],[970,865],[1010,910],[1055,895],[1140,750],[1290,550],[1480,300]],
      [[1480,300],[1140,750],[910,790],[350,795],[170,790],[0,786]],
      [[0,794],[350,802],[650,802],[910,792],[960,815],[970,865],[1010,910],[1055,895],[1140,750],[1290,550],[1480,300]]
    ],sources:[
      'https://yandex.ru/maps/213/moscow/stops/stop__9645613/',
      'https://yandex.ru/maps/213/moscow/stops/stop__9645566/',
      'https://yandex.ru/maps/213/moscow/stops/stop__9645890/'
    ]
  }
};
// Full loop, including the 25 intermediate stops collapsed in the reference.
// Stop order: https://kudikina.ru/msk/bus/s348_2/A (checked 21 October 2026).
{
  const p=participantProfiles['respondent-02'];
  const fullItinerary=[
    'Метро Тушинская · 5А','Лётная улица','Небесный бульвар','Чкаловский бульвар','Аэроклубная улица',
    'Метро Спартак · 2А','Стадион Спартак · 1В','Улица Братьев Старостиных','Метро Тушинская · 5F',
    'Клуб имени Чкалова','Канал имени Москвы','Тушинская улица','Улица Циолковского','Улица Мещерякова',
    'Восточный мост','Культурный центр «Салют»','Улица Фабрициуса','Бассейн','Клуб «Бригантина»',
    'Восточный мост','Улица Мещерякова','Улица Циолковского','Тушинская улица','Канал имени Москвы',
    'Клуб имени Чкалова','Метро Тушинская · 5E','Лётная улица','Стадион Спартак · 1А',
    'Метро Спартак · 4А','Аэроклубная улица','Небесный бульвар','Метро Тушинская · 4В'
  ];
  for(const r of p.services){
    if(r.n!=='с348')continue;
    r.fullItinerary=fullItinerary;r.itineraryIndex=[3,2,30][r.stop];
  }
}
// Updated participant screenshots, 20 October 2026: the map is supplied without
// stop symbols; all stop pins and route geometry are registered to this image.
{
  const p=participantProfiles['respondent-02'].alternate;
  p.map='respondent-02-kozhevnicheskaya-retouched.png';p.mapSize=[3076,2492];p.groupStopRoutes=true;
  // Similarity transform from the two unchanged river-pier symbols in both maps.
  const dx=724,dy=701,tx=1238,ty=1249.5;
  const a=(tx*dx+ty*dy)/(dx*dx+dy*dy),b=(ty*dx-tx*dy)/(dx*dx+dy*dy);
  const register=([x,y])=>[+(1647.5+a*(x-983)-b*(y-383)).toFixed(2),+(236.5+b*(x-983)+a*(y-383)).toFixed(2)];
  p.origin=register(p.origin);p.platforms=p.platforms.map(register);
  p.walks=p.walks.map(path=>path.map(register));p.roadPaths=p.roadPaths.map(path=>path.map(register));
  p.routeHeadings={
    '913':['3-й Павелецкий проезд','Метро Павелецкая · 2А','3-й Павелецкий проезд'],
    'с932':['3-й Павелецкий проезд','Метро Тульская, северный вход · 2С','3-й Павелецкий проезд'],
    'А':['Метро Чистые пруды · 1А','МЦД Калитники · 1А'],
    '38':['Черёмушки','Дом культуры Компрессор']
  };
  // Latest Kozhevnicheskaya snapshot; Novospassky has westbound trams.
  const directions=stop=>({
    '913':'Метро Павелецкая · 2А',
    'с932':'Метро Тульская, северный вход · 2С',
    'А':stop===0?'МЦД Калитники · 1А':'Метро Чистые пруды · 1А',
    '38':stop===0?'Дом культуры Компрессор':'Черёмушки'
  });
  const arrivalMinutes=[{'913':[3,9,21],'А':[8,16,35],'38':[9,27,48],'с932':[12]},
    {'913':[5,12,25],'А':[2,12,20],'38':[2,13,52],'с932':[16]},
    {'913':[4,14,23],'38':[5,14,28],'А':[8,24,33],'с932':[13]}];
  for(const r of p.services){
    r.to=directions(r.stop)[r.n];r.directionLabel=`до «${r.to}»`;
    const times=arrivalMinutes[r.stop][r.n];
    if(times){r.first=times[0]*60;r.gap=((times[1]||times[0]+20)-times[0])*60;r.sourceArrivals=times;}
    // Detail-only data transcribed from the 21 October screenshots. Keep the
    // arrival boards above unchanged; retain the source's collapsed sections.
    const overview={
      '38':[{name:'Черёмушки'},{skipped:20},{name:'Павелецкий вокзал · 3А'},
        {name:'Кожевническая улица'},{name:'Новоспасский мост'},{skipped:12},
        {name:'Метро Авиамоторная · 10В'},{name:'Дом культуры Компрессор'}],
      '913':[{name:'3-й Павелецкий проезд'},{skipped:11},{name:'Павелецкий вокзал · 3А'},
        {name:'Кожевническая улица',minute:0},{name:'Новоспасский мост',minute:1},{skipped:7},
        {name:'3-й Павелецкий проезд, 7',minute:10},{name:'3-й Павелецкий проезд',minute:11}],
      'А':[{name:'Метро Чистые пруды · 1А'},{skipped:10},{name:'Павелецкий вокзал · 3А'},
        {name:'Кожевническая улица'},{name:'Новоспасский мост'},{skipped:7},
        {name:'Октябрьское трамвайное депо'},{name:'МЦД Калитники · 1А'}],
      'с932':[{name:'3-й Павелецкий проезд'},{skipped:35},{name:'Павелецкий вокзал · 3А'},
        {name:'Кожевническая улица',minute:0},{name:'Новоспасский мост',minute:1},{skipped:7},
        {name:'3-й Павелецкий проезд, 7'},{name:'3-й Павелецкий проезд'}]
    };
    r.routeOverview=overview[r.n];
    // Other platforms use the matching travel direction, with their own current stop.
    if(r.mode==='tram'&&r.stop!==0){
      r.routeOverview.reverse();
      r.routeHeading=p.routeHeadings[r.n].slice().reverse();
    }
    const current=r.stop===2?'Новоспасский мост':'Кожевническая улица';
    r.routeOverview=r.routeOverview.map(item=>({...item,...(item.name===current?{current:true}:{})}));
    // Reverse vehicles that head west; keep each platform's exact waypoint.
    if((r.mode==='tram'&&r.stop===2)||(r.mode!=='tram'&&r.n!=='с932'&&r.stop!==1)){
      r.path=p.roadPaths[r.stop].slice().reverse();r.stopWaypoint=r.path.length-1-3;
    }
  }
  // Carousel and map share stop indices: reorder every stop-bound field together.
  const order=p.meters.map((_,i)=>i).sort((a,b)=>p.meters[a]-p.meters[b]);
  const newIndex=oldIndex=>order.indexOf(oldIndex);
  for(const key of ['stopNames','stopShortNames','stopHints','platforms','walks','meters','stopWaypoints','roadPaths','sources']){
    p[key]=order.map(i=>p[key][i]);
  }
  p.mixedStops=p.mixedStops.map(newIndex);
  p.frequentStopIndex=newIndex(p.frequentStopIndex);
  for(const r of p.services)r.stop=newIndex(r.stop);
}

// Source snapshot: Yandex Maps, 20 October 2026. Names/directions are real;
// the research arrival clock remains simulated (including the delay scenario).
{
  const p=participantProfiles['respondent-01'];
  const academy='Московская государственная академия делового администрирования';
  const toKryukovo=[academy,'Центр реабилитации','РТС-2','Корпус № 1012','Исторический музей','10-й микрорайон'];
  const fromKryukovo=['МЦД Зеленоград-Крюково','МЦД Зеленоград-Крюково · 8D','Универсам','Поликлиника № 105','Солнечная аллея','МИЭТ','Парк Победы','Магазин Товары для дома','Дом быта','Магазин Океан','Кинотеатр Электрон','1-й торговый центр','Берёзка','Автокомбинат'];
  const onward={
    '4':['Улица Болдов Ручей',...toKryukovo,'МЦД Зеленоград-Крюково · 8A'],
    '9':[...toKryukovo,...fromKryukovo,'41-й километр'],
    '11':['Филаретовская улица','Октябрьская','Панфиловский проспект',...fromKryukovo,'Северная'],
    '29':['Филаретовская улица','12-й микрорайон','Берёзовая аллея','Дом мебели','1-й торговый центр','Кинотеатр Электрон','Магазин Детский мир','Магазин Океан','Дом быта','Магазин Товары для дома','Парк Победы','МИЭТ','Солнечная аллея','Поликлиника № 105','Универсам','МЦД Зеленоград-Крюково · 8A']
  };
  // Arrival-board labels transcribed from the participant's Maps screenshots.
  const directions={'4':'Улица Болдов Ручей','9':'МЦД Зеленоград-Крюково','11':'МЦД Зеленоград-Крюково','29':'Кинотеатр Электрон'};
  for(const r of p.services){
    r.to=directions[r.n];
    r.directionLabel=`до «${r.to}»`;
    const names=onward[r.n],start=names.indexOf(p.stopNames[r.stop]);
    r.itinerary=names.slice(Math.max(0,start));
    r.source=p.sources[r.stop];
  }
  // Bus-detail data from the participant's 21 October screenshots. The hidden
  // portions of 9/11 were checked against wikiroutes.info/msk?routes=5528 / 5531.
  // Keep arrival-board labels, services and research timing above unchanged.
  p.routeHeadings={
    '4':['МЦД Зеленоград-Крюково · 8В','Улица Болдов Ручей','МЦД Зеленоград-Крюково · 8А'],
    '9':['41-й километр','МЦД Зеленоград-Крюково','41-й километр'],
    '29':['МЦД Зеленоград-Крюково · 8В','Кинотеатр Электрон','МЦД Зеленоград-Крюково · 8А'],
    '11':['Северная','МЦД Зеленоград-Крюково','Северная']
  };
  const fullItineraries={
    '4':['МЦД Зеленоград-Крюково · 8В','Панфиловский проспект','Октябрьская','12-й микрорайон','Корпус № 1108','Улица Болдов Ручей',...toKryukovo,'МЦД Зеленоград-Крюково · 8А'],
    '9':['41-й километр','Северная','Автокомбинат','Берёзка','Дом мебели','Берёзовая аллея','12-й микрорайон','Филаретовская улица',...onward['9']],
    '29':['МЦД Зеленоград-Крюково · 8В','10-й микрорайон','Исторический музей','Корпус № 1012','Центр реабилитации',academy,...onward['29'].slice(0,-1),'МЦД Зеленоград-Крюково · 8А'],
    '11':['Северная','Автокомбинат','Берёзка','1-й торговый центр','Кинотеатр Электрон','Магазин Детский мир','Магазин Океан','Дом быта','Магазин Товары для дома','Парк Победы','МИЭТ','Солнечная аллея','Поликлиника № 105','Универсам','10-й микрорайон','Исторический музей','Корпус № 1012','Центр реабилитации',academy,...onward['11']]
  };
  for(const r of p.services){
    r.fullItinerary=fullItineraries[r.n];
    r.itineraryIndex=r.fullItinerary.indexOf(p.stopNames[r.stop]);
    if(r.n==='4'){
      r.itineraryNotes={5:'Промежуточная конечная'};
      r.itineraryMinutes={5:0,6:2,11:7,12:9};
    }
    if(r.n==='11')r.itineraryMinutes={19:0,20:2};
  }
  p.nearestMetro={name:'Зеленоград — Крюково',line:'МЦД-3',badge:'D3',color:'#e15d29',pos:[396,189],map:'metro-moscow-vector.svg',mapSize:[2038,1594],schemeScale:.518,schemeOffset:[220,54],source:'https://yandex.ru/metro/moscow?scheme_id=sc34974011'};
  p.trainStation={name:'Зеленоград — Крюково',map:'respondent-01-kryukovo-map-v2.png',mapSize:[1870,1542],pos:[920,1005],origin:[1211,376],originDotRadius:16,source:'https://yandex.ru/maps/213/moscow/stops/station__lh_9600212/',
    // Screenshot at 19:39: preserve identities and intervals on the device clock.
    departures:[
      {number:'7359/7360',name:'Электричка',from:'Ипподром',to:'Зеленоград-Крюково',sourceTime:'19:40',offset:1,noBoarding:true},
      {number:'7483/7484',name:'Электричка',from:'Зеленоград-Крюково',to:'Ипподром',sourceTime:'19:42',offset:3},
      {number:'6533',name:'Электричка',from:'Клин',to:'Москва (Ленинградский вокзал)',sourceTime:'19:47',offset:8},
      {number:'7361/7362',name:'Электричка',from:'Ипподром',to:'Зеленоград-Крюково',sourceTime:'19:50',offset:11,noBoarding:true},
      {number:'7485/7486',name:'Электричка',from:'Зеленоград-Крюково',to:'Ипподром',sourceTime:'19:52',offset:13},
      {number:'7941',name:'Экспресс-электричка',from:'Тверь',to:'Москва (Ленинградский вокзал)',sourceTime:'19:53',offset:14,express:true}
    ]};
}
// Respondent 3: the two supplied stop links are the source of the boards.
// Geometry is registered to the original screenshots; arrivals use the research clock.
participantProfiles['respondent-03']={
  label:'Респондент 3',city:'Москва',address:'Бакунинская улица, 62–68с1',restrictAddresses:true,
  favoriteStop:'Балакиревский переулок',favoriteByDefault:false,frequentStopIndex:0,
  map:'respondent-03-bakuninskaya.png',mapSize:[2744,1490],origin:[1457,1053],
  mapExtension:{file:'respondent-03-bakuninskaya-extension.svg',bounds:[[0,0],[3400,2700]]},
  stopNames:['Балакиревский переулок'],platforms:[[1204,983]],
  walks:[[[1457,1053],[1368,963],[1285,887],[1232,938],[1204,983]]],meters:[180],
  stopWaypoints:[3],roadPaths:[[[570,1490],[850,1260],[1065,1100],[1204,983],[1440,724],[1680,432],[2080,0]]],
  services:[
    {n:'м3',to:'Проспект Будённого',stop:0,first:35,gap:360,scheduleOnly:false},
    {n:'м3к',to:'Проспект Будённого',stop:0,first:105,gap:780,scheduleOnly:false},
    {n:'686',to:'Проспект Будённого',stop:0,first:180,gap:660,scheduleOnly:false},
    {n:'622',to:'Восточное Измайлово',stop:0,first:300,gap:1680,scheduleOnly:false},
    {n:'м3',to:'Проспект Будённого',stop:0,first:170,gap:360,scheduleOnly:true}
  ],sources:['https://yandex.ru/maps/213/moscow/stops/stop__9642799/'],
  nearestMetro:{name:'Электрозаводская',line:'Арбатско-Покровская линия',badge:'3',color:'#0078bf',pos:[1251.338,594.792]},
  trainStation:{name:'Электрозаводская',map:'respondent-03-elektrozavodskaya.png',mapSize:[1862,1510],pos:[1333,578],origin:[520,941],originDotRadius:16,
    source:'https://rasp.yandex.ru/station/9601647/',cycleMinutes:30,departures:[
      {number:'6720',name:'Электричка',from:'Москва (Казанский вокзал)',to:'Виноградово',sourceTime:'13:42',offset:2},
      {number:'7399/7400',name:'Электричка',from:'Зеленоград-Крюково',to:'Ипподром',sourceTime:'13:47',offset:7},
      {number:'7301/7302',name:'Электричка',from:'Ипподром',to:'Зеленоград-Крюково',sourceTime:'13:48',offset:8},
      {number:'6613',name:'Электричка',from:'Панки',to:'Москва (Казанский вокзал)',sourceTime:'13:53',offset:13},
      {number:'7401/7402',name:'Электричка',from:'Зеленоград-Крюково',to:'Ипподром',sourceTime:'13:57',offset:17},
      {number:'7303/7304',name:'Электричка',from:'Ипподром',to:'Зеленоград-Крюково',sourceTime:'13:58',offset:18},
      {number:'6830',name:'Электричка',from:'Москва (Казанский вокзал)',to:'Черусти',sourceTime:'14:02',offset:22}
    ]},
  alternate:{city:'Москва',address:'Можайское шоссе, 22',frequentStopIndex:-1,
    map:'respondent-03-mozhayskoye-moscow.png',mapSize:[2664,1768],origin:[1325,625],
    stopNames:['Улица Гришина','Улица Петра Алексеева','Улица Петра Алексеева · обратное направление'],
    stopShortNames:['Улица Гришина','Улица Петра Алексеева','Улица Петра Алексеева'],
    platforms:[[805,750],[1780,689],[1580,805]],meters:[250,220,290],
    walks:[[[1325,625],[1325,680],[1100,700],[1000,720],[805,750]],
      [[1325,625],[1325,680],[1535,690],[1780,689]],
      [[1325,625],[1325,680],[1535,690],[1535,805],[1580,805]]],
    stopWaypoints:[3,3,3],roadPaths:[
      [[2664,685],[1800,690],[1100,715],[805,750],[500,810],[0,895]],
      [[2664,675],[2300,680],[2000,682],[1780,689],[1300,700],[805,750],[0,895]],
      [[0,980],[600,880],[1100,815],[1580,805],[2050,800],[2664,795]]],
    services:[
      {n:'1339',to:'Магазин Маринка',stop:0,first:120,gap:960,scheduleOnly:false},
      {n:'Sk2',to:'ТМК',stop:0,first:180,gap:900,scheduleOnly:false},
      {n:'454',to:'ЖК Одинцовский Парк',stop:0,first:240,gap:1200,scheduleOnly:true,routeQualifier:'областной'},
      {n:'м20',to:'Беловежская улица',stop:0,first:240,gap:600,scheduleOnly:false},
      {n:'м20',to:'Беловежская улица',stop:1,first:80,gap:600,scheduleOnly:false},
      {n:'Sk2',to:'ТМК',stop:1,first:140,gap:900,scheduleOnly:false},
      {n:'454',to:'ЖК Одинцовский Парк',stop:1,first:180,gap:1200,scheduleOnly:true,routeQualifier:'областной'},
      {n:'м20',to:'Киевский вокзал · А7',stop:2,first:90,gap:600,scheduleOnly:false},
      {n:'Sk2',to:'Метро Филёвский парк',stop:2,first:180,gap:900,scheduleOnly:false}
    ],sources:['https://yandex.ru/maps/213/moscow/stops/stop__9641267/',
      'https://yandex.ru/maps/213/moscow/stops/stop__9641894/',
      'https://yandex.ru/maps/213/moscow/stops/stop__9641262/'],
    nearestMetro:{name:'Кунцевская',line:'Арбатско-Покровская линия',badge:'3',color:'#0078bf',pos:[515.778,820.64]}
  }
};
// Keep the explicitly selected platform first; additional platforms are independent stops.
{
  const p=participantProfiles['respondent-03'];
  p.stopNames=['Балакиревский переулок','Балакиревский переулок · обратное направление','Улица Новая Дорога'];
  p.stopShortNames=['Балакиревский переулок','Балакиревский переулок','Улица Новая Дорога'];
  p.platforms=[[1360,865],[1155,1030],[2130,1232]];
  p.walks=[
    [[1457,1053],[1368,963],[1285,887],[1360,865]],
    [[1457,1053],[1368,963],[1285,887],[1220,930],[1155,1030]],
    [[1457,1053],[1550,1140],[1705,1050],[1830,970],[1950,1080],[2130,1232]]
  ];p.meters=[180,230,410];p.stopWaypoints=[3,3,3];
  p.roadPaths=[
    [[570,1490],[850,1260],[1220,995],[1360,865],[1600,580],[1770,360],[2080,0]],
    [[2080,0],[1740,360],[1390,790],[1155,1030],[850,1290],[570,1490]],
    [[2744,650],[2520,870],[2320,1060],[2130,1232],[1950,1400],[1840,1490],[1650,1660],[1470,1860],[1260,2080],[1120,2250]]
  ];
  p.sources.push('https://yandex.ru/maps/213/moscow/stops/stop__9642848/','https://yandex.ru/maps/213/moscow/stops/stop__9646509/');
  p.services.push(...[['м3','Серебряный бор'],['686','МЦД Площадь трёх вокзалов · 1Е'],['м3к','Метро Лубянка · 7А'],['622','МЦД Площадь трёх вокзалов · 1Е']].map(([n,to],i)=>({n,to,stop:1,first:45+i*70,gap:600+i*90,scheduleOnly:false})),
    {n:'552',to:'Рубцовская набережная',stop:2,first:45,gap:600,scheduleOnly:false},
    {n:'78',to:'Площадь Земляной Вал',stop:2,first:120,gap:900,scheduleOnly:false});

}
for(const p of [participantProfiles['respondent-03'],participantProfiles['respondent-03'].alternate]){
  for(const r of p.services){
    r.directionLabel=`до «${r.to}»`;
    r.source=p.sources[r.stop];
    r.routeHeading=[p.stopNames[r.stop],r.to];
    r.routeOverview=[{name:p.stopNames[r.stop],current:true},{name:r.to}];
  }
}
// Bus detail cards transcribed from the 13:37–13:38 screenshots.
// These headings and stop sequences do not change the existing arrival board.
{
  const p=participantProfiles['respondent-03'];
  const starts={'622':'МЦД Площадь трёх вокзалов · 1Е','686':'МЦД Площадь трёх вокзалов · 1Е','м3к':'Метро Лубянка · 7А','м3':'Серебряный бор'};
  const gaps={'622':7,'686':7,'м3к':13,'м3':38};
  for(const r of p.services){
    if(!starts[r.n])continue;
    const end=r.n==='622'?'Восточное Измайлово':'Проспект Будённого';
    const overview=[{name:starts[r.n]},{skipped:gaps[r.n]},{name:'Спартаковский переулок'},
      {name:'Балакиревский переулок',current:true,...(r.n!=='622'?{minute:0}:{})},
      {name:'Бакунинская улица, 84',...(r.n!=='622'?{minute:1}:{})},
      {skipped:r.n==='622'?21:3},
      {name:r.n==='622'?'15-я Парковая улица':'Большая Семёновская улица',...(r.n!=='622'?{minute:r.n==='686'?7:6}:{})},
      {name:end,...(r.n!=='622'?{minute:r.n==='686'?11:10}:{})}];
    r.routeHeading=[starts[r.n],end];r.routeOverview=overview;
    if(r.stop===1){
      const end=r.n==='м3к'?'Метро Лубянка · 7А':starts[r.n];
      r.routeHeading=[r.n==='622'?'Восточное Измайлово':'Проспект Будённого',end];
      r.routeOverview=[{name:r.routeHeading[0]},{skipped:r.n==='622'?21:5},
        {name:'Бакунинская улица, 84'},{name:'Балакиревский переулок',current:true,minute:0},
        {name:'Спартаковский переулок',...(['м3','м3к','622'].includes(r.n)?{minute:1}:{})},
        {skipped:{'м3к':11,'м3':34,'686':6,'622':6}[r.n]},
        {name:r.n==='м3к'?'Метро Лубянка · 5А_5В':r.n==='м3'?'Водная станция Труд':'Казанский вокзал · 3А',...(r.n==='м3к'?{minute:18}:r.n==='622'?{minute:12}:{})},
        {name:end,...(r.n==='м3к'?{minute:20}:r.n==='622'?{minute:14}:{})}];
    }
  }
  for(const r of p.services.filter(r=>r.stop===2)){
    const is552=r.n==='552';
    r.routeHeading=is552?['Метро Черкизовская · 1А','Рубцовская набережная','Метро Черкизовская · 2А']:
      ['Дворец спорта Сокольники','Площадь Земляной Вал','Дворец спорта Сокольники'];
    r.routeOverview=[{name:r.routeHeading[0]},{skipped:is552?14:11},{name:'Улица Фридриха Энгельса'},
      {name:'Улица Новая Дорога',current:true},
      is552?{name:'Рубцовская набережная',note:'Промежуточная конечная'}:{name:'Рубцов переулок'},
      {skipped:is552?15:33},{name:is552?'Лечебная улица':'ПКиО Сокольники · 5В'},
      {name:r.routeHeading[2]}];
  }
}
// Moscow address correction. Stop-board directions remain independent of route endpoints.
{
  const p=participantProfiles['respondent-03'].alternate;
  const details={
    'Sk2':{heading:['Метро Филёвский парк · 1А_1В_1С','ТМК'],stops:[
      {name:'Метро Филёвский парк · 1А_1В_1С'},{skipped:6},{name:'Улица Петра Алексеева'},
      {name:'Улица Гришина',minute:0},{name:'Река Ивница',minute:1},{skipped:22},{name:'Школа СКОЛКА'},{name:'ТМК'}]},
    '1339':{heading:['Метро Парк Победы · 2А','Магазин Маринка','Метро Парк Победы · 4А'],stops:[
      {name:'Метро Парк Победы · 2А'},{name:'Улица Багрицкого'},{name:'Улица Гришина',minute:0},
      {name:'Дворец спорта Крылья Советов',minute:3},{skipped:40},{name:'Метро Славянский бульвар · 4С_4D'},{name:'Метро Парк Победы · 4А'}]},
    '454':{heading:['Киевский вокзал · А8','ЖК Одинцовский Парк'],stops:[
      {name:'Киевский вокзал · А8'},{skipped:7},{name:'Улица Петра Алексеева'},{name:'Улица Гришина'},
      {name:'Река Ивница'},{skipped:14},{name:'Транспортная улица'},{name:'ЖК Одинцовский Парк'}]},
    'м20':{heading:['Киевский вокзал · А7','Беловежская улица'],stops:[
      {name:'Киевский вокзал · А7'},{skipped:17},{name:'Улица Петра Алексеева'},{name:'Улица Гришина',minute:0},
      {name:'Река Ивница',minute:2},{skipped:3},{name:'Поликлиника',minute:10},{name:'Беловежская улица',minute:10}]}
  };
  for(const r of p.services){
    const d=details[r.n];r.routeHeading=d.heading.slice();
    r.routeOverview=d.stops.map(item=>({...item,current:item.name===p.stopShortNames[r.stop]}));
    if(r.stop===1){
      // Travel times were supplied from Grishina only; do not invent times at the preceding stop.
      r.routeOverview=r.routeOverview.map(({minute,...item})=>item);
    }
    if(r.stop===2){
      r.routeHeading=d.heading.slice().reverse();
      r.routeOverview=[{name:d.heading.at(-1)},{name:'Улица Гришина'},
        {name:'Улица Петра Алексеева',current:true},{name:d.heading[0]}];
    }
  }
}
function trainStationContext(){return layer==='train'?participantLocation(scenario)?.trainStation||null:null}
const metroScheme={map:'metro-moscow-vector.svg',mapSize:[2038,1594],schemeScale:.518,schemeOffset:[220,54]};
function nearestMetroContext(){
  if(layer!=='metro')return null;
  return {...(participantLocation(scenario)?.nearestMetro||{name:'Парк Культуры',line:'Сокольническая линия',badge:'1',color:'#fa3e2c',pos:[858.694,937.19]}),...metroScheme};
}

// Respondent 1: direction-specific road geometry.
{
  const p=participantProfiles['respondent-01'];
  for(const location of [p,p.alternate]){
    for(const service of location.services){
      const reverse=location===p ? service.stop===0||service.stop===1 : service.stop===0&&service.to.includes('Кунцевская');
      if(reverse){
        const path=service.path||location.roadPaths[service.stop];
        const waypoint=service.stopWaypoint??location.stopWaypoints[service.stop];
        service.path=[...path].reverse();service.stopWaypoint=path.length-1-waypoint;
      }
    }
  }
}
// Respondent 4: registered to supplied map screenshots; ETA fixtures inherit shared defaults.
participantProfiles['respondent-04']={
  "label": "Респондент 4",
  "city": "Москва",
  "address": "Улица Исаковского, 25к1",
  "restrictAddresses": true,
  "favoriteStop": "Аллея Дорога Жизни",
  "favoriteByDefault": false,
  "frequentStopIndex": 0,
  "map": "respondent-04-isakovskogo.png",
  "mapSize": [
    2774,
    1762
  ],
  "origin": [
    1328,
    395
  ],
  "stopNames": [
    "Аллея Дорога Жизни",
    "Аллея Дорога Жизни",
    "Улица Исаковского, 31"
  ],
  "stopShortNames": [
    "Аллея Дорога Жизни",
    "Аллея Дорога Жизни",
    "Улица Исаковского, 31"
  ],
  "platforms": [
    [
      880,
      675
    ],
    [
      960,
      460
    ],
    [
      948,
      1310
    ]
  ],
  "meters": [
    220,
    170,
    430
  ],
  "sources": [
    "https://yandex.ru/maps/213/moscow/stops/stop__9639968/",
    "https://yandex.ru/maps/213/moscow/stops/stop__9639980/",
    "https://yandex.ru/maps/213/moscow/stops/stop__9640389/"
  ],
  "nearestMetro": {
    "name": "Строгино",
    "line": "Арбатско-Покровская линия",
    "badge": "3",
    "color": "#0078bf",
    "pos": [
      494.54,
      616.03
    ]
  },
  "services": [
    {
      "n": "387",
      "to": "Метро Щукинская · 2K",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "Мякинино",
        "Метро Щукинская · 2K"
      ],
      "routeOverview": [
        {
          "name": "Мякинино",
          "current": false
        },
        {
          "skipped": 9,
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "minute": 0,
          "current": true
        },
        {
          "name": "Улица Исаковского, 33",
          "minute": 2,
          "current": false
        },
        {
          "skipped": 4,
          "current": false
        },
        {
          "name": "Метро Щукинская · 1А",
          "minute": 9,
          "current": false
        },
        {
          "name": "Метро Щукинская · 2K",
          "minute": 11,
          "current": false
        }
      ],
      "routeQualifier": "бывший 687"
    },
    {
      "n": "354",
      "to": "Мякинино парк",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "3-й микрорайон Строгина",
        "Мякинино парк"
      ],
      "routeOverview": [
        {
          "name": "3-й микрорайон Строгина",
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": true
        },
        {
          "name": "Улица Маршала Катукова",
          "current": false
        },
        {
          "skipped": 12,
          "current": false
        },
        {
          "name": "Улица Василия Ботылёва",
          "current": false
        },
        {
          "name": "Мякинино парк",
          "current": false
        }
      ],
      "path": [
        [
          140,
          15
        ],
        [
          330,
          45
        ],
        [
          465,
          72
        ],
        [
          565,
          110
        ],
        [
          654,
          155
        ],
        [
          720,
          200
        ],
        [
          772,
          245
        ],
        [
          815,
          295
        ],
        [
          850,
          350
        ],
        [
          875,
          400
        ],
        [
          894,
          455
        ],
        [
          902,
          515
        ],
        [
          906,
          565
        ],
        [
          906,
          675
        ],
        [
          903,
          900
        ],
        [
          900,
          1040
        ],
        [
          893,
          1200
        ],
        [
          890,
          1310
        ],
        [
          887,
          1450
        ],
        [
          887,
          1510
        ],
        [
          850,
          1547
        ],
        [
          680,
          1570
        ],
        [
          350,
          1610
        ],
        [
          0,
          1650
        ]
      ],
      "stopWaypoint": 13
    },
    {
      "n": "с331",
      "to": "8-й микрорайон Митина",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "3-й микрорайон Строгина",
        "8-й микрорайон Митина"
      ],
      "routeOverview": [
        {
          "name": "3-й микрорайон Строгина",
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": true
        },
        {
          "name": "Улица Маршала Катукова",
          "current": false
        },
        {
          "skipped": 25,
          "current": false
        },
        {
          "name": "Улица Генерала Белобородова, 30",
          "current": false
        },
        {
          "name": "8-й микрорайон Митина",
          "current": false
        }
      ],
      "path": [
        [
          140,
          15
        ],
        [
          330,
          45
        ],
        [
          465,
          72
        ],
        [
          565,
          110
        ],
        [
          654,
          155
        ],
        [
          720,
          200
        ],
        [
          772,
          245
        ],
        [
          815,
          295
        ],
        [
          850,
          350
        ],
        [
          875,
          400
        ],
        [
          894,
          455
        ],
        [
          902,
          515
        ],
        [
          906,
          565
        ],
        [
          906,
          675
        ],
        [
          903,
          900
        ],
        [
          900,
          1040
        ],
        [
          893,
          1200
        ],
        [
          890,
          1310
        ],
        [
          887,
          1450
        ],
        [
          887,
          1510
        ],
        [
          850,
          1547
        ],
        [
          680,
          1570
        ],
        [
          350,
          1610
        ],
        [
          0,
          1650
        ]
      ],
      "stopWaypoint": 13
    },
    {
      "n": "387",
      "to": "Мякинино",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "Метро Щукинская · 2В",
        "Мякинино"
      ],
      "routeOverview": [
        {
          "name": "Метро Щукинская · 2В",
          "current": false
        },
        {
          "name": "Детская поликлиника",
          "current": false
        },
        {
          "name": "Строгинский мост",
          "current": false
        },
        {
          "name": "Воднолыжный стадион",
          "current": false
        },
        {
          "name": "Улица Исаковского, 33",
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": true
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "skipped": 7,
          "current": false
        },
        {
          "name": "Почта",
          "current": false
        },
        {
          "name": "Мякинино",
          "current": false
        }
      ],
      "routeQualifier": "бывший 687"
    },
    {
      "n": "354",
      "to": "3-й микрорайон Строгина",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "Мякинино парк",
        "3-й микрорайон Строгина"
      ],
      "routeOverview": [
        {
          "name": "Мякинино парк",
          "current": false
        },
        {
          "skipped": 16,
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "minute": 0,
          "current": true
        },
        {
          "name": "Аллея Генерала Корчагина",
          "minute": 1,
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "minute": 2,
          "current": false
        },
        {
          "name": "3-й микрорайон Строгина",
          "minute": 4,
          "current": false
        }
      ]
    },
    {
      "n": "с331",
      "to": "3-й микрорайон Строгина",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "8-й микрорайон Митина",
        "3-й микрорайон Строгина"
      ],
      "routeOverview": [
        {
          "name": "8-й микрорайон Митина",
          "current": false
        },
        {
          "skipped": 29,
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": false
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": true
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "current": false
        },
        {
          "name": "3-й микрорайон Строгина",
          "current": false
        }
      ]
    },
    {
      "n": "387",
      "to": "Мякинино",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "Метро Щукинская · 2В",
        "Мякинино"
      ],
      "routeOverview": [
        {
          "name": "Метро Щукинская · 2В",
          "current": false
        },
        {
          "name": "Детская поликлиника",
          "current": false
        },
        {
          "name": "Строгинский мост",
          "current": false
        },
        {
          "name": "Воднолыжный стадион",
          "current": false
        },
        {
          "name": "Улица Исаковского, 33",
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": true
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "skipped": 7,
          "current": false
        },
        {
          "name": "Почта",
          "current": false
        },
        {
          "name": "Мякинино",
          "current": false
        }
      ],
      "routeQualifier": "бывший 687"
    },
    {
      "n": "354",
      "to": "3-й микрорайон Строгина",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "Мякинино парк",
        "3-й микрорайон Строгина"
      ],
      "routeOverview": [
        {
          "name": "Мякинино парк",
          "current": false
        },
        {
          "skipped": 16,
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": true
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "current": false
        },
        {
          "name": "3-й микрорайон Строгина",
          "current": false
        }
      ]
    },
    {
      "n": "с331",
      "to": "3-й микрорайон Строгина",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": [
        "8-й микрорайон Митина",
        "3-й микрорайон Строгина"
      ],
      "routeOverview": [
        {
          "name": "8-й микрорайон Митина",
          "current": false
        },
        {
          "skipped": 29,
          "current": false
        },
        {
          "name": "Улица Исаковского, 31",
          "current": true
        },
        {
          "name": "Аллея Дорога Жизни",
          "current": false
        },
        {
          "name": "Аллея Генерала Корчагина",
          "current": false
        },
        {
          "name": "Памятник героям войны",
          "current": false
        },
        {
          "name": "3-й микрорайон Строгина",
          "current": false
        }
      ]
    }
  ],
  "walks": [
    [
      [
        1328,
        395
      ],
      [
        1195,
        395
      ],
      [
        1195,
        535
      ],
      [
        980,
        550
      ],
      [
        880,
        550
      ],
      [
        880,
        675
      ]
    ],
    [
      [
        1328,
        395
      ],
      [
        1195,
        395
      ],
      [
        1195,
        535
      ],
      [
        980,
        550
      ],
      [
        960,
        460
      ]
    ],
    [
      [
        1328,
        395
      ],
      [
        1195,
        395
      ],
      [
        1195,
        535
      ],
      [
        980,
        550
      ],
      [
        970,
        780
      ],
      [
        960,
        1040
      ],
      [
        948,
        1310
      ]
    ]
  ],
  "roadPaths": [
    [
      [
        140,
        15
      ],
      [
        330,
        45
      ],
      [
        465,
        72
      ],
      [
        565,
        110
      ],
      [
        654,
        155
      ],
      [
        720,
        200
      ],
      [
        772,
        245
      ],
      [
        815,
        295
      ],
      [
        850,
        350
      ],
      [
        875,
        400
      ],
      [
        894,
        455
      ],
      [
        902,
        515
      ],
      [
        906,
        565
      ],
      [
        906,
        675
      ],
      [
        903,
        900
      ],
      [
        900,
        1040
      ],
      [
        893,
        1200
      ],
      [
        890,
        1310
      ],
      [
        887,
        1450
      ],
      [
        887,
        1510
      ],
      [
        950,
        1523
      ],
      [
        1400,
        1463
      ],
      [
        2100,
        1357
      ],
      [
        2774,
        1245
      ]
    ],
    [
      [
        2774,
        1273
      ],
      [
        2100,
        1385
      ],
      [
        1400,
        1491
      ],
      [
        960,
        1550
      ],
      [
        920,
        1515
      ],
      [
        920,
        1450
      ],
      [
        922,
        1310
      ],
      [
        926,
        1200
      ],
      [
        929,
        1040
      ],
      [
        932,
        900
      ],
      [
        935,
        675
      ],
      [
        934,
        565
      ],
      [
        930,
        515
      ],
      [
        924,
        460
      ],
      [
        905,
        400
      ],
      [
        879,
        340
      ],
      [
        842,
        280
      ],
      [
        799,
        230
      ],
      [
        748,
        180
      ],
      [
        680,
        130
      ],
      [
        582,
        84
      ],
      [
        485,
        48
      ],
      [
        350,
        17
      ],
      [
        200,
        0
      ]
    ],
    [
      [
        2774,
        1273
      ],
      [
        2100,
        1385
      ],
      [
        1400,
        1491
      ],
      [
        960,
        1550
      ],
      [
        920,
        1515
      ],
      [
        920,
        1450
      ],
      [
        922,
        1310
      ],
      [
        926,
        1200
      ],
      [
        929,
        1040
      ],
      [
        932,
        900
      ],
      [
        935,
        675
      ],
      [
        934,
        565
      ],
      [
        930,
        515
      ],
      [
        924,
        460
      ],
      [
        905,
        400
      ],
      [
        879,
        340
      ],
      [
        842,
        280
      ],
      [
        799,
        230
      ],
      [
        748,
        180
      ],
      [
        680,
        130
      ],
      [
        582,
        84
      ],
      [
        485,
        48
      ],
      [
        350,
        17
      ],
      [
        200,
        0
      ]
    ]
  ],
  "stopWaypoints": [
    13,
    13,
    6
  ],
  "alternate": {
    "city": "Москва",
    "address": "Часовая улица, 30",
    "frequentStopIndex": -1,
    "map": "respondent-04-chasovaya.png",
    "mapSize": [
      1739,
      1633
    ],
    "origin": [
      879,
      225
    ],
    "stopNames": [
      "1-й Балтийский переулок",
      "Часовая улица",
      "Головановский переулок",
      "Метро Сокол · 1F",
      "Гидропроект",
      "Метро Сокол · 2D"
    ],
    "platforms": [
      [
        1080,
        265
      ],
      [
        675,
        365
      ],
      [
        1060,
        702
      ],
      [
        520,
        1260
      ],
      [
        435,
        1220
      ],
      [
        710,
        984
      ]
    ],
    "meters": [
      220,
      300,
      650,
      1050,
      1100,
      800
    ],
    "cardGroups": [
      [
        0,
        1,
        2
      ],
      [
        3,
        4,
        5
      ]
    ],
    "loadGroupOnMap": true,
    "nearestMetro": {
      "name": "Сокол",
      "line": "Замоскворецкая линия",
      "badge": "2",
      "color": "#48b85e",
      "pos": [
        771.152,
        525.38
      ]
    },
    "services": [
      {
        "n": "322",
        "to": "Метро Сокол · 2D",
        "stop": 0,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "1-й Силикатный проезд",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "1-й Силикатный проезд",
            "current": false
          },
          {
            "skipped": 31,
            "current": false
          },
          {
            "name": "Российская открытая академия транспорта",
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "minute": 0,
            "current": true
          },
          {
            "name": "Часовая улица",
            "minute": 1,
            "current": false
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 3,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 3,
            "current": false
          }
        ]
      },
      {
        "n": "442",
        "to": "Метро Сокол · 2D",
        "stop": 0,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Рижская · 8А",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "Метро Рижская · 8А",
            "current": false
          },
          {
            "skipped": 22,
            "current": false
          },
          {
            "name": "Российская открытая академия транспорта",
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "minute": 0,
            "current": true
          },
          {
            "name": "Часовая улица",
            "minute": 1,
            "current": false
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 2,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 3,
            "current": false
          }
        ]
      },
      {
        "n": "132",
        "to": "Метро Сокол · 2D",
        "stop": 0,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Петровский парк · 3А",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "Метро Петровский парк · 3А",
            "current": false
          },
          {
            "skipped": 10,
            "current": false
          },
          {
            "name": "Российская открытая академия транспорта",
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "minute": 0,
            "current": true
          },
          {
            "name": "Часовая улица",
            "minute": 1,
            "current": false
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 3,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 4,
            "current": false
          }
        ]
      },
      {
        "n": "322",
        "to": "Метро Сокол · 2D",
        "stop": 1,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "1-й Силикатный проезд",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "1-й Силикатный проезд",
            "current": false
          },
          {
            "skipped": 32,
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "current": false
          },
          {
            "name": "Часовая улица",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 2,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 3,
            "current": false
          }
        ]
      },
      {
        "n": "442",
        "to": "Метро Сокол · 2D",
        "stop": 1,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Рижская · 8А",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "Метро Рижская · 8А",
            "current": false
          },
          {
            "skipped": 23,
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "current": false
          },
          {
            "name": "Часовая улица",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 2,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 3,
            "current": false
          }
        ]
      },
      {
        "n": "132",
        "to": "Метро Сокол · 2D",
        "stop": 1,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Петровский парк · 3А",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "Метро Петровский парк · 3А",
            "current": false
          },
          {
            "skipped": 11,
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "current": false
          },
          {
            "name": "Часовая улица",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 2E",
            "minute": 2,
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "minute": 3,
            "current": false
          }
        ]
      },
      {
        "n": "322",
        "to": "1-й Силикатный проезд",
        "stop": 2,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "1-й Силикатный проезд"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": false
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "name": "Головановский переулок",
            "current": true
          },
          {
            "name": "2-й Балтийский переулок",
            "current": false
          },
          {
            "skipped": 32,
            "current": false
          },
          {
            "name": "2-й Силикатный проезд",
            "current": false
          },
          {
            "name": "1-й Силикатный проезд",
            "current": false
          }
        ]
      },
      {
        "n": "442",
        "to": "Метро Рижская · 1А",
        "stop": 2,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "Метро Рижская · 1А"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": false
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "name": "Головановский переулок",
            "current": true
          },
          {
            "name": "2-й Балтийский переулок",
            "current": false
          },
          {
            "skipped": 23,
            "current": false
          },
          {
            "name": "Улица Верземнека",
            "current": false
          },
          {
            "name": "Метро Рижская · 1А",
            "current": false
          }
        ]
      },
      {
        "n": "132",
        "to": "Метро Динамо · 3В",
        "stop": 2,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "Метро Динамо · 3В"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": false
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "name": "Головановский переулок",
            "current": true
          },
          {
            "name": "2-й Балтийский переулок",
            "current": false
          },
          {
            "skipped": 9,
            "current": false
          },
          {
            "name": "Метро Петровский парк · 4В",
            "current": false
          },
          {
            "name": "Метро Динамо · 3В",
            "current": false
          }
        ]
      },
      {
        "n": "28",
        "to": "Проспект Маршала Жукова",
        "stop": 3,
        "mode": "tram",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 1F",
          "Проспект Маршала Жукова"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 1F",
            "current": true
          },
          {
            "name": "Гидропроект",
            "current": false
          },
          {
            "skipped": 11,
            "current": false
          },
          {
            "name": "Улица Маршала Тухачевского",
            "current": false
          },
          {
            "name": "Проспект Маршала Жукова",
            "current": false
          }
        ]
      },
      {
        "n": "15",
        "to": "Таллинская улица",
        "stop": 3,
        "mode": "tram",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 1F",
          "Таллинская улица"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 1F",
            "current": true
          },
          {
            "name": "Гидропроект",
            "current": false
          },
          {
            "skipped": 14,
            "current": false
          },
          {
            "name": "Строгинский бульвар",
            "current": false
          },
          {
            "name": "Таллинская улица",
            "current": false
          }
        ]
      },
      {
        "n": "403",
        "to": "Карамышевская набережная",
        "stop": 4,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Прибрежный проезд",
          "Карамышевская набережная"
        ],
        "routeOverview": [
          {
            "name": "Прибрежный проезд",
            "current": false
          },
          {
            "skipped": 13,
            "current": false
          },
          {
            "name": "Гидропроект",
            "current": false
          },
          {
            "name": "Гидропроект",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "minute": 2,
            "current": false
          },
          {
            "skipped": 18,
            "current": false
          },
          {
            "name": "Улица Народного Ополчения, 3",
            "current": false
          },
          {
            "name": "Карамышевская набережная",
            "current": false
          }
        ]
      },
      {
        "n": "412",
        "to": "Улица Серёгина",
        "stop": 4,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Покровский берег",
          "Улица Серёгина"
        ],
        "routeOverview": [
          {
            "name": "Покровский берег",
            "current": false
          },
          {
            "skipped": 9,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "minute": 2,
            "current": false
          },
          {
            "skipped": 5,
            "current": false
          },
          {
            "name": "Спортивный комплекс ЦСКА",
            "minute": 6,
            "current": false
          },
          {
            "name": "Улица Серёгина",
            "minute": 7,
            "current": false
          }
        ]
      },
      {
        "n": "м1",
        "to": "Метро Новаторская · 8В",
        "stop": 4,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Больница РЖД",
          "Метро Новаторская · 8В"
        ],
        "routeOverview": [
          {
            "name": "Больница РЖД",
            "current": false
          },
          {
            "skipped": 5,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "current": false
          },
          {
            "skipped": 49,
            "current": false
          },
          {
            "name": "Ленинский проспект, 93",
            "current": false
          },
          {
            "name": "Метро Новаторская · 8В",
            "current": false
          }
        ]
      },
      {
        "n": "322",
        "to": "1-й Силикатный проезд",
        "stop": 5,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "1-й Силикатный проезд"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": true
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "skipped": 34,
            "current": false
          },
          {
            "name": "2-й Силикатный проезд",
            "current": false
          },
          {
            "name": "1-й Силикатный проезд",
            "current": false
          }
        ]
      },
      {
        "n": "442",
        "to": "Метро Рижская · 1А",
        "stop": 5,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "Метро Рижская · 1А"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": true
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "skipped": 25,
            "current": false
          },
          {
            "name": "Улица Верземнека",
            "current": false
          },
          {
            "name": "Метро Рижская · 1А",
            "current": false
          }
        ]
      },
      {
        "n": "132",
        "to": "Метро Динамо · 3В",
        "stop": 5,
        "mode": "bus",
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": [
          "Метро Сокол · 2D",
          "Метро Динамо · 3В"
        ],
        "routeOverview": [
          {
            "name": "Метро Сокол · 2D",
            "current": true
          },
          {
            "name": "Балтийская улица",
            "current": false
          },
          {
            "skipped": 11,
            "current": false
          },
          {
            "name": "Метро Петровский парк · 4В",
            "current": false
          },
          {
            "name": "Метро Динамо · 3В",
            "current": false
          }
        ]
      },
      {
        "n": "88",
        "to": "Гидропроект",
        "stop": 4,
        "mode": "bus",
        "first": 300,
        "gap": 420,
        "scheduleOnly": false,
        "previewHidden": true,
        "routeHeading": [
          "Метро Планерная",
          "Гидропроект"
        ],
        "routeOverview": [
          {
            "name": "Метро Планерная",
            "current": false
          },
          {
            "skipped": 26,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "minute": 0,
            "current": true
          },
          {
            "name": "Гидропроект",
            "minute": 4,
            "current": false
          }
        ],
        "routeQualifier": "временная трасса"
      },
      {
        "n": "356",
        "to": "Научно-клинический центр имени Боткина",
        "stop": 4,
        "mode": "bus",
        "first": 420,
        "gap": 420,
        "scheduleOnly": false,
        "previewHidden": true,
        "routeHeading": [
          "8-й микрорайон Митина",
          "Научно-клинический центр имени Боткина",
          "8-й микрорайон Митина"
        ],
        "routeOverview": [
          {
            "name": "8-й микрорайон Митина",
            "current": false
          },
          {
            "skipped": 28,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "current": false
          },
          {
            "skipped": 59,
            "current": false
          },
          {
            "name": "Улица Генерала Белобородова, 30",
            "current": false
          },
          {
            "name": "8-й микрорайон Митина",
            "current": false
          }
        ]
      },
      {
        "n": "370",
        "to": "Белорусский вокзал · 1В",
        "stop": 4,
        "mode": "bus",
        "first": 540,
        "gap": 420,
        "scheduleOnly": false,
        "previewHidden": true,
        "routeHeading": [
          "Братцево",
          "Белорусский вокзал · 1В"
        ],
        "routeOverview": [
          {
            "name": "Братцево",
            "current": false
          },
          {
            "skipped": 20,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "minute": 0,
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "minute": 2,
            "current": false
          },
          {
            "skipped": 13,
            "current": false
          },
          {
            "name": "МЦД Белорусская · 4В",
            "current": false
          },
          {
            "name": "Белорусский вокзал · 1В",
            "current": false
          }
        ]
      },
      {
        "n": "с372",
        "to": "1-й Силикатный проезд",
        "stop": 4,
        "mode": "bus",
        "first": 660,
        "gap": 420,
        "scheduleOnly": false,
        "previewHidden": true,
        "routeHeading": [
          "1-й Силикатный проезд",
          "Улица Панфилова",
          "1-й Силикатный проезд"
        ],
        "routeOverview": [
          {
            "name": "1-й Силикатный проезд",
            "current": false
          },
          {
            "skipped": 28,
            "current": false
          },
          {
            "name": "Университет РОСБИОТЕХ",
            "current": false
          },
          {
            "name": "Гидропроект",
            "current": true
          },
          {
            "name": "Метро Сокол · 1А_1В",
            "current": false
          },
          {
            "skipped": 24,
            "current": false
          },
          {
            "name": "1-я Магистральная улица",
            "current": false
          },
          {
            "name": "1-й Силикатный проезд",
            "current": false
          }
        ]
      },
      {
        "n": "442",
        "to": "Метро Сокол · 2D",
        "stop": 5,
        "mode": "bus",
        "first": 420,
        "gap": 420,
        "scheduleOnly": true,
        "previewHidden": true,
        "noBoarding": true,
        "routeHeading": [
          "Метро Рижская · 8А",
          "Метро Сокол · 2D"
        ],
        "routeOverview": [
          {
            "name": "Метро Рижская · 8А",
            "current": false
          },
          {
            "skipped": 22,
            "current": false
          },
          {
            "name": "Российская открытая академия транспорта",
            "current": false
          },
          {
            "name": "1-й Балтийский переулок",
            "current": false
          },
          {
            "name": "Часовая улица",
            "current": false
          },
          {
            "name": "Метро Сокол · 2E",
            "current": false
          },
          {
            "name": "Метро Сокол · 2D",
            "current": true,
            "note": "Нет посадки"
          }
        ]
      }
    ],
    "walks": [
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          990,
          235
        ],
        [
          990,
          265
        ],
        [
          1080,
          265
        ]
      ],
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          741,
          235
        ],
        [
          741,
          265
        ],
        [
          690,
          265
        ],
        [
          675,
          365
        ]
      ],
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          990,
          235
        ],
        [
          990,
          265
        ],
        [
          1010,
          265
        ],
        [
          1010,
          680
        ],
        [
          1060,
          702
        ]
      ],
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          741,
          235
        ],
        [
          741,
          265
        ],
        [
          730,
          400
        ],
        [
          715,
          685
        ],
        [
          712,
          984
        ],
        [
          705,
          1120
        ],
        [
          695,
          1195
        ],
        [
          675,
          1240
        ],
        [
          600,
          1255
        ],
        [
          520,
          1260
        ]
      ],
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          741,
          235
        ],
        [
          741,
          265
        ],
        [
          730,
          400
        ],
        [
          715,
          685
        ],
        [
          712,
          984
        ],
        [
          705,
          1120
        ],
        [
          695,
          1195
        ],
        [
          675,
          1240
        ],
        [
          600,
          1240
        ],
        [
          435,
          1220
        ]
      ],
      [
        [
          879,
          225
        ],
        [
          879,
          235
        ],
        [
          741,
          235
        ],
        [
          741,
          265
        ],
        [
          730,
          400
        ],
        [
          715,
          685
        ],
        [
          712,
          984
        ],
        [
          710,
          984
        ]
      ]
    ],
    "roadPaths": [
      [
        [
          1739,
          265
        ],
        [
          1400,
          265
        ],
        [
          1080,
          265
        ],
        [
          745,
          265
        ],
        [
          715,
          300
        ],
        [
          685,
          500
        ],
        [
          680,
          760
        ],
        [
          680,
          1015
        ],
        [
          660,
          1100
        ],
        [
          710,
          1100
        ],
        [
          710,
          984
        ]
      ],
      [
        [
          1739,
          265
        ],
        [
          1080,
          265
        ],
        [
          745,
          265
        ],
        [
          715,
          300
        ],
        [
          675,
          365
        ],
        [
          665,
          600
        ],
        [
          660,
          1015
        ],
        [
          650,
          1100
        ],
        [
          710,
          1100
        ],
        [
          710,
          984
        ]
      ],
      [
        [
          710,
          1120
        ],
        [
          710,
          984
        ],
        [
          715,
          685
        ],
        [
          910,
          685
        ],
        [
          1060,
          702
        ],
        [
          1350,
          702
        ],
        [
          1739,
          702
        ]
      ],
      [
        [
          610,
          1215
        ],
        [
          630,
          1235
        ],
        [
          630,
          1260
        ],
        [
          600,
          1275
        ],
        [
          560,
          1275
        ],
        [
          520,
          1260
        ],
        [
          450,
          1250
        ],
        [
          300,
          1255
        ],
        [
          0,
          1270
        ]
      ],
      [
        [
          0,
          1270
        ],
        [
          220,
          1250
        ],
        [
          435,
          1220
        ],
        [
          650,
          1200
        ],
        [
          1000,
          1195
        ],
        [
          1400,
          1200
        ],
        [
          1739,
          1205
        ]
      ],
      [
        [
          660,
          1100
        ],
        [
          710,
          1100
        ],
        [
          710,
          984
        ],
        [
          715,
          685
        ],
        [
          910,
          685
        ],
        [
          1060,
          702
        ],
        [
          1350,
          702
        ],
        [
          1739,
          702
        ]
      ]
    ],
    "stopWaypoints": [
      2,
      4,
      4,
      5,
      2,
      2
    ],
    "stopModes": [
      "bus",
      "bus",
      "bus",
      "tram",
      "bus",
      "bus"
    ],
    "walkLabelOffsets": [
      [
        0,
        32
      ]
    ],
    "mapMaxZoom": 0,
    "sources": [
      "https://yandex.ru/maps/213/moscow/stops/stop__9639655/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9639656/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9639645/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9640339/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9639849/",
      "https://yandex.ru/maps/213/moscow/stops/stop__10110341/"
    ],
    "addressSource": "https://yandex.ru/maps/213/moscow/house/chasovaya_ulitsa_30/Z04YcwZpSU0GQFtvfXRwcHpmbQ==/",
    "registrationNote": "Markers use the central continuous section of map 4.1.png. Sokol 1F belongs to the tram loop beside 77А, not the displaced stop symbols in the left stitched strip.",
    "stopIcons": {
      "3": "tram-stop-symbol.png"
    }
  },
  "stopHints": [
    "",
    "",
    ""
  ],
  "addressSource": "https://yandex.ru/maps/213/moscow/house/ulitsa_isakovskogo_25k1/Z04YcgVgSkEAQFtvfXRxdnpkZw==/",
  "mapMaxZoom": 0,
  "registrationNote": "Pixel anchors registered to map 4.png: the requested 25к1 is north-east of Isakovskogo, beside the park; the similarly numbered building south-west is not the origin."
};
participantProfiles['respondent-04'].trainStation={...JSON.parse(JSON.stringify(participantProfiles['respondent-02'].trainStation)),name:'Щукинская',source:'https://rasp.yandex.ru/station/9879240/',map:'respondent-04-schukinskaya.png',mapSize:[2666,1762],pos:[1990,650],origin:[591,873],originDotRadius:16,originLocationIcon:false,pinOffsetX:-24};
for(const p of [participantProfiles['respondent-04'],participantProfiles['respondent-04'].alternate])for(const service of p.services)service.directionLabel='до «'+service.to+'»';
// Respondent 5: isolated local-development profile, reusing respondent 4's shared UI.
participantProfiles['respondent-05']={
  "label": "Респондент 5",
  "city": "Москва",
  "address": "Бульвар Яна Райниса, 16к1",
  "restrictAddresses": true,
  "favoriteStop": "Бульвар Яна Райниса, 31",
  "favoriteByDefault": false,
  "frequentStopIndex": 0,
  "map": "respondent-05-rainisa.png",
  "mapSize": [1952, 1275],
  "mapMaxZoom": 0,
  "origin": [974, 490],
  "stopNames": ["Бульвар Яна Райниса, 31", "Бульвар Яна Райниса, 20", "Туристская улица"],
  "stopIds": ["stop__9640229", "stop__9640043", "stop__9640020"],
  "stopHints": ["", "", ""],
  "platforms": [[1110, 620], [565, 642], [1390, 494]],
  "meters": [205, 257, 340],
  "walkMinutes": [2, 3, 4],
  "walkingVerifiedAt": "2026-10-26",
  "walks": [
    [[974, 490], [1008, 490], [1008, 586], [945, 599], [945, 644], [1110, 620]],
    [[974, 490], [934, 540], [916, 558], [730, 574], [645, 598], [565, 642]],
    [[974, 490], [1008, 490], [1097, 443], [1115, 541], [1210, 536], [1350, 470], [1390, 494]]
  ],
  "roadPaths": [
    [[0, 885], [200, 790], [425, 706], [650, 640], [1000, 627], [1110, 620], [1210, 588], [1375, 511], [1541, 373], [1760, 183], [1952, 43]],
    [[1952, 15], [1760, 155], [1541, 345], [1390, 494], [1300, 538], [1210, 573], [1110, 599], [1000, 608], [800, 618], [680, 626], [650, 630], [565, 642], [425, 684], [200, 768], [0, 863]],
    [[1952, 15], [1760, 155], [1541, 345], [1390, 494], [1300, 538], [1210, 573], [1110, 599], [1000, 608], [800, 618], [680, 626], [650, 630], [565, 642], [425, 684], [200, 768], [0, 863]]
  ],
  "stopWaypoints": [5, 11, 3],
  "nearestMetro": {"name": "Сходненская", "line": "Таганско-Краснопресненская линия", "badge": "7", "color": "#943e90", "pos": [592.96, 375.16]},
  "addressSource": "https://yandex.ru/maps/213/moscow/house/bulvar_yana_raynisa_16k1/Z04YcgZoQUcHQFtvfXR1eHtmZg==/",
  "sources": [
    "https://yandex.ru/maps/213/moscow/stops/stop__9640229/",
    "https://yandex.ru/maps/213/moscow/stops/stop__9640043/",
    "https://yandex.ru/maps/213/moscow/stops/stop__9640020/"
  ],
  "services": [
    {
      "n": "313",
      "to": "Метро Планерная · 1P",
      "directionLabel": "до «Метро Планерная · 1P»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Волоколамская · 2A_2B", "Метро Планерная · 1P"],
      "routeOverview": [{"name": "Метро Волоколамская · 2A_2B"}, {"skipped": 11}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true}, {"name": "Туристская улица"}, {"skipped": 4}, {"name": "Планерная улица"}, {"name": "Метро Планерная · 1P"}]
    },
    {
      "n": "370",
      "to": "Белорусский вокзал · 1B",
      "directionLabel": "до «Белорусский вокзал · 1B»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Братцево", "Белорусский вокзал · 1B"],
      "routeOverview": [{"name": "Братцево"}, {"name": "Петрово"}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true}, {"name": "Туристская улица"}, {"skipped": 32}, {"name": "МЦД Белорусская · 4B"}, {"name": "Белорусский вокзал · 1B"}]
    },
    {
      "n": "1280",
      "to": "Метро Сходненская · 9A",
      "directionLabel": "до «Метро Сходненская · 9A»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Сходненская · 1A", "Торговый центр Вэйпарк", "Метро Сходненская · 9A"],
      "routeOverview": [{"name": "Метро Сходненская · 1A"}, {"skipped": 9}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 2}, {"name": "Аэродромная улица", "minute": 3}, {"name": "Метро Сходненская · 9A", "minute": 4}]
    },
    {
      "n": "1288",
      "to": "Метро Сходненская · 9A",
      "directionLabel": "до «Метро Сходненская · 9A»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Жилой комплекс Мортонград", "Метро Сходненская · 9A"],
      "routeOverview": [{"name": "Жилой комплекс Мортонград"}, {"skipped": 5}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 1}, {"name": "Аэродромная улица", "minute": 3}, {"name": "Метро Сходненская · 9A", "minute": 4}]
    },
    {
      "n": "399",
      "to": "Метро Речной вокзал · 1B",
      "directionLabel": "до «Метро Речной вокзал · 1B»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["13-й микрорайон Тушина", "Метро Речной вокзал · 1B"],
      "routeOverview": [{"name": "13-й микрорайон Тушина"}, {"name": "Походный проезд"}, {"name": "Проезд Донелайтиса, 12"}, {"name": "Детский сад"}, {"name": "Проезд Донелайтиса"}, {"name": "Проезд Донелайтиса, 38"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 1}, {"skipped": 20}, {"name": "Смольная улица"}, {"name": "Метро Речной вокзал · 1B"}]
    },
    {
      "n": "267",
      "to": "Метро Планерная · 1P",
      "directionLabel": "до «Метро Планерная · 1P»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["8-й микрорайон Митина", "Метро Планерная · 1P"],
      "routeOverview": [{"name": "8-й микрорайон Митина"}, {"skipped": 17}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 1}, {"skipped": 4}, {"name": "Планерная улица", "minute": 10}, {"name": "Метро Планерная · 1P", "minute": 13}]
    },
    {
      "n": "Т",
      "to": "МЦД Тушинская · 3A",
      "directionLabel": "до «МЦД Тушинская · 3A»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1M_1N", "МЦД Тушинская · 3A", "Метро Планерная"],
      "routeOverview": [{"name": "Метро Планерная · 1M_1N"}, {"skipped": 14}, {"name": "Проезд Донелайтиса, 38"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 2}, {"skipped": 28}, {"name": "Детская поликлиника"}, {"name": "Метро Планерная"}]
    },
    {
      "n": "878к",
      "to": "Метро Сходненская · 9A",
      "directionLabel": "до «Метро Сходненская · 9A»",
      "stop": 0,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Микрорайон Чернево", "Метро Сходненская · 9A"],
      "routeOverview": [{"name": "Микрорайон Чернево"}, {"skipped": 33}, {"name": "Бульвар Яна Райниса, 20"}, {"name": "Бульвар Яна Райниса, 31", "current": true, "minute": 0}, {"name": "Туристская улица", "minute": 1}, {"name": "Аэродромная улица", "minute": 2}, {"name": "Метро Сходненская · 9A", "minute": 4}],
      "mode": "minibus"
    },
    {
      "n": "370",
      "to": "Братцево",
      "directionLabel": "до «Братцево»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Белорусский вокзал · 1C", "Братцево"],
      "routeOverview": [{"name": "Белорусский вокзал · 1C"}, {"skipped": 32}, {"name": "Туристская улица"}, {"name": "Бульвар Яна Райниса, 20", "current": true, "minute": 0}, {"name": "Петрово", "minute": 1}, {"name": "Братцево", "minute": 3}]
    },
    {
      "n": "267",
      "to": "8-й микрорайон Митина",
      "directionLabel": "до «8-й микрорайон Митина»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1M_1N", "8-й микрорайон Митина"],
      "routeOverview": [{"name": "Метро Планерная · 1M_1N"}, {"skipped": 5}, {"name": "Туристская улица"}, {"name": "Бульвар Яна Райниса, 20", "current": true, "minute": 0}, {"name": "Петрово", "minute": 1}, {"skipped": 16}, {"name": "Улица Генерала Белобородова, 30"}, {"name": "8-й микрорайон Митина"}]
    },
    {
      "n": "313",
      "to": "Метро Волоколамская · 2A_2B",
      "directionLabel": "до «Метро Волоколамская · 2A_2B»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1M_1N", "Метро Волоколамская · 2A_2B"],
      "routeOverview": [{"name": "Метро Планерная · 1M_1N"}, {"skipped": 5}, {"name": "Туристская улица"}, {"name": "Бульвар Яна Райниса, 20", "current": true, "minute": 0}, {"name": "Петрово", "minute": 1}, {"skipped": 9}, {"name": "МЦД Трикотажная · 3B", "minute": 14}, {"name": "Метро Волоколамская · 2A_2B", "minute": 18}]
    },
    {
      "n": "400к",
      "to": "14-й микрорайон",
      "directionLabel": "до «14-й микрорайон»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Сходненская · 1C", "14-й микрорайон"],
      "routeOverview": [{"name": "Метро Сходненская · 1C"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица"}, {"name": "Бульвар Яна Райниса, 20", "current": true}, {"name": "Братцево"}, {"skipped": 31}, {"name": "Выставочный зал"}, {"name": "14-й микрорайон"}]
    },
    {
      "n": "с377",
      "to": "Братцево",
      "directionLabel": "до «Братцево»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["МЦД Трикотажная · 3B", "Братцево"],
      "routeOverview": [{"name": "МЦД Трикотажная · 3B"}, {"skipped": 22}, {"name": "Проезд Донелайтиса, 38"}, {"name": "Бульвар Яна Райниса, 20", "current": true}, {"name": "Петрово"}, {"name": "Братцево"}]
    },
    {
      "n": "878к",
      "to": "Микрорайон Чернево",
      "directionLabel": "до «Микрорайон Чернево»",
      "stop": 1,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Сходненская", "Микрорайон Чернево"],
      "routeOverview": [{"name": "Метро Сходненская"}, {"name": "Метро Сходненская · 1B"}, {"name": "Аэродромная улица"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица"}, {"name": "Бульвар Яна Райниса, 20", "current": true}, {"name": "Петрово"}, {"skipped": 32}, {"name": "Улица Кирова"}, {"name": "Микрорайон Чернево"}],
      "mode": "minibus"
    },
    {
      "n": "370",
      "to": "Братцево",
      "directionLabel": "до «Братцево»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Белорусский вокзал · 1C", "Братцево"],
      "routeOverview": [{"name": "Белорусский вокзал · 1C"}, {"skipped": 31}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true, "minute": 0}, {"name": "Бульвар Яна Райниса, 20", "minute": 2}, {"name": "Петрово", "minute": 3}, {"name": "Братцево", "minute": 5}]
    },
    {
      "n": "313",
      "to": "Метро Волоколамская · 2A_2B",
      "directionLabel": "до «Метро Волоколамская · 2A_2B»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1M_1N", "Метро Волоколамская · 2A_2B"],
      "routeOverview": [{"name": "Метро Планерная · 1M_1N"}, {"name": "Планерная улица"}, {"name": "Улица Фомичёвой"}, {"name": "Метро Сходненская · 1C"}, {"name": "Аэродромная улица"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true, "minute": 0}, {"name": "Бульвар Яна Райниса, 20", "minute": 1}, {"skipped": 10}, {"name": "МЦД Трикотажная · 3B", "minute": 16}, {"name": "Метро Волоколамская · 2A_2B", "minute": 20}]
    },
    {
      "n": "399",
      "to": "13-й микрорайон Тушина",
      "directionLabel": "до «13-й микрорайон Тушина»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Речной вокзал · 2E", "13-й микрорайон Тушина"],
      "routeOverview": [{"name": "Метро Речной вокзал · 2E"}, {"skipped": 19}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true}, {"name": "Проезд Донелайтиса, 38"}, {"skipped": 3}, {"name": "Походный проезд"}, {"name": "13-й микрорайон Тушина"}]
    },
    {
      "n": "678",
      "to": "МЦД Тушинская · 3A",
      "directionLabel": "до «МЦД Тушинская · 3A»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1G", "МЦД Тушинская · 3A", "Метро Планерная · 1P"],
      "routeOverview": [{"name": "Метро Планерная · 1G"}, {"skipped": 29}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true}, {"name": "Проезд Донелайтиса, 38"}, {"skipped": 14}, {"name": "Планерная улица"}, {"name": "Метро Планерная · 1P"}]
    },
    {
      "n": "400к",
      "to": "14-й микрорайон",
      "directionLabel": "до «14-й микрорайон»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Сходненская · 1C", "14-й микрорайон"],
      "routeOverview": [{"name": "Метро Сходненская · 1C"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true}, {"name": "Бульвар Яна Райниса, 20"}, {"skipped": 32}, {"name": "Выставочный зал"}, {"name": "14-й микрорайон"}]
    },
    {
      "n": "267",
      "to": "8-й микрорайон Митина",
      "directionLabel": "до «8-й микрорайон Митина»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Планерная · 1M_1N", "8-й микрорайон Митина"],
      "routeOverview": [{"name": "Метро Планерная · 1M_1N"}, {"name": "Планерная улица"}, {"name": "Улица Фомичёвой"}, {"name": "Метро Сходненская · 1C"}, {"name": "Аэродромная улица"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true, "minute": 0}, {"name": "Бульвар Яна Райниса, 20", "minute": 1}, {"skipped": 17}, {"name": "Улица Генерала Белобородова, 30", "minute": 26}, {"name": "8-й микрорайон Митина", "minute": 27}]
    },
    {
      "n": "878к",
      "to": "Микрорайон Чернево",
      "directionLabel": "до «Микрорайон Чернево»",
      "stop": 2,
      "first": 60,
      "gap": 420,
      "scheduleOnly": false,
      "routeHeading": ["Метро Сходненская", "Микрорайон Чернево"],
      "routeOverview": [{"name": "Метро Сходненская"}, {"name": "Метро Сходненская · 1B"}, {"name": "Аэродромная улица"}, {"name": "Бульвар Яна Райниса, 10"}, {"name": "Туристская улица", "current": true}, {"name": "Бульвар Яна Райниса, 20"}, {"skipped": 33}, {"name": "Улица Кирова"}, {"name": "Микрорайон Чернево"}],
      "mode": "minibus"
    }
  ],
  "registrationNote": "Pixel anchors registered to the supplied respondent-05 map. Arrival clocks are research fixtures. Walking durations and distances were checked in Yandex Maps on 2026-10-26; see walkingVerifiedAt.",
  "alternate": {
    "city": "Красногорск, Московская область",
    "address": "СНТ Садовод-Сад-3, 346",
    "frequentStopIndex": -1,
    "map": "respondent-05-sadovod-clean.png",
    "mapExtension": [{"file":"respondent-05-sadovod-east-extension.png","bounds":[[-466.087,-384.00316655357796],[2152.0037145466886,2234.0875479931105]],"opacity":0.6},{"file":"respondent-05-sadovod-extension.png","bounds":[[-466.087,-375.652],[1396.522,2179.13]]}],
    "mapSize": [1248, 2004],
    "mapMaxZoom": 0,
    "origin": [1096, 700],
    "stopNames": [
      "Лыжный стадион",
      "Лыжный стадион",
      "Научно-технический центр",
      "Детский клинический центр имени Рошаля",
      "Детский клинический центр имени Рошаля",
      "Детский клинический центр имени Рошаля"
    ],
    "stopShortNames": ["Лыжный стадион", "Лыжный стадион", "Научно-технический центр", "Центр имени Рошаля", "Центр имени Рошаля", "Центр имени Рошаля"],
    "stopIds": ["stop__9649118", "stop__9649117", "stop__9649115", "5940712587", "5303223076", "5301699726"],
    "stopHints": ["", "", "", "", "", ""],
    "cardGroups": [[0, 1, 2], [3, 4, 5]],
    "loadGroupOnMap": true,
    "platforms": [[608, 314], [562, 292], [277, 508], [674, 1658], [770, 1511], [824, 1334]],
    "meters": [680, 800, 960, 1230, 1190, 1290],
    "walkMinutes": [8, 9, 11, 16, 15, 17],
    "walkingVerifiedAt": "2026-10-26",
    "walks": [
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [546, 673],
        [521, 636],
        [484, 575],
        [431, 500],
        [402, 463],
        [450, 430],
        [530, 384],
        [595, 357],
        [608, 314]
      ],
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [546, 673],
        [521, 636],
        [484, 575],
        [431, 500],
        [402, 463],
        [450, 430],
        [530, 384],
        [595, 357],
        [580, 340],
        [562, 292]
      ],
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [546, 673],
        [521, 636],
        [484, 575],
        [431, 500],
        [402, 463],
        [350, 480],
        [277, 508]
      ],
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [600, 746],
        [647, 845],
        [703, 955],
        [750, 1064],
        [788, 1163],
        [810, 1260],
        [813, 1334],
        [810, 1400],
        [792, 1480],
        [760, 1570],
        [714, 1620],
        [674, 1658]
      ],
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [600, 746],
        [647, 845],
        [703, 955],
        [750, 1064],
        [788, 1163],
        [810, 1260],
        [813, 1334],
        [810, 1400],
        [792, 1480],
        [770, 1511]
      ],
      [
        [1096, 700],
        [1074, 734],
        [1019, 748],
        [969, 765],
        [933, 747],
        [862, 724],
        [790, 681],
        [745, 655],
        [688, 650],
        [618, 665],
        [578, 686],
        [600, 746],
        [647, 845],
        [703, 955],
        [750, 1064],
        [788, 1163],
        [810, 1260],
        [824, 1334]
      ]
    ],
    "roadPaths": [
      [[-466, 885], [-360, 839], [-260, 797], [-170, 760], [-90, 725], [-40, 702], [0, 680], [300, 500], [520, 390], [610, 345], [608, 314], [570, 230], [520, 0], [520, -25], [544, -53], [610, -87], [690, -128], [775, -174], [815, -223], [840, -284], [865, -345], [890, -376]],
      [[875, -376], [850, -345], [825, -284], [800, -223], [760, -184], [675, -138], [595, -97], [529, -63], [488, -30], [470, 0], [517, 180], [562, 292], [595, 340], [520, 390], [300, 500], [0, 680], [-40, 702], [-90, 725], [-170, 760], [-260, 797], [-360, 839], [-466, 885]],
      [[875, -376], [850, -345], [825, -284], [800, -223], [760, -184], [675, -138], [595, -97], [529, -63], [488, -30], [470, 0], [517, 180], [562, 292], [595, 340], [520, 390], [402, 458], [277, 508], [0, 680], [-40, 702], [-90, 725], [-170, 760], [-260, 797], [-360, 839], [-466, 885]],
      [[200, 2004], [450, 1840], [674, 1658], [745, 1585], [788, 1630], [802, 2004]],
      [
        [521, 636],
        [600, 746],
        [647, 845],
        [703, 955],
        [750, 1064],
        [788, 1163],
        [810, 1260],
        [813, 1334],
        [810, 1400],
        [770, 1511],
        [750, 1560],
        [790, 1515],
        [824, 1334]
      ],
      [[770, 1511], [790, 1480], [824, 1334], [825, 1260], [803, 1163], [765, 1064], [718, 955], [662, 845], [615, 746], [536, 636]]
    ],
    "stopWaypoints": [10, 11, 15, 2, 9, 2],
    "nearestMetro": {"name": "Митино", "line": "Арбатско-Покровская линия", "badge": "3", "color": "#0078c9", "pos": [494.54, 375.16]},
    "addressSource": "https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/snt_sadovod_sad_3_346/Z04YdQVoT0MCQFtvfXR1cXtqZQ==/",
    "sources": [
      "https://yandex.ru/maps/213/moscow/stops/stop__9649118/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9649117/",
      "https://yandex.ru/maps/213/moscow/stops/stop__9649115/",
      "https://yandex.ru/maps/213/moscow/stops/5940712587/",
      "https://yandex.ru/maps/213/moscow/stops/5303223076/",
      "https://yandex.ru/maps/213/moscow/stops/5301699726/"
    ],
    "services": [
      {
        "n": "806",
        "to": "Микрорайон Чернево",
        "directionLabel": "до «Микрорайон Чернево»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "Микрорайон Чернево"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"name": "Госархив · 1F"}, {"name": "Колледж"}, {"name": "Проходная"}, {"name": "Музей завода"}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true}, {"name": "Химчистка"}, {"name": "Почта"}, {"name": "Школа"}, {"name": "Улица Кирова"}, {"name": "Микрорайон Чернево"}]
      },
      {
        "n": "1566",
        "to": "Микрорайон Чернево",
        "directionLabel": "до «Микрорайон Чернево»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Метро Тушинская · 1A", "Микрорайон Чернево"],
        "routeOverview": [{"name": "Метро Тушинская · 1A"}, {"skipped": 13}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Химчистка", "minute": 2}, {"name": "Почта", "minute": 3}, {"name": "Школа", "minute": 4}, {"name": "Улица Кирова", "minute": 6}, {"name": "Микрорайон Чернево", "minute": 8}]
      },
      {
        "n": "833",
        "to": "Станция МЦД Опалиха",
        "directionLabel": "до «Станция МЦД Опалиха»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Лыжный стадион", "Станция МЦД Опалиха"],
        "routeOverview": [{"name": "Лыжный стадион", "current": true}, {"name": "Станция МЦД Опалиха"}]
      },
      {
        "n": "824",
        "to": "Микрорайон Чернево",
        "directionLabel": "до «Микрорайон Чернево»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Деревня Захарково", "Микрорайон Чернево"],
        "routeOverview": [{"name": "Деревня Захарково"}, {"skipped": 17}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Химчистка", "minute": 2}, {"name": "Почта", "minute": 3}, {"name": "Школа", "minute": 4}, {"name": "Улица Кирова", "minute": 6}, {"name": "Микрорайон Чернево", "minute": 7}]
      },
      {
        "n": "833к",
        "to": "ЖК Опалиха О2",
        "directionLabel": "до «ЖК Опалиха О2»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "ЖК Опалиха О2"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"name": "Госархив · 1F"}, {"name": "Колледж"}, {"name": "Проходная"}, {"name": "Музей завода"}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Химчистка", "minute": 3}, {"skipped": 16}, {"name": "Детский сад Чароит"}, {"name": "ЖК Опалиха О2"}]
      },
      {
        "n": "16к",
        "to": "Станция МЦД Красногорская",
        "directionLabel": "до «Станция МЦД Красногорская»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Детский клинический центр имени Рошаля", "Станция МЦД Красногорская"],
        "routeOverview": [{"name": "Детский клинический центр имени Рошаля"}, {"name": "Лыжный стадион", "current": true}, {"name": "Химчистка"}, {"skipped": 6}, {"name": "Магазин Юбилейный"}, {"name": "Станция МЦД Красногорская"}]
      },
      {
        "n": "806к",
        "to": "Микрорайон Чернево",
        "directionLabel": "до «Микрорайон Чернево»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "Микрорайон Чернево"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"name": "Госархив · 1F"}, {"name": "Колледж"}, {"name": "Проходная"}, {"name": "Музей завода"}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Химчистка", "minute": 3}, {"name": "Почта", "minute": 4}, {"name": "Школа", "minute": 5}, {"name": "Улица Кирова", "minute": 6}, {"name": "Микрорайон Чернево", "minute": 7}]
      },
      {
        "n": "878к",
        "mode": "minibus",
        "to": "Микрорайон Чернево",
        "directionLabel": "до «Микрорайон Чернево»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Метро Сходненская", "Микрорайон Чернево"],
        "routeOverview": [{"name": "Метро Сходненская"}, {"skipped": 33}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true}, {"name": "Химчистка"}, {"name": "Почта"}, {"name": "Школа"}, {"name": "Улица Кирова"}, {"name": "Микрорайон Чернево"}]
      },
      {
        "n": "59",
        "to": "Стадион Зоркий",
        "directionLabel": "до «Стадион Зоркий»",
        "stop": 0,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Ильинский бульвар", "Стадион Зоркий", "Ильинский бульвар"],
        "routeOverview": [{"name": "Ильинский бульвар"}, {"skipped": 11}, {"name": "Научно-технический центр"}, {"name": "Лыжный стадион", "current": true}, {"name": "Химчистка"}, {"skipped": 7}, {"name": "Павшино-2"}, {"name": "Ильинский бульвар"}]
      },
      {
        "n": "806",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Научно-технический центр", "minute": 1}, {"name": "Музей завода", "minute": 3}, {"name": "Проходная", "minute": 4}, {"name": "Колледж", "minute": 5}, {"name": "Станция МЦД Павшино · 1C", "minute": 11}]
      },
      {
        "n": "1566",
        "to": "Метро Тушинская · 4B",
        "directionLabel": "до «Метро Тушинская · 4B»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Метро Тушинская · 4B"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Научно-технический центр"}, {"skipped": 11}, {"name": "Сходненский тупик"}, {"name": "Метро Тушинская · 4B"}]
      },
      {
        "n": "833",
        "to": "Станция МЦД Опалиха",
        "directionLabel": "до «Станция МЦД Опалиха»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "Станция МЦД Опалиха", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"skipped": 29}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Научно-технический центр"}, {"name": "Музей завода"}, {"name": "Проходная"}, {"name": "Колледж"}, {"name": "Станция МЦД Павшино · 1C"}]
      },
      {
        "n": "824",
        "to": "Деревня Захарково",
        "directionLabel": "до «Деревня Захарково»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Деревня Захарково"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Научно-технический центр"}, {"skipped": 17}, {"name": "По требованию"}, {"name": "Деревня Захарково"}]
      },
      {
        "n": "15к",
        "to": "Лыжный стадион",
        "directionLabel": "до «Лыжный стадион»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Красногорская", "Лыжный стадион", "Станция МЦД Красногорская"],
        "routeOverview": [{"name": "Станция МЦД Красногорская"}, {"skipped": 8}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "note": "Промежуточная конечная", "current": true, "minute": 0}, {"name": "Научно-технический центр", "minute": 1}, {"skipped": 6}, {"name": "Магазин Юбилейный", "minute": 10}, {"name": "Станция МЦД Красногорская", "minute": 12}]
      },
      {
        "n": "806к",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Научно-технический центр"}, {"name": "Музей завода"}, {"name": "Проходная"}, {"name": "Колледж"}, {"name": "Станция МЦД Павшино · 1C"}]
      },
      {
        "n": "16к",
        "to": "Детский клинический центр имени Рошаля",
        "directionLabel": "до «Детский клинический центр имени Рошаля»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Красногорская", "Детский клинический центр имени Рошаля"],
        "routeOverview": [{"name": "Станция МЦД Красногорская"}, {"skipped": 7}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Детский клинический центр имени Рошаля"}]
      },
      {
        "n": "833к",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["ЖК Опалиха О2", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "ЖК Опалиха О2"}, {"skipped": 15}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true, "minute": 0}, {"name": "Научно-технический центр", "minute": 1}, {"name": "Музей завода", "minute": 2}, {"name": "Проходная", "minute": 3}, {"name": "Колледж", "minute": 5}, {"name": "Станция МЦД Павшино · 1C", "minute": 10}]
      },
      {
        "n": "878к",
        "mode": "minibus",
        "to": "Метро Сходненская · 9A",
        "directionLabel": "до «Метро Сходненская · 9A»",
        "stop": 1,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Метро Сходненская · 9A"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион", "current": true}, {"name": "Научно-технический центр"}, {"skipped": 30}, {"name": "Аэродромная улица"}, {"name": "Метро Сходненская · 9A"}]
      },
      {
        "n": "833к",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["ЖК Опалиха О2", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "ЖК Опалиха О2"}, {"skipped": 16}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true, "minute": 0}, {"name": "Музей завода", "minute": 2}, {"name": "Проходная", "minute": 3}, {"name": "Колледж", "minute": 4}, {"name": "Станция МЦД Павшино · 1C", "minute": 9}]
      },
      {
        "n": "806",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"name": "Проходная"}, {"name": "Колледж"}, {"name": "Станция МЦД Павшино · 1C"}]
      },
      {
        "n": "1566",
        "to": "Метро Тушинская · 4B",
        "directionLabel": "до «Метро Тушинская · 4B»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Метро Тушинская · 4B"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"skipped": 10}, {"name": "Сходненский тупик"}, {"name": "Метро Тушинская · 4B"}]
      },
      {
        "n": "833",
        "to": "Станция МЦД Опалиха",
        "directionLabel": "до «Станция МЦД Опалиха»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "Станция МЦД Опалиха", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"skipped": 30}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"name": "Проходная"}, {"name": "Колледж"}, {"name": "Станция МЦД Павшино · 1C"}]
      },
      {
        "n": "824",
        "to": "Деревня Захарково",
        "directionLabel": "до «Деревня Захарково»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Деревня Захарково"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"skipped": 16}, {"name": "По требованию"}, {"name": "Деревня Захарково"}]
      },
      {
        "n": "15к",
        "to": "Лыжный стадион",
        "directionLabel": "до «Лыжный стадион»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Красногорская", "Лыжный стадион", "Станция МЦД Красногорская"],
        "routeOverview": [{"name": "Станция МЦД Красногорская"}, {"skipped": 9}, {"name": "Лыжный стадион", "note": "Промежуточная конечная"}, {"name": "Научно-технический центр", "current": true, "minute": 0}, {"name": "Музей завода", "minute": 1}, {"skipped": 5}, {"name": "Магазин Юбилейный", "minute": 9}, {"name": "Станция МЦД Красногорская", "minute": 11}]
      },
      {
        "n": "806к",
        "to": "Станция МЦД Павшино · 1C",
        "directionLabel": "до «Станция МЦД Павшино · 1C»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Станция МЦД Павшино · 1C"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"name": "Проходная"}, {"name": "Колледж"}, {"name": "Станция МЦД Павшино · 1C"}]
      },
      {
        "n": "878к",
        "mode": "minibus",
        "to": "Метро Сходненская · 9A",
        "directionLabel": "до «Метро Сходненская · 9A»",
        "stop": 2,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Микрорайон Чернево", "Метро Сходненская · 9A"],
        "routeOverview": [{"name": "Микрорайон Чернево"}, {"name": "Улица Кирова"}, {"name": "Школа"}, {"name": "Почта"}, {"name": "Химчистка"}, {"name": "Лыжный стадион"}, {"name": "Научно-технический центр", "current": true}, {"name": "Музей завода"}, {"skipped": 29}, {"name": "Аэродромная улица"}, {"name": "Метро Сходненская · 9A"}]
      },
      {
        "n": "328",
        "to": "Мир Митино",
        "directionLabel": "до «Мир Митино»",
        "stop": 3,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Улица Зенитчиков", "Мир Митино"],
        "routeOverview": [{"name": "Улица Зенитчиков"}, {"name": "Детский клинический центр имени Рошаля", "current": true}, {"name": "Митино Парк"}, {"skipped": 10}, {"name": "Село Рождествено"}, {"name": "Мир Митино"}]
      },
      {
        "n": "852",
        "to": "ЖК Мортонград",
        "directionLabel": "до «ЖК Мортонград»",
        "stop": 3,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeQualifier": "областной",
        "routeHeading": ["Станция МЦД Павшино · 1B", "Жилой комплекс Мортонград"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"skipped": 9}, {"name": "Пенягинская улица"}, {"name": "Детский клинический центр имени Рошаля", "current": true}, {"name": "Митино Парк"}, {"skipped": 4}, {"name": "Торговый центр"}, {"name": "Жилой комплекс Мортонград"}]
      },
      {
        "n": "32",
        "to": "ЖК Пятницкие кварталы",
        "directionLabel": "до «ЖК Пятницкие кварталы»",
        "stop": 3,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeQualifier": "областной",
        "routeHeading": ["Станция МЦД Павшино · 1A", "ЖК Пятницкие кварталы"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1A"}, {"skipped": 7}, {"name": "Пенягинская улица"}, {"name": "Детский клинический центр имени Рошаля", "current": true}, {"name": "Митино Парк"}, {"skipped": 25}, {"name": "Сабурово"}, {"name": "ЖК Пятницкие кварталы"}]
      },
      {
        "n": "14к",
        "to": "Детский клинический центр имени Рошаля",
        "directionLabel": "до «Детский клинический центр имени Рошаля»",
        "stop": 4,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Станция МЦД Павшино · 1B", "Детский клинический центр имени Рошаля", "Станция МЦД Павшино · 1A"],
        "routeOverview": [{"name": "Станция МЦД Павшино · 1B"}, {"name": "Госархив · 1F"}, {"name": "Колледж"}, {"name": "Проходная"}, {"name": "Музей завода"}, {"name": "Научно-технический центр"}, {"name": "Детский клинический центр имени Рошаля", "current": true, "note": "Промежуточная конечная"}, {"name": "Детский клинический центр имени Рошаля"}, {"name": "Кладбище · 1B"}, {"name": "Павшино-2"}, {"name": "Станция МЦД Павшино · 1A"}]
      },
      {
        "n": "16к",
        "to": "Детский клинический центр имени Рошаля",
        "directionLabel": "до «Детский клинический центр имени Рошаля»",
        "stop": 4,
        "first": 60,
        "gap": 420,
        "scheduleOnly": true,
        "routeHeading": ["Детский клинический центр имени Рошаля", "Детский клинический центр имени Рошаля"],
        "routeOverview": [{"name": "Детский клинический центр имени Рошаля", "current": true}],
        "noBoarding": true
      },
      {
        "n": "16к",
        "to": "Станция МЦД Красногорская",
        "directionLabel": "до «Станция МЦД Красногорская»",
        "stop": 5,
        "first": 60,
        "gap": 420,
        "scheduleOnly": false,
        "routeHeading": ["Детский клинический центр имени Рошаля", "Станция МЦД Красногорская"],
        "routeOverview": [{"name": "Детский клинический центр имени Рошаля", "current": true}, {"name": "Лыжный стадион"}, {"skipped": 7}, {"name": "Магазин Юбилейный"}, {"name": "Станция МЦД Красногорская"}]
      }
    ],
    "registrationNote": "Pixel anchors registered to the supplied respondent-05 map. Arrival clocks are research fixtures. Walking durations and distances were checked in Yandex Maps on 2026-10-26; see walkingVerifiedAt."
  }
};
// Saved Yandex timetable for 26 October 2026; actual departures, not a repeating service cycle.
participantProfiles['respondent-05'].trainStation={
  name:'Трикотажная',source:'https://rasp.yandex.ru/station/9602036/?direction=all',
  map:'respondent-05-trikotazhnaya.png',mapSize:[1906,1279],pos:[655,975],origin:[1179,221],
  originDotRadius:11,originLocationIcon:false,pinOffsetX:0,
  timetableDate:'2026-10-26',snapshotTime:'15:16',timetableLabel:'26 октября 2026',
  departures:[
    {"sourceTime":"00:02","number":"7396/7395","name":"Электричка","from":"Нахабино","to":"Москва (Курский вокзал)"},
    {"sourceTime":"00:08","number":"7284/7283","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"00:14","number":"6545","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Дедовск"},
    {"sourceTime":"00:14","number":"6438/6437","name":"Электричка","from":"Новоиерусалимская","to":"Москва (Курский вокзал)"},
    {"sourceTime":"00:20","number":"7286/7285","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"00:26","number":"6444/6443/6443","name":"Электричка","from":"Волоколамск","to":"Чехов"},
    {"sourceTime":"00:32","number":"7288/7287","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"00:38","number":"6536","name":"Электричка","from":"Нахабино","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"00:44","number":"6234/6233","name":"Электричка","from":"Чехов","to":"Новоиерусалимская"},
    {"sourceTime":"00:56","number":"7292/7291","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"01:05","number":"7297","name":"Электричка","from":"Москва (Курский вокзал)","to":"Нахабино"},
    {"sourceTime":"01:38","number":"6238/6237","name":"Электричка","from":"Львовская","to":"Румянцево"},
    {"sourceTime":"01:44","number":"7300/7299","name":"Электричка","from":"Москва (Курский вокзал)","to":"Нахабино"},
    {"sourceTime":"04:37","number":"6302/6301","name":"Электричка","from":"Дедовск","to":"Серпухов"},
    {"sourceTime":"04:38","number":"6501","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"04:50","number":"7204/7203","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"05:02","number":"7206/7205","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"05:08","number":"6502","name":"Электричка","from":"Новоиерусалимская","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"05:14","number":"7208/7207","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"05:26","number":"6304/6303","name":"Электричка","from":"Румянцево","to":"Львовская"},
    {"sourceTime":"05:32","number":"6504","name":"Электричка","from":"Нахабино","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"05:38","number":"7212/7211","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"05:44","number":"6503","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Волоколамск"},
    {"sourceTime":"05:44","number":"6306/6305","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"05:50","number":"7214/7213","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"05:56","number":"7302/7301","name":"Электричка","from":"Москва (Курский вокзал)","to":"Нахабино"},
    {"sourceTime":"06:02","number":"7216/7215","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"06:08","number":"6308/6307","name":"Электричка","from":"Шаховская","to":"Серпухов"},
    {"sourceTime":"06:08","number":"6104/6103","name":"Электричка","from":"Москва (Курский вокзал)","to":"Дедовск"},
    {"sourceTime":"06:14","number":"7218/7217","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"06:20","number":"7306/7305","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"06:26","number":"7220/7219","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"06:26","number":"6106/6105","name":"Электричка","from":"Серпухов","to":"Румянцево"},
    {"sourceTime":"06:32","number":"7308/7307","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"06:32","number":"6310/6309/6953","name":"Электричка","from":"Новоиерусалимская","to":"Тула (Московский вокзал)"},
    {"sourceTime":"06:38","number":"7222/7221","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"06:44","number":"6312/6311","name":"Электричка","from":"Румянцево","to":"Шарапова Охота"},
    {"sourceTime":"06:44","number":"6108/6107","name":"Электричка","from":"Чехов","to":"Шаховская"},
    {"sourceTime":"06:50","number":"7224/7223","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"06:50","number":"6505","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"06:56","number":"6314/6313","name":"Электричка","from":"Новоиерусалимская","to":"Серпухов"},
    {"sourceTime":"06:56","number":"7312/7311","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"07:02","number":"7226/7225","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"07:02","number":"6515","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Дедовск"},
    {"sourceTime":"07:08","number":"7314/7313","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"07:08","number":"6542","name":"Электричка","from":"Волоколамск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"07:14","number":"7228/7227","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"07:14","number":"6110/6109","name":"Электричка","from":"Шарапова Охота","to":"Новоиерусалимская"},
    {"sourceTime":"07:20","number":"7316/7315","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"07:20","number":"6318/6317","name":"Электричка","from":"Новоиерусалимская","to":"Москворечье"},
    {"sourceTime":"07:26","number":"7230/7229","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"07:32","number":"7318/7317","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"07:32","number":"6506","name":"Электричка","from":"Румянцево","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"07:38","number":"6112/6111","name":"Электричка","from":"Серпухов","to":"Волоколамск"},
    {"sourceTime":"07:44","number":"6320/6319","name":"Электричка","from":"Волоколамск","to":"Львовская"},
    {"sourceTime":"07:44","number":"7320/7319","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"07:50","number":"7234/7233","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"07:50","number":"6114/6113","name":"Электричка","from":"Чехов","to":"Румянцево"},
    {"sourceTime":"07:56","number":"7322/7321","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:02","number":"7236/7235","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"08:02","number":"6116/6115","name":"Электричка","from":"Серпухов","to":"Новоиерусалимская"},
    {"sourceTime":"08:08","number":"7324/7323","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:08","number":"6508","name":"Электричка","from":"Дедовск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"08:14","number":"7238/7237","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"08:14","number":"6507","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Дедовск"},
    {"sourceTime":"08:20","number":"7326/7325","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:20","number":"6322/6321","name":"Электричка","from":"Новоиерусалимская","to":"Чехов"},
    {"sourceTime":"08:26","number":"7240/7239","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"08:32","number":"7328/7327","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:32","number":"6324/6323","name":"Электричка","from":"Румянцево","to":"Люблино"},
    {"sourceTime":"08:38","number":"7242/7241","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"08:38","number":"6118/6117","name":"Электричка","from":"Серпухов","to":"Шаховская"},
    {"sourceTime":"08:44","number":"6326/6325","name":"Электричка","from":"Дедовск","to":"Серпухов"},
    {"sourceTime":"08:44","number":"7330/7329","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:50","number":"7244/7243","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"08:50","number":"6120/6119","name":"Электричка","from":"Чехов","to":"Румянцево"},
    {"sourceTime":"08:56","number":"7332/7331","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"08:56","number":"6330/6329","name":"Электричка","from":"Волоколамск","to":"Львовская"},
    {"sourceTime":"09:02","number":"7246/7245","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"09:02","number":"6122/6121","name":"Электричка","from":"Серпухов","to":"Новоиерусалимская"},
    {"sourceTime":"09:08","number":"7334/7333","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"09:08","number":"6332/6331","name":"Электричка","from":"Новоиерусалимская","to":"Чехов"},
    {"sourceTime":"09:14","number":"7248/7247","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"09:20","number":"7336/7335","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"09:20","number":"6334/6333/6959","name":"Электричка","from":"Шаховская","to":"Тула (Московский вокзал)"},
    {"sourceTime":"09:26","number":"7250/7249","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"09:26","number":"6511","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Волоколамск"},
    {"sourceTime":"09:32","number":"6510","name":"Электричка","from":"Новоиерусалимская","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"09:32","number":"7338/7337","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"09:38","number":"7252/7251","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"09:38","number":"6130/6129","name":"Электричка","from":"Чехов","to":"Новоиерусалимская"},
    {"sourceTime":"09:44","number":"7340/7339","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"09:50","number":"7254/7253","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"09:50","number":"6124/6123","name":"Электричка","from":"Серпухов","to":"Новоиерусалимская"},
    {"sourceTime":"09:56","number":"6512","name":"Электричка","from":"Дедовск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"09:56","number":"7342/7341","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"10:02","number":"7256/7255","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"10:02","number":"6128/6127","name":"Электричка","from":"Львовская","to":"Нахабино"},
    {"sourceTime":"10:08","number":"7344/7343","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"10:08","number":"6338/6337","name":"Электричка","from":"Новоиерусалимская","to":"Подольск"},
    {"sourceTime":"10:14","number":"7258/7257","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"10:14","number":"6132/6131","name":"Электричка","from":"Серпухов","to":"Волоколамск"},
    {"sourceTime":"10:20","number":"6340/6339","name":"Электричка","from":"Румянцево","to":"Серпухов"},
    {"sourceTime":"10:20","number":"7346/7345","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"10:26","number":"7260/7259","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"10:32","number":"7348/7347","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"10:38","number":"7262/7261","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"10:38","number":"6954/6134/6133","name":"Электричка","from":"Тула (Московский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"10:44","number":"6514","name":"Электричка","from":"Волоколамск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"10:44","number":"7350/7349","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"10:50","number":"7264/7263","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"10:50","number":"6138/6137","name":"Электричка","from":"Серпухов","to":"Волоколамск"},
    {"sourceTime":"10:56","number":"7352/7351","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"11:02","number":"7266/7265","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"11:02","number":"6140/6139","name":"Электричка","from":"Львовская","to":"Румянцево"},
    {"sourceTime":"11:08","number":"7354/7353","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"11:14","number":"7268/7267","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"11:14","number":"6142/6141","name":"Электричка","from":"Серпухов","to":"Нахабино"},
    {"sourceTime":"11:20","number":"6346/6345","name":"Электричка","from":"Новоиерусалимская","to":"Подольск"},
    {"sourceTime":"11:26","number":"7270/7269","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"11:26","number":"6549","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Дедовск"},
    {"sourceTime":"11:32","number":"7358/7357","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"11:32","number":"6454/6453","name":"Электричка","from":"Румянцево","to":"Щербинка"},
    {"sourceTime":"11:38","number":"7272/7271","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"11:38","number":"6146/6145","name":"Электричка","from":"Серпухов","to":"Румянцево"},
    {"sourceTime":"11:44","number":"7360/7359","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"11:50","number":"7274/7273","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"11:50","number":"6517","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Шаховская"},
    {"sourceTime":"11:56","number":"7362/7361","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"11:56","number":"6516","name":"Электричка","from":"Волоколамск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"12:02","number":"7276/7275","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"12:08","number":"7364/7363","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"12:08","number":"6350/6349","name":"Электричка","from":"Шаховская","to":"Подольск"},
    {"sourceTime":"12:14","number":"7278/7277","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"12:20","number":"7366/7365","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"12:20","number":"6352/6351","name":"Электричка","from":"Румянцево","to":"Москворечье"},
    {"sourceTime":"12:26","number":"7280/7279","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"12:32","number":"7368/7367","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"12:32","number":"6356/6355","name":"Электричка","from":"Нахабино","to":"Серпухов"},
    {"sourceTime":"12:38","number":"7282/7281","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"12:44","number":"7370/7369","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"12:50","number":"7284/7283","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"12:56","number":"7372/7371","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"13:02","number":"7286/7285","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"13:08","number":"7374/7373","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"13:14","number":"6152/6151","name":"Электричка","from":"Львовская","to":"Нахабино"},
    {"sourceTime":"13:15","number":"6366/6365/6963","name":"Электричка","from":"Новоиерусалимская","to":"Тула (Московский вокзал)"},
    {"sourceTime":"13:20","number":"7376/7375","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"13:26","number":"6521","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"13:38","number":"7292/7291","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"13:38","number":"6158/6157","name":"Электричка","from":"Серпухов","to":"Румянцево"},
    {"sourceTime":"13:44","number":"7380/7379","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"13:44","number":"6364/6363","name":"Электричка","from":"Нахабино","to":"Чехов"},
    {"sourceTime":"13:50","number":"7294/7293","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"13:50","number":"6166/6165","name":"Электричка","from":"Подольск","to":"Дедовск"},
    {"sourceTime":"13:56","number":"7382/7381","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"13:56","number":"6548","name":"Электричка","from":"Дедовск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"14:02","number":"7296/7295","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"14:02","number":"6523","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Шаховская"},
    {"sourceTime":"14:08","number":"7384/7383","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"14:14","number":"7298/7297","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"14:20","number":"7386/7385","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"14:26","number":"6527","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Волоколамск"},
    {"sourceTime":"14:32","number":"7388/7387","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"14:32","number":"6368/6367","name":"Электричка","from":"Шаховская","to":"Столбовая"},
    {"sourceTime":"14:38","number":"7302/7301","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"14:44","number":"7390/7389","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"14:50","number":"7304/7303","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"14:56","number":"7392/7391","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"14:56","number":"6370/6369","name":"Электричка","from":"Новоиерусалимская","to":"Серпухов"},
    {"sourceTime":"15:02","number":"7306/7305","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"15:02","number":"6170/6169","name":"Электричка","from":"Люблино","to":"Румянцево"},
    {"sourceTime":"15:08","number":"7394/7393","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"15:14","number":"7308/7307","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"15:20","number":"6372/6371","name":"Электричка","from":"Румянцево","to":"Чехов"},
    {"sourceTime":"15:26","number":"7310/7309","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"15:26","number":"6172/6171","name":"Электричка","from":"Люблино","to":"Волоколамск"},
    {"sourceTime":"15:32","number":"7398/7397","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"15:38","number":"7312/7311","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"15:38","number":"6547","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Нахабино"},
    {"sourceTime":"15:44","number":"7200/7199","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"15:44","number":"6376/6375","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"15:50","number":"6176/6175","name":"Электричка","from":"Чехов","to":"Дедовск"},
    {"sourceTime":"15:50","number":"7314/7313","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"15:56","number":"7202/7201","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"15:56","number":"6518","name":"Электричка","from":"Румянцево","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"16:02","number":"7316/7315","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"16:02","number":"6525","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"16:08","number":"6380/6379","name":"Электричка","from":"Нахабино","to":"Шарапова Охота"},
    {"sourceTime":"16:08","number":"7204/7203","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"16:14","number":"7318/7317","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"16:20","number":"7206/7205","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"16:20","number":"6384/6383","name":"Электричка","from":"Новоиерусалимская","to":"Серпухов"},
    {"sourceTime":"16:26","number":"7320/7319","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"16:32","number":"6388/6387","name":"Электричка","from":"Дедовск","to":"Львовская"},
    {"sourceTime":"16:32","number":"7208/7207","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"16:38","number":"7322/7321","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"16:38","number":"6182/6181","name":"Электричка","from":"Серпухов","to":"Новоиерусалимская"},
    {"sourceTime":"16:44","number":"7210/7209","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"16:44","number":"6390/6389","name":"Электричка","from":"Новоиерусалимская","to":"Серпухов"},
    {"sourceTime":"16:50","number":"7324/7323","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"16:56","number":"6520","name":"Электричка","from":"Румянцево","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"16:58","number":"6962/6184/6183","name":"Электричка","from":"Тула (Московский вокзал)","to":"Шаховская"},
    {"sourceTime":"17:02","number":"7326/7325","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"17:03","number":"7214/7213","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"17:08","number":"6392/6391","name":"Электричка","from":"Дедовск","to":"Шарапова Охота"},
    {"sourceTime":"17:08","number":"6186/6185","name":"Электричка","from":"Щербинка","to":"Румянцево"},
    {"sourceTime":"17:14","number":"7328/7327","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"17:14","number":"6188/6187","name":"Электричка","from":"Серпухов","to":"Новоиерусалимская"},
    {"sourceTime":"17:20","number":"6394/6393","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"17:20","number":"7216/7215","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"17:26","number":"7330/7329","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"17:26","number":"6192/6191","name":"Электричка","from":"Подольск","to":"Дедовск"},
    {"sourceTime":"17:32","number":"7218/7217","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"17:32","number":"6398/6397","name":"Электричка","from":"Нахабино","to":"Чехов"},
    {"sourceTime":"17:38","number":"7332/7331","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"17:38","number":"6529","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Новоиерусалимская"},
    {"sourceTime":"17:44","number":"6400/6399","name":"Электричка","from":"Шаховская","to":"Серпухов"},
    {"sourceTime":"17:44","number":"7220/7219","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"17:50","number":"7334/7333","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"17:50","number":"6194/6193","name":"Электричка","from":"Чехов","to":"Волоколамск"},
    {"sourceTime":"17:56","number":"6538","name":"Электричка","from":"Нахабино","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"17:56","number":"7222/7221","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"18:02","number":"7336/7335","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"18:02","number":"6200/6199","name":"Электричка","from":"Серпухов","to":"Румянцево"},
    {"sourceTime":"18:08","number":"7224/7223","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"18:08","number":"6402/6401","name":"Электричка","from":"Румянцево","to":"Чехов"},
    {"sourceTime":"18:14","number":"7338/7337","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"18:15","number":"6964/6198/6197","name":"Электричка","from":"Тула (Московский вокзал)","to":"Дедовск"},
    {"sourceTime":"18:20","number":"7226/7225","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"18:26","number":"7340/7339","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"18:26","number":"6531","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Волоколамск"},
    {"sourceTime":"18:32","number":"7228/7227","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"18:32","number":"6404/6403","name":"Электричка","from":"Новоиерусалимская","to":"Серпухов"},
    {"sourceTime":"18:44","number":"7230/7229","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"18:44","number":"6406/6405","name":"Электричка","from":"Новоиерусалимская","to":"Чехов"},
    {"sourceTime":"18:50","number":"7344/7343","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"18:50","number":"6202/6201","name":"Электричка","from":"Столбовая","to":"Новоиерусалимская"},
    {"sourceTime":"18:56","number":"6408/6407","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"18:56","number":"7232/7231","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"19:02","number":"7346/7345","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"19:08","number":"6410/6409","name":"Электричка","from":"Дедовск","to":"Львовская"},
    {"sourceTime":"19:08","number":"7234/7233","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"19:14","number":"7348/7347","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"19:14","number":"6204/6203","name":"Электричка","from":"Чехов","to":"Волоколамск"},
    {"sourceTime":"19:20","number":"6522","name":"Электричка","from":"Новоиерусалимская","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"19:20","number":"7236/7235","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"19:26","number":"7350/7349","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"19:26","number":"6206/6205","name":"Электричка","from":"Серпухов","to":"Дедовск"},
    {"sourceTime":"19:32","number":"7238/7237","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"19:32","number":"6414/6413","name":"Электричка","from":"Шаховская","to":"Серпухов"},
    {"sourceTime":"19:38","number":"7352/7351","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"19:38","number":"6543","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Румянцево"},
    {"sourceTime":"19:44","number":"6210/6209","name":"Электричка","from":"Серпухов","to":"Волоколамск"},
    {"sourceTime":"19:50","number":"7354/7353","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"19:50","number":"7242/7241","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"19:55","number":"6208/6207","name":"Электричка","from":"Львовская","to":"Новоиерусалимская"},
    {"sourceTime":"20:02","number":"7356/7355","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"20:04","number":"7240/7239","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"20:08","number":"6416/6415/6969","name":"Электричка","from":"Дедовск","to":"Тула (Московский вокзал)"},
    {"sourceTime":"20:14","number":"7358/7357","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"20:20","number":"7246/7245","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"20:26","number":"7360/7359","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"20:32","number":"6418/6417","name":"Электричка","from":"Волоколамск","to":"Чехов"},
    {"sourceTime":"20:32","number":"7248/7247","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"20:38","number":"6212/6211","name":"Электричка","from":"Шарапова Охота","to":"Дедовск"},
    {"sourceTime":"20:44","number":"6526","name":"Электричка","from":"Новоиерусалимская","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"20:44","number":"7250/7249","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"20:50","number":"7364/7363","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"20:50","number":"6214/6213","name":"Электричка","from":"Львовская","to":"Шаховская"},
    {"sourceTime":"20:56","number":"6420/6419","name":"Электричка","from":"Румянцево","to":"Серпухов"},
    {"sourceTime":"20:56","number":"7252/7251","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"21:02","number":"6216/6215","name":"Электричка","from":"Чехов","to":"Волоколамск"},
    {"sourceTime":"21:08","number":"6422/6421","name":"Электричка","from":"Новоиерусалимская","to":"Львовская"},
    {"sourceTime":"21:08","number":"6533","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Нахабино"},
    {"sourceTime":"21:14","number":"7368/7367","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"21:14","number":"6222/6221","name":"Электричка","from":"Подольск","to":"Новоиерусалимская"},
    {"sourceTime":"21:20","number":"7256/7255","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"21:26","number":"7370/7369","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"21:26","number":"6220/6219","name":"Электричка","from":"Шарапова Охота","to":"Новоиерусалимская"},
    {"sourceTime":"21:32","number":"6424/6423","name":"Электричка","from":"Волоколамск","to":"Чехов"},
    {"sourceTime":"21:32","number":"7258/7257","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"21:38","number":"7372/7371","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"21:44","number":"6426/6425","name":"Электричка","from":"Дедовск","to":"Подольск"},
    {"sourceTime":"21:50","number":"7374/7373","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"21:56","number":"7262/7261","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"21:56","number":"6530","name":"Электричка","from":"Румянцево","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"22:02","number":"7376/7375","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"22:02","number":"6218/6217","name":"Электричка","from":"Серпухов","to":"Нахабино"},
    {"sourceTime":"22:08","number":"7264/7263","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"22:08","number":"6534","name":"Электричка","from":"Дедовск","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"22:14","number":"7378/7377","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"22:14","number":"6224/6223","name":"Электричка","from":"Серпухов","to":"Волоколамск"},
    {"sourceTime":"22:20","number":"7266/7265","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"22:20","number":"6432/6431","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"22:26","number":"6228/6227","name":"Электричка","from":"Чехов","to":"Новоиерусалимская"},
    {"sourceTime":"22:32","number":"7268/7267","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"22:32","number":"6532","name":"Электричка","from":"Нахабино","to":"Москва (Рижский вокзал)"},
    {"sourceTime":"22:38","number":"6537","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Нахабино"},
    {"sourceTime":"22:44","number":"7270/7269","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"22:50","number":"6434/6433","name":"Электричка","from":"Шаховская","to":"Чехов"},
    {"sourceTime":"22:50","number":"6232/6231","name":"Электричка","from":"Серпухов","to":"Нахабино"},
    {"sourceTime":"22:56","number":"7272/7271","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"22:56","number":"7380/7379","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"23:02","number":"7386/7385","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"23:08","number":"6430/6429","name":"Электричка","from":"Новоиерусалимская","to":"Царицыно"},
    {"sourceTime":"23:08","number":"6230/6229","name":"Электричка","from":"Чехов","to":"Новоиерусалимская"},
    {"sourceTime":"23:14","number":"7388/7387","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"23:20","number":"7276/7275","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"23:26","number":"7390/7389","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"23:38","number":"7392/7391","name":"Электричка","from":"Нахабино","to":"Подольск"},
    {"sourceTime":"23:38","number":"6541","name":"Электричка","from":"Москва (Рижский вокзал)","to":"Волоколамск"},
    {"sourceTime":"23:44","number":"7280/7279","name":"Электричка","from":"Подольск","to":"Нахабино"},
    {"sourceTime":"23:50","number":"6436/6435","name":"Электричка","from":"Волоколамск","to":"Серпухов"},
    {"sourceTime":"23:50","number":"6970/6242/6241","name":"Электричка","from":"Тула (Московский вокзал)","to":"Нахабино"},
    {"sourceTime":"23:56","number":"7282/7281","name":"Электричка","from":"Подольск","to":"Нахабино"}
  ]
};
// Shared research behaviour: inherited by every existing and future participant/address.
const prototypeDefaults=Object.freeze({extendedBusSchedule:true,directBusTicket:true});
for(const p of Object.values(participantProfiles)){
  Object.assign(p,prototypeDefaults);
  for(const location of [p,p.alternate].filter(Boolean)){
    Object.assign(location,prototypeDefaults);
    for(let stop=0;stop<location.stopNames.length;stop++){
      const all=location.services.filter(r=>r.stop===stop);
      const actual=all.filter(r=>!r.previewHidden&&(!r.scheduleOnly||!all.some(other=>!other.scheduleOnly&&other.n===r.n&&other.to===r.to)));
      const gap=actual.length>1?420:300;
      for(const service of all)service.gap=gap;
      actual.forEach((service,index)=>service.first=60+Math.round(index*gap/actual.length));
    }
  }
}
// 552 turns from Bolshaya Pochtovaya into Novaya Doroga towards Rubtsovskaya.
// 78 continues on Bolshaya Pochtovaya towards Rubtsov lane; do not reverse both.
for(const service of participantProfiles['respondent-03'].services){
  if(service.stop===2&&service.n==='552'){
    service.path=[[2744,650],[2520,870],[2320,1060],[2130,1232],
      [2045,1315],[2200,1470],[2400,1665],[2600,1860],[2760,2020]];
    service.stopWaypoint=3;
  }
}
// Supplied rail overview for the second address; station schedules are separate.
participantProfiles['respondent-05'].alternate.trainMap={
  name:'Павшино',pos:[632,880],
  map:'respondent-05-sadovod-train.png',mapSize:[2658,1738],
  origin:[1944.25,664.5],originDotRadius:15,originLocationIcon:false,
  focusPoints:[[632,880],[930,1460]]
};
function trainMapContext(){return layer==='train'?participantLocation(scenario)?.trainMap||null:null}

const participantProfile=participantProfiles[new URLSearchParams(location.search).get('participant')]||null;

function participantLocation(s){return s==='familiar'?participantProfile:s==='unfamiliar'?participantProfile?.alternate||null:null}
function personalTransportLocation(s,l){return participantProfile?.alternate&&l!=='bus'?null:participantLocation(s)}

function stopPinBelow(i){return personalTransportLocation(scenario,layer)?.pinBelowStops?.includes(i)||false}

function initialFavoriteStops(){return participantProfile&&participantProfile.favoriteByDefault!==false?[participantProfile.favoriteStop]:[]}

// Shared countryside fixture. Coordinates follow the existing map image.
const farArea={
  origin:[1050,440],
  stops:[
    {name:'Озёрная',minutes:30,path:[[1050,440],[1005,580],[975,680],[994,725],[1050,785],[1125,845]]},
    {name:'Центральная улица',minutes:35,path:[[1050,440],[1005,580],[975,680],[915,600],[865,550],[820,510],[785,488]]},
    {name:'Дачная улица',minutes:42,path:[[1050,440],[1005,580],[975,680],[994,725],[1050,785],[1125,845],[1220,930],[1316,1011]]}
  ]
};
