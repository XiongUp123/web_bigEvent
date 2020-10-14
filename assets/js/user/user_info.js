$(function () {
  const { form } = layui;
  form.verify({
    nikename: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 ~ 6 个字符之间！";
      }
    },
  });

  //获取用户信息
  initUserInfo();
  const { from, layer } = layui;
  function initUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      method: "GET",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        //给表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  }

  //点重置按钮重置表单值
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
    
    //提交用户修改的信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo();
            }
        })
    })
});
