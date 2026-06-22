// @ts-check
import { defineConfig } from "astro/config";

//  site : https://<あなたのGitHubユーザー名>.github.io
//  base : リポジトリ名。 例) リポジトリが "portfolio" なら "/portfolio"
//          ユーザーページ (<username>.github.io リポジトリ) の場合は base を削除
const GITHUB_USER = "niajf";
const REPO_NAME = "niajf.github.io";
// ▲▲▲ ここまで ▲▲▲

export default defineConfig({
  site: `https://niajf.github.io/`,
});
