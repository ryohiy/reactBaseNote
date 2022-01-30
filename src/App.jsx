/* eslint react-hooks/exhaustive-deps:off*/
//↑eslint の設定を行える
import React, { useEffect, useState } from "react";
import ColorfulMessage from "./components/colorFulMessage";
// Reactのコンポネントをimportするときは先頭が大文字じゃないとダメ！
console.log("コンポーネントの外");

const App = () => {
  //stateの変化をreactが検知して、最初から読み込み直す
  console.log("コンポーネントの最初");
  //コンポーネントで使うstateはそのコンポーネントの一番上に
  //書くと、どんな状態を持つコンポーネントなのかすぐわかるよ
  const [num, setNum] = useState(0);
  const [faceShowFlg, SetFaceShowFlg] = useState(true);

  const onClickCntUp = () => {
    setNum(num + 1);
  };
  // const {num,SetNum} = useState(10);//この書き方はNG！！！objじゃなくて配列で渡す！

  const onClickSwitchShowFlag = () => {
    SetFaceShowFlg(!faceShowFlg);
    // faceShowFlg ? SetFaceShowFlg(false) : SetFaceShowFlg(true);
  };
  // num % 3 === 0 ? SetFaceShowFlg(true) : SetFaceShowFlg(false);
  //NG：最初の値に対してif処理して、state変化する処理を行う->レンダリング->state変化->...
  //値が変わったのか、ではなく、stateの変化を行う関数を呼んだのか?
  //をuseStateはみているようである！
  //すでにflagがtrueなら、set関数を呼ばないようにする書き方をすれば解決！

  // useEffect(() => {
  //   console.log("useEffect");
  // }, []); //ただ空にすると,最初の1回だけ実行されるようになる
  //配列の中の要素が変化した時だけ実行する
  //配列の中の要素がないので観るものがないので、最初しか実行されないと、そういう
  //こと！
  useEffect(() => {
    if (num % 3 === 0) {
      faceShowFlg || SetFaceShowFlg(true);
      //左側がfalseの場合、右側の値を返す。
      //この場合、関数を実行する
    } else {
      faceShowFlg && SetFaceShowFlg(false);
    }
  }, [num]); //こうすることでon/offで再レンダリングした時はこの中
  //を通らないし、numで再レンダリングされた時だけは変化するように
  //できる
  //eslintはuseEfectの中にある変数をすべて第２引数に入れないと
  //注意してくるけど、今回はnumだけ分離したいのでこの書き方で正しい。
  //faceShowFlgもみちゃったら結局on/offの時も入ってきちゃう。

  // if (num % 3 === 0) {
  //   faceShowFlg || SetFaceShowFlg(true);
  //   //左側がfalseの場合、右側の値を返す。
  //   //この場合、関数を実行する
  // } else {
  //   faceShowFlg && SetFaceShowFlg(false);
  // }
  //しかし、これだけだと、on/offボタンをクリックした時、
  //Stateが変わり,再レンダリングされ、その時にまたnumの処理
  //を通ってしまって、結局変化しなくなってしまっている
  //このように、それぞれのstateが干渉し合ってしまう事が多々あるため、
  //「関心の分離」をしてあげる必要がある
  //それがuseEffect

  //&&、||は論理演算子で伝わる
  return (
    // <></>は <React.Fragment>省略
    <>
      <h1 style={{ color: "red" }}>こんにちは</h1>
      {/* {{ }}は外側がjsを書きます、内側はjs のobjを書きますという合図*/}
      {/* jsのobjだから、cssのpropはstringと分かるように書いてあげないとエラーになる */}
      {/* <ColorfulMessage color="blue" message="元気？" /> */}
      {/* <ColorfulMessage color="pink" message="元気です！"></ColorfulMessage> */}
      {/* 上記のどちらでもかける */}
      <ColorfulMessage color="blue">元気？</ColorfulMessage>
      <ColorfulMessage color="pink">元気です！</ColorfulMessage>
      {/* タグで囲った中身はpropsのchildrenで受けられる */}

      <button onClick={onClickCntUp}>cnt</button>
      {/* reactでhtmlの属性を書くときはこのonClickのようにローワーキャメルケースで書く*/}
      <button onClick={onClickSwitchShowFlag}>on/off</button>
      <p>{num}</p>
      {faceShowFlg && <p>＾＾</p>}
      {/* 復習：この場合は左の要素がtrueなら右の要素を返す。というのが行われている */}
    </>
  );
};

export default App;
