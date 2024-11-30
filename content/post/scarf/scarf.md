---
title: Scarf's lemmaとその実装
description: Scarf's lemmaについての勉強・実装記録
slug: scarf
date: 2021-12-25T10:53:40+09:00
categories:
    - Algorithm
    - Market Design
    - Python
tags: [Algorithm, Market Design, Python]
---
# はじめに
誰しも普通に生きていると一度くらいScarf's lemmaを実装する場面に遭遇すると思いますが、意外と日本語の情報が出てこなくて困ったことのある人もいるかもしれません。
{{< tweet user=miiitomi id=1461662490350145539 >}}
というツイートを前にしましたが、せっかくブログ作ったのでここに勉強記録としてまとめてみようと思います。
お気持ち整理みたいな感じなので証明はちゃんとしないし、数学的・ゲーム理論的に厳密でない書き方してるとこも多々あるかも。

# Scarf's lemma とは
Scarf's lemmaとは [Scarf (1967)](https://www.jstor.org/stable/1909383?casa_token=9WwcS1dTUpgAAAAA%3AAnwe0DoOPRBU5bVCHE4lRlozpVQ6CgtZq_JHCkav8vZ6x_iAM0gIgIHpJTyZTomEwm2Z1VAC36UpOsXcYEfTpAW2xCdjy7WyToYxAfZ51VFbX5FThlNQvQ&seq=1#metadata_info_tab_contents) で示されたコアを求めるための補題です。
応用としては、例えばマッチング理論の文脈で [Nguyen and Vohra (2018)](https://www.aeaweb.org/articles?id=10.1257/aer.20141188) で安定マッチングを求めるために使用されています。

# 命題
$A, C$ は $n\times m$ $(n < m)$ の行列で
$$
\begin{align*}
    A &= \begin{bmatrix}
            1 & \dots & 0 & a_{1,n+1} & \dots & a_{1,m} \cr
            \vdots &\ddots & \vdots & \vdots & & \vdots \cr
            0 & \dots & 1 & a_{n,n+1} & \dots & a_{n,m}
         \end{bmatrix},\cr
    C &= \begin{bmatrix}
            c_{1,1} & \dots & c_{n,1} & c_{1,n+1} & \dots & c_{1,m} \cr
            \vdots &\ddots & \vdots & \vdots & & \vdots \cr
            c_{n,1} & \dots & c_{n,n} & c_{n,n+1} & \dots & c_{n,m}
         \end{bmatrix}
\end{align*}
$$
の形のもので、$C$ は以下を満たすとします（これを標準形（standard form）と呼ぶことにします）：
- 各行 $i$ について、同じ数は含まれない（$C_{ij}\ne C_{ij'}$ $\forall j \ne j'$）。
- 各行 $i$ について対角成分はその行のうち最も小さい（$c_{ii} < \min_{j \ne i}c_{ij}$）。
- 各行 $i$ の最初の $n$ 要素のうちの非対角成分は、後ろの $m-n$ の全ての要素より大きい（$\min_{j:1\le j \le n, j\ne i} c_{ij} > \max_{k:n+1\le k \le m}c_{ik}$）。

また、非負ベクトル $b \in \mathbb{R}^n$ に対し、集合 $\lbrace x \in \mathbb{R}^m_+ \mid Ax = b \rbrace$ は有界であるとします。

このとき、$Ax = b$ の基底解 $x \in \mathbb{R}_+^m$ であって、以下を満たすものが存在します：
- 基底に含まれる列の集合を $a$ とし、各行 $i$ に対し $u_i = \min_{j\in a}c_{ij}$ とする。
- 任意の列 $k$ に対し、ある行 $i$ が存在して、$u_i \ge C_{ik}$ が成り立つ。

# 命題のお気持ち
$A, C$ の各行はプレイヤー、各列はそのプレイヤーから構成されるグループを表し、
- $A_{ij}$ はプレイヤー $i$ がグループ $j$ に属すかどうか（属さないなら $0$, 属すなら所属量を表す分量？（典型的には常に $1$））
    - 対角成分は自分1人からなるグループなので $A_{ii} = 1$.
- $x$ は ($0, 1$ なら)そのグループのうちどれが実際に構成されるか（$0,1$以外ならどれくらいの強さで構成されるか）.
- $A_{i\cdot}x = b_{i}$ は $i$ が参加できるグループ数の制約.
- $C_{ij}$ はプレイヤー $i$ がグループ $j$ から得られる利得.

というイメージ。
$u_i = \min_{j\in a}C_{ij}$ は今のグループの形成の仕方 $x$ から $i$ が得られている利得で、 「任意の列 $k$ に対し、ある行 $i$ が存在して、$u_i \ge C_{ik}$ 」というのは「グループ $k$ を構成しようとしても、あるプレイヤー $i$ がいて今の利得の方が少なくとも同等以上に良いので、グループ $k$ はブロックできませんよ」という感じ。
つまりこの命題は、標準形のもとではブロックするグループ $k$ が生じない良い感じのグループの形成の仕方 $x$ が作れますよ、と言ってる。

# 基数的基底と序数的基底
この $x$ を構成するアルゴリズムを考えるのですが、その前にまず基数的基底(cardinal basis)と序数的基底（ordinal basis）を導入します。
- $A$ の基数的基底解 $x$ とは $Ax = b$ の解で、$m$ 個の変数のうち $n$ 個を基底変数、$m-n$ 個を非基底変数とし、非基底変数については $x_j = 0$ となっているようなもの。（この基数的基底変数の添字の集合を $a$ と書く）

線形計画とかで出てくる普通の基底解。一方、序数的基底は、
- $C$ の序数的基底解 $x$ とは、$n$ 個の基底変数の添字集合を $c = \lbrace j_1, \dots, j_n\rbrace$ としたときに、各行 $i$ について $u_i = \min_{j \in c}{C_{ij}}$ とおくと、任意の列 $k$ に対しある行 $i$ が存在して $u_i \ge c_{ik}$ となるもの。 

$A$ の基数的基底解であり、かつ $C$の序数的基底解であるような $x$ を、以下の基数的ピボットと序数的ピボットを使って求めることが以下の目標になります。

## 基数的ピボット
基数的基底 $a = \lbrace j_1, j_2, \dots, j_n\rbrace$ があり、$a$ に含まれない別の基底 $j^\*$ をとります。
このとき（問題が非退化なら）ある $j' \in a$ が一意に存在して、$ \lbrace j^\* \rbrace \cup a \setminus \lbrace j'\rbrace$ も基底変数になる（シンプレックス法とかの普通のピボット）。

## 序数的ピボット
序数的基底 $c = \lbrace j_1, \dots, j_n \rbrace$ があり、そのうち任意の1つをとり（$j_1$とする）、残りの $c\setminus \lbrace j_1\rbrace$ は全てが $n$ 以下というわけではないとします。
$C$ の各 $i$ 行に対し $c\setminus\lbrace i_1 \rbrace$ 内で最小にする列（$\min_{j \in c\setminus\lbrace i_1 \rbrace}C_{ij}$） を求めると、ある列 $j'$ について $j'$ で最小値をとるような行が $2$ つ存在し、そのうち $1$ つは元の $i_1$ を含んだ $c$ 内でも $j'$ で最小値を取るような行、もう一方は $i_1$ を除いた結果新たに $j'$ で最小値を取るようになった行です。
前者を $i^\*$ とします。
任意の行 $i \ne i^\*$ で $c_{ik} > \min_{j \in c\setminus\lbrace j_1\rbrace}c_{ij}$ となるような $c$ 外の列の集合
$$
    K = \left\lbrace k \notin c \mid c_{ik} > \min_{j \in c\setminus\lbrace j_1\rbrace}c_{ij}\ \forall i \ne i^\*  \right\rbrace 
$$
を求め、そのうち $i^\*$ 行で最大にする列
$$
    j^* = \arg\max_{j \in K} c_{i^\*j}
$$
を求め、$j^\*$ を $j_1$ の代わりに入れて $c^{new} = \lbrace j^\*\rbrace\cup c \setminus \lbrace j_1 \rbrace$
とすると、$c^{new}$ も $C$ の序数的基底になります。

# アルゴリズム
上記の基数的ピボットと序数的ピボットを繰り返すと、求めたい $x$ が求まります。
1. $a = \lbrace 1,2, \dots, n \rbrace$、$c = \lbrace 2, \dots, n\rbrace \cup \arg\max_{j \ge n+1}\lbrace C_{1j}\rbrace$ と $A, C$ の基底を初期化する。
2. $a \ne c$ である限り以下を繰り返す：
    - $c$ に含まれていて $a$ に含まれていない列 $j$ を、$A$ の基数的ピボットにより $a$ に入れるように $a$ を更新する。
    - $a$ から出された列 $j'$ について、$C$ の序数的ピボットにより $c$ から除いて $c$ を更新する。

# 実装
[Nguyen and Vohra (2018)](https://www.aeaweb.org/articles?id=10.1257/aer.20141188)がadditional materialとして提供しているMATLABコードを参考に、このアルゴリズムをPythonで実装してみるとこんな感じになる（[GitHub](https://github.com/miiitomi/scarf_lemma/blob/main/scarf_lemma.py)）。
```python
import numpy as np


def scarf_lemma(A, b, C):
    n = A.shape[0]
    a = np.arange(n)
    c = np.append(np.arange(1, n), n+np.argmax(C[0, n:]))

    j = np.setdiff1d(c, a, assume_unique=True)[0]

    step = 1
    while True:
        print(f"Step {step}: a = {a+1}, c = {c+1}")  # index 0 スタートを 1 スタートに直して出力
        A, a, b, j = cardinal_pivot(A, a, b, j)
        if (a == c).all():
            break

        c, j = ordinal_pivot(C, c, j)
        if (a == c).all():
            break
        step += 1

    # index 0 スタートを 1 スタートに直してreturn
    return a+1, c+1


def cardinal_pivot(A, a, b, i):
    m, n = A.shape
    ratio = np.array([])

    for row in range(m):
        if A[row, i] > 0.01:
            if ratio.size == 0:
                ratio = np.array([b[row] / A[row, i], row])
            else:
                ratio = np.vstack([ratio, np.array([b[row] / A[row, i], row])])
    if ratio.size == 0:
        raise ValueError("i can not be a basis column.")
    elif ratio.size == 2:
         pivot_row = ratio[1].astype(int)
    else:
        idx = np.argmin(ratio, axis=0)[0]
        pivot_row = ratio[idx, 1].astype(int)
    basis = A[:, a]
    basis_col = np.argmax(basis[pivot_row, :])
    pivot = a[basis_col]

    a[a==pivot] = i
    a.sort()

    A_new = np.zeros(shape=(m,n))
    b_new = np.zeros(shape=b.shape)

    A_new[pivot_row, :] = A[pivot_row, : ] / A[pivot_row, i]
    b_new[pivot_row] = b[pivot_row] / A[pivot_row, i]

    for k in range(m):
        if k != pivot_row:
            A_new[k, :] = A[k, :] - A[k, i] * A_new[pivot_row, :]
            b_new[k] = b[k] - A[k, i] * b_new[pivot_row]

    return [A_new, a, b_new, pivot]


def ordinal_pivot(C, c, j):
    n = C.shape[1]
    c_bar = np.setdiff1d(np.arange(n), c, assume_unique=True)
    b = C[:, c_bar]

    basis = C[:, c]
    c_remains = np.setdiff1d(c, j, assume_unique=True)
    basis2 = C[:, c_remains]

    original_argmins = np.argmin(basis, axis=1)
    original_argmins = c[original_argmins]

    new_mins = np.min(basis2, axis=1)
    new_argmins = np.argmin(basis2, axis=1)
    new_argmins = c_remains[new_argmins]

    unique, counts = np.unique(new_argmins, return_counts=True)
    r = unique[counts >= 2]
    if r.size > 1:
        raise ValueError("Two columns with two row minimizer.")
    r = r[0]

    idx = np.where(original_argmins == r)[0][0]

    row_of_idx = b[idx, :]
    b = np.delete(b, idx, axis=0)
    new_mins = np.delete(new_mins, idx, axis=0)
    all_mins = np.tile(new_mins.reshape((new_mins.size, 1)), (1, b.shape[1]))
    cols = np.where((b > all_mins).all(axis=0))[0]

    new_col = cols[np.argmax(row_of_idx[cols])]
    new_c = c_bar[new_col]
    c[c==j] = new_c
    c.sort()

    return c, new_c
```

元論文にある例を使って
```python
A = np.array([
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
])
b = np.array([1 + 1e-6, 1 + 2e-6, 1 + 3e-6])
M = np.arange(100, 87, -1)
C = np.array([
    [0, M[2], M[3], 12, 3, 2, 9, 5, 4, M[10], M[11], M[12]],
    [M[1], 0, M[3], 6, 7, 9, M[7], M[8], M[9], 5, 2, 8],
    [M[1], M[2], 0, M[4], M[5], M[6], 3, 8, 10, 6, 9, 4]
])
scarf_lemma(A, b, C)
```
を実行してみると、[結果](https://github.com/miiitomi/scarf_lemma/blob/main/example.ipynb)は以下の通り。
```python
Step 1: a = [1 2 3], c = [ 2  3 10]
Step 2: a = [ 1  3 10], c = [ 3 10 12]
Step 3: a = [ 1  3 12], c = [ 3  7 12]
Step 4: a = [ 1  7 12], c = [ 7  8 12]
Step 5: a = [ 1  8 12], c = [ 4  8 12]
(array([ 4,  8, 12]), array([ 4,  8, 12]))
```
論文に書かれてる通り実行されている。

# まとめ
[Scarf (1967)](https://www.jstor.org/stable/1909383?casa_token=9WwcS1dTUpgAAAAA%3AAnwe0DoOPRBU5bVCHE4lRlozpVQ6CgtZq_JHCkav8vZ6x_iAM0gIgIHpJTyZTomEwm2Z1VAC36UpOsXcYEfTpAW2xCdjy7WyToYxAfZ51VFbX5FThlNQvQ&seq=1#metadata_info_tab_contents)のScarf's lemmaを実装してみた。
みんなこれからどんどんコアを計算していこうな！
（もし記述・実装に間違いや変なとこあったら教えてください！！）
