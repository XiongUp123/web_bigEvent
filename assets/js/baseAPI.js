const ur = "http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function (option) {
  option.url = ur + option.url;
  console.log(option.url);
});
