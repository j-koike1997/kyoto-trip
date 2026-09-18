(()=>{
  if(window.__lunchUpdateTsukiNoKurabito) return;
  window.__lunchUpdateTsukiNoKurabito=true;

  const MAP='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('京の台所 月の蔵人 京都');
  const PARK='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('京の台所 月の蔵人 駐車場');
  const OFFICIAL='https://www.tsukinokurabito.jp/';
  const TABELOG='https://tabelog.com/kyoto/A2601/A260601/26002346/';

  const stops=[...document.querySelectorAll('#timeline1 .stop')];
  const lunch=stops.find(s=>{
    const t=s.querySelector('h3')?.textContent||'';
    return t.includes('鳥せい')||t.includes('月の蔵人');
  });
  if(lunch){
    lunch.dataset.start='2026-09-20T11:00:00+09:00';
    lunch.dataset.end='2026-09-20T12:00:00+09:00';
    const time=lunch.querySelector('.time');
    const title=lunch.querySelector('h3');
    const meta=lunch.querySelector('.meta');
    const p=lunch.querySelector('.stop-card > p');
    if(time) time.textContent='11:00–12:00';
    if(title) title.textContent='京の台所 月の蔵人｜昼食（予約済み）';
    if(meta) meta.textContent='11:00予約 / 専用P計10台 / 大正2年の酒蔵を改装';
    if(p) p.textContent='月桂冠が1913年に建てた酒蔵を改装した店で、伏見の酒蔵文化を建物と食の両方から味わう。';
    const actions=lunch.querySelector('.actions');
    if(actions){
      const primary=actions.querySelector('.btn.primary');
      if(primary){primary.href=MAP;primary.textContent='地図';}
      actions.querySelectorAll('a').forEach(a=>{
        if(a.href.includes('tabelog.com')||a.textContent.includes('食べログ')) a.remove();
      });
      if(![...actions.querySelectorAll('a')].some(a=>a.href===OFFICIAL)){
        const official=document.createElement('a');
        official.className='btn';
        official.href=OFFICIAL; official.target='_blank'; official.rel='noopener';
        official.textContent='公式サイト';
        actions.appendChild(official);
      }
      const tabelog=document.createElement('a');
      tabelog.className='btn gold';
      tabelog.href=TABELOG; tabelog.target='_blank'; tabelog.rel='noopener';
      tabelog.textContent='食べログ';
      actions.appendChild(tabelog);
    }
  }

  try{
    if(typeof day1!=='undefined' && day1[2]){
      Object.assign(day1[2],{
        start:'2026-09-20T11:00:00+09:00',
        end:'2026-09-20T12:00:00+09:00',
        time:'11:00–12:00',
        title:'京の台所 月の蔵人｜昼食（予約済み）',
        meta:'11:00予約 / 専用P計10台 / 大正2年の酒蔵を改装',
        meaning:'月桂冠が1913年に建てた酒蔵を改装した店で、伏見の酒蔵文化を建物と食の両方から味わう。',
        map:'京の台所 月の蔵人 京都'
      });
    }
  }catch(e){}

  const parkingRow=[...document.querySelectorAll('#parking tbody tr')].find(tr=>{
    const s=tr.textContent||'';
    return s.includes('鳥せい本店')||s.includes('月の蔵人');
  });
  if(parkingRow){
    const td=parkingRow.querySelectorAll('td');
    if(td[0]) td[0].innerHTML='京の台所 月の蔵人<div class="parking-map-link"><a class="btn primary" href="'+PARK+'" target="_blank" rel="noopener">地図を開く</a></div>';
    if(td[1]) td[1].textContent='計10台';
    if(td[2]) td[2].textContent='専用';
    if(td[3]) td[3].textContent='第一P（店舗西側）5台＋第二P（徒歩約2分）5台。京都市伏見区上油掛町185-1。';
  }

  const h=document.getElementById('history-2');
  if(h){
    const st=h.querySelector('.summary-title');
    const ss=h.querySelector('.summary-sub');
    if(st) st.textContent='京の台所 月の蔵人 と 伏見の酒蔵文化';
    if(ss) ss.textContent='月桂冠の酒蔵：1913年建築 / 11:00予約済み';
    const body=h.querySelector('.history-body');
    if(body){
      const ps=body.querySelectorAll(':scope > p');
      if(ps[0]) ps[0].textContent='月の蔵人は、月桂冠によって大正2年（1913）に建てられた酒蔵を改装した和食・日本酒レストラン。太い梁を残した蔵の空間で、伏見の酒造文化を現在の食事体験として味わえる。';
      if(ps[1]) ps[1].textContent='伏見は豊かな地下水と、濠川・宇治川・淀川につながる水運を背景に酒造業が発達した。城下町・港町として栄えた都市基盤が、近世以降の「酒の町」を育てた。';
      if(ps[2]) ps[2].textContent='単なる昼食休憩ではなく、伏見桃山陵で近代国家の記憶を見た直後に、同じ伏見で続いてきた産業・町衆文化へ視点を移す場所にゃ。';
      const fig=body.querySelector('.spot-visual');
      if(fig){
        const img=fig.querySelector('img');
        if(img) img.alt='伏見の酒蔵景観';
        const cap=fig.querySelector('figcaption');
        if(cap) cap.innerHTML='<strong>見どころ｜1913年築の酒蔵を活かした空間</strong>月の蔵人は、月桂冠が大正2年（1913）に建てた酒蔵を改装した店。太い梁や蔵らしい空間を見ながら、伏見が「酒の町」として続いてきた時間を感じたいにゃ。<br><a class="photo-source" href="'+OFFICIAL+'" target="_blank" rel="noopener">店舗情報：月の蔵人 公式 ↗</a>';
      }
    }
  }

  const sourceCard=[...document.querySelectorAll('#sources .card,#sources .small,.section .card.small')].find(x=>(x.textContent||'').includes('山本本家'));
  if(sourceCard) sourceCard.innerHTML=sourceCard.innerHTML.replace('山本本家','月の蔵人／月桂冠');

  document.querySelectorAll('a[href*="26001213"]').forEach(a=>{
    a.href=TABELOG;
    a.textContent='食べログ';
  });

  const summary=[...document.querySelectorAll('.drive-summary')].find(x=>(x.textContent||'').includes('鳥せい'));
  if(summary) summary.innerHTML='伏見桃山陵は9:50〜10:35を基本にゃ。<strong>月の蔵人は11:00予約済み</strong>なので、10:35に陵を出れば十分な移動余裕がある。到着が10:00を超えた場合だけ参拝を30〜35分に調整するにゃ。';
})();