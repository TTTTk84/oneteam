let img = [
  "image/wood_test.png",
  "image/wood_test2.png",
  "image/wood_test3.png",
  "image/wood_test4.png",
  "image/wood_test5.png",
  "image/wood_test6.png"
];
const question_img = "image/question.jpg";
let wood_text = [[]];

const count_max = 6;
let wood_select = "";
let wood_box = document.getElementById("wood_box");
let wood_release = 0;

const request = new XMLHttpRequest();

request.open("GET", "https://oneteamprojectapi.herokuapp.com/users/1", true);
request.responseType = "json";
request.send();

request.onload = function() {
  let wood_now = JSON.stringify(this.response);
  wood_now = JSON.parse(wood_now).wood_now;
  wood_release = wood_now - 1;
  wood_release = 3;
  console.log(wood_release);
  wood_text_init();
  wood_action();
};

const wood_action = function() {
  const make_wood = (img, count) => {
    const wood = document.createElement("div");
    wood.id = count;
    wood.className = `wood`;
    wood.style = `background-image: url(${img})`;
    return wood;
  };

  for (let i = 0; i < count_max; i++) {
    const wood = make_wood(img[i], i);
    wood_box.appendChild(wood);
  }

  for (let i = wood_release; i < count_max; i++) {
    const wood = document.getElementById(`${i}`);
    wood.className = "question";
    wood.style = `background-image: url(${question_img})`;
  }

  $(function() {
    $(".wood").on("click", function() {
      wood_select = $(this).attr("id");
      document.getElementById("wood_title").textContent =
        wood_text[wood_select][0];
      document.getElementById("wood_content").textContent =
        wood_text[wood_select][1];
      $(".wood_img").css("background-image", `url(${img[wood_select]})`);
      $(".wrap").css("opacity", "0.1");
      $(".wood_info").fadeIn(300);
    });
    $(".wood_info").on("click", function() {
      $(".wrap").css("opacity", "1.0");
      $(".wood_info").fadeOut(300);
    });
  });
};

const wood_text_init = () => {
  wood_text = [
    ["wood1", "wood1のテキスト"],
    ["wood2", "wood2のテキスト"],
    ["wood3", "wood3のテキスト"],
    ["wood4", "wood4のテキスト"],
    ["wood5", "wood5のテキスト"],
    ["wood6", "wood6のテキスト"]
  ];
};
