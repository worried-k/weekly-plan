require('./utils/zhuge-wx.min.js')
var config = {
  debug: false, //打开实时调试
  pv: false, //是否启用页面访问统计功能
};
App.zhuge.load('3912b02426444685a5d4a26136955bda', config);
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            // lang: 'zh_CN',
            success: res => {
              console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    App.zhuge.weixinIdentify()
    // App.zhuge.weixinIdentify('wx34915c16f1035038', function(data) {
    //   console.log('info:', data)
    // })
  },
  globalData: {
    userInfo: null
  }
})