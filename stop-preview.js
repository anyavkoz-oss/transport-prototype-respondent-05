'use strict';
function fitChipPreview(list){
  const chips=[...list.querySelectorAll('.route-chip:not(.chip-exit)')];
  const more=list.querySelector('.chip-more');
  if(!more||!list.clientWidth)return;
  chips.forEach(chip=>chip.classList.remove('chip-one-time'));
  // Secondary arrivals are optional; keep three routes and “more” in two rows.
  const fits=()=>more.offsetTop<=44&&chips.every(chip=>chip.offsetTop<=44);
  for(const chip of [...chips].reverse()){
    if(fits())break;
    if(chip.querySelector('.chip-next-time'))chip.classList.add('chip-one-time');
  }
}
function fitChipPreviews(){document.querySelectorAll('.chip-list').forEach(fitChipPreview)}
window.addEventListener('resize',fitChipPreviews);
document.fonts.ready.then(fitChipPreviews);
// Keep the more button and surviving departures mounted while the queue advances.
function updateChipPreview(list,stop,rows){
  const more=list.querySelector('.chip-more');
  if(!more){list.innerHTML=previewContent(stop,rows);return;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const before=new Map([...list.querySelectorAll('.route-chip:not(.chip-exit)')].map(node=>[node.dataset.chipKey,{node,rect:node.getBoundingClientRect()}]));
  const keys=new Set(rows.map(({r})=>r.key||String(r.id)));
  const extra=chipExtra(stop,rows);
  more.textContent='ещё'+(extra?' '+extra:'');
  more.setAttribute('aria-label',`Ещё${extra?' '+extra:''}, открыть расписание остановки`);
  const parent=list.getBoundingClientRect(),origin=more.getBoundingClientRect();
  for(const [key,{node,rect}] of before){
    if(keys.has(key))continue;
    if(reduced||!list.isConnected){node.remove();continue;}
    node.classList.add('chip-exit');node.disabled=true;node.inert=true;
    node.removeAttribute('data-route');node.removeAttribute('data-chip-key');node.setAttribute('aria-hidden','true');
    node.querySelectorAll('[data-eta]').forEach(el=>el.removeAttribute('data-eta'));
    Object.assign(node.style,{position:'absolute',gridArea:'auto',left:rect.left-parent.left+'px',top:rect.top-parent.top+'px',width:rect.width+'px',height:rect.height+'px'});
    const animation=node.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.6)'}],{duration:180,easing:'ease-in',fill:'forwards'});
    animation.onfinish=()=>node.remove();animation.oncancel=()=>node.remove();
  }
  const arrivals=[];
  rows.forEach((row,slot)=>{
    const key=row.r.key||String(row.r.id),old=before.get(key);
    let node=old?.node;
    if(!node){const template=document.createElement('template');template.innerHTML=routeChip(row,stop,slot);node=template.content.firstElementChild;}
    node.dataset.chipSlot=slot;list.insertBefore(node,more);
    arrivals.push({node,old});
  });
  fitChipPreview(list);
  if(reduced||!list.isConnected)return;
  // Measure after layout: new bubbles emerge from the persistent more button.
  for(const {node,old} of arrivals){
    const target=node.getBoundingClientRect();
    const dx=old?old.rect.left-target.left:origin.left+origin.width/2-target.left-target.width/2;
    const dy=old?old.rect.top-target.top:origin.top+origin.height/2-target.top-target.height/2;
    if(old&&Math.abs(dx)+Math.abs(dy)<.5)continue;
    node.animate([
      {transform:`translate(${dx}px,${dy}px) scale(${old?1:.25})`,opacity:old?1:0},
      {transform:'translate(0,0) scale(1)',opacity:1}
    ],{duration:old?300:420,delay:old?80:140,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
  }
}
