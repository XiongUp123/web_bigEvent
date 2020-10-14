$(function () {
  const { form, layer } = layui;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须在6-12位数之间"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新密码不能与旧密码相同";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次输入的密码不一致";
      }
    },
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/my/updatepwd",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message || "更新密码失败");
        layer.msg(res.message || "更新密码成功");
        $(".layui-form")[0].reset();
      },
    });
  });
});
