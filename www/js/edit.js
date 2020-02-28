$(function() {
  $("#submit").click(function() {
    $.ajax({
      type: "PUT",
      url: "https://oneteamprojectapi.herokuapp.com/users/1/user_configs",
      data: { user_id: "1", mail: $('input[name="mail"]').val() }
    }).done(function(msg) {
      alert("保存されました。");
    });
  });
});
