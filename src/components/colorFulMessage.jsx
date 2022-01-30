import React from "react";

// reactの最重要な基礎概念は3つ
// コンポーネント-「使いまわしが出来る」パーツ。引数を受けて状態を変化させる「
//props-コンポーネントの表示を変化させる引数。
//state-各コンポーネントの状態。Stasteが変更された時に再レンダリングされる
//stateは各コンポーネントが自分で持つ場所を作るという事も覚えておく！

//親で再レンダリングが走ると、子も再レンダリングされる

const ColorfulMessage = (props) => {
  //propsは慣習的にそう書かれてる
  console.log(props);
  const { color, children } = props; //分割代入を利用するとこうできる
  //コンポネントを使う側から引数が渡ってきている事を確認
  const contentStyle = {
    // color: props.color,
    // color: color, //分割代入を利用するとこうできる
    color, //これめっちゃびっくり！！！！jsではobjのプロパティ名とその中の
    //値が全く同じなら、省略して書くことが出来る！！！！！！

    fontSize: "18px"
    // 本来のcss ならfont-sizeだけど、Reactでは上記
    // のように書く
    //jsのobjの書き方をして割り当てる
  };

  // return <p style={contentStyle}>{props.message}</p>;
  // return <p style={contentStyle}>{props.children}</p>;
  return <p style={contentStyle}>{children}</p>; //分割代入を利用するとこうできる
};
export default ColorfulMessage;
