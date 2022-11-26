<template>
  <div class="schedule-container">
    <div class="schedule-wrapper">
      <div class="schedule-box">
        <div class="schedule-list" v-for="(item, index) in scheduleList" :key="index">
          <div class="schedule-item" @click="scheduleTypeSearch(item)">
            <div class="item-left">
              <text>{{ item.count }}</text>
              <div>{{ item.desc }}</div>
            </div>
            <div class="item-right">
              <image src="../../../static/images/index/app_pending.png"></image>
            </div>
          </div>
        </div>
      </div>
      <div class="schedule-box">
        <div class="schedule-detail">
          <div class="detail-header">
            <div class="detail-nav" @click="toggleFilterForm">
              <text>筛选</text>
              <div class="detail-image">
                <image src="../../../static/images/index/arrow.png"></image>
              </div>
            </div>
            <div class="detail-form" v-if="filterState">
              <radio-group @change="eventTypeSearch">
                <label class="form-list" v-for="(item, index) in radioList" :key="index">
                  <radio :value="item.value" :checked="eventType == item.value"></radio>
                  <text>{{ item.name }}</text>
                </label>
              </radio-group>
            </div>
          </div>
          <div class="detail-content">
            <scroll-view class="detail-content-scroll" :class="filterState ? 'detail-form-scroll' : ''" scroll-y @scrolltolower="scrollToLower">
              <div class="detail-list" v-for="(item, index) in scheduleDetailList" :key="index">
                <div class="detail-item">
                  <div class="item-left">
                    <image :src="imgUrl + item.imgUrl"></image>
                  </div>
                  <div class="item-center">
                    <div class="item-head">
                      <text>{{ item.name }}</text>
                      <text>{{ item.place }}</text>
                    </div>
                    <div class="item-middle">{{ item.content }}</div>
                    <div class="item-footer">{{ item.message }}</div>
                  </div>
                  <div class="item-right">
                    <div class="item-date">{{ item.times }}</div>
                    <div class="item-button" @click="getScheduleDetail(item)">
                      <text>{{ item.dataTypeName }}</text>
                    </div>
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import config from "@/common/config";
import { dateFormat } from "@/common/utils/util.js";

export default {
  name: "schedule",
  data () {
    return {
      // 图片服务地址
      imgUrl: config.imgUrl,
      // 处理事项列表
      scheduleList: [],
      // 处理事项详情列表
      scheduleDetailList: [],
      // 待处理|已处理请求标识
      queryFlag: "0",
      eventType: "all",
      // 筛选列表
      radioList: [
        {
          value: "all",
          name: "全部",
        },
        {
          value: "1",
          name: "报警事项",
        },
        {
          value: "2",
          name: "待办事项",
        }
      ],
      // 筛选框状态
      filterState: false,
      // 页面索引
      pageIndex: 1,
      // 页面总数
      totalPage: 1,
    };
  },
  created () {
    // 获取统计信息
    this.getStatisticsInfo();
    // 获取待办列表信息
    this.getScheduleList(this.pageIndex);
  },
  methods: {
    // 获取待办|已处理统计信息
    async getStatisticsInfo () {
      let res = await Api.apiCall("get", Api.index.getStatistics, null);
      if (res.state.code == "200") {
        this.scheduleList = res.data;
      }
    },
    // 获取待办列表信息
    async getScheduleList (index) {
      let params = {
        pageIndex: index,
        pageSize: 10,
        queryFlag: this.queryFlag,
        type: this.eventType,
      };
      let res = await Api.apiCall("post", Api.index.getPendingInfo, params);
      if (res.state.code == "200") {
        this.totalPage = res.data.totalPages;
        let result = res.data.content;
        if (result.length) {
          result.map((item) => {
            item.times = dateFormat("YYYY-MM-DD hh:mm:ss", new Date(item.times));
          });
        }
        this.scheduleDetailList = [...this.scheduleDetailList, ...result];
      }
    },
    // 下拉刷新
    scrollToLower (e) {
      if (this.pageIndex < this.totalPage) {
        this.pageIndex++;
        this.getScheduleList(this.pageIndex);
      } else {
        uni.showToast({
          title: "暂无更多数据",
          position: "bottom",
          duration: 1500,
          icon: "none",
        });
      }
    },
    // 待处理|已处理事项查询
    scheduleTypeSearch (item) {
      this.queryFlag = item.queryFlag;
      this.pageIndex = 1;
      this.scheduleDetailList = [];
      this.getScheduleList(this.pageIndex);
    },
    // 筛选框显隐
    toggleFilterForm () {
      this.filterState = !this.filterState;
      if (this.filterState) {
        // 打开筛选列表，自动查询
        this.eventType = "all";
        this.pageIndex = 1;
        this.scheduleDetailList = [];
        this.getScheduleList(this.pageIndex);
      }
    },
    // 待办|报警事项筛选
    eventTypeSearch (e) {
      this.eventType = e.target.value;
      this.pageIndex = 1;
      this.scheduleDetailList = [];
      this.getScheduleList(this.pageIndex);
    },
    // 查看待办详情
    getScheduleDetail (item) {
      item.title = `${item.content}详情`;
      if (item.dataType == "6" || item.dataType == "7") {
        uni.navigateTo({
          url: "/pages/schedule/alarm/index?params=" + JSON.stringify(item)
        });
      } else {
        uni.navigateTo({
          url: "/pages/schedule/talk/index?params=" + JSON.stringify(item)
        });
      }
    },
  },
};
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
