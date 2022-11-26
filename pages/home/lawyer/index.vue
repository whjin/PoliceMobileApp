<template>
  <div class="lawyer-detail-container">
    <div class="lawyer-detail-wrapper" v-if="lawyerList.length">
      <div class="lawyer-detail-list" v-for="(item, index) in lawyerList" :key="index">
        <div class="lawyer-detail-item">
          <div class="item-image">
            <image :src="imgUrl + item.imgUrl"></image>
          </div>
          <div class="item-content">
            <div class="content-head">
              <text>{{ item.xm }}</text>
              <text>{{ item.roomName }}</text>
            </div>
            <div class="content-date">
              <text>会见时间：</text>
              <div>
                <text>{{ item.meetStartTime }} 至</text>
                <text>{{ item.meetEndTime }}</text>
              </div>
            </div>
            <div class="content-police">负责民警：{{ item.manager }}</div>
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
  name: "lawyer-detail",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 律师会见列表
      lawyerList: [],
    };
  },
  created () {
    // 获取律师会见人员列表
    this.getLawyerList();
  },
  methods: {
    // 获取律师会见人员列表
    async getLawyerList () {
      // 动态设置标题
      setNavBarTitle();
      let params = {
        data: {},
      };
      let res = await Api.apiCall("post", Api.index.getLawyerList, params);
      if (res.state.code == "200") {
        let result = res.data;
        if (result.length) {
          result.map((item) => {
            item.meetStartTime = dateFormat(
              "YYYY-MM-DD hh:mm:ss",
              new Date(item.meetStartTime)
            );
            item.meetEndTime = dateFormat(
              "YYYY-MM-DD hh:mm:ss",
              new Date(item.meetEndTime)
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
        this.lawyerList = result;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
