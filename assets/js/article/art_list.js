$(function () {
  var q = {
    pagenum: 1, //页码值,默认请求第一页的值
    pagesize: 2, // 每页显示几条数据,默认显示2条
    cate_id: "", //文章分类的ID
    state: "", //文章的发布状态
  };
  initTable();
  initCate();
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取文章数据成功");
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }
  const { layer } = layui;
  //定义时间过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth());
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + ":" + hh + ":" + mm + ":" + ss;
  };
  //定义时间补零函数
  function padZero(n) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  }
  const { form, laypage } = layui;
  //初始化文章分类的方法
  function initCate() {
    $.ajax({
      url: "/my/article/cates",
      method: "GET",
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取文章分类失败");

        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        //通知layui重新渲染文章分类的解构
        form.render();
      },
    });
  }

  //给form-search表单添加submit时间,实现筛选功能
  $("#form-search").on("submit", function (e) {
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    q.state = state;
    q.cate_id = cate_id;
    initTable();
  });
  //渲染文章分页的方法
  function renderPage(total) {
    laypage.render({
      elem: "test1", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      limits: [2, 3, 5, 10],
      curr: q.pagenum,
      jump: function (obj, first) {
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!first) {
          initTable();
        }
      },
      layout: ["count", "limit", "prev", "page", "next", "skip"],
    });
  }

  //通过代理的形式,为删除按钮添加点击事件
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    var len = $(".btn-delete").length;
    console.log(len);
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        url: "/my/article/delete/" + id,
        method: "GET",
        success: function (res) {
          if (res.status !== 0) return  layer.msg(res || "删除失败");
          layer.msg("删除成功");
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
        },
      });
      layer.close(index);
    });
  });
});
