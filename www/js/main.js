window.addEventListener("DOMContentLoaded", () => {
  /* getCurrentTime() 現在の時刻をhhmmの形式で返す */
  let currentTime = getCurrentTime();

  /* takeMedicineTime, 設定された時刻でhhmmの形式, ユーザから設定される予定　24時で生書き*/
  let takeMedicineTime1 = 1105;

  let countdownTime = getCountdownTime(currentTime, takeMedicineTime1);
  countdownTime = convertTimeToMillisec(countdownTime);

  /* 指定の時間にking.jsのmain関数を実行 */
  setTimeout(() => kingmain(), countdownTime);
});

getCurrentTime = () => {
  let date = new Date();
  let currentMinutes = date.getMinutes();
  let currentHours = date.getHours();
  console.log(`現在時刻は${currentHours}時${currentMinutes}分`);
  let currentTime = currentHours * 100 + currentMinutes;
  return currentTime;
};

getCountdownTime = (start, end) => {
  if (start > end) {
    end += 2400;
  }
  let sMinute = start % 100;
  let eMinute = end % 100;
  let diffHour = Math.round(end / 100) - Math.round(start / 100);
  eMinute += diffHour * 60;
  let diffMinute = eMinute - sMinute;
  let diffTime = Math.round(diffMinute / 60) * 100;
  diffTime += diffMinute % 60;
  console.log(
    `王将起動まで${Math.round(diffTime / 100)}時間${diffTime % 100}分`
  );
  return diffTime;
};

convertTimeToMillisec = time => {
  let minute = time % 100;
  minute = minute * 60 * 1000;
  return minute;
};
