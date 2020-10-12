$(function () {
  //点击去注册按钮
  $("#reg_btn").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击去登陆按钮
  $("#login_btn").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
});

//从layui中获取form对象
const { layer, form } = layui;
layer.time = 500;
//定义校验规则
form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  repwd: function (value) {
    var pwd = $(".reg-box [name=password]").val();
    if (pwd !== value) return "两次密码输入不一致";
  },
});

//监听注册表单的提价请求
$("#form-reg").on("submit", function (e) {
  e.preventDefault();
  //   $.post(
  //     "http://ajax.frontend.itheima.net/api/reguser",
  //     {
  //       username: $(".reg-box [name='username']").val,
  //       password: $(".reg-box [name='password']").val,
  //     },
  //     function (res) {
  //       if (res.status !== 0) return console.log(res.message);
  //       console.log(res);
  //     }
  //   );
  $.ajax({
    url: "/api/reguser",
    method: "POST",
    data: {
      username: $(".reg-box [name='username']").val(),
      password: $(".reg-box [name='password']").val(),
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message || "注册失败");
      }
      layer.msg(res.kessage || "注册成功,请登录");
      $("#login_btn").click();
    },
  });
});

//监听登录表单的提交请求
$("#form-login").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "/api/login",
    method: "POST",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("登录失败");
      }
      localStorage.setItem("token", res.token);
      console.log(res.token);
      layer.msg("登录成功");
      location.href = "/index.html";
    },
  });
});
