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
  "video": "",                         // YouTube 埋め込みURL (https://www.youtube.com/embed/xxxx)。空なら非表示
  "featured": true,                    // true で上位表示
  "year": 2026
}
```

### サムネイル画像

`public/works/` に置き、`thumbnail` のファイル名と一致させます（推奨 16:9）。
GIF も使えます。Unity の WebGL ビルドがあれば `demo` にURLを入れると
「ブラウザでプレイ」ボタンが出ます。

## 構成

```
src/
  data/works.json        ← 作品データ（ここだけ編集すればOK）
  layouts/Base.astro     ← 共通レイアウト・全体のデザイン
  components/WorkCard.astro
  pages/
    index.astro          ← トップ（カード一覧）
    works/[slug].astro   ← 各作品の詳細ページ（自動生成）
public/works/            ← サムネイル画像
.github/workflows/deploy.yml  ← 自動デプロイ
```
