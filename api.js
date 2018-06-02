const server = require('./server.js');
const url = server.domain;
 
module.exports = { 
  ignore:'/api/wx/question/ignore',
  toReply: '/api/wx/question/toReply',
  invitedMe:'/api/wx/question/invitedMe',
  invateMeCount:'/api/wx/question/invitedMe/count',
  readed:'/api/wx/question/setReplyRead',
  newReply:'/api/wx/question/newReply',
  newReplyNum:'/api/wx/question/newReply/count',
  reply:'/api/wx/question/reply',
  count: '/api/wx/question/count',
  deinvite: '/api/wx/question/deinvite',
  teacherList: '/api/wx/custom',
  invite: '/api/wx/question/invite',
  classify: '/api/wx/question/classify',
  logout: '/api/wx/custom/logout',
  detail:'/api/wx/question',
  submitQuestion:'/api/wx/question',
  login: '/api/wx/custom/login',
  userMsg: '/api/wx/custom/current',
  wxlogin: url + '/api/wx/user/login',
  postUserInfo: '/api/wx/user/userInfo',
  register: '/api/wx/custom/register',
  smsCode: '/api/wx/custom/smsCode',
};
