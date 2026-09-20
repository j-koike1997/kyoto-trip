(()=>{
  if(window.__day2NarrativeMaibara20260920) return;
  window.__day2NarrativeMaibara20260920=true;

  const sectionByHeading=(needle)=>{
    return [...document.querySelectorAll('.section')].find(sec=>{
      const h=sec.querySelector('.section-title h2');
      return h && h.textContent.includes(needle);
    });
  };

  // 1) DAY2 navigation summary
  const day2=document.getElementById('day2');
  if(day2){
    let box=document.getElementById('day2-nav-summary');
    if(!box){
      box=document.createElement('div');
      box.id='day2-nav-summary';
      box.className='callout';
      const routeLinks=day2.querySelector('.route-links');
      if(routeLinks) routeLinks.insertAdjacentElement('afterend',box);
      else{
        const title=day2.querySelector('.section-title');
        if(title) title.insertAdjacentElement('afterend',box);
        else day2.prepend(box);
      }
    }
    box.innerHTML='<strong>ナビ用まとめ｜9/21 最終ルート</strong><br>'+
      '大津プリンス → 泉涌寺P → 霊山歴史館 → 松喜屋本店（13:30予約） → 多賀SA上り（京都土産） → 蓮華寺〈米原・番場〉 → 三軒茶屋。'+
      '<br><b>時刻ルール：</b>松喜屋14:30発目標。14:40超なら多賀SAは5分、14:50超なら土産を飛ばす。蓮華寺15:45着目標、16:00を実質最終ライン、16:20〜16:30には東京へ出発するにゃ。';
  }

  // 2) History / origin section: remove obsolete Tsuchiyama stop entry and add Maibara Rengeji.
  const history=sectionByHeading('縁起') || document.getElementById('history');
  if(history){
    [...history.querySelectorAll('details.history')].forEach(d=>{
      const s=d.querySelector('summary')?.textContent||'';
      if(s.includes('土山SA') || s.includes('土山サービスエリア')) d.classList.add('hidden');
    });

    if(!document.getElementById('history-maibara-rengeji')){
      const d=document.createElement('details');
      d.className='history';
      d.id='history-maibara-rengeji';
      d.innerHTML=
        '<summary><span class="summary-title">蓮華寺（米原）｜1333年、六波羅探題の終焉</span>'+
        '<span class="summary-sub">北条仲時と一行432名 / 陸波羅南北過去帳 / 中山道・番場宿</span></summary>'+
        '<div class="history-body">'+
        '<h4>縁起・再興</h4>'+
        '<p>寺伝では推古23年（615）に聖徳太子が建立したとされるにゃ。のちに焼失した寺を、弘安7年（1284）、当地の地頭で鎌刃城主の土肥元頼が一向俊聖を招いて再建し、「蓮華寺」と号したにゃ。</p>'+
        '<h4>1333年｜鎌倉幕府崩壊の直前</h4>'+
        '<p>元弘3年（1333）、京都を追われた六波羅探題北方の北条仲時は、光厳天皇・後伏見上皇・花園上皇を伴って東国へ向かったにゃ。しかし番場付近で京極道誉らに進路を阻まれ、蓮華寺に至って一行432名とともに自刃したと寺は伝えているにゃ。</p>'+
        '<h4>陸波羅南北過去帳</h4>'+
        '<p>当時の住職・同阿良向は死者を弔い、姓名の判明した189人を過去帳に記したにゃ。この「陸波羅南北過去帳」は国の重要文化財。境内の供養塔は、巨大な政治体制が崩れる瞬間を一人ひとりの死者の記憶へ戻して見せる場所にゃ。</p>'+
        '<h4>ねこ注目｜この旅で見る意味</h4>'+
        '<p>京都から東京へ帰る途中、かつて京都から鎌倉へ逃れようとした六波羅探題の一行が近江で行き止まった場所に立つにゃ。今回の旅で追ってきた「朝廷・武家・宗教」の三者が、1333年に大きく組み替わる転換点を、帰路そのものの方向と重ねて体感できるにゃ。</p>'+
        '<p class="small">出典：<a href="https://maibara-rengeji.wixsite.com/rengeji/about" target="_blank" rel="noopener">浄土宗本山 蓮華寺 公式</a> ／ <a href="https://maibara-rengeji.wixsite.com/rengeji/cultural" target="_blank" rel="noopener">蓮華寺 文化財</a></p>'+
        '</div>';
      history.appendChild(d);
    }
  }

  // 3) Trip story: retire the old Tsuchiyama/Hamamatsu ending and add the new final chapter.
  const story=sectionByHeading('旅の物語');
  if(story){
    [...story.querySelectorAll('.story-card')].forEach(card=>{
      const t=card.textContent||'';
      if(t.includes('土山SA') || t.includes('NEOPASA浜松') || t.includes('浜松餃子')) card.classList.add('hidden');
    });

    if(!document.getElementById('story-maibara-rengeji')){
      const card=document.createElement('div');
      card.className='card story-card';
      card.id='story-maibara-rengeji';
      card.innerHTML=
        '<h3>最終章｜京都から東へ――政権が崩れた道を逆向きにたどる</h3>'+
        '<p>DAY2は泉涌寺と陵墓で「天皇の京都」を見て、霊山歴史館で幕末の政権交代をたどり、松喜屋で近江の商業文化へ抜けるにゃ。そこから多賀を経て米原・番場の蓮華寺へ向かうと、物語はさらに500年以上さかのぼるにゃ。</p>'+
        '<p>1333年、京都の鎌倉幕府出先機関・六波羅探題は崩壊し、北条仲時らは天皇・上皇を伴って鎌倉を目指したにゃ。しかし東へ向かう途上の番場で進路を断たれ、蓮華寺で最期を迎えた。ご主人様たちは、その一行が果たせなかった「京都から東国へ」の道を、約700年後にそのまま東京へ走ることになるにゃ。</p>'+
        '<p>旅の最初に明治天皇陵で近代国家の完成を見て、最後に蓮華寺で鎌倉幕府崩壊の現場を見る。時代順ではなく逆向きだけれど、だからこそ「日本の統治の形は何度も組み替えられてきた」という一本の線が見えるにゃ。ここを今回の旅のエピローグにするにゃ。</p>';
      story.appendChild(card);
    }
  }
})();