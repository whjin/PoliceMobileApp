<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="room-box">
        <div class="room-title">
          <text :class="currentTab == 0 ? 'tab-active' : ''" @click="switchTab(0)">主管监室概况</text>
          <text :class="currentTab == 1 ? 'tab-active' : ''" @click="switchTab(1)">协管监室概况</text>
        </div>
        <div class="room-content">
          <div class="room-list" v-for="(item, index) in roomList" :key="index" :class="selectRoomId == item.roomId ? 'list-select' : ''" @click="handleSelectRoom(item)">
            <div class="room-item">
              <div class="item-title">{{ item.roomName }}</div>
              <div>
                <text>{{ item.number }}</text>人
              </div>
            </div>
          </div>
        </div>
        <div class="person-content">
          <div class="person-list" v-for="(item, index) in personList" :key="index" @click="handleSelectPerson(item)">
            <div class="person-item">
              <div>{{ item.title }}</div>
              <div>
                <text>{{ item.number }}</text>人
              </div>
            </div>
          </div>
        </div>
        <div class="dynamic-content">
          <div class="dynamic-list" v-for="(item, index) in dynamicList" :key="index" :class="selectLabel == item.title ? 'list-select' : ''" @click="handleSelectDynamic(item)">
            <div class="dynamic-item">
              <div class="item-left">
                <div>
                  <text>{{ item.number }}</text>人
                </div>
                <div>{{ item.title }}</div>
              </div>
              <div class="item-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";

export default {
  name: "home",
  data () {
    return {
      // 当前页面标识
      currentTab: 0,
      // 监室概况列表
      roomList: [],
      // 重点人员列表
      personList: [],
      // 监室动态列表
      dynamicList: [],
      // 选择监室ID
      selectRoomId: "",
      // 选择动态标签
      selectLabel: "",
    };
  },
  created () {
    // 获取主管监室信息
    this.getRoomCommonInfo(0);
  },
  methods: {
    // 切换主页面
    switchTab (index) {
      this.currentTab = index;
      switch (index) {
        case 0:
          // 获取主管监室信息
          this.getRoomCommonInfo(0);
          break;
        case 1:
          // 获取协管监室信息
          this.getRoomCommonInfo(1);
          break;
      }
    },
    // 获取主管监室信息
    async getRoomCommonInfo (type) {
      let params = {
        isAssist: type,
      };
      let res = await Api.apiCall("get", Api.index.getRoomInfoNumber, params);
      if (res.state.code == "200") {
        this.roomList = res.data.list;
        this.personList = [
          {
            id: "0",
            title: "重大疾病人员",
            number: res.data.seriousIllnesses,
          },
          {
            id: "1",
            title: "重点关注人员",
            number: res.data.countFocus,
          },
        ];
        this.dynamicList = [
          {
            title: "律师会见",
            number: res.data.countHearing,
          },
          {
            title: "提讯",
            number: res.data.seriousIllnesses,
          },
          {
            title: "家属会见",
            number: res.data.countFamily,
          },
          {
            title: "所外就医",
            number: res.data.countOutTreatment,
          },
          {
            title: "所内就医",
            number: res.data.countInsideTreatment,
          },
          {
            title: "监室调整",
            number: res.data.todayRoomChange,
          },
        ];
      }
    },
    // 选择监室概况
    handleSelectRoom (item) {
      this.selectRoomId = item.roomId;
      item.title = item.roomName;
      uni.navigateTo({
        url: "/pages/home/room/index?params=" + JSON.stringify(item),
      });
    },
    // 选择关注人员
    handleSelectPerson (item) {
      this.selectPersonId = item.id;
      switch (item.id) {
        case "0":
          // 重大疾病人员详情
          uni.navigateTo({
            url: "/pages/home/disease/index?params=" + JSON.stringify(item),
          });
          break;
        case "1":
          // 重点关注人员详情
          uni.navigateTo({
            url: "/pages/home/focus/index?params=" + JSON.stringify(item),
          });
          break;
      }
    },
    // 选择监室动态
    handleSelectDynamic (item) {
      this.selectLabel = item.title;
      let key = "";
      switch (item.title) {
        case "律师会见":
          key = "lawyer";
          break;
        case "提讯":
          key = "arraign";
          break;
        case "家属会见":
          key = "family";
          break;
        case "所外就医":
          key = "outside";
          break;
        case "所内就医":
          key = "inside";
          break;
        case "监室调整":
          key = "adjust";
          break;
      }
      uni.navigateTo({
        url: `/pages/home/${key}/index?params=` + JSON.stringify(item),
      });
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
