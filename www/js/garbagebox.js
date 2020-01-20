//ゴミ箱の処理

const garbagebox = () => {
  const obniz = new Obniz("7904-8026");
  obniz.onconnect = async function() {
    const sensor = obniz.wired("KXR94-2050", {
      vcc: 0,
      gnd: 1,
      x: 2,
      y: 3,
      z: 4,
      enable: 5,
      self_test: 6
    });

    sensor.onChange = () => {
      return true;
    };
    return false;
  };
};
