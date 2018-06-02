let tools = require('tools.js');

const apiFunctions = {
  requestUrl(url, method, isRes, isFormData, data, callback,errcallback) {
    tools.requestByLogin(
      {
        url: url,
        method: method,
        isRes: isRes,
        isFormData: isFormData,
        data: data
      },  
      callback,
      errcallback
      
    );
  },
  getSmsCode(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url,
      method,
      isRes,
      isFormData,
      data,
      function (data) {
        callback(data)
      }
    );
  },
  register(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  login(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },

  getCurrentUserMsg(url, method, isRes, isFormData, data, callback,errcallback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
        callback,
        errcallback
    );
  },
  submitQuestion(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  detailQuestion(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  logout(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getClassifyList(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  inviteTeacher(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getTeacherList(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  deinviteTeacher(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getQuestionNum(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  replyAnswer(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  newReplyNumber(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getNewReply(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  questionReaded(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getInviteMecount(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getInvitedMe(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  getToReply(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
  ignoreQuestion(url, method, isRes, isFormData, data, callback) {
    var that = this;
    that.requestUrl(url, method, isRes, isFormData, data,
      function (data) {
        callback(data)
      }
    );
  },
}
module.exports = apiFunctions
