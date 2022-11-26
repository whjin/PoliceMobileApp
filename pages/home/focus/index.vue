<template>
  <div class="general-detail-container">
    <div class="general-detail-wrapper" v-if="focusList.length">
      <div class="general-detail-list" v-for="(item, index) in focusList" :key="index">
        <div class="general-detail-item">
          <div class="item-left">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-center">
            <text>{{ item.xm }}</text>
            <text>入所时间：{{ item.rssj }}</text>
            <text>涉嫌罪名：{{ item.criminalNames }}</text>
            <text>诉讼环节：{{ item.litigation }}</text>
          </div>
          <div class="item-right" :class="{
              'level-one': item.levelName == '一级风险',
              'level-two': item.levelName == '二级风险',
              'level-three': item.levelName == '三级风险',
              'level-four': item.levelName == '一般风险',
            }">
            {{ item.levelName }}
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
  name: "focus",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 重点关注人员列表
      focusList: [],
    };
  },
  created () {
    // 获取重点关注人员信息
    this.getRoomFocusInfo();
  },
  methods: {
    // 获取重点关注人员信息
    async getRoomFocusInfo () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {},
      };
      let res = await Api.apiCall("post", Api.index.getFocusList, params);
      if (res.state.code == "200") {
        let result = res.data;
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
        this.focusList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
