<template>
  <div class="home-detail-container">
    <div class="home-detail-wrapper" v-if="adjustList.length">
      <div class="home-detail-list" v-for="(item, index) in adjustList" :key="index">
        <div class="home-detail-item">
          <div class="item-image">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-content">
            <div class="content-head">
              <text>{{ item.xm }}</text>
              <text>{{ item.oldRoomName }}</text>
            </div>
            <text>调整时间：{{ item.roomChangeTime }}</text>
            <text>更换监室：{{ item.newRoomName }}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import config from "@/common/config";
import { setNavBarTitle } from "@/common/utils/util.js";

export default {
  name: "adjust",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 监室调整列表
      adjustList: [],
    };
  },
  created () {
    // 获取监室调整人员列表
    this.getAdjustList();
  },
  methods: {
    // 获取监室调整人员列表
    async getAdjustList () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {},
      };
      let res = await Api.apiCall("post", Api.index.getAdjustList, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (!result.length) {
          uni.showToast({
            title: "暂无数据",
            position: "center",
            duration: 1500,
            icon: "none",
          });
        }
        this.adjustList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
