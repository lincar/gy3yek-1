// pages/ask/ask.js
const settings = require('../../settings.js');
const tools = require('../../tools.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChapter: false,
    ifRegister: true,
    chooseChapter:'请选择分类',
    photos: [],
    classifyId:'',
    title:'',
    body:'',
    chapterList: [
      {
        province: '第一章',
        proCode: 440000,
        cities: [
          {
            city: '第一节',
            cityCode: 440100
          },
          {
            city: '第二节',
            cityCode: 440200
          },
          {
            city: '第三节',
            cityCode: 440200
          }
        ]
      },
      {
        province: '第二章',
        proCode: 440000,
        cities: [
          {
            city: '第一节',
            cityCode: 440100
          }
        ]
      }
    ],
    chapter: [
      {
        name: '全部',
        list: [],
        open: true,
      },
      {
        name: '按章节显示',
        list: [
        ],
        open: true
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassifyList();
  },
  getClassifyList:function(e){
    var that = this;
    app.apiFunctions.getClassifyList(
      app.api.classify,
      'GET',
      true,
      false,
      '',
      function (data) {
        that.setData({
          chapterList:data.data
        })
      }
    );

  },
  subClassify: function (e) {
    var _self = this;
    var classifyId = e.currentTarget.id;
    var name = e.currentTarget.dataset.name;
    _self.getGoodsList(app.shopId, classifyId)
    _self.onChangeShowState();
    this.setData({
      breadCrumb: name
    });
  },
  subChapter: function (e) {
    let that = this;
    let showChapter = that.data.showChapter;
    let index = e.currentTarget.dataset.index;
    let flagName = e.currentTarget.dataset.name;
    let chapterType = e.currentTarget.dataset.type;
    let classifyId = e.currentTarget.dataset.classifyid;
    let chooseChapter = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name);
    let superIndex = +index.split('-')[0];
    let subIndex = +index.split('-')[1];
    let item = null;

    switch (chapterType) {
      case 'classify':
        break;
      case 'area':
        item = that.data.chapterList[superIndex].subClassifies[subIndex];
        let superItem = that.data.chapterList[superIndex];
        break;
    }

    this.setData({
      breadCrumb: flagName,
      showChapter: false,
      classifyId: classifyId,
      chooseChapter: chooseChapter
    });
  },
  onChangeShowState: function () {
    console.log('onChangeShowState');
    let that = this;
    that.setData({
      showChapter: (!that.data.showChapter),
    })
  },
  kindToggle: function (e) {
    console.log('kindToggle')
    let that = this;
    let showChapter = that.data.showChapter;
    let index = e.currentTarget.dataset.index;
    let chapterType = e.currentTarget.dataset.type;
    let item = null;
    let list = [];
    let breadCrumb = '';
    switch (chapterType) {
      case 'chapter':
        item = that.data.chapter[index];
        list = that.data.chapter[index].list;
        !list.length && (breadCrumb = item.name);
        break;
      case 'area':
        item = that.data.chapterList[index];
        list = that.data.chapterList[index].subClassifies;
        !list.length && (breadCrumb = `按章节显示 | ${item.subClassifies}`);
        break;
    }

    item.open = (!!list.length) && (!item.open);
    !list.length && (showChapter = false);

    that.setData({
      chapter: that.data.chapter,
      chapterList: that.data.chapterList,
      showChapter: showChapter,
      breadCrumb: breadCrumb
    });
  },
  titleInput:function(e){
     var title = e.detail.value
     this.setData({
       title: title
     })
  },
  bodyInput:function(e){
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
    if (this.data.classifyId == '') {
      wx.showToast({
        title: '请选择分类',
      })
      return false;
    }
    if (this.data.title == '') {
      wx.showToast({
        title: '请输入标题',
      })
      return false;
    } 
    if (this.data.body == '') {
      wx.showToast({
        title: '请输入详细描述',
      })
      return false;
    } 
    return true;

  },
  submitQuestion:function(callback){
    var that = this;
    var flag = this.inputValidate();
    var classify = {};
    classify = {
      "id": that.data.classifyId
    }
    console.log(classify)
    console.log(that.data.photos);
    if (flag){
      var data = {
        "title": that.data.title,
        "content": that.data.body,
        "classify": classify,
        "imgs": that.data.photos
      }
      app.apiFunctions.submitQuestion(
        app.api.submitQuestion,
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
  onNextTap:function(e){  
    var that = this;
    this.submitQuestion(
      function(data){
        console.log(data)
        if(data.status == '1'){
          wx.navigateTo({
            url: '../choose/choose?questionId=' + data.data.id,
          })
        }else{
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