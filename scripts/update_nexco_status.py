#!/usr/bin/env python3
import json, re, html, urllib.request, datetime, os, sys, ssl, subprocess

PAGES = [
  ("新東名・新名神（東京方面／東海）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=shintoumeiiseshinmeishinnobori"),
  ("新東名（東京方面／関東甲信越）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=shintoumeinobori"),
  ("東名・名神（東京方面／関東甲信越）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=toumeinobori"),
  ("東名・名神（東京方面／東海）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=toumeishinnobori"),
]
ADVISORY = "https://www.c-nexco.co.jp/jam/"

def fetch(url):
    if "highway-telephone.jp" in url:
        cookie = "/tmp/nexco-cookie.txt"
        base = "https://c-nexco.highway-telephone.jp/main/"
        common = ["curl","-k","-L","--compressed","-sS","--max-time","20",
                  "-A","Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
                  "-H","Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "-H","Accept-Language: ja-JP,ja;q=0.9,en-US;q=0.7",
                  "-e",base,"-c",cookie,"-b",cookie]
        if not os.path.exists(cookie):
            subprocess.run(common + [base], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
        p = subprocess.run(common + [url], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
        if p.returncode != 0:
            raise RuntimeError(p.stderr.decode("utf-8","replace")[:300] or ("curl exit "+str(p.returncode)))
        raw = p.stdout
        if b"403 Forbidden" in raw[:5000] or b"<title>403" in raw[:5000]:
            raise RuntimeError("HTTP 403: NEXCO route-detail page blocked automated access")
        for enc in ("utf-8","shift_jis","cp932"):
            try:
                return raw.decode(enc)
            except UnicodeDecodeError:
                pass
        return raw.decode("utf-8",errors="replace")
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 kyoto-trip-nexco-monitor/1.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        raw = r.read()
        enc = r.headers.get_content_charset() or "utf-8"
        try:
            return raw.decode(enc, errors="replace")
        except LookupError:
            return raw.decode("utf-8", errors="replace")

def textify(raw):
    raw = re.sub(r"(?is)<script.*?</script>|<style.*?</style>", " ", raw)
    raw = re.sub(r"(?i)<br\s*/?>|</p>|</li>|</tr>|</h[1-6]>", "\n", raw)
    txt = re.sub(r"(?s)<[^>]+>", " ", raw)
    txt = html.unescape(txt).replace("\u3000"," ")
    txt = re.sub(r"[ \t\r\f\v]+", " ", txt)
    txt = re.sub(r"\n\s*", "\n", txt)
    txt = re.sub(r"\n+", "\n", txt)
    return txt.strip()

def section(txt, start, ends):
    endpat = "|".join(re.escape(x) for x in ends)
    m = re.search(re.escape(start) + r"\s*([0-9]+)\s*(.*?)(?:" + endpat + r"|$)", txt, re.S)
    if not m:
        return 0, ""
    return int(m.group(1)), re.sub(r"\s+", " ", m.group(2)).strip()

def timestamp_from(txt):
    m = re.search(r"(\d{1,2}/\d{1,2})\s*(\d{1,2}:\d{2})\s*現在", txt)
    return (m.group(1)+" "+m.group(2)) if m else None

def zone_for(s):
    groups = [
      (0, ["大津","瀬田","草津","甲賀","土山","亀山","鈴鹿","四日市","飛島","湾岸弥富","名古屋南","豊田東","岡崎"]),
      (1, ["新城","浜松いなさ","浜松浜北","浜松","三ヶ日","掛川","森掛川"]),
      (2, ["島田金谷","藤枝岡部","静岡","新静岡","清水","新清水","富士","新富士"]),
      (3, ["沼津","長泉沼津","裾野","御殿場","新御殿場","足柄"]),
      (4, ["大井松田","秦野","新秦野","伊勢原","厚木","海老名","横浜町田","横浜青葉","東京IC"]),
    ]
    hits = []
    for z, words in groups:
        if any(w in s for w in words):
            hits.append(z)
    return min(hits) if hits else None

def recommendation(level, min_zone, has_weather, advisory_risk):
    if level == "stop":
        if min_zone == 0:
            return {"code":"stay","title":"出発延期を優先","place":"大津・京都","reason":"大津〜愛知側を含む帰路前半に通行止め情報があります。高速へ入る前に待機してください。"}
        if min_zone == 1:
            return {"code":"okazaki","title":"岡崎で退避","place":"NEOPASA岡崎 上り","reason":"浜松方面以東に通行止め情報があります。静岡県内へ無理に進まず岡崎を第一退避地点にしてください。"}
        if min_zone == 2:
            return {"code":"hamamatsu","title":"浜松で退避","place":"NEOPASA浜松 上り","reason":"静岡中部方面に通行止め情報があります。浜松で止まり、解除・迂回可否を再確認してください。"}
        if min_zone == 3:
            return {"code":"shizuoka","title":"静岡で退避","place":"NEOPASA静岡 上り","reason":"御殿場〜静岡東部方面に通行止め情報があります。足柄を目指して進まず静岡で待機してください。"}
        if min_zone == 4:
            return {"code":"ashigara","title":"東側で退避","place":"EXPASA足柄 上り（到達済みなら）","reason":"神奈川・東京側に通行止め情報があります。すでに足柄まで安全に到達していれば足柄で待機。西側にいるなら静岡で再判断してください。"}
        return {"code":"hold","title":"次のSAで止まって再確認","place":"岡崎／浜松／静岡","reason":"帰路上に通行止め情報があります。現在地より先の規制区間へ入らないでください。"}
    if level == "caution" or has_weather or advisory_risk:
        return {"code":"check","title":"各チェックポイントで再判定","place":"岡崎 → 浜松 → 静岡","reason":"通行規制・悪天候またはNEXCOの通行止め可能性情報があります。各SAで次区間を確認し、不安ならそこで退避してください。"}
    return {"code":"go","title":"現時点で重大な通行止めなし","place":"通常ルート","reason":"取得できたNEXCO公式情報では、東京方面の東名・新東名に重大な通行止めを検出していません。岡崎・浜松・静岡で再確認しながら進んでください。"}

def main():
    result = {"sources":[],"events":[],"weather":[],"errors":[]}
    overall = "clear"
    min_zone = None
    has_weather = False

    for name,url in PAGES:
        try:
            raw = fetch(url)
            txt = textify(raw)
            cnum, cbody = section(txt, "通行止等情報", ["渋滞情報","事故情報","道路気象状況","IC間所要時間情報"])
            wnum, wbody = section(txt, "道路気象状況", ["IC間所要時間情報","休憩施設混雑情報","トップ","交通情報"])
            severe = bool(cnum and ("通行止" in cbody or "全車線" in cbody))
            if cnum:
                z = zone_for(cbody)
                if z is not None:
                    min_zone = z if min_zone is None else min(min_zone,z)
                result["events"].append({"source":name,"count":cnum,"text":cbody[:700],"severe":severe,"zone":z})
                overall = "stop" if severe else ("caution" if overall != "stop" else overall)
            if wnum:
                has_weather = True
                result["weather"].append({"source":name,"count":wnum,"text":wbody[:700]})
                if overall == "clear":
                    overall = "caution"
            result["sources"].append({"name":name,"url":url,"reported_at":timestamp_from(txt),"restriction_count":cnum,"weather_count":wnum,"ok":True})
        except Exception as e:
            result["errors"].append({"source":name,"error":str(e)})
            result["sources"].append({"name":name,"url":url,"ok":False})

    advisory_risk = False
    advisory_excerpt = ""
    try:
        atxt = textify(fetch(ADVISORY))
        risk_terms = ["通行止めの可能性","通行止めを実施","東名、中央道","東名・中央道","新東名"]
        advisory_risk = any(t in atxt for t in risk_terms)
        p = atxt.find("重要なお知らせ")
        advisory_excerpt = atxt[p:p+800] if p >= 0 else atxt[:800]
    except Exception as e:
        result["errors"].append({"source":"NEXCO中日本 交通情報","error":str(e)})

    jst = datetime.timezone(datetime.timedelta(hours=9))
    now = datetime.datetime.now(jst)
    if result["errors"] and not any(x.get("ok") for x in result["sources"]):
        overall = "caution"
    result.update({
      "updated_at_jst": now.isoformat(timespec="seconds"),
      "overall": overall,
      "advisory_risk": advisory_risk,
      "advisory_excerpt": advisory_excerpt,
      "recommendation": recommendation(overall,min_zone,has_weather,advisory_risk),
      "official_links": {
        "ihighway":"https://www.c-ihighway.jp/",
        "highway_telephone":"https://c-nexco.highway-telephone.jp/main/",
        "nexco":"https://www.c-nexco.co.jp/jam/"
      },
      "note":"NEXCO中日本の公開交通情報を自動判定。最終判断は公式画面・現地表示を優先してください。"
    })
    os.makedirs("traffic-data", exist_ok=True)
    with open("traffic-data/nexco-status.json","w",encoding="utf-8") as f:
        json.dump(result,f,ensure_ascii=False,indent=2)

if __name__ == "__main__":
    main()
