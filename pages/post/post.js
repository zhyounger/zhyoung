// pages/post/post.js
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    post_title: '',
    post_content: '',
    post_date: '',
    post_comment: '',
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("options:", options.id);
    this.setData({
      id: options.id
    });
    this.requestPostData(this.data.id); 
    var that = this;
    console.log("------------id is: \n", that.data.id);
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
      post_title: '',
      post_content: '',
      post_date: '',
      post_comment: '',
      loadingHidden: false
    });
    this.requestPostData(this.data.id);
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

  requestPostData: function (id) {
    var that = this;
    wx.request({
      url: 'https://zhyoung.cn/api/get_post.php',
      data: {
        type: 'post',
        ID: id
      },
      method: 'GET',
      success: function (res) {
        // console.log("\nthis is post response:\n", res.data);
        // console.log("\nthis is post title:", res.data.data[0].post_title);
        // console.log("\nthis is post content:", res.data.data[0].post_content);
        that.setData({
          post_title: res.data.data[0].post_title,
          post_date: res.data.data[0].post_date,
          post_content: res.data.data[0].post_content,
          loadingHidden: true
        })
        WxParse.wxParse('article', 'html', that.data.post_content, that, 5);
      }
    })
  }

})