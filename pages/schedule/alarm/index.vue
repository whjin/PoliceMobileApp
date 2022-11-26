<template>
  <div class="schedule-detail-container">
    <div class="schedule-detail-wrapper">
      <div class="schedule-detail-box">
        <div class="schedule-detail-form">
          <div class="content-item">
            <text>告警名称：</text>
            <text>{{ alarmInfo.alarmName }}</text>
          </div>
          <div class="content-item">
            <text>位置：</text>
            <text>{{ alarmInfo.alarmPlace }}</text>
          </div>
          <div class="content-item">
            <text>告警类型：</text>
            <text>{{ alarmInfo.title }}</text>
          </div>
          <div class="content-item">
            <text>告警时间：</text>
            <text>{{ alarmInfo.alarmTimes }}</text>
          </div>
          <div class="content-item">
            <text>告警等级：</text>
            <text class="item-mark">{{ alarmInfo.alarmLevel }}</text>
          </div>
          <div class="content-item">
            <text>处理状态：</text>
            <text class="item-mark">{{
              alarmInfo.status == "1" ? "已处理" : "未处理"
            }}</text>
          </div>
          <div class="content-item">
            <text>事件详情：</text>
            <text>{{ alarmInfo.eventDetail }}</text>
          </div>
        </div>
      </div>
      <div class="schedule-detail-box">
        <div class="schedule-detail-title">
          {{ alarmInfo.status == "1" ? "处置结果" : "处置措施" }}
        </div>
        <div class="schedule-detail-content" v-if="disposalList.length">
          <div class="schedule-detail-list" v-for="(item, index) in disposalList" :key="index">
            <div class="schedule-detail-item" :class="alarmInfo.status == '0' ? 'detail-item-mark' : ''">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import { setNavBarTitle } from "@/common/utils/util.js";

export default {
  name: "alarm",
  data () {
    return {
      // 事件详情信息
      alarmInfo: {},
    };
  },
  computed: {
    // 处置列表
    disposalList () {
      if (this.alarmInfo.status == "0") {
        return this.alarmInfo.czcss;
      } else if (this.alarmInfo.status == "1") {
        return this.alarmInfo.czjgs;
      } else {
        return [];
      }
    },
  },
  created () {
    // 获取报警事件详情
    this.getAlarmDetailInfo();
  },
  methods: {
    // 获取报警事件详情
    async getAlarmDetailInfo () {
      // 动态设置标题
      let info = setNavBarTitle();
      let res = await Api.apiCall(
        "get",
        Api.index.getEventDetail + `?id=${info.id}&dataType=${info.dataType}`,
        null
      );
      if (res.state.code == "200") {
        this.alarmInfo = res.data;
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
