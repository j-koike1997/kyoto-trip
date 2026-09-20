(()=>{
  if(window.__trafficPlan20260918) return;
  window.__trafficPlan20260918=true;

  const style=document.createElement('style');
  style.id='traffic-plan-style';
  style.textContent=`
    .drive-sim-grid{display:grid;grid-template-columns:1fr;gap:14px}
    .drive-sim-card{background:#fff;border:1px solid #e1e6ea;border-radius:16px;padding:15px;box-shadow:0 5px 18px rgba(28,48,70,.06)}
    .drive-sim-card h3{margin:0 0 10px;color:var(--navy)}
    .drive-steps{display:grid;grid-template-columns:92px 1fr;gap:0;font-size:.86rem}
    .drive-steps .dt,.drive-steps .dd{padding:7px 0;border-bottom:1px solid #edf0f2;line-height:1.55}
    .drive-steps .dt{font-weight:900;color:var(--navy);padding-right:10px}
    .drive-steps .dd strong{color:#8a5a19}
    .drive-summary{margin-top:12px;padding:11px 12px;border-radius:12px;background:#f5f1e8;border-left:4px solid var(--gold);font-size:.86rem;line-height:1.7}
    .traffic-source-links{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}
    .route-links{margin:12px 0 18px;padding:14px;border:1px solid #dbe2e8;border-radius:15px;background:#f8fafb;box-shadow:0 4px 14px rgba(28,48,70,.05)}
    .route-links strong{display:block;color:var(--navy);margin-bottom:8px}
    .route-links p{margin:0 0 10px;font-size:.84rem;line-height:1.65;color:#55616d}
    .route-link-actions{display:flex;gap:8px;flex-wrap:wrap}
    .route-link-actions .btn.primary{font-weight:900}
    @media(min-width:760px){.drive-sim-grid{grid-template-columns:1fr 1fr}.drive-steps{grid-template-columns:105px 1fr}}
  `;
  document.head.appendChild(style);

  const nav=document.querySelector('.sticky-nav');
  if(nav && !nav.querySelector('a[href="#drive-sim"]')){
    const a=document.createElement('a');
    a.href='#drive-sim'; a.textContent='走行';
    const day1Link=nav.querySelector('a[href="#day1"]');
    if(day1Link) nav.insertBefore(a,day1Link); else nav.appendChild(a);
  }

  const routeUrl=(origin,destination,waypoints,mode='driving')=>{
    const p=new URLSearchParams({
      api:'1',
      origin,
      destination,
      waypoints:waypoints.join('|'),
      travelmode:mode
    });
    return 'https://www.google.com/maps/dir/?'+p.toString();
  };

  const day1Drive=routeUrl(
    '三軒茶屋駅',
    'びわ湖大津プリンスホテル',
    [
      '明治天皇 伏見桃山陵',
      '京の台所 月の蔵人 京都',
      '護王神社 京都',
      '鶴屋吉信 本店',
      '曼殊院門跡',
      '蓮華寺 上高野 京都',
      '夢見が丘 比叡山ドライブウェイ'
    ]
  );
  const day1Rain=routeUrl(
    '三軒茶屋駅',
    'びわ湖大津プリンスホテル',
    [
      '明治天皇 伏見桃山陵',
      '京の台所 月の蔵人 京都',
      '護王神社 京都',
      '鶴屋吉信 本店',
      '曼殊院門跡',
      '蓮華寺 上高野 京都',
      '大津市歴史博物館'
    ]
  );
  const day2Drive=routeUrl(
    'びわ湖大津プリンスホテル',
    '三軒茶屋駅',
    [
      '御寺 泉涌寺 駐車場',
      '霊山歴史館',
      'れすとらん松喜屋本店',
      '多賀サービスエリア 上り',
      '蓮華寺 米原 滋賀'
    ]
  );
  const day2Walk=routeUrl(
    '御寺 泉涌寺 駐車場',
    '御寺 泉涌寺 駐車場',
    [
      '御寺 泉涌寺',
      '月輪陵',
      '雲龍院',
      '孝明天皇 後月輪東山陵',
      '月輪陵墓監区事務所'
    ],
    'walking'
  );

  const addRouteLinks=(section,title,body,buttons)=>{
    if(!section || section.querySelector('.route-links')) return;
    const box=document.createElement('div');
    box.className='route-links';
    box.innerHTML='<strong>'+title+'</strong><p>'+body+'</p><div class="route-link-actions">'+buttons.map(b=>'<a class="btn '+(b.primary?'primary':'')+'" target="_blank" rel="noopener" href="'+b.href+'">'+b.label+'</a>').join('')+'</div>';
    const timeline=section.querySelector('.timeline');
    if(timeline) section.insertBefore(box,timeline);
    else{
      const titleEl=section.querySelector('.section-title');
      if(titleEl) titleEl.insertAdjacentElement('afterend',box);
      else section.prepend(box);
    }
  };

  const day1Section=document.getElementById('day1');
  addRouteLinks(
    day1Section,
    'Google Maps｜DAY1 一筆書きルート',
    '三軒茶屋 → 伏見桃山陵 → 月の蔵人 → 護王神社 → 鶴屋吉信 → 曼殊院 → 蓮華寺 → 夢見が丘 → 大津プリンス。比叡山を断念する場合は雨天版を使うにゃ。',
    [
      {label:'DAY1 通常ルートを開く',href:day1Drive,primary:true},
      {label:'DAY1 雨天ルート',href:day1Rain,primary:false}
    ]
  );

  const day2Section=document.getElementById('day2');
  addRouteLinks(
    day2Section,
    'Google Maps｜DAY2 一筆書きルート',
    '大津プリンス → 泉涌寺P → 霊山歴史館 → 松喜屋（13:30予約）→ 多賀SA上り（京都土産）→ 米原・蓮華寺 → 三軒茶屋。蓮華寺は15:45着目標、16:00を実質最終ラインとして動くにゃ。',
    [
      {label:'DAY2 走行ルートを開く',href:day2Drive,primary:true},
      {label:'泉涌寺 徒歩ルート',href:day2Walk,primary:false}
    ]
  );

  if(day1Section && !document.getElementById('drive-sim')){
    const sec=document.createElement('section');
    sec.className='section'; sec.id='drive-sim';
    sec.innerHTML=`
      <div class="section-title"><span>DRIVE SIMULATION</span><h2>最新渋滞予測で走行時間を再計算</h2></div>
      <div class="callout"><strong>ねこの結論｜03:30出発は維持でOK。</strong><br>9/20は伊勢湾岸道の名港中央IC・湾岸長島IC付近が7:00〜12:00、8時ピーク。2か所とも最大10km・通過約24〜25分の予測なので、合計で<strong>+25〜40分</strong>を予算化するにゃ。これでも伏見桃山陵は9:30〜9:50頃の到着が基本線で、現行9:50開始にはバッファが残るにゃ。</div>
      <div class="drive-sim-grid">
        <div class="drive-sim-card">
          <h3>9/20 往路｜三軒茶屋 → 伏見</h3>
          <div class="drive-steps">
            <div class="dt">03:30</div><div class="dd">三軒茶屋 出発</div>
            <div class="dt">03:45頃</div><div class="dd">東京IC。綾瀬の朝ピーク前を通過する想定。</div>
            <div class="dt">04:40頃</div><div class="dd">御殿場JCT → 新東名へ。</div>
            <div class="dt">05:00前後</div><div class="dd">休憩① <strong>NEOPASA駿河湾沼津</strong>を目安に10〜15分。</div>
            <div class="dt">06:15前後</div><div class="dd">休憩② <strong>NEOPASA浜松</strong>を目安に10〜15分。</div>
            <div class="dt">07:00頃</div><div class="dd">豊田東JCT。ここから伊勢湾岸道へ。</div>
            <div class="dt">07:20–08:10</div><div class="dd"><strong>名港中央・湾岸長島の予測渋滞</strong>。ピーク8時に近い。</div>
            <div class="dt">08:10頃</div><div class="dd">四日市JCT → 新名神。</div>
            <div class="dt">09:05頃</div><div class="dd">京都東IC。休日の京都市内で+10〜20分を見込む。</div>
            <div class="dt">09:30–09:50</div><div class="dd"><strong>伏見桃山陵P 到着目安</strong>。事故なしの基本ケース。</div>
          </div>
          <div class="drive-summary">伏見桃山陵は9:50〜10:35を基本にゃ。月の蔵人は11:00予約済みなので、10:35に陵を出れば十分な移動余裕がある。到着が10:00を超えた場合だけ参拝を30〜35分に調整するにゃ。</div>
        </div>
        <div class="drive-sim-card">
          <h3>9/21 帰路｜松喜屋 → 蓮華寺 → 三軒茶屋</h3>
          <div class="drive-steps">
            <div class="dt">13:30</div><div class="dd"><strong>松喜屋 本店</strong> 予約。食事は約60分を目安にする。</div>
            <div class="dt">14:30</div><div class="dd"><strong>松喜屋 出発目標</strong>。名神・米原方面へ。</div>
            <div class="dt">15:10–15:20</div><div class="dd"><strong>多賀SA（上り）</strong>。京都土産を10分程度で購入。遅れていたら買い物時間を短縮する。</div>
            <div class="dt">15:40–15:50</div><div class="dd"><strong>米原・蓮華寺 到着目標</strong>。15:45を基準、16:00を実質最終ラインにする。</div>
            <div class="dt">15:45–16:20</div><div class="dd">蓮華寺参拝。17:00閉門表記でも、受付早期終了を想定して余裕を確保。</div>
            <div class="dt">16:20–16:30</div><div class="dd"><strong>蓮華寺 出発</strong>。米原ICから東京方面へ。</div>
            <div class="dt">18:20頃</div><div class="dd">浜松付近。必要なら短い休憩のみ。夕食目的の長時間停車はしない。</div>
            <div class="dt">19:20頃</div><div class="dd">静岡付近。雨・通行止め情報を再確認。</div>
            <div class="dt">20:05–20:30</div><div class="dd"><strong>御殿場付近</strong>。強雨ピーク後を狙う時間帯。</div>
            <div class="dt">21:10–21:45</div><div class="dd"><strong>三軒茶屋 到着目安</strong>。強雨・事故・通行止め時はさらに遅れる。</div>
          </div>
          <div class="drive-summary"><strong>実戦ルール：</strong>松喜屋を14:40までに出られれば多賀SAで10分。14:40を超えたら5分、14:50を超えたら土産購入を飛ばして蓮華寺を優先するにゃ。</div>
        </div>
      </div>
      <div class="traffic-source-links">
        <a class="btn" target="_blank" rel="noopener" href="https://www.c-nexco.co.jp/corporate/pressroom/news_release/6665.html">NEXCO中日本 SW予測</a>
        <a class="btn" target="_blank" rel="noopener" href="https://jafmate.jp/car/traffic_topics_20260916_1199727.html">JAF 東海・関西詳細</a>
        <a class="btn" target="_blank" rel="noopener" href="https://jafmate.jp/car/traffic_topics_20260916_1199726.html">JAF 東名・新東名詳細</a>
        <a class="btn" target="_blank" rel="noopener" href="https://www.city.kyoto.lg.jp/kotsu/page/0000357643.html">京都市 SW混雑対策</a>
      </div>
    `;
    day1Section.parentNode.insertBefore(sec,day1Section);
  }

  const findStop=(timelineId,needle)=>[...document.querySelectorAll('#'+timelineId+' .stop')].find(s=>s.querySelector('h3')?.textContent.includes(needle));
  const setText=(el,sel,text)=>{const n=el?.querySelector(sel);if(n)n.textContent=text};

  const depart=findStop('timeline1','三軒茶屋 出発');
  if(depart){
    setText(depart,'.meta','新東名 / 途中2回休憩（駿河湾沼津・浜松を目安）');
    setText(depart,'.stop-card > p','03:30を維持。伊勢湾岸の名港中央・湾岸長島で合計+25〜40分を予算化して走る。');
  }
  const fushimi=findStop('timeline1','伏見桃山陵');
  if(fushimi){
    setText(fushimi,'.meta','参拝者用駐車場 / 9:30〜9:50着目安 / 御陵印チャレンジ');
  }
  const d1call=[...document.querySelectorAll('#day1 > .callout')].find(x=>x.textContent.includes('渋滞メモ'));
  if(d1call) d1call.innerHTML='<strong>渋滞メモ：</strong>03:30出発を維持。東京側の綾瀬朝ピークは回避し、伊勢湾岸道の名港中央IC・湾岸長島IC付近（7:00〜12:00、8時ピーク）に+25〜40分を見込む。事故がなければ伏見桃山陵は9:30〜9:50頃が基本線。京都市内は休日混雑で5〜15分単位の揺れを持たせる。';

  const matsukiya=findStop('timeline2','松喜屋');
  if(matsukiya){
    matsukiya.dataset.start='2026-09-21T13:30:00+09:00';
    matsukiya.dataset.end='2026-09-21T14:30:00+09:00';
    setText(matsukiya,'.time','13:30–14:30');
    setText(matsukiya,'.meta','13:30予約固定 / 食事約60分 / 14:30出発目標');
    setText(matsukiya,'.stop-card > p','予約時刻は動かさない。食事後は14:30を目標に出発し、名神で多賀SA・米原方面へ向かう。');
  }

  const returnDepart=findStop('timeline2','東京へ出発');
  if(returnDepart){
    returnDepart.dataset.start='2026-09-21T14:30:00+09:00';
    returnDepart.dataset.end='2026-09-21T14:35:00+09:00';
    setText(returnDepart,'.time','14:30');
    setText(returnDepart,'h3','松喜屋 出発｜多賀SAへ');
    setText(returnDepart,'.meta','14:30出発目標 / 名神・米原方面');
    setText(returnDepart,'.stop-card > p','14:40までに出られれば多賀SAで10分買い物。14:50を超えたら土産購入を飛ばして蓮華寺を優先。');
  }

  const tsuchiyama=findStop('timeline2','土山SA');
  if(tsuchiyama){
    tsuchiyama.dataset.start='2026-09-21T15:10:00+09:00';
    tsuchiyama.dataset.end='2026-09-21T15:20:00+09:00';
    setText(tsuchiyama,'.time','15:10–15:20');
    setText(tsuchiyama,'h3','多賀SA（上り）｜京都土産');
    setText(tsuchiyama,'.meta','10分目安 / 京都・大阪土産も扱う / 遅れたら短縮');
    setText(tsuchiyama,'.stop-card > p','京都土産を短時間で購入。蓮華寺15:45着を優先し、時間が押したら5分に短縮、14:50松喜屋発以降はスキップ。');
    const acts=tsuchiyama.querySelector('.actions');
    if(acts){
      const links=[...acts.querySelectorAll('a')];
      if(links[0]){links[0].href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('多賀サービスエリア 上り');links[0].textContent='地図';}
      if(links[1]){links[1].href='https://sapa.c-nexco.co.jp/sapa/shop?sapainfoid=49';links[1].textContent='店舗を見る';}
    }
  }

  const arrival=findStop('timeline2','三軒茶屋 着');
  if(arrival && !findStop('timeline2','蓮華寺')){
    const rengeji=document.createElement('div');
    rengeji.className='stop';
    rengeji.dataset.start='2026-09-21T15:45:00+09:00';
    rengeji.dataset.end='2026-09-21T16:20:00+09:00';
    rengeji.innerHTML='<div class="time">15:45–16:20</div><div class="stop-card"><h3>蓮華寺（米原）｜参拝</h3><div class="meta">15:45着目標 / 16:00実質最終ライン / 17:00閉門表記</div><p>今日の延暦寺の早期受付終了を踏まえ、17:00ぎりぎりは狙わない。15:45を基準に到着し、16:20頃には出発する。</p><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('蓮華寺 米原 滋賀')+'">地図</a><a class="btn" target="_blank" rel="noopener" href="https://maibara-rengeji.wixsite.com/rengeji/about">公式</a></div></div>';
    arrival.parentNode.insertBefore(rengeji,arrival);
  }

  // Remove any older dynamically-added Hamamatsu dinner stop if another script/version left it behind.
  const oldHamamatsu=findStop('timeline2','NEOPASA浜松');
  if(oldHamamatsu) oldHamamatsu.remove();

  if(arrival){
    arrival.dataset.start='2026-09-21T21:10:00+09:00';
    arrival.dataset.end='2026-09-21T21:45:00+09:00';
    setText(arrival,'.time','21:10–21:45頃');
    setText(arrival,'.meta','蓮華寺16:20〜16:30発想定 / 強雨・事故時は+30分以上');
    setText(arrival,'.stop-card > p','米原から東へ進み、必要最小限の休憩で東京へ。NEXCOの通行止め予告とSA満空は走行中もライブ欄で再確認する。');
  }

  const d2call=[...document.querySelectorAll('#day2 > .callout')].find(x=>x.textContent.includes('帰路メモ'));
  if(d2call) d2call.innerHTML='<strong>帰路メモ：</strong>松喜屋13:30予約は固定。14:30発目標 → 多賀SA上りで京都土産10分 → 米原・蓮華寺15:45着目標 → 16:20〜16:30東京へ。蓮華寺は17:00表記でも16:00を実質最終ラインとして動く。';

  function refreshNow(){
    const now=new Date();
    const stops=[...document.querySelectorAll('#timeline1 .stop,#timeline2 .stop')]
      .filter(s=>s.dataset.start&&s.dataset.end)
      .sort((a,b)=>new Date(a.dataset.start)-new Date(b.dataset.start));
    if(!stops.length) return;
    document.querySelectorAll('.stop.current').forEach(x=>x.classList.remove('current'));
    const title=document.getElementById('nextTitle'), sub=document.getElementById('nextSub');
    if(!title||!sub) return;
    const first=new Date(stops[0].dataset.start);
    if(now<first){
      const days=Math.ceil((first-now)/86400000);
      title.textContent='旅行前です';
      sub.textContent='出発まで約'+days+'日。9月20日 03:30、三軒茶屋から出発';
      return;
    }
    const current=stops.find(s=>now>=new Date(s.dataset.start)&&now<new Date(s.dataset.end));
    if(current){
      current.classList.add('current');
      title.textContent='現在：'+(current.querySelector('h3')?.textContent||'');
      sub.textContent=(current.querySelector('.time')?.textContent||'')+' · '+(current.querySelector('.meta')?.textContent||'');
      return;
    }
    const next=stops.find(s=>now<new Date(s.dataset.start));
    if(next){
      title.textContent='次：'+(next.querySelector('h3')?.textContent||'');
      sub.textContent=(next.querySelector('.time')?.textContent||'')+' · '+(next.querySelector('.meta')?.textContent||'');
    }else{
      title.textContent='旅程は終了しました';
      sub.textContent='おつかれさまでしたにゃ';
    }
  }
  setTimeout(refreshNow,100);
  setInterval(refreshNow,60000);
})();