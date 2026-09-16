(()=>{
  const MAP_MUSEUM='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('大津市歴史博物館');
  const sunBtn=document.getElementById('sunBtn');
  const rainBtn=document.getElementById('rainBtn');
  if(!sunBtn||!rainBtn) return;

  const style=document.createElement('style');
  style.id='rain-live-style';
  style.textContent=`
    .rain-plan-status{display:none;margin:12px 0 0;padding:12px 14px;border-radius:12px;background:#e9f2f7;border:1px solid #bdd2df;color:#24445a;font-size:.88rem;line-height:1.65}
    body.rain-mode .rain-plan-status{display:block}
    .rain-live-note{display:none;margin-top:10px;padding:9px 11px;border-radius:10px;background:#eef5f8;border-left:4px solid #5b8ba3;color:#315064;font-size:.84rem;line-height:1.6}
    body.rain-mode .rain-live-note{display:block}
    body.rain-mode #timeline1 .stop[data-rain-swap="museum"] .stop-card{border-color:#9bbdce;box-shadow:0 6px 18px rgba(49,96,120,.12)}
  `;
  document.head.appendChild(style);

  const nowCard=document.getElementById('now');
  let status=document.getElementById('rainPlanStatus');
  if(!status){
    status=document.createElement('div');
    status.id='rainPlanStatus';
    status.className='rain-plan-status';
    status.innerHTML='<strong>☂ 雨天プランを表示中</strong><br>DAY1は比叡山・夢見が丘を大津市歴史博物館へ差し替え。DAY2は強雨時に陵墓の屋外歩行を短縮し、泉涌寺・雲龍院・霊山歴史館を優先します。';
    nowCard.appendChild(status);
  }

  const stops=[...document.querySelectorAll('#timeline1 .stop')];
  const hiei=stops.find(s=>s.querySelector('h3')?.textContent.includes('比叡山'));
  if(hiei){
    hiei.dataset.rainSwap='museum';
    const time=hiei.querySelector('.time');
    const title=hiei.querySelector('h3');
    const meta=hiei.querySelector('.meta');
    const meaning=hiei.querySelector('.stop-card > p');
    const mapBtn=hiei.querySelector('.actions .btn.primary');
    const historyBtn=hiei.querySelector('.actions .btn:not(.primary)');
    const rainOnly=hiei.querySelector('.rain-only');
    const original={
      time:time?.textContent||'',
      title:title?.textContent||'',
      meta:meta?.textContent||'',
      meaning:meaning?.textContent||'',
      mapHref:mapBtn?.getAttribute('href')||'',
      mapText:mapBtn?.textContent||'地図',
      historyHref:historyBtn?.getAttribute('href')||''
    };
    hiei.__sunOriginal=original;
    if(rainOnly) rainOnly.style.display='none';
  }

  const addRainNote=(match,text)=>{
    const stop=[...document.querySelectorAll('#timeline2 .stop')].find(s=>s.querySelector('h3')?.textContent.includes(match));
    if(!stop||stop.querySelector('.rain-live-note')) return;
    const note=document.createElement('div');
    note.className='rain-live-note';
    note.textContent=text;
    const actions=stop.querySelector('.actions');
    (actions||stop.querySelector('.stop-card')).before?.(note);
    if(actions) actions.parentNode.insertBefore(note,actions);
    else stop.querySelector('.stop-card')?.appendChild(note);
  };
  addRainNote('泉涌寺','強雨時：寺院拝観を優先し、月輪陵・後月輪陵の屋外歩行は無理をせず短縮。');
  addRainNote('後月輪東山陵','強雨時：陵墓への長い歩行は短縮し、月輪陵墓監区事務所で御陵印の確認を優先。');
  addRainNote('霊山歴史館','強雨で屋外時間を短縮した場合は、霊山歴史館の常設・企画展に時間を回す。');

  function swapHiei(isRain){
    if(!hiei||!hiei.__sunOriginal) return;
    const o=hiei.__sunOriginal;
    const time=hiei.querySelector('.time');
    const title=hiei.querySelector('h3');
    const meta=hiei.querySelector('.meta');
    const meaning=hiei.querySelector('.stop-card > p');
    const mapBtn=hiei.querySelector('.actions .btn.primary');
    const historyBtn=hiei.querySelector('.actions .btn:not(.primary)');
    if(isRain){
      if(time) time.textContent='16:00–16:50';
      if(title) title.textContent='大津市歴史博物館（雨天差替）';
      if(meta) meta.textContent='屋内展示 / 比叡山の眺望がない場合の代替';
      if(meaning) meaning.textContent='近江大津宮、坂本・堅田、大津百町、膳所城下町を屋内展示でたどり、京都と大津の歴史的なつながりを補う。';
      if(mapBtn){mapBtn.href=MAP_MUSEUM;mapBtn.textContent='博物館の地図';}
      if(historyBtn) historyBtn.href='#history-16';
    }else{
      if(time) time.textContent=o.time;
      if(title) title.textContent=o.title;
      if(meta) meta.textContent=o.meta;
      if(meaning) meaning.textContent=o.meaning;
      if(mapBtn){mapBtn.href=o.mapHref;mapBtn.textContent=o.mapText;}
      if(historyBtn) historyBtn.href=o.historyHref;
    }
  }

  function applyMode(mode){
    const isRain=mode==='rain';
    document.body.classList.toggle('rain-mode',isRain);
    sunBtn.classList.toggle('active',!isRain);
    rainBtn.classList.toggle('active',isRain);
    swapHiei(isRain);
    try{localStorage.setItem('travelMode',isRain?'rain':'sun');}catch(e){}
  }

  window.setMode=applyMode;
  sunBtn.onclick=()=>applyMode('sun');
  rainBtn.onclick=()=>applyMode('rain');
  let saved='sun';
  try{saved=localStorage.getItem('travelMode')||'sun';}catch(e){}
  applyMode(saved);
})();
