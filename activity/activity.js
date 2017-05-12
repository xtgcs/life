// pages/activity/activity.js
var noMore = false;
var config = require('../../utils/config');
var utils = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    lists:[]
  },
  onLoad:function(options){
     var that = this;
     that.fetchData();
     
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
//   detail:function(id){
//       var that = this;
//     wx.navigateTo({
//     url: '../activity_detail/activity_detail?id=id'
//     }),
//     // wx.setNavigationBarTitle({
//     //    title: '活动详情'
//     // })
//   },
    onPullDownRefresh: function () { //下拉刷新
        this.setData({
            lists: [],
        });
        this.fetchData();
        setTimeout(function () {
            wx.stopPullDownRefresh();
        }, 1000);
    },
 
    onReachBottom: function () { // 上拉加载更多
        // Do something when page reach bottom.
        if(noMore)
        return;
        var lastObject = this.data.lists[this.data.lists.length-1];
        var SPEC = {until:lastObject.ct-1,count:20};
        var d = this.moreData(SPEC);
    },
        moreData: function (data) {//获取列表信息
        var that = this;
        utils.showLoading();
        var option = {
            url: config.Api.activity,
            data
        };
        //发送数据请求
        utils.request(option,
            function (res) {
                console.log(option);
                var lists = res.data;
                console.log(lists);
                if (res.data.length == 0) {
                    noMore = true;
                     return;
                      }

                for(var i=0;i<lists.length;i++){
                   var time = that.getActivityDate(lists[i]);
                   lists[i].time=time;
                }
                for(var i in lists){
                   that.data.lists.push(lists[i]);
                }
                  console.log("加载后"+lists);
                that.setData({ lists:that.data.lists
                   });
                utils.hideLoading();
            },
            function(res){
               console.log("失败信息"+res);
            })
    },

    fetchData: function () {//获取列表信息
        var that = this;
        utils.showLoading();
        var option = {
            url: config.Api.activity,
            data: {
                "count":20
            }
        };
        //发送数据请求
        utils.request(option,
            function (res) {
                  console.log(option);
                var lists = res.data;
                console.log(lists);
                for(var i=0;i<lists.length;i++){
                   var time = that.getActivityDate(lists[i]);
                   lists[i].time=time;
                }
                if (res.data.length == 0) { return; }
                that.setData({ lists:  that.data.lists.concat(lists)
                   });
                utils.hideLoading();
            },
            function(res){
               console.log("失败信息"+res);
            })
    }

})