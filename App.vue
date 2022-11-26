<script>
export default {
  onLaunch: function () {
  },
  onShow: function () {
    let args = plus.runtime.arguments;
    console.log(JSON.stringify(args));
  },
  onHide: function () {
  }
}
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
@import './common/css/uni.css';
@import './static/icons/iconfont.css';
/* #endif*/
</style>
