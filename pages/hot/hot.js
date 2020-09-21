// pages/hot/hot.js
const API = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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

  // 获取列表
  getList() {
    let that = this;
    let url = API.URL.MOSICESORT ;
    console.log(url)
    let params = {
      page:that.data.page,
      count:30,
    }
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: url,
      data:params,
      success:(res)=>{
        let data = res.data;
        console.log(data.result)
        if(data.code==200){
          that.setData({dataList:that.data.dataList.concat(data.result)})
          wx.hideLoading()
          setTimeout(() => {
            wx.stopPullDownRefresh();
          }, 300);
        }
      },
      fail:(err)=>{
        console.log(err)
      }
    })
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