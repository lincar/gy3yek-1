const tools = require('tools.js');
const settings = require('settings.js');
const api = require('api.js');
const apiFunctions = require('apiFunctions.js');
const util = require('util.js');
App({
  userInfo: {},
    domain: settings.domain,
    fileRoot: settings.fileRoot,
    tools: tools,
    settings: settings,
    api:api,
    apiFunctions:apiFunctions,
    util:util,
    Login:'0',
    onLaunch: function () {
      
    },
    onShow() {
          const that = this;
      //     tools.login();
      //     tools.updateVersion();
      //     tools.updatePhone();
          tools.uploadUserInfo().then(userInfo => {
              that.userInfo = userInfo;
            //  console.log(that.userInfo);
        //       that.getUerInfo();
          });
      //     tools.todoEvent.listen('property', that.handlerProperty);
      //     that.getProperty();

          this.getCurrentUserMsg();
    }, 
    getUerInfo() {
      const that = this;
      tools.requestByLogin(
        {
          url: '/wx/user',
          method: 'get'
        },
        function (data) {
          that.userInfo = data;
          setTimeout(tools.todoEvent.trigger, 1000, 'userInfo');
        }
      );
    },
    getCurrentUserMsg: function (e) {
      var that = this;
      apiFunctions.getCurrentUserMsg(
        api.userMsg,
        'get',
        true,
        false,
        '',
        function (data) {
          that.globalData.customerInfo = data.data
          tools.todoEvent.trigger('customerInfo');
        },
        function (res) {
          console.log('result')
          console.log(res)
         if (that.Login == 0){
           wx.reLaunch({
             url: '/pages/login/login',
           })
           that.Login = 1;
         }         
        }
      );
    },
  globalData: {
    userInfo: null,
    customerInfo:null
  }
})