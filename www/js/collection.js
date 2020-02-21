const img = [
  "image/wood_test.png",
  "image/wood_test2.png",
  "image/wood_test3.png",
  "image/wood_test4.png",
  "image/wood_test5.png"
];
const count_max = img.length;
let wood_select = "";
let wood_box = document.getElementById("wood_box");

const make_wood = (img, count) => {
  const wood = document.createElement("div");
  wood.href = "";
  wood.id = `wood${count}`;
  wood.className = `wood `;
  wood.style = `background-image: url(${img})`;
  return wood;
};

for (let i = 0; i < count_max; i++) {
  const wood = make_wood(img[i], i + 1);
  wood_box.appendChild(wood);
}

$(function() {
  $(".wood").on("click", function() {
    wood_select = $(this).attr("id");
    $(".wrap").css("opacity", "0.1");
    $(".wood_info").fadeIn("slow");
  });
  $(".wood_info").on("click", function() {
    $(".wrap").css("opacity", "1.0");
    $(".wood_info").fadeOut("slow");
  });
});
