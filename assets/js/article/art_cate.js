$(function () {
  const { layer, form } = layui;

  initArtCateList();
  //获取文章数据
  function initArtCateList() {
    $.ajax({
      url: "/my/article/cates",
      method: "GET",
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.method);
        var htmlStr = template("tpl_table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  var layerIndex = null;
  //添加弹出层
  $("#btnAddCate").on("click", function () {
    layerIndex = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //点击按钮,提交添加类别
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $("#form-add").serialize(),
      success: function (res) {
        if (res.status !== 0)
          return layer.msg(res.message || "添加文章类别失败");
        initArtCateList();
        layer.msg(res.message || "添加文章类别成功");
        layer.close(layerIndex);
      },
    });
  });
  // 点击删除按钮,删除类别
  $("tbody").on("click", ".btnCloseCate", function () {
    var id = $(this).attr("data-id");
    layer.confirm("确定删除吗?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        method: "Get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg("删除失败");
          layer.msg("删除成功");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
  //通过代理的形式,给btn-edit添加点击事件,编辑文章类别
  var indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    //根据Id渲染出表单上的值
    var id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        console.log(res);
        form.val("form-edit", res.data);
      },
    });
  });
  //通过代理的形式,给form-edit表单添加submit事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("更新表格失败");
        layer.msg("更新表格成功");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
});
