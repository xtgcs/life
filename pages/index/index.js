var config = require('../../utils/config');
var utils = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/image/map.png',
      position: {
        left: 5,
        top: 430 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    latitude:0,
    longitude:0,
    activity:{},
    activitys:[],
    show:false,
    address:'',
    height:85,
    list:false
  },
  onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: '7VHBZ-DM5RG-36RQV-IYADG-IIWDV-PDBUT'
        });
    },
     search: function (e) {
      var that  = this;
        // 调用接口
         qqmapsdk = new QQMapWX({
            key: '7VHBZ-DM5RG-36RQV-IYADG-IIWDV-PDBUT'
        });
        qqmapsdk.getSuggestion({
            keyword: e.detail.value,
            success: function (res) {
                          console.log(res);

              that.setData({
                address:res.data,
                height:440+'rpx',
                list:true
              });
           
            },
            fail: function (res) {
                console.log(res);
            },
          complete: function (res) {
            console.log(res);
        }
    })
     },
   onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  regionchange(e) {
    console.log(e.type)
  },
  //点击地图隐藏弹框
  hide:function(){
      var that = this;
      that.setData({
        show:false,
        state:false,
        height:85+'rpx'
      })
  },
// 点击查看简介
  markertap(e) {
    var that = this;  
     var lists = that.data.activitys;
      var activity = {};
                for(var i=0;i<lists.length;i++){
                   var id = lists[i].id;
                   if(id==e.markerId){
                      activity = lists[i];
                      //  activity.address = lists[i].address;
                      //  activity.cover = lists[i].cover;
                      //  activity.dt = lists[i].dt;
                   }
                }
        that.setData({ 
          activity:activity,
          height:580+'rpx',
          show:true
          });       
  },
  // 重新定位
  controltap(e) {
       var that = this;
       that.getLocation();
       that.moveToLocation();
         },
   //  获取位置
  getLocation:function(){
      var that = this;
      wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              that.setData({ 
                latitude:res.latitude,
                longitude:res.longitude
              });
            },
            
          })
        },
  onLoad: function(options) {
    var that = this;
     that.fetchData();
     that.getLocation();
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
              var lists = res.data;
                for(var i=0;i<lists.length;i++){
                   var location = lists[i].geo.coordinates;
                   var id = lists[i].id;
                   var name = lists[i].name;
                    var locations={
                    iconPath: "/image/map-marker-icon.png",
                    id: id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    width: 30,
                    height: 30,
                    // title:name
                  };
                  var time = that.getActivityDate(lists[i]);
                   lists[i].time=time;
                 that.data.markers.push(locations);
                }
                 that.setData({
                    markers:that.data.markers,
                    activitys:lists
                   });
            },
            function(res){
               console.log("失败信息"+res);
            })
    },
  //   getActivityDate:function (activity) {
  //   return utils.DateFormatter.formatActivityDate(activity.st) + ' - ' + utils.DateFormatter.formatActivityDate(activity.et);
  //  },
      getActivityDate:function(activity){
          var that = this;
           return utils.DateFormatter.formatLiveDate(activity.st) ;
  },
  // 搜索地址定位
  location:function(e){
    var that = this;
    that.setData({
     latitude:e.currentTarget.dataset.address.lat,
     longitude:e.currentTarget.dataset.address.lng,
     list:false,
     height:85+'rpx'
    })
    //  wx.openLocation({
    //   latitude: e.currentTarget.dataset.address.lat,
    //   longitude: e.currentTarget.dataset.address.lng,
    //   scale: 28
    // })
  }
})