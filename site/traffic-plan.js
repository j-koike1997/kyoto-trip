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
      '土山サービスエリア 上り',
      'NEOPASA浜松 上り'
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
    '大津プリンス → 泉涌寺P → 霊山歴史館 → 松喜屋 → 土山SA → NEOPASA浜松（夕食）→ 三軒茶屋。泉涌寺山内は車を置いたまま徒歩で一周するにゃ。',
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
          <h3>9/21 帰路｜大津 → 三軒茶屋</h3>
          <div class="drive-steps">
            <div class="dt">15:00</div><div class="dd">松喜屋から東京へ出発。大津IC朝渋滞はすでに終了。</div>
            <div class="dt">15:40–16:00</div><div class="dd"><strong>土山SA</strong> 休憩・お土産。</div>
            <div class="dt">16:30頃</div><div class="dd">四日市JCT。</div>
            <div class="dt">17:05頃</div><div class="dd">豊田東JCT。9/21上りの豊田JCT予測は午前帯なので基本回避。</div>
            <div class="dt">18:00–18:45頃</div><div class="dd">夕食 <strong>NEOPASA浜松（上り）</strong>。石松の浜松餃子を第一候補に、40〜45分休憩。</div>
            <div class="dt">19:30頃</div><div class="dd">静岡方面へ。必要なら途中で短いトイレ休憩のみ追加。</div>
            <div class="dt">20:05–20:35</div><div class="dd"><strong>綾瀬SIC付近</strong>。ピーク後半〜終盤を通過する想定。+15〜25分を予算化。</div>
            <div class="dt">20:45–21:05</div><div class="dd">東京IC。</div>
            <div class="dt">21:10–21:40</div><div class="dd"><strong>三軒茶屋 到着目安</strong>。夕食45分を織り込み。強雨・事故時はさらに+30分以上を見る。</div>
          </div>
          <div class="drive-summary">NEOPASA浜松で夕食を40〜45分取るため、三軒茶屋着は<strong>21:10〜21:40</strong>を基本レンジに再設定したにゃ。</div>
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

  const returnDepart=findStop('timeline2','東京へ出発');
  if(returnDepart){
    setText(returnDepart,'.meta','15:00維持 / 瀬田東 → 新名神 → 伊勢湾岸 → 新東名');
    setText(returnDepart,'.stop-card > p','大津・岡崎の予測ピークは回避。最後の綾瀬SIC上りだけ+15〜25分を予算化。');
  }
  const tsuchiyama=findStop('timeline2','土山SA');
  if(tsuchiyama) setText(tsuchiyama,'.meta','20分休憩・お土産購入 / 売店24時間');

  const arrival=findStop('timeline2','三軒茶屋 着');
  if(arrival && !findStop('timeline2','NEOPASA浜松')){
    const extra=document.createElement('div');
    extra.className='stop';
    extra.dataset.start='2026-09-21T18:00:00+09:00';
    extra.dataset.end='2026-09-21T18:45:00+09:00';
    extra.innerHTML='<div class="time">18:00–18:45頃</div><div class="stop-card"><h3>NEOPASA浜松（上り）｜夕食</h3><div class="meta">帰路2回目の休憩 / 40〜45分 / 浜松餃子候補</div><p>夕食はここで取る。第一候補は元祖 浜松ぎょうざ 石松。昼の近江牛から時間を空け、ご当地ものを軽めに楽しんでから東京へ戻る。</p><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('NEOPASA浜松 上り')+'">地図</a><a class="btn" target="_blank" rel="noopener" href="https://sapa.c-nexco.co.jp/sapa/shop?sapainfoid=199">店舗を見る</a></div></div>';
    arrival.parentNode.insertBefore(extra,arrival);
  }
  if(arrival){
    arrival.dataset.start='2026-09-21T21:10:00+09:00';
    arrival.dataset.end='2026-09-21T21:40:00+09:00';
    setText(arrival,'.time','21:10–21:40頃');
    setText(arrival,'.meta','夕食45分込み / 強雨・事故時は+30分以上');
    setText(arrival,'.stop-card > p','土山SA20分＋NEOPASA浜松で夕食40〜45分を取り、綾瀬のピーク後渋滞を織り込んだ到着レンジ。');
  }
  const d2call=[...document.querySelectorAll('#day2 > .callout')].find(x=>x.textContent.includes('帰路メモ'));
  if(d2call) d2call.innerHTML='<strong>帰路メモ：</strong>15:00大津発は維持。土山SAで20分休憩・お土産、その後NEOPASA浜松（上り）で18:00頃から40〜45分の夕食。第一候補は浜松餃子。三軒茶屋着は21:10〜21:40頃を基本レンジに再設定。';

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