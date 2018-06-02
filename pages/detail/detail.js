// pages/detail/detail.js
const settings = require('../../settings.js');
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ignore: true,
    showChapter:true,
    photos:[],
    showValue:'',
    add:'添加回答',
    body:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var questionId = options.questionId;
    var showValue = options.showValue;
    this.setData({
      questionId: questionId,
      showValue: showValue
    })
    this.detailQuestion();
    this.questionReaded(questionId);
  },
  questionReaded:function(data){
    var that = this;
    var data = {
      'questionId':data
    }
    app.apiFunctions.questionReaded(
      app.api.readed,
      'post',
      true,
      true,
      data,
      function (data) {
        console.log(data);
      }
    );
  },
  detailQuestion:function(e){
    var that = this;
    var url = `${app.api.detail}`+'/'+`${this.data.questionId}`
    app.apiFunctions.detailQuestion(
      url,
      'get',
      true,
      false,
      '',
      function (data) {
        console.log(data);
        // that.setData({
        //   details:data.data
        // })
        that.processQuestionData(data.data)
      }
    );
  },
  processQuestionData: function (data) {
    var temp = {};
    var detail = [];
    for (var idx in data.replies) {
      data.replies[idx].updatedAt = app.util.formatTime(new Date(data.replies[idx].updatedAt));  
  }
    this.setData({
      details: data
    })
  },
  /**
 * 预览图片
 * @method previewImage
 */
  previewQuestionImage: function (e) {
    console.log('previewQuestionImage');
    let index = e.currentTarget.dataset.index;
    let imgList = [];
    this.data.details.imgs.forEach(img => {
      imgList.push(img.url);
    });
    wx.previewImage({
      current: imgList[index],
      urls: imgList
    });
  },
  previewImage01: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let imgList = [];
    this.data.details.replies[index].imgs.forEach(img => {
      imgList.push(img.url);
    });
    wx.previewImage({
      current: imgList[index],
      urls: imgList
    });
  },
  previewImage02: function (e) {
    console.log('previewImage');
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let imgList = [];
    this.data.photos.forEach(img => {
      imgList.push(img.url);
    });
    wx.previewImage({
      current: imgList[index],
      urls: imgList
    });
  },
  addQuestion:function(e){
      
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
    let add = e.currentTarget.dataset.add;
    if(add=='提交回答'){
      wx.showModal({
        title: '提示',
        content: '确认提交回答',
        success: function (res) {
          if (res.confirm) {
            that.replyAnswer(
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
          } else if (res.cancel) {
            that.setData({
              showChapter: true,
              add:'添加回答'
            })
          }
        }
      })

      
    }  
    if(add == '添加回答'){
      this.setData({
        showChapter: false,
        add:'提交回答'
      })
      wx.createSelectorQuery().select('#bottom').boundingClientRect(function (rect) {
        console.log(rect)
        wx.pageScrollTo({
          scrollTop: rect.bottom
        })
      }).exec()  
    } 
  },
  onIgnoreTap: function (e) {
    this.setData({ ignore: false })
  },
  hide: function () {
    this.setData({ ignore: true })
  },
  logoutConfirm: function (e) {
    var that = this;
    var data={
      "questionId": that.data.details.id,
    }
    app.apiFunctions.ignoreQuestion(
      app.api.ignore,
      'POST',
      true,
      true,
      data,
      function (data) {
        console.log(data);
        if (data.status == '1') {
          wx.redirectTo({
            url: '../homepage/homepage',
          })
        }
        // wx.showToast({
        // title: data.msg,
        // })
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