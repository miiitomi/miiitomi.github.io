---
title: 青コーダーがARC169で0完灰パフォ出して入水した話
description: 
slug: zerokan
image: images/zerokan/grey.png
date: 2023-12-11
categories:
    - 競プロ
tags: [競プロ,]
---

こちらの記事は、[競プロ Advent Calendar 2023](https://adventar.org/calendars/8745)の11日目の記事になります。[^1]

~~登録時は「 HACK TO THE FUTURE 2024（AHC027）で上位入賞しました！記事を書きます」と書いていて[こんなツイート](https://x.com/miiitomi/status/1724020208300626093?s=20)もしていましたが、AHC027は最終360位という見るも無惨な結果となって恥ずかしいので内容を変更してお送りいたします。ご了承くださいませ。~~[^2]

内容はタイトルの通りで、今後同じ惨劇を生み出さないために記録に残していこうと思います。

# ARC169に参加するまで

2023年12月9日(土)、「[estie プログラミングコンテスト2023 （AtCoder Regular Contest 169）](https://atcoder.jp/contests/arc169)」（以下ARC169）が開催されました。
このコンテスト前の時点で私のレートは1656で青。
11月に青コーダーになったばかりですが、ABCでは11連続で青パフォを取るなどしており、青の実力は普通にあるかなと慢心していたところでした。
ARCについてはABCより苦手意識はあるものの、前回のARCでは青パフォを取っており、多少ミスしても水色か最悪緑パフォくらいでは耐えるだろうし、1回で水色に落ちたりはしないだろうと考えていました。

ちなみに、この日の昼間に[AtCoderInfo](https://info.atcoder.jp/)というAtCoderの情報をまとめた公式サイトが公開されており、その中の「[Algorithm部門のレーティングと業務における期待できる活躍](https://info.atcoder.jp/utilize/jobs/rating-business-impact#:~:text=%E6%99%AE%E9%80%9A%E3%81%AEIT%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%8B%E3%82%89%E8%A6%8B%E3%81%A6%E3%80%81%E5%B8%B8%E8%BB%8C%E3%82%92%E9%80%B8%E3%81%97%E3%81%9F%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E9%80%9F%E5%BA%A6%E3%82%92%E6%8C%81%E3%81%A1%E3%80%81%E8%A4%87%E9%9B%91%E3%81%AA%E3%83%AD%E3%82%B8%E3%83%83%E3%82%AF%E3%81%AB%E3%81%8A%E3%81%84%E3%81%A6%E3%82%82%E3%83%90%E3%82%B0%E3%81%AE%E5%B0%91%E3%81%AA%E3%81%84%E5%AE%89%E5%AE%9A%E3%81%97%E3%81%9F%E3%83%AD%E3%82%B8%E3%83%83%E3%82%AF%E6%A7%8B%E7%AF%89%E3%81%8C%E5%8F%AF%E8%83%BD%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)」のページの青色の箇所で書かれていた表現を使って、コンテスト前にはこんな調子に乗ったツイートをしていたりもしました。

{{< tweet user=miiitomi id=1733455252400300469 >}}
（この後にあんな惨劇に見舞われるとは……）

ちなみに、このARC169では1問目の配点が400点となっており、普段のARCの1問目が300点程度であることを考えるとやや高めであるため、ツイッター上では少し0完を心配している参加者の方も見受けられましたが、僕自身は「いやいくらなんでも0完ってことはないでしょう、1完は早めに確保して、ノルマは2完、可能なら3問目もトライしたい」くらいに考えていました。


# ARC169コンテスト中

21時、2時間のコンテストが始まりました。コンテストの時間中の自分の思考過程を思い出しながら時系列に沿って書いていこうと思います。

## A問題（21:00~21:20程度）

まず[A問題](https://atcoder.jp/contests/arc169/tasks/arc169_a)を開きます。むむむ、なるほどわからん。

最初開いて問題を読んでから、20分近くそのままA問題を色々ごちゃごちゃ考え続けていました。
今思い出すと、公式解説解法の「深さの深い方ほど寄与が大きくなるはずなのでそちらから考える」という考えに近いところには至っていたように思います。

しかし、これはコンテストの終了後に気付いて愕然とするのですが、この時の自分はA問題の設定をやや誤解していました。
各繰り返しステップ内において、本当なら頂点Aから頂点Bに値が加えられた後で頂点Bから別の頂点Cに値が加えられるということはこの問題設定ではありえないのですが、この時自分はそれが起こりうるものとずっと信じ込んでいました。[^3]
そのため、同じ深さ内での値の総和が0であっても、足される順番の前後によって寄与が違うことがありうるのではないかと考えてしまい、そのあたりの解消をすることができそうでできないな……と考え続けてしまっていました。

しばらく考えてから、一旦A問題は置いておいて、先にB問題へ移ることにします。


## B問題：開いてから嘘解法を実装するまで（21:20~21:40程度）

[B問題](https://atcoder.jp/contests/arc169/tasks/arc169_b)を開きます。

$l = 1$ で固定すると $r = 1, \dots, N$ に関しては $f(A_\ell, \dots, A_r)$ は貪欲法で計算でき、それらの列挙は $O(N)$ でできます。が、それらを $l = 2, 3, \dots, $ とやっていくわけにはいかないので工夫が必要です。
公式解説ではDPでやっているわけですが、残念なことにここで自分は $l = 1$ での結果からそれを他の $l$ についても構成するような嘘解法を閃いてしまいます。[^4] [^5]

この嘘解法でいけると確信してしまった私は、A問題のことは忘れてB問題のその実装に突っ走ることになります。多分最初の実装が22時よりだいぶ前にはできていたと思います。


## B問題：デバッグ（21:40~22:30程度）

一旦その解法を実装してサンプルを試してみますが、出力が合いません。
まあまだ時間は全然ある、落ち着いてデバッグしよう、と考えます。

ここでの悲劇の一つは、この嘘解法、実装が極めて複雑で難しかったことです。
致命的な実装ミスがこのデバッグしてた中で3-4回は見つかったと思います。
そのデバッグを続けていても全然サンプルが合わないのですが、実装の複雑さからまだバグがあるだけだと思い、解法を考え直すということに至りませんでした……。

22時を回って時間が短くなってくると、焦りがつのり始めます。するとどんどん頭は働かなくなり、デバッグしててもサンプルに対してどう動いていたら正しいのかもよくわからなくなってきて、それを自覚してさらに焦りが大きくなり、という悪循環に入ってしまいました。

ここまでのどこかで、一旦B問題の別解法をゆっくり考え直そう、あるいはA問題に戻ってゆっくり問題設定を考え直そうということができればもしかしたらよかったのかもしれませんが、この嘘解法にあまりに時間を使いすぎてしまっていたせいでそのスイッチもすることができませんでした。


## 諦め（22:30~終了程度）

22:30を回ってくると「あ、もうこれ無理そう」って気持ちになってきます。一応手ではデバッグを続けてはいるのですが、もう自分のコードが何を意図して書いていたものなのかもよくわからなくなってきているし、そこから今更A問題とか考えても時間無いだろうと考えてしまいそうすることもできません。
だんだん諦めモードが大きくなってくるともうデバッグもやめ、ツイッターを開いて眺めたりもして、0完したことをどんなふうにツイートしたらウケるかな、とか考えてました。


## 終了後

23時、コンテストが終わります。なんかこの時は0完でコンテストが終わってしまったみたいな絶望感より、やっと苦しみから逃れられるみたいな解放感の方が大きかった気がします。
ツイッターのタイムラインを見たり公式解説を読んでA問題の勘違いに気づいて愕然としたり、B問題の解説を見て「やっぱりあれは想定解法ではなかったんだ、まあそりゃそうだよな」と思ったりしてました。

結果としては1問以上解いた人が1710人いたため自分は1711位タイ、パフォーマンスは393の灰色パフォで、レートは79下がり青色から水色に陥落となりました。

{{< tweet user=miiitomi id=1733494793391726812 >}}


# 0完灰パフォを出さないために

ここからは同じ悲劇を繰り返さないために、できる対策を考えていこうと思います、といっても当たり前のことしか書いてないですが。


**1. ARCに出ない。**

完璧な対策ですね。ARCに出なければARCで0完灰パフォを出すことはありません。レートは落としたくないけど問題は解きたいという人はUnrated参加にしても良いでしょう。なお、ARCだけでなくAGCも0完リスクがある（というかそちらの方が当然リスクは高い）ため、AGCも出ない方がいいかもしれません。


**2. ARCの問題を解いて慣れる。**

普段の練習で僕はほぼABCの問題しか解いていません（それも全然そんなにまだ埋められていません）。
青下位くらいならまだABCを解いて典型を学び身につけることがレートを上げるために最重要だと思っているからなのですが、ARCに挑戦してARCでまともな成績を出したいなら、ARCの問題をもっと解いて、ARC的な問題に慣れ、考察するときの考え方を身につけるべきでしょう。

**3. 問題文は落ち着いてゆっくり読み、詰まったら問題設定の勘違いがないか何度も見直す。**

今回のA問題から得られた教訓です。解説を読んでから問題文を読み直したらすぐに勘違いに気付いたため、どこかでA問題に立ち戻ったら問題設定の勘違いに気付いてそこから解けていたかもしれません。


**4. それっぽそうな解法を思いついても、突っ走る前にちゃんと確かめる。**

B問題で嘘解法を見つけてそれに突っ走ってしまったことへの反省です。特に今回は極めて実装の重すぎる方針を引いてしまったことものちに後を引いたので、解法としての正当性だけでなく、もっと実装しやすくバグらせにくい簡潔な解法・実装方針がないかも一旦立ち止まって考えるとよいかもしれません。

**5. どんなに時間をかけてしまっても、ハズレ方針だったっぽいと思ったら勇気をもってきっぱりそれを捨てよう。**

上記とも関連しますが、あまりにB問題の嘘解法をひっぱり続けてしまい、それを捨てて別解法を考えることも、A問題に立ち戻ることもできなかったことへの反省です。
どうしても時間をかけてしまった方針があったらそれを捨てることにコストを感じてしまいがちですが、それまでにサンクコストをかけてしまったからといってそれを気にしてしまうのは非合理です。[^6]
捨てるべき時はきっぱり捨てましょう。

**6. 最後まで諦めない。**

最後まで諦めてはいけない、言うは易し行うは難しの最たるものとも思いますが、今回の自分はあまりにも諦めモードに入るのが早かったように思います。残り30分で、Bの嘘解法を見切ってA問題に立ち戻っていたら1完はできていたかもしれません。
小さい頃から教師ややっていたスポーツのコーチに「お前は諦めが早すぎる」と怒られ続けて生きてきた私ですが、それがこの年になってもこんな形で影響を与えてくるとは……。


# さいごに

上の反省を踏まえて自分はこれからARCにどう取り組もうかと考えると、正直**しばらくARC/AGCのrated参加はしなくていいかな**、という気持ちなんですが（現状ABC対策の方が重要度は何倍も高いと思いますし）、もし心変わりしてまたARCにチャレンジしようって気持ちになったら上の1以外の対策を心に刻んで取り組んでいこうと思います。

とりあえずは早く青復帰したいので、そのためにまずは引き続きABCの練習に勤しんでいこうと思います。[^7]

ここまで読んでいただいた方、ありがとうございました。
ARC対策をちゃんとしないと、次に0完灰パフォを取って色落ちするのはあなたかもしれませんよ……。


[^1]: 企画くださったryusukeさんありがとうございます！
[^2]: 0完灰パフォの方が恥ずかしいだろという説もあります。
[^3]: 誤解というか、それを問題文からちゃんと読み取れるのも実力だろ、と言われると全くその通りであって反論の余地もないのですが……。
[^4]: この嘘解法についてはあまり覚えてないのと恥ずかしいので、それについては詳しく書きませんが……。
[^5]: 嘘解法とは言ってますが、いまだに自分はあれが本当に嘘だったのかどうか確証がないし、本当はちゃんと上手くやればその方針でいけたんじゃないかとほんの少しだけ思ってます。もう詳細は覚えてないし、終わった後のショックで書いてたコードも消しちゃったし、何よりそれを思い出すのは強いストレスなので今更それを検証しようとは思わないですけど。
[^6]: 経済学やってるんだからサンクコストは気にしてはいけないってよく分かっているはずなのに……。
[^7]: ちなみにこの翌日のABCは普通に水色パフォとってしまいレートは上がりませんでした。こちらはただの実力不足。悔しい……。

