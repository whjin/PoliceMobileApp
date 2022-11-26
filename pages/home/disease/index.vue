<template>
  <div class="home-detail-container">
    <div class="home-detail-wrapper" v-if="diseaseList.length">
      <div class="home-detail-list" v-for="(item, index) in diseaseList" :key="index">
        <div class="home-detail-item">
          <div class="item-image">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-content">
            <div class="content-head">
              <text>{{ item.xm }}</text>
              <text>{{ item.roomName }}</text>
            </div>
            <text>入所时间：{{ item.rssj }}</text>
            <text>疾病名称：{{ item.disease }}</text>
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
  name: "disease",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 重大疾病人员列表
      diseaseList: [],
    };
  },
  created () {
    // 获取重大疾病人员信息
    this.getRoomDiseaseInfo();
  },
  methods: {
    // 获取重大疾病人员信息
    async getRoomDiseaseInfo () {
      // 动态设置标题
      setNavBarTitle();
      let params = {};
      let res = await Api.apiCall("post", Api.index.getIllnessRyList, params);
      if (res.state.code == "200") {
        let result = res.data.content;
        if (result.length) {
          result.map((item) => {
            item.rssj = dateFormat("YYYY-MM-DD", new Date(item.rssj));
          });
        } else {
          uni.showToast({
            title: "暂无数据",
            position: "center",
            duration: 1500,
            icon: "none",
          });
        }
        this.diseaseList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
