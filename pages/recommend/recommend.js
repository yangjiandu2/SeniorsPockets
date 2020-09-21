
const API = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    page:1,
    curIndex:1,
    id:127378,
    gradName:'标清',
    grade:'',
    hiddemDefin:false,
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
    let url = API.URL.GETVIDEOID + "?id="+ that.data.id;
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
  // 点击标清
  setDefinition(e){
    let indx = e.currentTarget.dataset.index;
    this.setData({
      hiddemDefin:true,
      curIndex:indx
    })
  },
  // 点击蒙层
  hidem(){
    this.setData({
      hiddemDefin:false,
    })
  },
  //视频切换暂停播放
  play(e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.dataList.length; i++) {
      if (id === 'myVideo' + i) {
        //console.log('播放视频不做处理');
      } else {
        //console.log('暂停其他正在播放的视频');
        var videoContext = wx.createVideoContext("myVideo"+i, that);
        videoContext.pause();
      }
    }
  },
  // 点击清晰度
  handleMass(e){
    let indx = e.currentTarget.dataset.index;
    let videoUrl = e.currentTarget.dataset.obj.url;
    let gradName = e.currentTarget.dataset.obj.name;
    console.log( e.currentTarget.dataset.obj)
    this.setData({
      grade:videoUrl,
      gradName:gradName
    })
    switch(indx+1){
        case 1:
          console.log('标清')
          break;
        case 2:
          console.log("高清")
          break
        case 3:
        console.log('高清')
        break;
    }
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
  onReachBottom: function() {
    wx.showLoading({
        title: '加载更多',
        make: true
    })
    var that = this;
    ++that.data.id;
    this. getList();

},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})