//王将の処理

//kingmain処理
const kingmain = () => {
  kingControl();
};

//加速度センサーを感知するまで、王将を回す。
const kingControl = () => {
  console.log("kingControl開始");
  const obniz = new Obniz("7904-8026");
  obniz.onconnect = async function() {
    const motor = obniz.wired("DCMotor", { forward: 0, back: 1 });

    motor.forward();

    //10秒間ループする
    loop(motor);
  };
};

//10秒たつか、sensor反応したらぬける。
const loop = motor => {
  let second = 0;

  const count = () => {
    console.log(`${second}ループ`);
    second++;

    /*
      10秒以内にゴミ箱に捨てた場合の処理。
    */

    if (second > 10) {
      motor.stop();
      return;
    }

    clearTimeout(id);
    id = setTimeout(count, 1000);
  };

  let id = setTimeout(count, 1000);
};
