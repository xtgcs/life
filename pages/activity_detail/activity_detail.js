// pages/activity/activity_detail.js
var config = require('../../utils/config');
var utils = require('../../utils/util.js');
Page({
  data:{
    activity:[],
    title:'',
    path:''
  },
  onLoad:function(options){
    var that=this;
    that.fetchData(options.id);
  },
   fetchData: function (id) {//获取列表信息
        var that = this;
        utils.showLoading();
        var option = {
            url: config.Api.activity+"/"+id 
        };

        //发送数据请求
        utils.request(option,
            function (res) {
               var list = res.data;
               console.log(list);
               var time = that.getActivityDate(list);
               list.time = time;
                that.setData({ 
                    activity:list,
                    title:list.name,
                    path:list.shareUrl
                    });
                utils.hideLoading();
            })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getActivityDate:function (activity) {
    return utils.DateFormatter.formatActivityDate(activity.st) + ' - ' + utils.DateFormatter.formatActivityDate(activity.et);
   },
  //  分享
   onShareAppMessage: function() {
      
    // 用户点击右上角分享
    return {
      title: this.data.title, // 分享标题
      desc: this.data.title, // 分享描述
      path: 'this.data.path' // 分享路径
    }
  },
openLocation:function(e){
  console.log(e);
    wx.openLocation({
        latitude:e.currentTarget.dataset.address.latitude,
        longitude:e.currentTarget.dataset.address.longitude,
          scale: 28
        })
    }
})