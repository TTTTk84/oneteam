const btn = document.getElementById("btn");

//クリックしてから
btn.addEventListener("click", () => {
  console.log("ok");
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const waitTime = timecheck(hour.value, minute.value);
  console.log(waitTime);
  setTimeout(() => main(), waitTime);
});

//待ち時間を測定
const timecheck = (hour, minute) => {
  const timer_value = new Date();
  const timer = new Date(
    timer_value.getFullYear(),
    timer_value.getMonth(),
    timer_value.getDate(),
    hour,
    minute
  );

  const now = new Date();
  let waitTime = 0;

  waitTime = timer.getTime() - now.getTime();

  console.log(timer);
  console.log(now);
  return waitTime;
};

//センサーでストップする。
const main = () => {
  const obniz = new Obniz("7904-8026");
  obniz.onconnect = async function() {
    console.log("処理開始");
    const led = obniz.wired("LED", { anode: 3, cathode: 4 });
    const motor = obniz.wired("DCMotor", { forward: 5, back: 6 });
    const sensor = obniz.wired("GP2Y0A21YK0F", { vcc: 0, gnd: 1, signal: 2 });

    led.on();
    motor.forward();

    sensor.start(function(distance) {
      if (distance < 200) {
        led.off();
        motor.stop();
      }
    });
  };
};
