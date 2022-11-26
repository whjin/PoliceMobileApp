let baseUrl = !uni.getStorageSync("baseUrl")
  ? "http://ip:port"
  : uni.getStorageSync("baseUrl");
let imgUrl = !uni.getStorageSync("imgUrl")
  ? "http://ip:port"
  : uni.getStorageSync("imgUrl");
export default {
  baseUrl,
  imgUrl,
};
