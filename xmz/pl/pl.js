// pages/pl/pl.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pl:''
  },
  input: function (e) {
    // console.log(e);
    this.setData({ pl: e.detail.value });
  },
  update(){
    let that=this;
    console.log(this.data.pl)
    var uid = wx.getStorageSync('uid')
    var list_id = this.data.list_id
    console.log(list_id);



    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: ["JPIWaQ7UgrC9Rii-S6We9JqCHBbg3Pvgf_udECcFk5s"],
        success: (res) => {
          if (res['JPIWaQ7UgrC9Rii-S6We9JqCHBbg3Pvgf_udECcFk5s'] === 'accept') {
            wx.request({
              url: globalData.apiUrl + 'user/leave?',
              method: 'post',
              data: {
                pid: list_id,
                content: this.data.pl,
                uid: uid
              },
              success: res => {
                console.log(res.data.info)
                wx.showToast({
                  title: res.data.info,
                  icon: 'none',
                  duration: 2000,
                  success: function () {
                    wx.request({
                      url: globalData.apiUrl + 'user/leave?',
                      method: 'get',
                      data: {
                        pid: that.data.list_id
                      },
                      success: res => {
                        console.log(res.data.info)
                        that.setData({
                          list: res.data.info
                        });
                      }
                    })
                  }
                })
              }
            })
          }
        },
        fail(err) {
          //失败
          console.error(err);
          reject()
        }
      })
    })



  },
  watch(){
      console.log(this.data.list_id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list_id:options.id
    });

    var list_id = options.id
    wx.request({
      url: globalData.apiUrl +'user/leave?',
      method: 'get',
      data: {
        pid: list_id
      },
      success: res => {
        console.log(res.data.info)
        this.setData({
          list: res.data.info
        });
      }
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