// pages/choose/choose.js
const settings = require('../../settings.js');
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'我的提问',
    role:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var questionId = options.questionId;
    this.setData({
      questionId: questionId
    })
    this.getTeacherList();
  },
  getTeacherList:function(e){
    var that = this;
    var data = {
      "role": 'teacher'
    }
    app.apiFunctions.getTeacherList(
      app.api.teacherList,
      'GET',
      true,
      false,
      data,
      function (data) {
        if (data.status==1){
          // that.setData({
          //   'teachList':data.data
          // })
          that.processTeacherData(data.data);
        }else{
          wx.showToast({
            title: data.msg,
          })
        }      
      }
    );
  },
  processTeacherData: function (data) {
    var temp = {};
    var teacher = [];
    for (var idx in data) {
      if (data[idx].introduction == null){
        data[idx].introduction='暂无简介'
      }else{
        data[idx].introduction = data[idx].introduction.substr(0, 15)
      }
    }
    this.setData({
      'teachList': data
    })
  },
  inviteTeacher: function (teacherId){
    var that = this;
    var data = {
      "questionId": that.data.questionId,
      "teacherId": teacherId
    }
    app.apiFunctions.inviteTeacher(
      app.api.invite,
      'POST',
      true,
      true,
      data,
      function (data) {
        if (data.status == 1) {

        } else {
          wx.showToast({
            title: data.msg,
          })
        }
      }
    );
  },
  deinviteTeacher: function (teacherId) {
    var that = this;
    var data = {
      "questionId": that.data.questionId,
      "teacherId": teacherId
    }
    app.apiFunctions.deinviteTeacher(
      app.api.deinvite,
      'POST',
      true,
      true,
      data,
      function (data) {
        if(data.status == 1){

        }else{
          wx.showToast({
            title: data.msg,
          })
        }
      }
    );
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    console.log(e.currentTarget.dataset.teacherid);
    var that = this;
    var teacherId = e.currentTarget.dataset.teacherid;
    if (e.detail.value){
      this.inviteTeacher(teacherId);
    }else{
      this.deinviteTeacher(teacherId);
    }
  },
  onCommitTap:function(e){
    wx.showModal({
      title: '提示',
      content: '确认提交问题',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../homepage/homepage',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  onCheckTap:function(e){
    wx.reLaunch({
      url: '../questions/questions?type=' + this.data.type + '&role=' + this.data.role,
    })
  },
  onAskContinue:function(e){
    wx.reLaunch({
     url: '../ask/ask',
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