// 动态设置页面标题
export const setNavBarTitle = () => {
  let routes = getCurrentPages();
  let curParam = routes[routes.length - 1].options;
  let params = JSON.parse(curParam.params);
  let title = "";
  for (let key in params) {
    if (key == "title") {
      title = params["title"];
    }
  }
  uni.setNavigationBarTitle({
    title,
  });
  return params;
};

// 格式化日期类型,fmt格式可选择
export const dateFormat = (fmt, date) => {
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
    "ms+": date.getMilliseconds().toString(), // 毫秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
};
