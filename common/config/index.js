let baseUrl = !uni.getStorageSync("baseUrl")
  ? "http://192.168.1.132:8100"
  : uni.getStorageSync("baseUrl");
let imgUrl = !uni.getStorageSync("imgUrl")
  ? "http://192.168.1.85:8080"
  : uni.getStorageSync("imgUrl");
export default {
  baseUrl,
  imgUrl,
};
