// pages/teacheranswer/teacheranswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponFlag: '邀我回答',
    discStatus: [
      {
        id: 0,
        name: '邀我回答'
      },
      {
        id: 1,
        name: '所有提问'
      },

    ],
    status: '邀我回答'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onTypeTap: function (e) {
    var status = e.currentTarget.dataset.status;
    this.setData({
      status: status
    })
    console.log(status);
    if (status == '未使用') {
      this.setData({
        couponFlag: '使用'
      })
    } else if (status == '已使用') {
      this.setData({
        couponFlag: '已使用'
      })
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