//王将の処理

//kingmain処理
const kingmain = () => {
  kingControl();
};

//加速度センサーを感知するまで、王将を回す。
const kingControl = () => {
  console.log("kingControl開始");
  const obnizA = new Obniz("1690-3518");
  obnizA.onconnect = async function() {
    const motor = obnizA.wired("DCMotor", { forward: 0, back: 1 });

    motor.forward();

    //10秒間ループする
    loop(motor);
  };
};

//10秒たつか、sensor反応したらぬける。
const loop = motor => {
  let second = 0;
  var flg = 0;

  const count = () => {
    console.log(`${second}ループ`);
    second++;

    var obnizB = new Obniz("7904-8026");
    obnizB.onconnect = async function() {
      console.log("garbagebox接続");
      const sensor = obnizB.wired("GP2Y0A21YK0F", {
        vcc: 0,
        gnd: 1,
        signal: 2
      });
      sensor.start(function(distance) {
        console.log(distance);
        if (distance < 200) {
          flg = 1;
        }
      });
    };

    if (second > 1 && flg == 1) {
      motor.stop();
      console.log("止まった");
      return;
    }

    if (second > 10) {
      motor.stop();
      return;
    }

    clearTimeout(id);
    id = setTimeout(count, 1000);
  };

  let id = setTimeout(count, 1000);
};
