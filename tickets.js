'use strict';
// Ticket views share the purchase snapshot rather than the current map selection.
const ticketAsset=name=>`<img src="assets/ticket-${name}.svg" alt="" draggable="false">`;
let openedTicket=null;
const ticketDate=(value,year=false)=>new Date(value).toLocaleDateString('ru-RU',{timeZone:'Europe/Moscow',day:'numeric',month:'long',...(year?{year:'numeric'}:{})});
const ticketTime=value=>new Date(value).toLocaleTimeString('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit'});
function ticketSnapshot(t){
  const created=Number(t.id)||Date.now();
  return {...t,created,number:t.number||String(created).slice(-9),quantity:t.quantity||1,total:t.total||(t.type==='bus'?38:124)*(t.quantity||1),route:t.route||'м5',destination:t.destination||(t.type==='bus'?'Щедрино':trainDestination),origin:t.origin||trainOrigin,payment:t.payment||0,expiresAt:t.expiresAt||created+30*60*1000,validFrom:t.validFrom||created,validUntil:t.validUntil||created+24*60*60*1000};
}
function ticketDetailRow(glyph,label,value){return `<div class="ticket-detail-row">${ticketAsset(glyph)}<div><small>${label}</small><span>${esc(value)}</span></div></div>`}
function ticketTimerMarkup(){return `<div class="ticket-countdown" role="timer" aria-label="Оставшееся время действия">${['час','мин','сек'].map((label,i)=>`${i?'<b class="ticket-colon">:</b>':''}<div class="ticket-time-group"><div><span data-ticket-digit="${i*2}">0</span><span data-ticket-digit="${i*2+1}">0</span></div><small>${label}</small></div>`).join('')}</div>`}
function updateTicketTimer(){if(!openedTicket||screen!=='ticket'||!$('#ticket-validity-title'))return;const seconds=Math.max(0,Math.ceil((openedTicket.expiresAt-Date.now())/1000));const value=[Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join('');$$('[data-ticket-digit]').forEach((el,i)=>el.textContent=value[i]);$('#ticket-validity-title').textContent=seconds?'Срок действия билета':'Срок действия истёк';$('.ticket-countdown').setAttribute('aria-label',`${value.slice(0,2)} часов ${value.slice(2,4)} минут ${value.slice(4)} секунд`)}
function showTicket(t){
  if(t.type==='metro'){showMetroQr();return}
  openedTicket=ticketSnapshot(t);const ticket=openedTicket,train=ticket.type==='train';screen='ticket';
  const title=train?'Электричка':`${ticket.vehicleMode==='tram'?'Трамвай':'Автобус'} ${esc(ticket.route)}`,route=train?`${esc(ticket.origin)} → ${esc(ticket.destination)}`:`До «${esc(ticket.destination)}»`;
  const paymentLabels=[(train?'Visa':'MasterCard')+' • 1006','Карта Плюса','MasterCard • 2366'];
  page('Мои билеты',`<div class="ticket-view-scroll"><article class="travel-ticket"><div class="travel-ticket-heading"><h2>${title}</h2><p>${route}</p></div><div class="ticket-perforation" aria-hidden="true">${ticketAsset('holes')}${ticketAsset('hole-left')}${ticketAsset('hole-right')}</div><div class="travel-ticket-body">${train?`<div class="ticket-code-stage"><div class="ticket-train-code"><img src="assets/ticket-train-code.png" alt="Код учебного билета"></div></div><p class="ticket-instruction">Покажите экран контролёру. А на выходе приложите его к считывателю турникета</p>`:`<div class="ticket-timer-stage"><h3 id="ticket-validity-title">Срок действия билета</h3>${ticketTimerMarkup()}</div><p class="ticket-instruction">Покажите экран контролёру</p>`}</div></article><section class="ticket-details"><h2>Детали</h2><div class="ticket-detail-row ticket-number-row">${ticketAsset('doc')}<div><span>${train?'<button class="inline-ticket-copy" id="ticket-copy">':''}Билет №${esc(ticket.number)}${train?ticketAsset('copy')+'</button>':''}</span><small>от ${ticketDate(ticket.created)} ${ticketTime(ticket.created)}</small></div>${train?'<button id="ticket-pdf" class="ticket-pdf">Скачать PDF</button>':`<button id="ticket-copy" class="ticket-copy" aria-label="Скопировать номер билета">${ticketAsset('copy')}</button>`}</div>${train?ticketDetailRow('calendar','Действует с',ticketDate(ticket.validFrom,true))+ticketDetailRow('clock','Действует до',`${ticketDate(ticket.validUntil,true)} до ${ticketTime(ticket.validUntil)}`)+ticketDetailRow('tariff','Тариф',ticket.tariff||'Стандарт плюс'):ticketDetailRow('carrier','Перевозчик',ticket.carrier||'ГБУ ЯО «Яроблтранском»')+ticketDetailRow('fleet','Бортовой номер',`№${ticket.fleet||2356}`)}${ticket.quantity>1?`<div class="ticket-quantity-note">Количество билетов: ${ticket.quantity}</div>`:''}<h2>Стоимость заказа</h2><div class="ticket-cost"><div><span>Итого</span><strong>${ticket.total} ₽</strong></div><div class="ticket-paid-card"><span>${paymentLabels[ticket.payment]||paymentLabels[0]}</span><img src="assets/${['rail-pay-alfa.svg','rail-pay-plus-card.svg','rail-pay-tbank.svg'][ticket.payment]||'rail-pay-alfa.svg'}" alt=""></div></div></section><div class="ticket-actions"><button id="ticket-receipt">${ticketAsset('receipt')}<span>Получить чек</span></button>${train?`<button id="ticket-reactivate">${ticketAsset('activate')}<span>Повторить активацию</span></button>`:''}<button id="ticket-support">${ticketAsset('support')}<span>Обратиться в поддержку</span></button></div><p class="ticket-demo-note">Учебный билет · Не действует для проезда</p></div>`,showMyTickets);
  $('#overlay').className=`ticket-view ${train?'ticket-view-train':'ticket-view-bus'}`;
  $('.page-top h1').innerHTML='Мои билеты<small>Везде указано местное время</small>';
  $('#page-back').innerHTML=ticketAsset('back');const refresh=$('#page-close');refresh.id='ticket-refresh';refresh.setAttribute('aria-label','Обновить билет');refresh.innerHTML=ticketAsset('refresh');refresh.onclick=()=>{updateTicketTimer();toast('Билет обновлён')};
  $('#ticket-copy').setAttribute('aria-label','Скопировать номер билета');$('#ticket-copy').onclick=async()=>{await copyLink(ticket.number);toast('Номер билета скопирован')};
  if(train){$('#ticket-pdf').onclick=()=>downloadTicketPdf(ticket);$('#ticket-reactivate').onclick=()=>toast('Учебный билет уже активирован')}
  $('#ticket-receipt').onclick=()=>downloadTicketPdf(ticket,true);$('#ticket-support').onclick=()=>toast('По вопросам исследования обратитесь к модератору');updateTicketTimer();
}
showSuccess=showTicket;
setInterval(updateTicketTimer,1000);

// A local-only PDF export; the ticket data and image never leave the browser.
async function downloadTicketPdf(t,receipt=false){
  await document.fonts.ready;
  const canvas=document.createElement('canvas');canvas.width=800;canvas.height=1100;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,800,1100);ctx.fillStyle='#21201f';
  let y=65;const line=(text,size=24,bold=false)=>{ctx.font=`${bold?'600':'400'} ${size}px YSText, Arial`;let row='';for(const word of String(text).split(' ')){const next=row?row+' '+word:word;if(ctx.measureText(next).width>680&&row){ctx.fillText(row,60,y);y+=size+12;row=word}else row=next}ctx.fillText(row,60,y);y+=size+18};
  line(receipt?'Учебная квитанция':'Учебный билет',36,true);line(t.type==='train'?'Электричка':`${t.vehicleMode==='tram'?'Трамвай':'Автобус'} ${t.route}`,30,true);line(t.type==='train'?`${t.origin} → ${t.destination}`:`До «${t.destination}»`);y+=10;
  if(t.type==='train'&&!receipt){const code=new Image();code.src='assets/ticket-train-code.png';await code.decode();ctx.drawImage(code,100,y,600,225);y+=265}
  line(`Билет №${t.number}`);line(`Дата покупки: ${ticketDate(t.created,true)} ${ticketTime(t.created)}`);line(`Количество билетов: ${t.quantity}`);line(`Стоимость: ${t.total} ₽`,28,true);
  if(t.type==='train'){line(`Действует с ${ticketDate(t.validFrom,true)}`);line(`До ${ticketDate(t.validUntil,true)} ${ticketTime(t.validUntil)}`)}
  y=Math.max(y+20,950);ctx.fillStyle='#777';line('Не действует для проезда. Оплата не производилась.',20);
  const jpeg=Uint8Array.from(atob(canvas.toDataURL('image/jpeg',.94).split(',')[1]),c=>c.charCodeAt(0)),enc=new TextEncoder(),parts=[],offsets=[0];let length=0;
  const put=data=>{const bytes=typeof data==='string'?enc.encode(data):data;parts.push(bytes);length+=bytes.length};
  const obj=(id,body)=>{offsets[id]=length;put(`${id} 0 obj\n${body}\nendobj\n`)};
  put('%PDF-1.4\n');obj(1,'<< /Type /Catalog /Pages 2 0 R >>');obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
  offsets[4]=length;put(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width 800 /Height 1100 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);put(jpeg);put('\nendstream\nendobj\n');
  const content='q 595 0 0 818.125 0 23.875 cm /Im0 Do Q';obj(5,`<< /Length ${enc.encode(content).length} >>\nstream\n${content}\nendstream`);const start=length;put('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)put(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);put(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);
  const url=URL.createObjectURL(new Blob(parts,{type:'application/pdf'})),link=document.createElement('a');link.href=url;link.download=`${receipt?'receipt':'ticket'}-${t.number}.pdf`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast(receipt?'Учебная квитанция скачана':'Учебный билет скачан');
}

function showBusPaymentLoading(ticket){
  screen='payment-pending';
  page('',`<div class="payment-loading" role="status" aria-live="polite"><span class="payment-spinner" aria-hidden="true"></span><h1>Оплачиваем билет</h1><p>Это займёт несколько секунд</p></div>`);
  $('#overlay').className='payment-pending';
  // The full-screen pending state prevents duplicate purchase and changing the snapshot.
  [...$('#app').children].forEach(el=>{if(el!==$('#overlay'))el.inert=true});
  setTimeout(()=>{
    [...$('#app').children].forEach(el=>el.inert=false);
    ticket.id=Date.now();ticket.expiresAt=ticket.id+30*60*1000;
    purchased.unshift(ticket);orderFilter='Всё';showTicket(ticket);
  },1200);
}
