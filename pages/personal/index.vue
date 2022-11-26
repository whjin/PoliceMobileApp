<template>
  <div class="personal-container">
    <div class="personal-wrapper">
      <div class="personal-box">
        <div class="personal-title">基础信息</div>
        <div class="personal-content" v-if="Object.keys(userInfo).length">
          <div class="personal-image">
            <image :src="imgUrl + userInfo.avator"></image>
          </div>
          <div class="personal-info">
            <text>{{ userInfo.userName }}</text>
            <text>警号：{{ userInfo.accountName }}</text>
            <text>角色：{{ userInfo.roleTypeName }}</text>
          </div>
        </div>
        <div class="personal-title">值班安排</div>
        <div class="personal-duty" v-if="dutyList.length">
          <div class="content-list" v-for="(item, index) in dutyList" :key="index">
            <div class="content-item">{{ item.dutyDate }}</div>
          </div>
        </div>
      </div>
      <div class="personal-button" @click="handleLogout">退出</div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import config from "@/common/config";

export default {
  name: "personal",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 登录用户信息
      userInfo: {},
      // 值班安排列表
      dutyList: [],
    };
  },
  created () {
    // 获取用户信息
    if (!!uni.getStorageSync("userInfo")) {
      this.userInfo = uni.getStorageSync("userInfo");
    }
    // 获取用户信息
    this.getUserDutyInfo();
  },
  methods: {
    // 获取用户值班安排信息
    async getUserDutyInfo () {
      let accountName = this.userInfo.accountName;
      let res = await Api.apiCall(
        "get",
        Api.index.getUserDutyDate + `${accountName}`,
        null
      );
      if (res.state.code == "200") {
        this.dutyList = res.data;
      }
    },
    // 退出系统
    handleLogout () {
      uni.removeStorageSync("baseUrl");
      uni.removeStorageSync("imgUrl");
      uni.removeStorageSync("token");
      uni.removeStorageSync("userInfo");
      uni.redirectTo({
        url: "/pages/login/index",
      });
    },
  },
};
</script>

<style lang="less">
@import '../../common/less/index.less';
</style>
