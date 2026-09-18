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

  const day1Section=document.getElementById('day1');
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
            <div class="dt">18:00–18:15</div><div class="dd">休憩② <strong>NEOPASA静岡</strong>を追加。長距離運転の安全マージン。</div>
            <div class="dt">19:00頃</div><div class="dd">御殿場JCT。</div>
            <div class="dt">19:35–20:05</div><div class="dd"><strong>綾瀬SIC付近</strong>。15:00〜21:00の渋滞帯だが17時ピーク後。+15〜25分を想定。</div>
            <div class="dt">20:15–20:35</div><div class="dd">東京IC。</div>
            <div class="dt">20:40–21:10</div><div class="dd"><strong>三軒茶屋 到着目安</strong>。強雨・事故時は+30分以上を見る。</div>
          </div>
          <div class="drive-summary">旧しおりの21:05〜21:50は安全側すぎたため、最新予測では<strong>20:40〜21:10</strong>を基本レンジに修正したにゃ。</div>
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
  if(arrival && !findStop('timeline2','NEOPASA静岡')){
    const extra=document.createElement('div');
    extra.className='stop';
    extra.dataset.start='2026-09-21T18:00:00+09:00';
    extra.dataset.end='2026-09-21T18:15:00+09:00';
    extra.innerHTML='<div class="time">18:00–18:15頃</div><div class="stop-card"><h3>NEOPASA静岡｜安全休憩</h3><div class="meta">帰路2回目の休憩 / 10〜15分</div><p>土山から一気に東京まで走らず、新東名で短く休んで集中力を戻す。</p><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('NEOPASA静岡 上り')+'">地図</a></div></div>';
    arrival.parentNode.insertBefore(extra,arrival);
  }
  if(arrival){
    arrival.dataset.start='2026-09-21T20:40:00+09:00';
    arrival.dataset.end='2026-09-21T21:10:00+09:00';
    setText(arrival,'.time','20:40–21:10頃');
    setText(arrival,'.meta','基本ケース / 強雨・事故時は+30分以上');
    setText(arrival,'.stop-card > p','土山SA＋NEOPASA静岡の2回休憩と、綾瀬のピーク後渋滞を織り込んだ到着レンジ。');
  }
  const d2call=[...document.querySelectorAll('#day2 > .callout')].find(x=>x.textContent.includes('帰路メモ'));
  if(d2call) d2call.innerHTML='<strong>帰路メモ：</strong>15:00大津発は維持。土山SA20分＋NEOPASA静岡10〜15分の2回休憩を入れる。9/21上りの大津・岡崎ピークは回避し、綾瀬SIC付近はピーク後半を通過。三軒茶屋着は20:40〜21:10頃を基本レンジに修正。';

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