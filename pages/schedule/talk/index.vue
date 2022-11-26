<template>
  <div class="schedule-detail-container">
    <div class="schedule-detail-wrapper">
      <div class="schedule-detail-box">
        <div class="schedule-detail-form">
          <div class="content-item">
            <text>姓名：</text>
            <text>{{eventInfo.xm}}</text>
          </div>
          <div class="content-item">
            <text>监室号：</text>
            <text>{{eventInfo.roomName}}</text>
          </div>
          <div class="content-item">
            <text>出生年月：</text>
            <text>{{eventInfo.csrq}}</text>
          </div>
          <div class="content-item">
            <text>性别：</text>
            <text>{{eventInfo.sexCh}}</text>
          </div>
          <div class="content-item">
            <text>入所时间：</text>
            <text>{{eventInfo.rssj}}</text>
          </div>
          <div class="content-item">
            <text>涉嫌罪名：</text>
            <text>{{eventInfo.sxzmCh}}</text>
          </div>
          <div class="content-item">
            <text>风险等级：</text>
            <text class="item-mark">{{eventInfo.fxdjCh}}</text>
          </div>
          <div class="content-item">
            <text>谈话类型：</text>
            <text>{{eventInfo.title}}</text>
          </div>
          <div class="content-item">
            <text>状态：</text>
            <text class="item-mark">{{eventInfo.status}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/common/api.js";
import { setNavBarTitle, dateFormat } from "@/common/utils/util.js";

export default {
  name: "talk",
  data () {
    return {
      // 待办事项详情
      eventInfo: {}
    };
  },
  created () {
    // 获取待办事项详情
    this.getEventDetailInfo();
  },
  methods: {
    // 获取待办事项详情
    async getEventDetailInfo () {
      // 动态设置标题
      let info = setNavBarTitle();
      let res = await Api.apiCall("get", Api.index.getEventDetail + `?id=${info.id}&dataType=${info.dataType}`, null);
      if (res.state.code == "200") {
        this.eventInfo = res.data;
        if (Object.keys(this.eventInfo).length) {
          this.eventInfo.csrq = dateFormat("YYYY-MM-DD", new Date(this.eventInfo.csrq));
          this.eventInfo.rssj = dateFormat("YYYY-MM-DD", new Date(this.eventInfo.rssj));
          this.eventInfo.status = this.eventInfo.status == "1" ? "已处理" : "未处理";
        }
      }
    }
  },
}
</script>

<style lang="less">
@import '../../../common/less/index.less';
</style>
