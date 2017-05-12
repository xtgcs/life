var config = require('../../utils/config');
var utils = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
    latitude:0,
    longitude:0,
    address:''
  },
  onLoad: function (options) {
       var that = this;
       var item=JSON.parse(options.address);
       console.log(item);
       that.setData({
                address:item.data
              });
       console.log(options);
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
              that.setData({
                address:res.data
              });
            },
            fail: function (res) {
                console.log(res);
            },
        complete: function (res) {
            console.log(res);
        }
    });
     }
})