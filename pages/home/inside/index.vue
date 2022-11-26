<template>
  <div class="home-detail-container">
    <div class="home-detail-wrapper" v-if="insideList.length">
      <div class="home-detail-list" v-for="(item,index) in insideList" :key="index">
        <div class="home-detail-item">
          <div class="item-image medical-image">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-content">
            <div class="content-head">
              <text>{{ item.xm }}</text>
              <text>{{ item.roomName }}</text>
            </div>
            <text>入所时间：{{ item.rssj }}</text>
            <text>外出原因：{{ item.reason }}</text>
            <text>确认时间：{{ item.startTime }}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import config from "@/common/config";
import { setNavBarTitle, dateFormat } from "@/common/utils/util.js";

export default {
  name: "inside",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 所内就医列表
      insideList: []
    };
  },
  created () {
    // 获取所内就医人员列表
    this.getInsideList();
  },
  methods: {
    // 获取所内就医人员列表
    async getInsideList () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {}
      };
      let res = await Api.apiCall("post", Api.index.getInsideList, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (result.length) {
          result.map(item => {
            item.rssj = dateFormat("YYYY-MM-DD", new Date(item.rssj));
            item.startTime = dateFormat("YYYY-MM-DD", new Date(item.startTime));
          });
        } else {
          uni.showToast({
            title: "暂无数据",
            position: "center",
            duration: 1500,
            icon: "none",
          });
        }
        this.insideList = result;
      }
    }
  },
}
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
