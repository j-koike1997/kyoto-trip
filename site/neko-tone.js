(()=>{
  // catGPT tone pass: keep dates/names/facts intact, make explanatory prose feel like
  // the cat is walking beside the reader and narrating the trip.
  const addNya=(text)=>{
    if(!text) return text;
    const t=text.trim();
    if(!t || /(?:にゃ|にゃん)[。！!？?]?$/.test(t)) return text;
    if(/^[\d\s:：–—〜~\-\/\.年月日]+$/.test(t)) return text;
    if(t.endsWith('。')) return t.slice(0,-1)+'にゃ。';
    if(t.endsWith('！')) return t.slice(0,-1)+'にゃ！';
    if(t.endsWith('!')) return t.slice(0,-1)+'にゃ！';
    if(t.endsWith('？')) return t.slice(0,-1)+'にゃ？';
    if(t.endsWith('?')) return t.slice(0,-1)+'にゃ？';
    return t+'にゃ。';
  };

  const toneSelectors=[
    '.story-card p',
    '.callout p',
    '.stop-card > p',
    '.history-body p',
    '.people-intro p',
    '.person-card > p',
    '.person-route',
    '.summary-sub',
    '.event',
    '.rain-plan-status',
    '.rain-live-note'
  ];

  document.querySelectorAll(toneSelectors.join(',')).forEach(el=>{
    // Do not flatten rich content containing links or line breaks.
    if(el.querySelector('a,br,img,figure')) return;
    el.textContent=addNya(el.textContent);
  });

  // More distinctive catGPT labels without making the historical material jokey.
  document.querySelectorAll('.history-body h4').forEach(h=>{
    const s=h.textContent.trim();
    if(s==='歴史的意味' || s==='意味') h.textContent='ねこ注目｜歴史的意味';
    else if(s==='見どころ') h.textContent='ねこ注目｜見どころ';
  });
  document.querySelectorAll('.person-route strong').forEach(el=>{
    if(el.textContent.includes('この旅との接点')) el.textContent='ねこ目線｜この旅との接点｜';
  });
  document.querySelectorAll('.history-photo-title').forEach(el=>{
    if(el.textContent.startsWith('見どころ｜')) el.textContent=el.textContent.replace('見どころ｜','ねこ注目｜');
  });

  const nextLabel=document.querySelector('.next-label');
  if(nextLabel && !nextLabel.textContent.includes('ねこ')) nextLabel.textContent='ねこナビ｜'+nextLabel.textContent;

  // Friendly buttons. Keep navigation meaning obvious.
  const buttonMap=new Map([
    ['地図を開く','地図を開くにゃ'],
    ['地図','地図を見るにゃ'],
    ['由来を見る','由来を見るにゃ'],
    ['食べログ','食べログを見るにゃ'],
    ['すべて開く','ぜんぶ開くにゃ'],
    ['すべて閉じる','ぜんぶ閉じるにゃ']
  ]);
  document.querySelectorAll('a.btn,button').forEach(el=>{
    const s=el.textContent.trim();
    if(buttonMap.has(s)) el.textContent=buttonMap.get(s);
  });

  // Section intros/headings get a light touch only.
  document.querySelectorAll('.section-title h2').forEach(h=>{
    const s=h.textContent.trim();
    const map={
      '旅の物語':'ねこと読む、旅の物語',
      '各地の縁起・由来・歴史的意味':'ねこと読む、各地の縁起・由来・歴史的意味',
      '旅に登場する人物を時代順に読む':'ねこと読む、旅の登場人物',
      '約1200年を一本の線で見る':'ねことたどる、約1200年の時間軸'
    };
    if(map[s]) h.textContent=map[s];
  });

  // Banknote feature has rich markup, so tone only its title.
  document.querySelectorAll('.kitanamaro-banknote figcaption strong').forEach(el=>{
    if(!el.textContent.includes('にゃ')) el.textContent='ねこ注目｜'+el.textContent;
  });
})();
