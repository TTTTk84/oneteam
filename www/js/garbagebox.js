//ゴミ箱の処理

const garbagebox = () => {
  const obnizB = new Obniz("1690-3518");
  obnizB.onconnect = async function() {
    console.log("garbagebox接続");
    const sensor = obniz.wired("GP2Y0A21YK0F", { vcc: 0, gnd: 1, signal: 2 });

    sensor.start(function(distance) {
      if (distance < 200) {
        return true;
      }
    });
  };

  return false;
};
