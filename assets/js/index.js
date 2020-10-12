$(function () {
  // 调用获取用户信息函数
  getUserInfo();
  const { layer } = layui;
  //点击退出按钮实现退出功能
  $(".quit-b").on("click", function () {
    layer.confirm("确定退出吗?", { icon: 3, title: "提示" }, function (index) {
      //do something
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
});
//获取用户信息
function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    method: "GET",

    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message || "获取用户信息失败");
      }
      renderAvatar(res.data);
    },
    // complete:function (res) {
    //     if (
    //       res.responseJSON.status === 1 &&
    //       res.responseJSON.message === "身份认证失败！"
    //     ) {
    //       localStorage.removeItem("token");
    //       location.href = "/login.html";
    //     }
    //   } ,
  });
}
//渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html(`欢迎 &nbsp;&nbsp;${name}`);
  // 渲染头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
    $(".layui-nav-img").hide();
  }
}
