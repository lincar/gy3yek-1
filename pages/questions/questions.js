// pages/questions/questions.js
let app = getApp();
const tools = require('../../tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag:'0',  // 0  新消息   1 我的提问
    questionId:'2',
    noAnswer:[],
    discStatus: [
      {
        id: 0,
        name: '新消息'
      },
      {
        id: 1,
        name: '我的提问'
      },

    ],
    status: '',
    questionList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var role = options.role;  //0  学生   1 老师
    this.setData({
      status: type,
      role: role
    })
    this.checkRole(role);
    this.getData(role);
    // this.getInvitedMe();
  },
  checkRole:function(data){
    if(data == 0){
      this.setData({
        discStatus: [
          {
            id: 0,
            name: '新消息'
          },
          {
            id: 1,
            name: '我的提问'
          },

        ]
      })
    }
    if (data == 1){
      this.setData({
        discStatus: [
          {
            id: 0,
            name: '尚未回答'
          },
          {
            id: 1,
            name: '邀我回答'
          },

        ]
      })     
    }
  },
  onTypeTap: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      status: status
    })
    if (status == '新消息'){
      this.getNewReply();
      this.setData({
        showFlag: '0'
      })
    }
    if (status == '我的提问'){
      this.getMyQuestion();
      this.setData({
        showFlag: '1'
      })
    }
    if (status == '邀我回答') {
      this.getInvitedMe();
      this.setData({
        showFlag: '2'
      })
    }
    if (status == '尚未回答') {
      // this.getInvitedMe();
      this.getToReply();
      this.setData({
        showFlag: '3'
      })
    }
  },
  getData:function(data){
    if ( data=='0' && this.data.status == '我的提问'){
      this.getMyQuestion();
      this.setData({
        showFlag:'1'
      })
    }
    if (data == '0' && this.data.status == '新消息'){
      this.getNewReply();
      this.setData({
        showFlag: '0'
      })
    }
    if (data == '1' && this.data.status == '邀我回答') {
      this.getInvitedMe();
      this.setData({
        showFlag: '2'
      })
    }
    if (data == '1' && this.data.status == '尚未回答') {
      this.getToReply();
      this.setData({
        showFlag: '3'
      })
    }
  },
  getMyQuestion: function (e) {
    var that = this;
    app.apiFunctions.detailQuestion(
      app.api.detail,
      'get',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        // that.setData({
        //   questionList:data.data
        // })
        that.processQuestionData(data.data);
      }
    );
  },
  getNewReply:function(e){
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
  getInvitedMe: function (e) {
    var that = this;
    app.apiFunctions.getInvitedMe(
      app.api.invitedMe,
      'get',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        that.setData({
          inviteMe:data.data
        })
        that.processInviteMeData(data.data);
      }
    );
  },
  processInviteMeData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].updatedAt = app.util.formatTime(new Date(data[idx].updatedAt));
    }
    this.setData({
      inviteMe: data,
    })
  },
  processQuestionData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].updatedAt = app.util.formatTime(new Date(data[idx].updatedAt));
    }
    this.setData({
      questionList: data,
    })
  },
  processNewReplyData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].reply.updatedAt = app.util.formatTime(new Date(data[idx].reply.updatedAt));
      data[idx].reply.content = data[idx].reply.content.substr(0, 20)
    }
    this.setData({
      newReply: data  
    })
  },
  getToReply: function (data) {
    console.log('getToReply');
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
          newCount: data.data.length
        })
        that.processToReplyData(data.data);
      }
    );
  },
  processToReplyData: function (data) {
    var temp = {};
    var question = [];
    for (var idx in data) {
      data[idx].updatedAt = app.util.formatTime(new Date(data[idx].updatedAt));
      data[idx].title = data[idx].title.substr(0, 20)
    }
    this.setData({
      toReply: data
    })
  },
  // checkDetailTap:function(e){
  //   wx.navigateTo({
  //     url: '../detail/detail?questionId=' + this.data.questionId
  //   })
  // },
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