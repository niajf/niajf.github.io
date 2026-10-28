// AtCoder のレーティング色（公式の区分）
export const ratingBands = [
  { min: 0, max: 400, name: "灰", hex: "#808080" },
  { min: 400, max: 800, name: "茶", hex: "#804000" },
  { min: 800, max: 1200, name: "緑", hex: "#008000" },
  { min: 1200, max: 1600, name: "水", hex: "#00c0c0" },
  { min: 1600, max: 2000, name: "青", hex: "#0000ff" },
  { min: 2000, max: 2400, name: "黄", hex: "#c0c000" },
  { min: 2400, max: 2800, name: "橙", hex: "#ff8000" },
  { min: 2800, max: null, name: "赤", hex: "#ff0000" },
];

export const ratingColor = (rating) => ratingBands.findLast((b) => rating >= b.min);

// history と results から、カードや詳細ページに出す数字をまとめる
export function summarize(item) {
  const rated = item.history.filter((h) => h.rated);
  const rating = rated.at(-1)?.rating ?? 0;
  const best = rated.reduce((a, b) => (b.perf > a.perf ? b : a), rated[0]);
  return {
    rating,
    color: ratingColor(rating),
    maxPerf: best?.perf ?? 0,
    maxPerfContest: best?.contest ?? "",
    contests: item.history.length,
    ratedContests: rated.length,
    reviews: item.results.reduce((sum, r) => sum + r.count, 0),
  };
}
