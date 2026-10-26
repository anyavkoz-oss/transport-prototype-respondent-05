/* Repeating departure queue: two live arrivals, then two schedule-only delays.
   Every departure has a stable key and a device-local scheduled timestamp. */
const ScheduledDelay = (() => {
  function createClock() {
    const queues = new Map();
    return {
      plan(key, seconds, arrivals, dwell = 6, now = Date.now()) {
        const previous=queues.get(key);
        const pending=previous?.events.filter(e=>seconds<e.endAt)||[];
        if(pending.length>=2)return;
        const normal=[...arrivals].filter(a=>a.at+dwell>seconds).sort((a,b)=>a.at-b.at).slice(0,2);
        if(normal.length<2)return;
        const cycle=(previous?.cycle??-1)+1;
        const events=normal.map((a,index)=>({...a,key:`${cycle}:live:${index}`,kind:'live',endAt:a.at+dwell,scheduledAt:now+(a.at-seconds)*1000}));
        const start=Math.max(...events.map(e=>e.endAt));
        for(let index=0;index<2;index++){
          const at=start+index*30;
          events.push({key:`${cycle}:delay:${index}`,kind:'delay',at,endAt:at+30,scheduledAt:now+(at-seconds)*1000});
        }
        queues.set(key,{cycle,endAt:start+60,events:[...pending,...events]});
      },
      state(key, seconds) {
        const queue=queues.get(key);
        if(!queue)return {events:[]};
        return {...queue,events:queue.events.filter(e=>seconds<e.endAt).map(e=>({...e,remaining:Math.max(0,e.at-seconds),active:e.kind==='delay'&&seconds>=e.at,atStop:e.kind==='live'&&seconds>=e.at}))};
      },
      reset() { queues.clear(); }
    };
  }
  return { ...createClock(), createClock,
    format(at) { return new Date(at).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}); }
  };
})();
if (typeof module !== 'undefined') module.exports = ScheduledDelay;
