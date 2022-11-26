<template>
  <div class="home-detail-container">
    <div class="home-detail-wrapper" v-if="arraignList.length">
      <div class="home-detail-list" v-for="(item, index) in arraignList" :key="index">
        <div class="home-detail-item">
          <div class="item-image">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-content">
            <div class="content-head">
              <text>{{ item.xm }}</text>
              <text>{{ item.roomName }}</text>
            </div>
            <text>提讯时间：{{ item.hearingDate }}</text>
            <text>经办民警：{{ item.manager }}</text>
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
  name: "arraign",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 监室调整列表
      arraignList: [],
    };
  },
  created () {
    // 获取提讯人员列表
    this.getArraignList();
  },
  methods: {
    // 获取提讯人员列表
    async getArraignList () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {},
      };
      let res = await Api.apiCall("post", Api.index.getHearingList, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (result.length) {
          result.map((item) => {
            item.hearingDate = dateFormat(
              "YYYY-MM-DD hh:mm:ss",
              new Date(item.hearingDate)
            );
          });
        } else {
          uni.showToast({
            title: "暂无数据",
            position: "center",
            duration: 1500,
            icon: "none",
          });
        }
        this.arraignList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
