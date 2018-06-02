// pages/register/register.js
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCode: false,
    name: '',
    number: '',
    phone: '',
    access: '',
    invitation: '',
    validateCode: '',
    tips: '验证码',
    sumTime: 0,
    times: 0,
    maxTimes: 5,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }, 

  nameInput: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  numberInput: function (e) {
    var number = e.detail.value;
    this.setData({
      number: number
    })
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
  invitationInput: function (e) {
    var invitation = e.detail.value;
    this.setData({
      invitation: invitation
    })
  },
  inputValidate: function (e) {
    if (this.data.name == '' || this.data.number == '' || this.data.phone == '' || this.data.access == '' || this.data.invitation == '') {
      wx.showToast({
        title: '信息不全',
      })
      return false;
    } else {
      return true;
    }

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
      // tools.requestByLogin(
      //   {
      //     url: app.api.smsCode,
      //     method: 'POST',
      //     header: {
      //       'content-type': 'application/x-www-form-urlencoded'
      //     },
      //     data: {
      //       "phone": that.data.phone,
      //       "type": 1
      //     }
      //   },
      //   function (data) {
      //     console.log(data);
      //     wx.showToast({
      //       title: '已发送',
      //     })
      //   }
      // );
      var data = {
            "phone": that.data.phone,
            "type": 1
     }
      app.apiFunctions.getSmsCode(
        app.api.smsCode,
        'POST',
        true,
        true,
        data,
        function(data){
          console.log(data);
           wx.showToast({
            title: data.msg,
          })
        }
        );
    }

  },
  onRegisterTap: function (e) {
    var that = this;
    var flag = this.inputValidate();
    if (flag) {
      tools.requestByLogin(
        {
          url: app.api.register,
          method: 'post',
          isRes:true,
          isFormData:true,
          data: {
            "name": that.data.name,
            "num": that.data.number,
            "phone": that.data.phone,
            "smsCode": that.data.access,
            "inviteCode": that.data.invitation
          }
        },
        function (res) {
          console.log(res);
          if (res.status==0)  {
             wx.showModal({
               title: '提示',
               content: res.msg,
               success: function (res) {
               }
             })
          } 
          if (res.status == 1){
            app.globalData.customerInfo = data.data
            tools.todoEvent.trigger('customerInfo');
            wx.navigateTo({
              url: '../homepage/homepage',
            })
          }
        },function (res) {
          console.log("Error: function getBannerList")
        }
      );
    }
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