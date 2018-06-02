// pages/addanswer/addanswer.js
const settings = require('../../settings.js');
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChapter: false,
    photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var questionId = options.questionId;
    this.setData({
      questionId: 3
    })
  },

  bodyInput: function (e) {
    var body = e.detail.value
    this.setData({
      body: body
    })
  },

  /**
* 选择本地图片上传图片
* @method chooseImage
*/
  chooseImage: function (e) {
    const that = this;
    let list = that.data.photos;
    let serverName = settings.domain;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let fileList = res.tempFilePaths;
        let photosLen = list.length;
        for (let i = 0; i < fileList.length; i++) {
          //最多6张图片
          if (photosLen + i < 3) {
            //开始上传图片
            setTimeout(function () {
              wx.uploadFile({
                url: `${settings.domain}/api/upload`,
                filePath: fileList[i],
                name: 'file',
                success: function (res) {
                  //上传成功
                  let response = JSON.parse(res.data);
                  console.log(response);
                  if (response.status === 1) {
                    list.push({ url: response.data });
                  }
                  that.setData({
                    photos: list
                  });
                }
              });
            }, 500 * i);
          } else {
            wx.showModal({
              title: '提示',
              content: '最多3张图片',
            });
            break;
          }
        }
      }
    });
  },
  /**
 * 删除某一步骤中的某一个图片
 * @method deleteImg
 */
  deleteImg(e) {
    let index = e.currentTarget.dataset.index;
    this.data.photos.splice(index, 1);
    this.setData({
      photos: this.data.photos
    });
  },

  previewImage: function (e) {
    let index = e.currentTarget.dataset.index;
    let imgList = [];
    this.data.photos.forEach(photo => {
      imgList.push(photo.url);
    });
    wx.previewImage({
      current: imgList[index],
      urls: imgList
    });
  },
  inputValidate: function (e) {
 
    if (this.data.body == '') {
      wx.showToast({
        title: '请输入回答',
      })
      return false;
    }
    return true;

  },
  replyAnswer: function (callback) {
    var that = this;
    var flag = this.inputValidate();
    console.log(that.data.photos);
    if (flag) {
      var url = `${app.api.reply}` + '?questionId=' + `${this.data.questionId}`
      var data = {
        "content": that.data.body,
        "imgs": that.data.photos
      }
      app.apiFunctions.replyAnswer(
        url,
        'POST',
        true,
        false,
        data,
        function (data) {
          console.log(data);
          callback(data)
        }
      );
    }
  },
  onNextTap: function (e) {
    var that = this;
    this.replyAnswer(
      function (data) {
        console.log(data)
        if (data.status == '1') {
          wx.redirectTo({
            url: '../homepage/homepage',
          })
        } else {
          wx.showToast({
            title: data.msg,
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