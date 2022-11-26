import config from "./config";

export default {
  index: {
    // 登录系统
    loginSystem: "/sysmgr/login",
  },

  /**
   * 封装请求（async await 封装uni.request）
   * method		    post/get
   * endpoint		接口方法名
   * data			所需传递参数
   */
  apiCall (method, endpoint, data) {
    let fullUrl = config.baseUrl + endpoint;
    return new Promise((resolve, reject) => {
      uni.request({
        url: fullUrl,
        data: data,
        method: method,
        dataType: "json",
        header: {
          "content-type": "application/json",
          cookie: uni.getStorageSync("token"),
        },
        success: (res) => {
          if (res.data.state.code != 200) {
            uni.showToast({
              title: res.data.state.msg,
              position: "bottom",
              duration: 1500,
              icon: "none",
            });
          }
          if (res.data.state.code == 401) {
            uni.removeStorageSync("baseUrl");
            uni.removeStorageSync("imgUrl");
            uni.removeStorageSync("token");
            uni.removeStorageSync("userInfo");
            uni.redirectTo({
              url: "/pages/login/index",
            });
          }
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
};
