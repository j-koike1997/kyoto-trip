(()=>{
  const sectionByHeading=(needle)=>{
    return [...document.querySelectorAll('section,.section')].find(sec=>{
      const h=sec.querySelector('.section-title h2,h2');
      return h && h.textContent.includes(needle);
    });
  };

  function ensureHistory(){
    const history=sectionByHeading('縁起') || document.getElementById('history');
    if(!history) return null;

    [...history.querySelectorAll('details.history')].forEach(d=>{
      const s=d.querySelector('summary')?.textContent||'';
      if(s.includes('土山SA') || s.includes('土山サービスエリア')) d.remove();
    });

    let d=document.getElementById('history-maibara-rengeji');
    if(!d){
      d=document.createElement('details');
      d.className='history';
      d.id='history-maibara-rengeji';
      history.appendChild(d);
    }
    d.innerHTML=
      '<summary><span class="summary-title">蓮華寺（米原・番場）｜1333年、六波羅探題の終焉</span>'+
      '<span class="summary-sub">北条仲時と一行432名 / 陸波羅南北過去帳 / 中山道・番場宿</span></summary>'+
      '<div class="history-body">'+
      '<h4>縁起・再興</h4>'+
      '<p>寺伝では推古23年（615）に聖徳太子が建立したとされるにゃ。のちに焼失した寺を、弘安7年（1284）、当地の地頭で鎌刃城主の土肥元頼が一向俊聖を招いて再建し、「蓮華寺」と号したにゃ。</p>'+
      '<h4>1333年｜鎌倉幕府崩壊の直前</h4>'+
      '<p>元弘3年（1333）、京都を追われた六波羅探題北方の北条仲時は、光厳天皇・後伏見上皇・花園上皇を伴って東国へ向かったにゃ。しかし番場付近で進路を阻まれ、蓮華寺に至って一行432名とともに自刃したと寺は伝えているにゃ。</p>'+
      '<h4>陸波羅南北過去帳</h4>'+
      '<p>当時の住職・同阿良向は死者を弔い、姓名の判明した189人を過去帳に記したにゃ。この「陸波羅南北過去帳」は国の重要文化財。境内の供養塔は、政権崩壊という大事件を一人ひとりの死者の記憶へ引き戻して見せる場所にゃ。</p>'+
      '<h4>ねこ注目｜この旅で見る意味</h4>'+
      '<p>京都から東京へ帰る途中、かつて京都から鎌倉へ逃れようとした六波羅探題の一行が近江で行き止まった場所に立つにゃ。今回の旅で追ってきた「朝廷・武家・宗教」の関係が大きく組み替わる転換点を、帰路そのものの方向と重ねて体感できるにゃ。</p>'+
      '<p class="small">出典：<a href="https://maibara-rengeji.wixsite.com/rengeji/about" target="_blank" rel="noopener">浄土宗本山 蓮華寺 公式</a> ／ <a href="https://maibara-rengeji.wixsite.com/rengeji/cultural" target="_blank" rel="noopener">蓮華寺 文化財</a></p>'+
      '</div>';
    return d;
  }

  function ensureNav(){
    const day2=document.getElementById('day2');
    if(!day2) return;
    let box=document.getElementById('day2-nav-summary');
    if(!box){
      box=document.createElement('div');
      box.id='day2-nav-summary';
      box.className='callout';
      const routeLinks=day2.querySelector('.route-links');
      if(routeLinks) routeLinks.insertAdjacentElement('afterend',box);
      else (day2.querySelector('.section-title')||day2).insertAdjacentElement?.('afterend',box);
    }
    if(box) box.innerHTML='<strong>ナビ用まとめ｜9/21 最終ルート</strong><br>'+
      '大津プリンス → 泉涌寺P → 霊山歴史館 → 松喜屋本店（13:30予約） → 多賀SA上り（京都土産） → 蓮華寺〈米原・番場〉 → 三軒茶屋。'+
      '<br><b>時刻ルール：</b>松喜屋14:30発目標。14:40超なら多賀SAは5分、14:50超なら土産を飛ばす。蓮華寺15:45着目標、16:00を実質最終ライン、16:20〜16:30には東京へ出発するにゃ。';
  }

  function rebuildStory(){
    // Find the actual visible story heading, regardless of cat-tone rewriting.
    const headings=[...document.querySelectorAll('h1,h2,h3')];
    const h=headings.find(x=>{
      const t=(x.textContent||'').replace(/\s+/g,'');
      return t.includes('旅の物語') || t.includes('物語');
    });
    const story=h ? h.closest('section,.section') : null;
    if(!story) return;

    const titleWrap=story.querySelector('.section-title');
    const titleHtml=titleWrap ? titleWrap.outerHTML :
      '<div class="section-title"><span>STORY</span><h2>ねこと読む、旅の物語</h2></div>';

    // Replace the section body wholesale so no obsolete story survives above or below it.
    const cards=[
      {
        title:'第一章｜王権と都――伏見から京都へ',
        body:[
          '旅の入口は明治天皇伏見桃山陵。近代日本の国家形成を象徴する陵から始め、護王神社では和気清麻呂と奈良末〜平安初期の王権・宗教・政治のせめぎ合いへ時代をさかのぼったにゃ。',
          '京都では、朝廷だけでも武家だけでも説明できない「都を支えた複数の力」を追うのがこの旅の軸になったにゃ。'
        ]
      },
      {
        title:'第二章｜祈りの京都――門跡・寺院・比叡山',
        body:[
          '曼殊院や洛北の蓮華寺では、寺院が信仰の場であるだけでなく、門跡・文化・庭園を通じて政治と社会の一部を担ってきたことを見るにゃ。',
          '比叡山では延暦寺の拝観には間に合わなかったけれど、山そのものが京都と近江の境界に立つ巨大な宗教拠点だった、という地理は旅の中にはっきり残ったにゃ。'
        ]
      },
      {
        title:'第三章｜天皇の死と近代の誕生――泉涌寺から霊山へ',
        body:[
          'DAY2前半は泉涌寺と皇室陵墓へ。歴代天皇の葬送と祈りの空間から、孝明天皇の時代を経て幕末へつなぐにゃ。',
          '霊山歴史館では、幕府・朝廷・薩長・新選組など複数の立場が衝突した京都を見て、DAY1の明治天皇陵を「維新の後に成立した国家」の側からもう一度読み直すにゃ。'
        ]
      },
      {
        title:'最終章｜京都から東へ――六波羅探題が果たせなかった帰路',
        body:[
          '松喜屋で近江の商業文化に触れ、多賀を経て向かう最後の史跡が米原・番場の蓮華寺にゃ。ここで物語は幕末から一気に1333年へ戻るにゃ。',
          '京都の鎌倉幕府出先機関・六波羅探題が崩壊すると、北条仲時らは天皇・上皇を伴って鎌倉を目指した。しかし東へ向かう途上の番場で進路を断たれ、蓮華寺で最期を迎えたにゃ。',
          'ご主人様たちは、その一行が果たせなかった「京都から東国へ」の道を、約700年後に東京まで走ることになる。明治天皇陵から始まり、最後に鎌倉幕府崩壊の現場へ着く――時代を逆向きにたどりながら、日本の統治の形が何度も組み替えられてきたことを一本の線として見る旅のエピローグにゃ。'
        ]
      }
    ];

    const cardsHtml=cards.map((x,i)=>
      '<div class="card story-card"'+(i===cards.length-1?' id="story-maibara-rengeji"':'')+'>'+
      '<h3>'+x.title+'</h3>'+
      x.body.map(p=>'<p>'+p+'</p>').join('')+
      '</div>'
    ).join('');

    story.innerHTML=titleHtml+cardsHtml;
  }

  function linkRengejiOrigin(){
    const stop=[...document.querySelectorAll('#timeline2 .stop')].find(s=>(s.querySelector('h3')?.textContent||'').includes('蓮華寺'));
    if(!stop) return;
    let actions=stop.querySelector('.actions');
    if(!actions){
      actions=document.createElement('div');
      actions.className='actions';
      stop.querySelector('.stop-card')?.appendChild(actions);
    }
    if(!actions || actions.querySelector('a[href="#history-maibara-rengeji"]')) return;
    const a=document.createElement('a');
    a.className='btn gold';
    a.href='#history-maibara-rengeji';
    a.textContent='由来を見る';
    a.addEventListener('click',()=>{
      const d=document.getElementById('history-maibara-rengeji');
      if(d) d.open=true;
    });
    actions.appendChild(a);
  }

  function apply(){
    ensureNav();
    ensureHistory();
    rebuildStory();
    linkRengejiOrigin();
  }

  apply();
  // Some existing itinerary scripts also modify the DOM during initial parsing.
  // Re-apply once after they have finished so the final visible state is deterministic.
  setTimeout(apply,250);
  setTimeout(apply,1200);
})();