---
title: 非エンジニアの初心者がHugo(テーマStack)+GitHub Pagesでブログを開設するまで
description: このブログを開設するまでの手順の備忘録
slug: hugo
date: 2021-12-09T21:30:20+09:00
categories:
    - Hugo
    - プログラミング
tags: []
---
# はじめに
タイトルの通りです。
このブログを開設するまでにやったことを備忘録としてまとめておきます。
わざわざ僕が新たに書き記すまでもなく似たような記事はたくさんあるのですが、1本目に書く内容としてちょうどいい感じのものな気がしたので。
分かってる人からしたらそりゃそうってことしか書いてないと思うけど、僕みたいな初心者が見たら1ミリくらい参考になるかもしれない（ならないかもしれない）。

ちなみにタイトルに「非エンジニアの初心者が」と書きましたが、すごく広い意味で捉えればエンジニアと言えなくもないかも。
でも自己認識としてはエンジニアを名乗れるほど技術力はない（し肩書きもリサーチャーな）ので嘘ではないでしょう。
Git/GitHubの使い方とかは一応わかってることは仮定します。

# 使ったもの・環境
- macBook Pro/macOS Big Sur v11.1
- Homebrew v3.3.7
- [Hugo](https://gohugo.io) v0.89.4
- [Hugo Theme Stack](https://github.com/CaiJimmy/hugo-theme-stack)
- Git/GitHub


# Hugoのインストール・スタート
とりあえずHomebrewを使って、ターミナルで `brew install hugo` でHugoをインストールします。
`hubo version` と打ってバージョン確認すると
```
$ hugo version
hugo v0.89.4+extended darwin/amd64 BuildDate=unknown
```
と出るので入ったっぽい。

ブログ用のディレクトリを作るところで `hugo new site sitename` (sitenameのところは適当に) とすると、
```
$ hugo new site sitename
Congratulations! Your new Hugo site is created in ***/***/sitename.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```
と出てきて、`sitename`ディレクトリができ、色々入ってます。

# テーマ
テーマを入れちゃいましょう。今回は[Stack](https://github.com/CaiJimmy/hugo-theme-stack)にしました。
HugoのdocumentationのQuick Startではgit submoduleに追加してたり、他の方はテーマをfolkしてから使ってたりしてますが、手っ取り早くクローンしちゃいました（ちゃんとfolkした方が本当は良いかも）。
```
cd sitename
cd themes
git clone git@github.com:...
```
`...`の部分は使うテーマに合わせて。

Stackは[例](https://github.com/CaiJimmy/hugo-theme-stack/tree/master/exampleSite)を提供してくれてるので、それをベースに作っていきます。`sitename/themes/hugo-theme-stack/exampleSite`内の`config.yaml`と`content/`を`sitename`直下に移し(`content/`は置き換え)、`config.toml`を削除します。

そして `hugo server -D` と打つと、
```
$ hugo server -D
Start building sites … 
hugo v0.89.4+extended darwin/amd64 BuildDate=unknown
WARN 2021/12/09 22:20:52 The "twitter_simple" shortcode will soon require two named parameters: user and id. See "***/***/sitename/content/post/rich-content/index.md:26:1"

                   | EN  
-------------------+-----
  Pages            | 49  
  Paginator pages  |  3  
  Non-page files   |  8  
  Static files     |  0  
  Processed images | 29  
  Aliases          | 23  
  Sitemaps         |  1  
  Cleaned          |  0  

Built in 241 ms
Watching for changes in ***/***/sitename/{archetypes,content,data,layouts,static,themes}
Watching for config changes in ***/***/sitename/config.yaml, ***/***/sitename/themes/hugo-theme-stack/config.yaml
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```
と出てくるので、`localhost:1313`をブラウザで開いてみると、

![](images/img20211209222536.png)

できた！！！（できてない）

# config
あとは `config.yaml` を少し変えていきます。
書き換えた箇所は大体こんな感じだっけ？(忘れてるとこもあるかも)
- `baseurl: https://<GithubAccount>.github.io`
- `languageCode: ja`
- `title: <Sitename>`
- `publishDir: docs` を追加.
  - Hugoでビルドするとデフォルトでは`public/`にビルドされるのですが、Github Pagesでホストするためには`docs/`にビルドしたいので。
- `favicon: /images/favicon.ico`
  - ファビコンに使いたいicoファイル(`favicon.ico`)は`static/images/`に入れておく.
- `sidebar`
  - `emoji: `
  - `subtitle: ***`：適当に.
  - `avatar:`
    - `local: false`
    - `src: /images/avatar.png`：アバター用の画像は`static/images/`内に。
- `article:`
  - `math: true`：自分は今後数式を使った記事を書くことも多分あるので。
  - `toc: false`：目次を表示させたくなければ。
  - `readingTime: false`：各記事のreading timeを表示させたくなければ。
  - `comments:`
    - `enabled: false`：コメント設定面倒そうだったし、そもそもあまり必要ないと思ったので。
  - `opengraph:`
    - `twitter:`
      - `card: summary` ツイッターカードのスタイル。お好みで。
  - `defaultImage:`
    - `opengraph:`
      - `enabled: true`
      - `local: false`
      - `src: images/avatar.png`：OGP用のデフォルト画像、とりあえずアバターでいいか。
  - `menu:`
    - `main:`
      - `params:`
        - `hewTab: false`：homeボタン押したときに新規タブにしたくない。
    - `social:`
      - github, twitterは設定.

# 日本語フォント
この辺りで漢字が中国語フォントになってることに気付く。これは`themes/hugo-theme-stack/assets/scss/variables.scss` 内の、
```
--zh-font-family: ...`
--base-font-family: "Lato", var(--sys-font-family), var(--zh-font-family), sans-serif;
```
を
```
--ja-font-family: "游ゴシック体", "Yu Gothic", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo";`
--base-font-family: "Lato", var(--sys-font-family), var(--ja-font-family), sans-serif;
```
みたいな感じに変更したら日本語フォントになった、たしか（うろ覚え）。


# コンテンツ
`categories`, `post`内のテストカテゴリー・ポストは消して、必要あれば例参考に作る。また `page/about.md` は最初から何らか必要だと思うので適当に書き換える。
Hugoでは `hugo new post/XXX.md` と打つと `content/post/` に `XXX.md` ができるのだがそのデフォルトは `archetypes/default.md` になっている。これも必要に応じて書き換えとこう。自分の場合は
```
---
title: {{ replace .Name "-" " " | title }}
description: 
slug: {{ .Name }}
date: {{ .Date }}
categories:
    - 
tags: []
---

```
とこんな感じにとりあえずしといた。

# ビルド
ビルドは`sitename`直下で `hugo` でOK。`docs/`(`config.yaml`内で`publishDir`を設定してなければ`public/`)内にビルドされるはず。

# プッシュ・Github Pagesでホスト。
GitHubで自分のレポジトリとして `<GitHubAccount>.github.io` を作り、これまで作ってきたものをプッシュ。

Settings/Pagesから, Sourceをmainブランチの`docs/`とします。
![](/images/20211209231722.png)
今度こそできた！

# 記事の書き方
新規のブログ記事を書くときはとりあえず `hugo new post/XXX.md` したと、`hugo server -D`で確認しながら執筆し、書けたら `hugo` でビルド、GithubにプッシュすればOKという感じ。自動デプロイとかもやればできるんだろうけど大したことないしとりあえずいいや。そのうち気が向いたらやろう。

# まとめ
今日やったことじゃないので忘れてるとことかあるかも。最後記事書くの疲れて適当になってきたし。

まあでも大体こんな感じ。これからどんどん記事書いてこう！
