const login_url =
  "https://oneteamprojectapi.herokuapp.com/login?user_id=1&password=iwasaki";
const profile_url = "https://oneteamprojectapi.herokuapp.com/users/1";

// const login_url = "http://localhost:3000/login?user_id=1&password=iwasaki";
// const profile_url = "http://localhost:3000/users/1";

const login = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
    }).then((res) => {
      if (res.ok) {
        return resolve(res);
      } else {
        return reject("login error");
      }
    });
  });
};

const profile = (url) => {
  return new Promise((resolve, reject) => {
    fetch(profile_url, {
      methoe: "GET",
      mode: "cors",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return resolve(res.json());
      } else {
        console.log("test2 bad");
        return reject("profile error");
      }
    });
  });
};

const wood_action = (user) => {
  const question_img = "image/question.jpg";
  const img = [
    "image/wood_test.png",
    "image/wood_test2.png",
    "image/wood_test3.png",
    "image/wood_test4.png",
    "image/wood_test5.png",
    "image/wood_test6.png",
  ];

  const wood_text = [
    ["wood1", "wood1のテキスト"],
    ["wood2", "wood2のテキスト"],
    ["wood3", "wood3のテキスト"],
    ["wood4", "wood4のテキスト"],
    ["wood5", "wood5のテキスト"],
    ["wood6", "wood6のテキスト"],
  ];
  const count_max = 6;
  const wood_release = user.wood_now;

  const make_wood = (img, count) => {
    const wood = document.createElement("div");
    wood.id = count;
    wood.className = "wood";
    wood.style = `background-image: url(${img})`;
    return wood;
  };

  for (let i = 0; i < count_max; i++) {
    const wood = make_wood(img[i], i);
    document.getElementById("wood_box").appendChild(wood);
  }

  for (let i = wood_release + 1; i < count_max; i++) {
    const wood = document.getElementById(`${i}`);
    wood.className = "question";
    wood.style = `background-image: url(${question_img})`;
  }

  $(function () {
    $(".wood").on("click", function () {
      const wood_select = $(this).attr("id");
      document.getElementById("wood_title").textContent =
        wood_text[wood_select][0];
      document.getElementById("wood_content").textContent =
        wood_text[wood_select][1];
      $(".wood_img").css("background-image", `url(${img[wood_select]})`);
      $(".wrap").css("opacity", "0.1");
      $(".wood_info").fadeIn(300);
    });
    $(".wood_info").on("click", function () {
      $(".wrap").css("opacity", "1.0");
      $(".wood_info").fadeOut(300);
    });
  });
};

Promise.resolve()
  .then(() => {
    login(login_url);
  })
  .then(() => {
    const user = profile(profile_url);
    return user;
  })
  .then((user) => {
    wood_action(user);
  });
