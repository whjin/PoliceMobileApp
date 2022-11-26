<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-logo" @click="openSetModal">
        <div class="logo-image">
          <image src="@/static/images/login/login.png"></image>
        </div>
        <div class="logon-content">移动终端系统</div>
      </div>
      <div class="login-form">
        <div class="form-account">
          <input type="text" placeholder="请输入警号" @input="accountChange" />
          <image class="image-account" src="@/static/images/login/account.png"></image>
        </div>
        <div class="form-password">
          <input :type="visibleState ? 'text' : 'password'" placeholder="请输入密码" @input="passwordChange" />
          <image class="image-password" src="@/static/images/login/password.png"></image>
          <image class="image-visible" src="@/static/images/login/visible.png" @click="checkPwdType"></image>
        </div>
      </div>
      <div class="login-button">
        <div class="button-confirm" @click="loginConfirm">登录</div>
        <div class="button-version">高科通信 V1.0.0</div>
      </div>
      <div class="login-modal" v-if="showSetModal">
        <div class="modal-mask">
          <div class="modal-content">
            <div class="content-item">
              <text>基础服务Url</text>
              <input type="text" v-model="baseUrl">
            </div>
            <div class="content-item">
              <text>图片服务Url</text>
              <input type="text" v-model="imgUrl">
            </div>
            <div class="content-button">
              <text @click="showSetModal = false">取消</text>
              <text @click="setSystemUrl">确定</text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import md5 from "@/common/utils/md5.js";
import config from "@/common/config";

export default {
  name: "login",
  data () {
    return {
      // 点击次数
      clickNum: 0,
      // 配置弹框状态
      showSetModal: false,
      // 基础Url
      baseUrl: config.baseUrl,
      // 图片Url
      imgUrl: config.imgUrl,
      // 登录账号
      account: "",
      // 登录密码
      password: "",
      // 密码可见状态
      visibleState: false,
    };
  },
  created () {
    // 保持登录状态
    if (!!uni.getStorageSync("token")) {
      uni.switchTab({
        url: "/pages/home/index/index",
      });
    }
  },
  methods: {
    // 打开设置弹框
    openSetModal () {
      if (this.clickNum == 3) {
        this.clickNum = 0;
        this.showSetModal = true;
      } else {
        this.clickNum += 1;
        uni.showToast({
          title: "连续点击三次",
          position: "bottom",
          duration: 1500,
          icon: "none",
        });
      }
    },
    // 设置基础|图片地址
    setSystemUrl () {
      if (!this.baseUrl) {
        uni.showToast({
          title: "基础服务Url不能为空！",
          position: "center",
          duration: 1500,
          icon: "none",
        });
        return;
      }
      if (!this.imgUrl) {
        uni.showToast({
          title: "图片服务Url不能为空！",
          position: "center",
          duration: 1500,
          icon: "none",
        });
        return;
      }
      uni.setStorageSync("baseUrl", this.baseUrl);
      uni.setStorageSync("imgUrl", this.imgUrl);
      this.showSetModal = false;
    },
    // 获取账号输入值
    accountChange (e) {
      this.account = e.target.value;
    },
    // 获取密码输入值
    passwordChange (e) {
      this.password = md5(e.target.value);
    },
    // 切换密码可见状态
    checkPwdType () {
      this.visibleState = !this.visibleState;
    },
    // 登录系统
    loginConfirm () {
      if (!this.account) {
        uni.showToast({
          title: "登录账号不能为空！",
          position: "center",
          duration: 1500,
          icon: "none",
        });
        return;
      }
      if (!this.password) {
        uni.showToast({
          title: "登录密码不能为空！",
          position: "center",
          duration: 1500,
          icon: "none",
        });
        return;
      }
      this.loginSystem();
    },
    // 民警登录
    async loginSystem () {
      let params = {
        accountName: this.account,
        password: this.password,
      };
      let res = await Api.apiCall("post", Api.index.loginSystem, params);
      if (res.state.code == "200") {
        uni.setStorageSync("token", "token=" + res.data.token);
        // 获取用户信息
        this.getUserInfo();
      }
    },
    // 获取用户信息
    async getUserInfo () {
      let res = await Api.apiCall("post", Api.index.getUserInfo, null);
      if (res.state.code == "200") {
        uni.setStorageSync("userInfo", res.data);
        uni.switchTab({
          url: "/pages/home/index/index",
        });
      }
    },
  },
};
</script>

<style lang="less">
@import '../../common/less/index.less';
</style>
