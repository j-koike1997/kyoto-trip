#!/usr/bin/env python3
import json, re, html, urllib.request, datetime, os, sys, ssl, subprocess

PAGES = [
  ("新東名・新名神（東京方面／東海）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=shintoumeiiseshinmeishinnobori"),
  ("新東名（東京方面／関東甲信越）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=shintoumeinobori"),
  ("東名・名神（東京方面／関東甲信越）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=toumeinobori"),
  ("東名・名神（東京方面／東海）", "https://c-nexco.highway-telephone.jp/main/infoselect.php?road=toumeishinnobori"),
]
ADVISORY = "https://www.c-nexco.co.jp/jam/"
PARKING_PAGES = [
  ("東名", "https://www.c-ihighway.jp/cgi/sapa.cgi?site=smp&disp=list&road=1031"),
  ("新東名", "https://www.c-ihighway.jp/cgi/sapa.cgi?site=smp&disp=list&road=103200&dir=0"),
]
PARKING_TARGETS = {
  "岡崎": {"display":"NEOPASA岡崎 上り","route":"新東名","order":0},
  "浜松": {"display":"NEOPASA浜松 上り","route":"新東名","order":1},
  "静岡": {"display":"NEOPASA静岡 上り","route":"新東名","order":2},
  "足柄": {"display":"EXPASA足柄 上り","route":"東名","order":3},
}

