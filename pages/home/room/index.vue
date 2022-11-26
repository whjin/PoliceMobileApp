<template>
  <div class="general-detail-container">
    <div class="general-detail-wrapper" v-if="roomList.length">
      <div class="general-detail-list" v-for="(item, index) in roomList" :key="index">
        <div class="general-detail-item">
          <div class="item-left">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-center">
            <text>{{ item.name }}</text>
            <text>入所时间：{{ item.entryDate }}</text>
            <text>涉嫌罪名：{{ item.allegedCrimes }}</text>
          </div>
          <div class="item-right" :class="{
              'level-one': item.riskLevel == '一级风险',
              'level-two': item.riskLevel == '二级风险',
              'level-three': item.riskLevel == '三级风险',
              'level-four': item.riskLevel == '一般风险',
            }">
            {{ item.riskLevel }}
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
  name: "room",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 监室概况列表
      roomList: [],
    };
  },
  created () {
    // 获取监室详情
    this.getRoomInfo();
  },
  methods: {
    // 获取监室详情
    async getRoomInfo () {
      // 动态设置标题
      let info = setNavBarTitle();
      let params = {
        data: {
          roomId: info.roomId,
        },
      };
      let res = await Api.apiCall("post", Api.index.getRoomDetailInfo, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (result.length) {
          result.map((item) => {
            item.entryDate = dateFormat("YYYY-MM-DD", new Date(item.entryDate));
          });
        } else {
          uni.showToast({
            title: "暂无数据",
            position: "center",
            duration: 1500,
            icon: "none",
          });
        }
        this.roomList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
