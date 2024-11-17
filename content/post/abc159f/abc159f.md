---
title: ABC159 F - Knapsack for All Segments：別解解説
description: 
slug: abc159f
date: '2023-12-15'
lastmod: '2024-11-17'
categories:
    - 競プロ
tags: [競プロ]
---

[ABC159](https://atcoder.jp/contests/abc159)の[F問題](https://atcoder.jp/contests/abc159/tasks/abc159_f)について、[解説](https://atcoder.jp/contests/abc159/tasks/abc159_f/editorial)にある公式解説・ユーザー解説のどれとも発想が異なりそうな解法を思い付いたので、解法解説らしきものを書いてみます。

# 問題

 - 問題は[こちら](https://atcoder.jp/contests/abc159/tasks/abc159_f)。

# 解説
まず $\Theta(N^2S)$ の愚直解法を説明し、後でそれを $\Theta(NS)$ に高速化する解法を示します（以下「998244353で割ったあまりを」の部分は無視して説明します）。

## 1. 愚直解法：$\Theta(N^2S)$
この解法は以下の2ステップからなります。
### ステップ1：まず $L = 1$ で固定してナップサックDPテーブルを求める。

通常のナップサックDPのように、$dp[i][w] =$ 「数列の $i$ 番目まで（$A_1,\dots,A_i$）のうち、いくつかを使って和を $w$ にする方法の数」（ただし $0 \le i\le N,~0 \le w \le S$）とします。
これは、
    $$
    \begin{align*}
        dp[1][w] &= \begin{cases} 1 & \mathrm{if} ~ w = 0 \\\ 0 & \mathrm{otherwise}\end{cases}, \\\
        dp[i][w] &= \begin{cases} dp[i-1][w] + dp[i-1][w-A_i]& \mathrm{if}~w-A_i \ge 0 \\\ dp[i-1][w] & \mathrm{otherwise} \end{cases},
    \end{align*}
    $$
とすることで、$\Theta(NS)$ で列挙できます。このとき、
    $$
        f(1, R) = dp[R][S]
    $$
のため、$L = 1$ のときの和はこのテーブルの $S$ 列目の和を取ることで求められます。 

### ステップ2： $A_1, A_2, \dots,$ を抜いたケースを数えていくことで $f(L, R)$（$L \ge 2$）を求めていく.

上記で求めたdpテーブルについて $A_1$ の影響を除いていくには、左（$w$ の小さい方）から
$$ dp[i][w] = dp[i][w] - dp[i][w - A_1]　\tag{1} $$
としていくことで、$A_2,\dots, A_i$ 番目のうちいくつかを用いて和を $S$ にする方法の数を求めていくことができます。
したがって、$A_1$ についてこの操作をすべて行なった後のdpテーブルにおいて、
    $$
        \sum_{R=2}^{N} f(2, R) = \sum_{R = 2}^{N} dp[R][S] 
    $$
が成り立ちます。

以下、この操作を $A_2, A_3, \dots$ と続けていくことで、 $L = 3, 4, \dots$ について $\sum_{R=L}^{N} f(L, R)$ を求めていくことができます。

$A_1, A_2, \dots$ のそれぞれについて、dpテーブルの各セルについて $(1)$ の操作を行うため、全体で $\Theta(N^2S)$ となります。


## 2. 高速化解法：$\Theta(NS)$

1.の愚直解法では間に合いませんが、この解法の中でネックとなっているのは $N\times S$ のサイズのdpテーブルを状態として保持してステップ2でこの各セルを更新する箇所であり、これを少しのステップで高速化することができます。

上記の解法の中で、$L$ を固定した時の $f(L, R)$ の和は、その時点でのdpテーブルの$S$列目に関して行方向に足し合わせたものです。
また、操作 (1) において、列 $w$ から列 $w - A_i$ の値を引くという形で、各行について同じような操作を行なっています。

したがって、このdpテーブルを行方向に足し合わせた$1$行$S$列のテーブル sum を保持していれば、各状態における$S$列目の和を求めることと、更新を行うことができます。

アルゴリズムの全体像を擬似コードとして書くと、以下の通りになります：
```
Input: N, S, A = (A_1, ... , A_N)
---
Initialize ans=0, dp[0][0]=0, dp[0][w]=0 for w=1..S, sum[w]=0 for w=0..S
// Step 1.
For i = 1 to N
    For w = 0 to S
        dp[i][w] = dp[i-1][w]
        if w - A_i >= 0
            dp[i][w] += dp[i-1][w - A_i]
        sum[w] += dp[i][w]
// Step 2.
For i = 1 to N
    ans += sum[S]    // A_i を除く前の S 列の和
    For w = A_i to S
        sum[w] -= sum[w - A_i]
    sum[0] -= 1    // dp[i][0] の 1 を除くため.
return ans
```

C++での提出コードは[こちら](https://atcoder.jp/contests/abc159/submissions/48510009)（実行時間 32 ms）。[^1]

# 終わりに

~~早く黄色コーダーになってこの記事を解説に載せたい。~~   
（2024年11月17日 黄コーダーになったので載せてみた。）


[^1]: dpテーブルも1次元で保持することができるため提出コードではそのようにしています。