def fetch(url):
    if "c-ihighway.jp" in url:
        cookie = "/tmp/ihighway-cookie.txt"
        common = ["curl","-L","--compressed","-sS","--max-time","20",
                  "-A","Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
                  "-H","Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "-H","Accept-Language: ja-JP,ja;q=0.9,en-US;q=0.7",
                  "-H","Cache-Control: no-cache",
                  "-e","https://www.c-ihighway.jp/",
                  "-c",cookie,"-b",cookie]
        p = subprocess.run(common + [url], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
        if p.returncode != 0:
            raise RuntimeError(p.stderr.decode("utf-8","replace")[:300] or ("curl exit "+str(p.returncode)))
        raw = p.stdout
        if not raw:
            raise RuntimeError("empty response from iHighway")
        for enc in ("utf-8","shift_jis","cp932"):
            try:
                return raw.decode(enc)
            except UnicodeDecodeError:
                pass
        return raw.decode("utf-8",errors="replace")
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


def normalize_parking_text(s):
    s = s.replace("ＳＡ","SA").replace("ＰＡ","PA").replace("　"," ")
    s = s.replace("空車","空").replace("混雑中","混雑")
    s = re.sub(r"(?<!満)満(?!車)", "満車", s)
    return re.sub(r"\s+"," ",s).strip()

def extract_parking_rows(txt):
    t = normalize_parking_text(txt)
    rows = []
    # iHighway SAPA table: 方面 / 名称 / 小型車 / 大型車
    pat = re.compile(r"(上り|下り)\s+([^\s]{1,30}?(?:SA|PA))\s+(空|混雑|満車|調整中|情報なし|－|-)\s+(空|混雑|満車|調整中|情報なし|－|-)")
    for m in pat.finditer(t):
        rows.append({"dir":m.group(1),"name":m.group(2),"small":m.group(3),"large":m.group(4)})
    return rows

def parking_status():
    out = {k:{"display":v["display"],"route":v["route"],"order":v["order"],"small":"不明","large":"不明","source_ok":False} for k,v in PARKING_TARGETS.items()}
    errors = []
    source_times = []
    debug = {}
    for route,url in PARKING_PAGES:
        try:
            raw = fetch(url)
            txt = textify(raw)
            debug[route] = txt[:3500]
            tm = re.search(r"(\d{1,2})時(\d{2})分?現在", txt)
            if tm:
                source_times.append(route+" "+tm.group(1)+":"+tm.group(2))
            rows = extract_parking_rows(txt)
            for key,meta in PARKING_TARGETS.items():
                if meta["route"] != route:
                    continue
                for row in rows:
                    if row["dir"] == "上り" and key in row["name"]:
                        out[key].update({"small":row["small"],"large":row["large"],"source_ok":True,"raw_name":row["name"]})
                        break
        except Exception as e:
            errors.append({"source":"SAPA駐車場情報 "+route,"error":str(e)})
    return out, errors, source_times, debug

def apply_parking_rule(rec, parking):
    # X2 is a passenger car, so small-car occupancy drives the decision.
    code_to_key = {"okazaki":"岡崎","hamamatsu":"浜松","shizuoka":"静岡","ashigara":"足柄"}
    key = code_to_key.get(rec.get("code"))
    if not key:
        return rec
    st = parking.get(key,{}).get("small","不明")
    rec = dict(rec)
    rec["parking_status"] = st
    if st == "満車":
        order = PARKING_TARGETS[key]["order"]
        prev = {0:("stay","大津・京都","岡崎が満車のため、帰路へ入る前に待機または鈴鹿PAで再確認"),
                1:("okazaki","NEOPASA岡崎 上り","浜松が満車のため、浜松へ進まず岡崎でSTOP"),
                2:("hamamatsu","NEOPASA浜松 上り","静岡が満車のため、静岡へ進まず浜松でSTOP"),
                3:("shizuoka","NEOPASA静岡 上り","足柄が満車のため、御殿場方面へ進まず静岡でSTOP")}
        code,place,reason = prev[order]
        rec.update({"code":code,"title":key+"は満車：一つ手前でSTOP","place":place,
                    "reason":reason+"。SA入口で詰まるリスクを避けます。","basis":"parking_full","blocked_sa":key})
    elif st == "混雑":
        rec["title"] = rec.get("title","退避判断")+"（"+key+"混雑）"
        rec["reason"] = rec.get("reason","")+" "+key+"の小型車駐車場は混雑表示です。到着前に満車へ変わる可能性があるため、一つ手前のSAで再確認し、悪化していればそこでSTOPしてください。"
        rec["basis"] = "parking_crowded"
    return rec

def recommendation(level, min_zone, has_weather, advisory_risk, forecast_risk=False, forecast_zone=None):
    # 実際の通行止めが出た場合は、その区間へ入らないことを最優先。
    if level == "stop":
        if min_zone == 0:
            return {"code":"stay","title":"出発延期を優先","place":"大津・京都","reason":"大津〜愛知側を含む帰路前半に通行止め情報があります。高速へ入る前に待機してください。","basis":"closure"}
        if min_zone == 1:
            return {"code":"okazaki","title":"岡崎で退避","place":"NEOPASA岡崎 上り","reason":"浜松方面以東に通行止め情報があります。規制区間へ入らず岡崎で待機してください。","basis":"closure"}
        if min_zone == 2:
            return {"code":"hamamatsu","title":"浜松で退避","place":"NEOPASA浜松 上り","reason":"静岡中部方面に通行止め情報があります。浜松で止まり、解除・迂回可否を再確認してください。","basis":"closure"}
        if min_zone == 3:
            return {"code":"shizuoka","title":"静岡で退避","place":"NEOPASA静岡 上り","reason":"御殿場〜静岡東部方面に通行止め情報があります。足柄を目指して進まず静岡で待機してください。","basis":"closure"}
        if min_zone == 4:
            return {"code":"ashigara","title":"足柄で退避","place":"EXPASA足柄 上り（到達済みなら）","reason":"神奈川・東京側に通行止め情報があります。足柄まで安全に到達済みなら足柄で待機し、西側にいるなら静岡で再判断してください。","basis":"closure"}
        return {"code":"hold","title":"次の大型SAで止まる","place":"岡崎／浜松／静岡","reason":"帰路上に通行止め情報があります。現在地より先の規制区間へ入らないでください。","basis":"closure"}

    # 重要：予告段階で一つ手前に止める。SA内で閉じ込められる前に退避するための先回りルール。
    if forecast_risk:
        if forecast_zone == 0:
            return {"code":"stay","title":"予告段階で出発延期","place":"大津・京都","reason":"帰路前半に通行止めの可能性があります。規制開始前でも高速へ入らず、現地待機を優先してください。","basis":"forecast"}
        if forecast_zone == 1:
            return {"code":"okazaki","title":"予告を検知：岡崎で先回り退避","place":"NEOPASA岡崎 上り","reason":"浜松方面に通行止めの可能性があります。閉鎖後にSAで足止めされる前に、一つ手前の岡崎で止まってください。","basis":"forecast"}
        if forecast_zone == 2:
            return {"code":"hamamatsu","title":"予告を検知：浜松で先回り退避","place":"NEOPASA浜松 上り","reason":"静岡中部方面に通行止めの可能性があります。静岡SAまで粘らず、一つ手前の浜松で止まってください。","basis":"forecast"}
        if forecast_zone == 3:
            return {"code":"shizuoka","title":"予告を検知：静岡で先回り退避","place":"NEOPASA静岡 上り","reason":"御殿場・足柄方面に通行止めの可能性があります。足柄を目指さず、一つ手前の静岡で止まってください。","basis":"forecast"}
        if forecast_zone == 4:
            return {"code":"ashigara","title":"予告を検知：足柄で先回り退避","place":"EXPASA足柄 上り","reason":"神奈川・東京方面に通行止めの可能性があります。足柄まで安全に到達できる状況なら、東京側へ入る前に足柄で止まってください。","basis":"forecast"}
        return {"code":"okazaki","title":"通行止め予告あり：岡崎を第一STOPに","place":"NEOPASA岡崎 上り","reason":"NEXCOが東名などで通行止めの可能性を告知しています。区間詳細を自動判定できないため、安全側に倒して岡崎を最初の退避基準にし、ここでiHighwayを確認してから先へ進んでください。","basis":"forecast"}

    if level == "caution" or has_weather or advisory_risk:
        return {"code":"check","title":"一つ先へ進む前に再判定","place":"岡崎 → 浜松 → 静岡","reason":"悪天候または交通規制情報があります。各大型SAで次区間を確認し、通行止め予告が出たら一つ手前でSTOPしてください。","basis":"caution"}

    return {"code":"go","title":"現時点で重大な規制予告なし","place":"通常ルート","reason":"取得できたNEXCO公式情報では重大な通行止め・予告を検出していません。それでも岡崎・浜松・静岡で次区間を再確認してください。","basis":"clear"}

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
    forecast_risk = False
    forecast_zone = None
    advisory_excerpt = ""
    try:
        atxt = textify(fetch(ADVISORY))
        risk_terms = ["通行止めの可能性","通行止めとなる可能性","通行止めを実施","東名、中央道","東名・中央道","新東名"]
        advisory_risk = any(t in atxt for t in risk_terms)
        forecast_risk = ("通行止めの可能性" in atxt or "通行止めとなる可能性" in atxt)
        p = atxt.find("重要なお知らせ")
        advisory_excerpt = atxt[p:p+1600] if p >= 0 else atxt[:1600]
        if forecast_risk:
            forecast_zone = zone_for(advisory_excerpt)
    except Exception as e:
        result["errors"].append({"source":"NEXCO中日本 交通情報","error":str(e)})

    parking, parking_errors, parking_times, parking_debug = parking_status()
    result["errors"].extend(parking_errors)

    jst = datetime.timezone(datetime.timedelta(hours=9))
    now = datetime.datetime.now(jst)
    if result["errors"] and not any(x.get("ok") for x in result["sources"]):
        overall = "caution"
    rec = recommendation(overall,min_zone,has_weather,advisory_risk,forecast_risk,forecast_zone)
    rec = apply_parking_rule(rec, parking)
    result.update({
      "updated_at_jst": now.isoformat(timespec="seconds"),
      "overall": overall,
      "advisory_risk": advisory_risk,
      "forecast_risk": forecast_risk,
      "forecast_zone": forecast_zone,
      "advisory_excerpt": advisory_excerpt,
      "parking": parking,
      "parking_source_times": parking_times,
      "parking_debug": parking_debug,
      "recommendation": rec,
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
