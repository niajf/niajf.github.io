# Game Engineer Portfolio (Astro + GitHub Pages)

カード型のゲーム作品ポートフォリオ。作品は `src/data/works.json` を編集するだけで増減できます。

## セットアップ

```bash
npm install
npm run dev      # http://localhost:4321/portfolio で確認
```

## デプロイ前の設定（重要）

`astro.config.mjs` を開いて2箇所を書き換えてください。

```js
const GITHUB_USER = "your-name";   // ← GitHub ユーザー名
const REPO_NAME   = "portfolio";   // ← このリポジトリ名
```

- 公開URL: `https://<GITHUB_USER>.github.io/<REPO_NAME>/`
- もし `<username>.github.io` という名前のリポジトリにする場合（トップページ運用）は、
  `astro.config.mjs` の `base` 行を削除してください。

## GitHub Pages へのデプロイ手順

1. GitHub で空のリポジトリを作成（名前は `REPO_NAME` と一致させる）
2. このプロジェクトを push

   ```bash
   git init
   git add .
   git commit -m "init portfolio"
   git branch -M main
   git remote add origin https://github.com/<GITHUB_USER>/<REPO_NAME>.git
   git push -u origin main
   ```

3. GitHub のリポジトリ → **Settings → Pages → Build and deployment → Source** を
   **GitHub Actions** に設定する
4. `main` に push するたびに `.github/workflows/deploy.yml` が自動でビルド & 公開します

## 作品の追加・編集

`src/data/works.json` に1要素追加するだけでカードと詳細ページが自動生成されます。

```jsonc
{
  "slug": "new-game",                  // URL に使われる（半角英数字とハイフン）
  "title": "New Game",
  "tagline": "一言キャッチコピー",
  "description": "概要文。",
  "thumbnail": "/works/new-game.png",  // public/works/ に画像を置く。空文字でプレースホルダー
  "tags": ["Unity", "C#"],
  "highlights": ["工夫した点1", "工夫した点2"],
  "repo": "https://github.com/.../new-game",
  "demo": "",                          // WebGL等のプレイURL。空なら非表示
  "doc": "",                           // 企画書 PDF (public/docs/ に置く)。空なら非表示
  "video": "",                         // YouTube 埋め込みURL (https://www.youtube.com/embed/xxxx)。空なら非表示
  "featured": true,                    // true で上位表示
  "year": 2026
}
```

### 詳細ページ用の項目（すべて任意）

詳細ページには以下の項目も表示できます。書かなかった項目のセクションは表示されません。
文中の `` `バッククォート` `` で囲んだ部分はインラインコードとして表示されます。

```jsonc
{
  "period": "2026年2月〜2026年4月",       // 開発期間。配列にすると複数行で表示
  "stack": [{ "label": "Engine", "value": "Unity 6" }],  // 技術スタック（開発期間と同じ表に表示）
  "gameplay": {                           // ゲーム概要
    "summary": "一文の説明",               // 任意
    "items": [{ "label": "操作", "text": "WASD で移動" }],
    "image": "/works/new-game_how_to_play.png"  // 任意。public/works/ に置く
  },
  "algorithms": {                         // アルゴリズム概要の表
    "note": "表の下に出す注記",
    "rows": [{ "feature": "機能", "method": "手法", "complexity": "O(N²)", "aim": "狙い" }]
  },
  "highlights": [                         // 技術的なこだわり。文字列だけでもOK（タイトルのみ表示）
    {
      "title": "見出し",
      "badge": "v2 で追加",                // 任意。見出し横のラベル
      "summary": "説明文",
      "code": [                           // 任意。複数ブロック可
        { "label": "Player.cs — 説明", "lang": "csharp", "src": ["1行目", "2行目"] }
      ],
      "points": ["箇条書き1", "箇条書き2"]
    }
  ],
  "updates": {                            // 変更点など（見出しは title で指定）
    "title": "v1.x からの変更点",
    "items": [{ "label": "敵 AI", "text": "変更内容" }]
  },
  "features": [{ "label": "機能名", "text": "説明" }],  // 実装機能一覧
  "aiUsage": "AI の使用箇所についての説明"
}
```

### サムネイル画像

`public/works/` に置き、`thumbnail` のファイル名と一致させます（推奨 16:9）。
GIF も使えます。Unity の WebGL ビルドがあれば `demo` にURLを入れると
「ブラウザでプレイ」ボタンが出ます。

## 研究（学会発表）の追加・編集

`src/data/research.json` に1要素追加するだけで、トップの Research 欄にカードが増え、詳細ページが自動生成されます。

```jsonc
{
  "slug": "research-1",                // URL に使われる（半角英数字とハイフン）
  "title": "研究タイトル",
  "conference": "学会名",
  "year": 2026,
  "thumbnail": "",                     // 空ならYouTube動画のサムネイルを自動使用
  "slides": "/research/research-1.pdf", // public/research/ に PDF を置く。空なら非表示
  "video": "https://youtu.be/xxxx"     // YouTube のURL（共有リンク・通常URL・埋め込みURLどれでも可）。空なら非表示
}
```

## 構成

```
src/
  data/works.json        ← 作品データ（ここだけ編集すればOK）
  data/research.json     ← 研究（学会発表）データ
  layouts/Base.astro     ← 共通レイアウト・全体のデザイン
  components/WorkCard.astro
  components/ResearchCard.astro
  utils/youtube.js       ← YouTube URL から動画IDを取り出す
  pages/
    index.astro          ← トップ（カード一覧）
    works/[slug].astro   ← 各作品の詳細ページ（自動生成）
    research/[slug].astro ← 各研究の詳細ページ（自動生成）
public/works/            ← サムネイル画像
public/research/         ← 発表スライド (PDF)
.github/workflows/deploy.yml  ← 自動デプロイ
```
