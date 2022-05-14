<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item,index) in commentInfo.images"
          :key="index+100"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatDate } from 'common/date';
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate: value => {
      let date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    .header-title {
      float: left;
      font-size: 15px;
    }
    .header-more {
      float: right;
      margin-right: 10px;
      font-size: 13px;
    }
  }
  .info-user {
    img {
      display: inline-block;
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      vertical-align: top;
      padding-top: 15px;
      padding-left: 5px;
    }
  }
  .info-detail {
    font-size: 14px;
    color: var(--color-text);
    line-height: 20px;
    p {
      margin: 10px 0;
    }
    .info-other {
      font-size: 12px;
      color: rgb(165, 159, 159);
      .date {
        padding-right: 10px;
      }
    }
  }
}
</style>
