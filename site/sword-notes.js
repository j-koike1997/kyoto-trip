(()=>{
  const notes={
    'history-1':{level:'時代背景',title:'刀が「身分のしるし」ではなくなる時代へ',text:'明治天皇の時代は、日本刀の意味が大きく変わった時代にゃ。明治9年（1876）の太政官布告では、軍人・警察官などを除いて帯刀が禁止され、武士が日常的に刀を差す社会は制度上終わっていったにゃ。伏見桃山陵そのものに特定の名刀伝承があるわけではないけれど、「刀を帯びる社会」から近代国家へ移った終着点として見ると、この旅の最初の場所にぴったりにゃ。',source:'https://hourei.ndl.go.jp/simple/detail?current=-1&lawId=0000047225',sourceLabel:'国立国会図書館 日本法令索引'},
    'history-2':{level:'直結',title:'伏見は「刀槍 vs 砲・小銃」がぶつかった場所',text:'月の蔵人のある上油掛町周辺は、鳥羽・伏見の戦いの激戦地に近いにゃ。新選組や会津藩を中心とする旧幕府軍は伏見奉行所に陣を置き、刀や槍を手に応戦した一方、新政府軍は大砲や小銃を用いたにゃ。1913年築の酒蔵で昼食を取りながら、すぐ近くの町が半世紀前には近代戦への転換点だったことを重ねて見ると、伏見の時間の厚みが分かるにゃ。',source:'https://www.city.kyoto.lg.jp/fushimi/page/0000014952.html',sourceLabel:'京都市伏見区役所'},
    'history-3':{level:'人物史',title:'清麻呂は「刀で勝った人」ではないのが面白いにゃ',text:'和気清麻呂に結び付く有名な名刀や斬り合いの逸話は、今回ねこが確認した範囲では見当たらないにゃ。むしろ清麻呂の強さは、武力ではなく勅使として宇佐八幡宮の神託を持ち帰り、道鏡の皇位就任を否定したこと。刀の英雄が多い日本史の中で、「武器を抜かずに政治の流れを変えた人物」として見ると護王神社がぐっと面白くなるにゃ。',source:'https://www.gooujinja.or.jp/',sourceLabel:'護王神社'},
    'history-4':{level:'周辺史',title:'すぐ近くの一条堀川は、名刀工・堀川国広の町にゃ',text:'鶴屋吉信そのものと刀工に直接の関係はないけれど、この界隈は刀好きにはかなり熱いにゃ。桃山〜江戸初期の名工・堀川国広は、1599年ごろから京都の一条堀川に定住し、堀川派という一大刀工集団を育てたにゃ。代表作は重要文化財「山姥切国広」。京菓子を買いながら、「この近所で新刀の名門が生まれた」と覚えておくと寄り道の密度が上がるにゃ。',source:'https://kotobank.jp/word/%E5%A0%80%E5%B7%9D%E5%9B%BD%E5%BA%83-134312',sourceLabel:'日本大百科全書（コトバンク）'},
    'history-5':{level:'背景史',title:'優雅な門跡寺院の背後には、武装した比叡山の歴史もあるにゃ',text:'曼殊院そのものに有名な刀剣伝承があるわけではないにゃ。でも起源をたどる比叡山では、中世に武装した僧たちが現れ、寺院社会と武力が結び付いた時代があったにゃ。皇族・公家文化の洗練された曼殊院と、母山である比叡山の武装性を対比すると、「宗教＝静かな祈りだけではなかった」中世京都の複雑さが見えてくるにゃ。',source:'https://komazawa-u.repo.nii.ac.jp/record/2005903/files/00016153.pdf',sourceLabel:'駒澤大学学術資料'},
    'history-6':{level:'人物史',title:'武士が「刀を振るう側」から文化をつくる側へ',text:'蓮華寺に特定の名刀伝承は確認できないけれど、現在地で再興した今枝近義（いまえだちかよし）は加賀藩ゆかりの武家の人物にゃ。石川丈山や狩野探幽ら文化人とも交わり、庭や寺院文化を残した。武士の力が、合戦だけでなく庭園・建築・教養へ向かっていく江戸初期の変化を感じる場所として見るといいにゃ。',source:'https://shugakuryoko.kyoto.travel/?spot=rengeji',sourceLabel:'京都修学旅行ナビ'},
    'history-7':{level:'直結',title:'比叡山は「僧兵」のイメージが生まれた代表的な山にゃ',text:'比叡山では中世、寺領や権益を守るため武装した僧たちが存在し、朝廷への強訴にも関わったにゃ。史料には兵仗を帯びる僧侶を禁じようとする規定まで残っていて、それだけ武器所持が現実の問題だったことが分かるにゃ。夢見が丘から山を眺めるとき、「この山は巨大な宗教都市であると同時に政治勢力でもあった」と想像すると景色が変わるにゃ。',source:'https://komazawa-u.repo.nii.ac.jp/record/2005903/files/00016153.pdf',sourceLabel:'駒澤大学学術資料'},
    'history-8':{level:'周辺史',title:'ホテルから見える大津は、関ヶ原直前の籠城戦の町でもあるにゃ',text:'びわ湖大津プリンスホテル自体に刀の伝承があるわけではないけれど、大津の町は1600年の「大津城の戦い」の舞台にゃ。京極高次が籠城し、西軍の大軍を足止めしたことで、結果的に西軍の一部が関ヶ原本戦に間に合わなかった。湖の夜景を見ながら、ここが一度は甲冑と刀槍の軍勢で埋まった城下だったと想像すると面白いにゃ。',source:'https://rekihaku.otsu.shiga.jp/news/2404_k94.html',sourceLabel:'大津市歴史博物館'},
    'history-9':{level:'皇室文化',title:'泉涌寺は「名刀の寺」より、刀が儀礼へ変わる世界を見る場所にゃ',text:'泉涌寺には、今回の行程で必見と言える特定の有名刀剣伝承は確認できなかったにゃ。ここで注目したいのは、武士の実戦刀とは別に、皇室文化の中で太刀や剣が権威・儀礼の象徴にもなっていったこと。霊山歴史館の生々しい実戦刀を見る前に、泉涌寺では「武器ではなく格式を表す刀」という別の顔を意識すると面白いにゃ。',source:'https://mitera.org/',sourceLabel:'御寺 泉涌寺'},
    'history-10':{level:'皇室文化',title:'陵墓では「刀そのもの」より、皇統と武家政権の距離を見るにゃ',text:'月輪陵・後月輪陵に特定の名刀の逸話を無理に結び付けるのは危険にゃ。ここでは中世〜近世の天皇たちが京都に葬られ続けた一方、政治と軍事の実権は武家政権が握っていた、という構図を見るのが大事。刀を帯びる武士の世と、皇統を保つ朝廷の時間が同じ京都で並行していたことを感じる場所にゃ。',source:'https://www.kunaicho.go.jp/ryobo/',sourceLabel:'宮内庁 陵墓'},
    'history-11':{level:'時代背景',title:'南北朝の戦乱のただ中に生まれた、静かな写経の寺にゃ',text:'雲龍院を創建した後光厳天皇の時代は、南北朝の内乱が続き、武士たちの刀が政治を左右していた時代にゃ。それなのに雲龍院で前面に出るのは写経・祈り・皇室文化。外では武力で皇統が争われ、内では祈りが続く――その対比がこの寺の面白さにゃ。特定の名刀伝承というより、「刀の時代の静かな別世界」として味わいたいにゃ。',source:'https://www.unryuin.jp/',sourceLabel:'雲龍院'},
    'history-12':{level:'直結',title:'孝明天皇ゆかりと伝わる「無銘 伝正宗」も残っているにゃ',text:'孝明天皇には、伝来品として「刀 無銘 伝正宗（でんまさむね）」が伝わったとされるにゃ。現在は民間の刀剣コレクションで紹介されており、刃長68.2cm。陵墓で刀を見られるわけではないけれど、幕末の天皇もまた、刀が権威・贈答・護身の象徴だった時代を生きていたことが実感できるにゃ。',source:'https://www.meihaku.jp/ginga-sword/ginga-bakumatsugreatman/',sourceLabel:'名古屋刀剣博物館「幕末の偉人と刀」'},
    'history-13':{level:'最重要',title:'今回の刀剣ハイライトはここにゃ',text:'霊山歴史館では、京都見廻組・桂早之助が坂本龍馬を斬ったと伝わる脇差「越後守包貞」、近藤勇の所用刀「阿州吉川六郎源祐芳」、土方歳三の所用刀「大和守源秀國」が大きな見どころにゃ。刀身だけでなく、誰が持ち、どこを転戦し、どう伝来したかを見ると「幕末の刀」が急に生々しくなるにゃ。ここは時間を取ってじっくり見る価値ありにゃ。',source:'https://kyoto-museums.city.kyoto.lg.jp/museum/279/',sourceLabel:'京都市ミュージアム検索サイト'},
    'history-14':{level:'伝説',title:'松喜屋のすぐ近く、瀬田の唐橋には「龍王から授かった太刀」の伝説にゃ',text:'松喜屋本店のある唐橋町は、瀬田の唐橋のすぐそば。ここには俵藤太（藤原秀郷）の大百足退治伝説があるにゃ。秀郷が巨大な百足を弓で退治すると、龍王から褒美として太刀や米俵などを授かったと伝わる。近江牛の昼食の前後に、「唐橋」の地名が千年以上の武勇伝につながっていると知ると、店の立地まで楽しくなるにゃ。',source:'https://rekishihyakka.jp/culturalheritages/o-s006-4/',sourceLabel:'びわ湖大津歴史百科'},
    'history-15':{level:'伝説',title:'土山の先、鈴鹿峠は坂上田村麻呂の「鬼退治」の土地にゃ',text:'土山SA自体の刀ではないけれど、土山町には坂上田村麻呂を祀る田村神社があり、「鈴鹿峠で人々を苦しめた鬼を退治した」という伝説が残るにゃ。後世の物語では田村麻呂は宝剣や鬼神退治と結び付けられ、鈴鹿峠は刀剣伝説の舞台になっていく。帰路の休憩地点まで平安初期の武人伝説につながるのが面白いにゃ。',source:'https://koka-kanko.org/see/tamurajinjya/',sourceLabel:'甲賀市観光ガイド'},
    'history-16':{level:'直結',title:'雨天なら「大津城の戦い」を刀槍の側から補強できるにゃ',text:'大津市歴史博物館では、大津城主・京極高次と1600年の大津城の戦いが重要テーマの一つにゃ。関ヶ原直前、西軍の大軍を大津城に引き付けた籠城戦で、鉄砲・弓・刀槍が入り混じる戦国末期の戦いだった。雨天で比叡山を外した場合でも、ここで「武装都市・大津」の歴史を入れると旅の物語は薄くならないにゃ。',source:'https://rekihaku.otsu.shiga.jp/news/2404_k94.html',sourceLabel:'大津市歴史博物館'}
  };

  const style=document.createElement('style');
  style.id='sword-note-style';
  style.textContent=`
    .sword-note{margin:18px 0 2px;padding:15px 16px;border-radius:14px;background:linear-gradient(135deg,#f7f3ea,#fff);border:1px solid #d8c89f;box-shadow:0 5px 16px rgba(50,43,30,.06)}
    .sword-note-head{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap}
    .sword-note-icon{font-size:1.08rem}.sword-note-title{font-weight:900;color:var(--navy);font-size:.96rem;line-height:1.5}
    .sword-note-level{font-size:.7rem;font-weight:900;padding:3px 7px;border-radius:999px;background:#283c57;color:#fff;white-space:nowrap}
    .sword-note p{margin:0;font-size:.9rem;line-height:1.75;color:#3f4852}
    .sword-note a{display:inline-block;margin-top:9px;font-size:.74rem;color:#6a5a36;text-decoration:underline;text-underline-offset:2px}
  `;
  document.head.appendChild(style);

  for(const [id,n] of Object.entries(notes)){
    const details=document.getElementById(id);
    if(!details||details.querySelector('.sword-note')) continue;
    const host=details.querySelector('.history-body')||details;
    const box=document.createElement('div');
    box.className='sword-note';
    box.innerHTML=`<div class="sword-note-head"><span class="sword-note-icon">⚔️</span><span class="sword-note-level">${n.level}</span><span class="sword-note-title">刀メモ｜${n.title}</span></div><p>${n.text}</p><a href="${n.source}" target="_blank" rel="noopener">資料：${n.sourceLabel} ↗</a>`;
    host.appendChild(box);
  }
})();
