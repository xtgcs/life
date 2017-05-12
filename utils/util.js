function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//【判断传入的对象是否是函数】
function isFunction(obj) {
  return typeof obj === 'function';
}


/**
 * 方法说明:网络请求模块
 * 
 */
function request(option, successCb, errorCb, completeCb) {
  wx.request({
    url: option.url,// 开发者服务器接口地址
    data: option.data ? option.data : {},//请求的参数
    method: option.method ? option.method : 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: option.header ? option.header : { 'content-type': 'application/json' }, // 设置请求的 header
    success: function (res) {//收到开发者服务成功返回的回调函数
      isFunction(successCb) && successCb(res);
    },
    error: function () {//接口调用失败的回调函数
      isFunction(errorCb) && errorCb();
    },
    complete: function () {//接口调用结束的回调函数（调用成功、失败都会执行）
      isFunction(completeCb) && completeCb();
    }
  });
}

// function DateFormatter(date){
 var service = {};

        function formatDate(d) {
            return (d.getMonth() + 1) + '月' + d.getDate() + '日';
        }

        function formatNumber(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return '' + n;
            }
        }

        service.formatActivityDate = function (ts) {
            var date = new Date(ts);
            return formatDate(date) + ' ' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes());
        };

        service.formatCommentDate = function (ts) {
            return formatDate(new Date(ts));
        };

        service.formatLiveDate = function (ts) {
            var date = new Date(ts);
            var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate()) + ' ' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ' ' + weekdays[date.getDay()];
        };

        // return service;
 
// }

       

/**
 * 显示消息提示框
 */
function showLoading() {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  });
}

/**
 * 隐藏消息提示框
 */
function hideLoading() {
  wx.hideToast();
}

// 关键词：下载、关注、星标匹配

function select(list){
  console.log(list);
  var text = list.resource
   var keywords1 = '下载松果';
   var keywords2 = '关注松果生活';
  for(var i in text){
    if(text[i].txt.indexOf(keywords2)>=0 || text[i].txt.indexOf(keywords1)>=0){
       text[i]='';
    }
  }
   console.log(text);

  return list;
}
module.exports = {
  DateFormatter:service,
  formatTime: formatTime,
  request: request,
  showLoading: showLoading,
  hideLoading: hideLoading,
  select:select
}
