// pages/home/home.js
const util = require('../../utils/util');
const API = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    this.getList()
  },
  priveImg(img){
    // console.log(img.currentTarget)
    let path = img.currentTarget.dataset.path;
    wx.previewImage({
      urls: [path],
    })
  },
  // 获取列表
  getList() {
    let that = this;
    let url = API.URL.IMAGES;
    let params = {
      page:this.data.page,
      count:10,
    }
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: url,
      data:params,
      success:(res)=>{
        let data = res.data;
        console.log(data)
        if(data.code==200){
          that.setData({imgList:that.data.imgList.concat(data.result)})
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
   * 图片加载失败处理函数
   */
  imgOnerror(e) {
    var idx = e.currentTarget.dataset.idx;
    var _imgUrls = this.data.imgList;
    for (var i = 0; i < _imgUrls.length; i++) {
      if (i == idx) {
        _imgUrls[i] = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2247807739,3106479491&fm=26&gp=0.jpg'
      }
    }
    this.setData({
      imgList: _imgUrls
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
    console.log('执行下拉刷新')
    this.data.page = 1;
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(1);
    wx.showLoading({
        title: '加载更多',
        make: true
    })
    var that = this;
    that.data.page++
    this. getList();

},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})