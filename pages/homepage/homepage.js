// pages/homepage/homepage.js
let app = getApp();
const tools = require('../../tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag:'0',
    showValue:'新消息',
    role:'0',  // 0:学生  1:老师
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    count:'0',
    newCount:'0',
    logout:true,
    noAnswer:[],
    container: [
      {
        role: 0,
        name: '新消息'
      },
      {
        role: 0,
        name: '我的提问'
      },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCurrentUserMsg();
    // this.getInviteMecount();
  },
  onShow: function () {
    var that =this;
    app.tools.todoEvent.listen('customerInfo', that.handlerCustomerInfo);
  },
  handlerCustomerInfo() {
    var data = app.globalData.customerInfo
    this.checkRole(data);  
    this.getCount(data.role);
    this.setData({
      userMsg: data
    })
  },
  checkRole:function(data){
    console.log(data)
    if(data.role=='student'){
      this.setData({
        role:'0',
        showFlag: '0',
        showValue: '新消息',
        container: [
          {
            role: 0,
            name: '新消息'
          },
          {
            role: 0,
            name: '我的提问'
          },

        ]
      })
    }
    if (data.role == 'teacher'){
      this.setData({
        role: '1',
        showFlag: '1',
        showValue: '尚未回答',
        container: [
          {
            role: 1,
            name: '尚未回答'
          },
          {
            role: 1,
            name: '邀我回答'
          },

        ]
      })
    }
  },
 
  getCount:function(data){
     if(data == 'student'){
       this.getQuestionNum();    //获取学生新消息个数
       this.newReplyNumber();    //获取学生我的提问个数
       this.getNewReply();
     }
     if(data == 'teacher'){
       this.getInviteMecount();  //获取邀我回答个数
       this.getToReply();      //尚未回答问题
     }
  },
  getQuestionNum: function(e) {
    var that = this;
    app.apiFunctions.getQuestionNum(
      app.api.count,
      'get',
      true,
      false,
      '',
      function (data) {
        if (data.status == 1) {
          that.setData({
            count: data.data
          })
        } else {
          wx.showToast({
            title: data.msg,
          })
        }
      }
    );
  },
  newReplyNumber: function(e) {
    var that = this;
    app.apiFunctions.newReplyNumber(
      app.api.newReplyNum,
      'get',
      true,
      false,
      '',
      function (data) {
        if (data.status == 1) {
          that.setData({
            newCount: data.data
          })
        } else {
          wx.showToast({
            title: data.msg,
          })
        }
      }
    );
  },
  getInviteMecount: function (e) {
    var that = this;
    app.apiFunctions.getInviteMecount(
      app.api.invateMeCount,
      'get',
      true,
      false,
      '',
      function (data) {
        if (data.status == 1) {
          that.setData({
            count: data.data
          })
        } else {
          wx.showToast({
            title: data.msg,
          })
        }
      }
    );
  },
  onLogoutTap:function(e){
    this.setData({ logout: false })
  },
  logoutConfirm:function(e){
   app.apiFunctions.logout(
      app.api.logout,
      'POST',
      true,
      true,
      '',
      function (data) {
        console.log(data);
        if (data.status=='1'){
          wx.redirectTo({
            url: '../login/login',
          })
        }
        // wx.showToast({
          // title: data.msg,
        // })
      }
    );
  },
  getNewReply: function (e) {
    var that = this;
    app.apiFunctions.getNewReply(
      app.api.newReply,
      'get',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        // that.setData({
        //   newReply:data.data
        // })
        that.processNewReplyData(data.data);
      }
    );
  },
  getToReply:function(data){
    var that = this;
    app.apiFunctions.getToReply(
      app.api.toReply,
      'get',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        that.setData({
          newCount:data.data.length
        })
        that.processToReplyData(data.data);
      }
    );
  },
  processNewReplyData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].reply.updatedAt = app.util.formatTime(new Date(data[idx].reply.updatedAt));   
      if (data[idx].reply.content != null && data[idx].reply.content != '') {
        data[idx].reply.content = data[idx].reply.content.substr(0, 20)
      } else {
        data[idx].reply.content = '';
      }
    }
    this.setData({
      newReply: data
    })
  },
  processToReplyData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].updatedAt = app.util.formatTime(new Date(data[idx].updatedAt));
      if (data[idx].title != null && data[idx].title != ''){
        data[idx].title = data[idx].title.substr(0, 20)
      }else{
        data[idx].title = '';
      }
      
    }
    this.setData({
      toReply: data
    })
  },
  hide: function () {
    this.setData({ logout: true })
  },
  onHotlineTap:function(e){
    wx.makePhoneCall({
      phoneNumber: '18924193359' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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