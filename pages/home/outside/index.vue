<template>
  <div class="home-detail-container">
    <div class="home-detail-wrapper" v-if="outsideList.length">
      <div class="home-detail-list" v-for="(item, index) in outsideList" :key="index">
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
            <text>诉讼环节：{{ item.litigation }}</text>
            <text>外出原因：{{ item.reason }}</text>
            <text>责任医生：{{ item.doctor }}</text>
            <text>就诊医院：{{ item.hospital }}</text>
            <text>出所日期：{{ item.outStationDate }}</text>
            <text>医生意见：{{ item.doctorOpinion }}</text>
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
  name: "outside",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 所外就医列表
      outsideList: [],
    };
  },
  created () {
    // 获取所外就医人员列表
    this.getOutsideList();
  },
  methods: {
    // 获取所外就医人员列表
    async getOutsideList () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {},
      };
      let res = await Api.apiCall("post", Api.index.getOutsideList, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (result.length) {
          result.map((item) => {
            item.rssj = dateFormat("YYYY-MM-DD", new Date(item.rssj));
            item.outStationDate = dateFormat(
              "YYYY-MM-DD",
              new Date(item.outStationDate)
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
        this.outsideList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
