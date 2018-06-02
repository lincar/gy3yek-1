// pages/register/register.js
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCode: false,
    tips: '验证码',
    sumTime: 0,
    times: 0,
    maxTimes: 5,
    access: '',  
    phone:''  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log('onload')
  },

  phoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
  },
  accessInput: function (e) {
    var access = e.detail.value;
    this.setData({
      access: access
    })
  },
  isValid() {
    return /\d{11}/.test(this.data.phone);
  },
  Countdown() {
    const that = this;
    let tips = '';
    that.data.sumTime && (tips = `${that.data.sumTime}s`);
    !that.data.sumTime && (tips = '验证码');
    that.setData({ tips: tips });
    if (that.data.sumTime) {
      setTimeout(function () {
        that.data.sumTime--;
        that.Countdown();
      }, 1000);
    } else {
      that.setData({
        getCode: false
      })
    }

  },
  getSmsCode: function (e) {
    var that = this;
    if (!that.data.sumTime && that.isValid()) {
      that.setData({
        getCode: true
      })
      let maxTimes = that.data.maxTimes;
      that.data.times++;
      let times = that.data.times;
      that.data.sumTime = 60 * (times <= maxTimes ? times : times * times);
      that.Countdown();
      var data = {
        "phone": that.data.phone,
        "type": 2
      }
      app.apiFunctions.getSmsCode(
        app.api.smsCode,
        'POST',
        true,
        true,
        data,
        function (data) {
          console.log(data);
          wx.showToast({
            title: '已发送',
          })
        }
      );
    }

  },

  onLoginTap:function(e){
    var that = this;
    var data = {
      "phone": that.data.phone,
      "code": that.data.access
    }
    app.apiFunctions.login(
      app.api.login,
      'POST',
      true,
      true,
      data,
      function (data) {
        console.log(data);
        if(data.status == 0){
          wx.showToast({
            title: data.msg,
          })
        }
        if (data.status == 1){
          app.globalData.customerInfo = data.data
          tools.todoEvent.trigger('customerInfo');
          wx.redirectTo({
            url: '../homepage/homepage',
          })
        }
      }
    );
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})