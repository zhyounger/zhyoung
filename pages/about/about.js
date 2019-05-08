// pages/about/about.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    ID: '0',
    loadingHidden: false,
    replyHidden: true,
    messageHidden: true,
    tipHidden: true,
    scrollViewHeight: 0,
    nickName: '',
    email: '',
    messageContent: '',
    tip: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
    var height = app.globalData.screenHeight - 200;
    this.setData({
      scrollViewHeight: height
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
    this.setData({
      list: [],
      ID: '0',
      loadingHidden: false,
      replyHidden: true,
      messageHidden: true,
      tipHidden: true,
      nickName: '',
      email: '',
      messageContent: '',
      tip: ''
    });
    this.requestData();
    wx.stopPullDownRefresh();
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

  },

  requestData: function () {
    var that = this;
    wx.request({
      url: 'https://zhyoung.cn/api/get_post.php',
      data: {
        type: 'comment',
        ID: '122'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          list: res.data.data,
          loadingHidden: true
        })
      }
    })
  },

  replyInput: function (e) {
    this.setData({
      ID: e.target.id,
      replyHidden: false
    })
  },

  confirm: function (e) {
    var that = this;
    if (that.data.nickName.length == 0 || that.data.email == 0 || that.data.messageContent == 0) {
      that.setData({
        tip: '请填写完整的昵称、邮箱以及评论内容！',
        tipHidden: false,
        replyHidden: true
      })
    }
    else {
      // // 写数据库功能。。。
      that.writeToDb(that.data.ID, that.data.nickName, that.data.email, that.data.messageContent);
      that.onPullDownRefresh();
    }
  },

  cancel: function () {
    this.setData({
      replyHidden: true,
      messageHidden: true,
      nickName: '',
      email: '',
      messageContent: '',
    })
  },

  messageInput: function () {
    this.setData({
      messageHidden: false
    })
  },

  sendMessage: function (e) {
    if (this.data.nickName.length == 0 || this.data.email.length == 0 || this.data.messageContent.length == 0) {
      this.setData({
        tip: '请填写完整的昵称、邮箱以及留言内容！',
        tipHidden: false,
        messageHidden: true
      })
    }
    else {
      // 写数据库功能。。。
      this.writeToDb(this.data.ID, this.data.nickName, this.data.email, this.data.messageContent);
      this.onPullDownRefresh();
    }
  },

  setNickName: function(e) {
    this.data.nickName = e.detail.value;
  },

  setEmail: function (e) {
    this.data.email = e.detail.value;
  },

  setComment: function (e) {
    this.data.messageContent = e.detail.value;
  },

  back: function (e) {
    this.setData({
      tipHidden: true,
      nickName: '',
      email: '',
      messageContent: '',
      tip: ''
    })
  },

  writeToDb: function (comment_parent, author, email, content) {
    var date = util.formatTime(new Date());
    wx.request({
      url: 'https://zhyoung.cn/api/message.php',
      data: {
        ID: comment_parent,
        author: author,
        date: date,
        email: email,
        content: content,
        post_ID: '122'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
      }
    })
  }

})