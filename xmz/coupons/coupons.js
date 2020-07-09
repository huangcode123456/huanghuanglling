// pages/coupons/coupons.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[
      {
        price:'200',
        note:'购指定产品可抵扣',
        title:'西门子蒸烤一体机',
        date:'2020年12月21日',
        show:true
      },
      {
        price: '200',
        note: '购指定产品可抵扣',
        title: '西门子蒸烤一体机',
        date: '2020年12月21日',
        show: false
      }
    ],
    popupShow:false,
    list_id:'',
    cid: '',
    // 报名表单
    formData: {
      code: ''
    },
  },
  // 打开报名弹窗
  showPopup(e) {
    console.log(e)
    this.setData({ popupShow: true, list_id: e.currentTarget.dataset.id });
  },

  onClose() {
    this.setData({ popupShow: false });
  },
  // 输入框
  onChange(e) {
    // console.log(e);
    this.setData({
      [`formData.${e.currentTarget.dataset.id}`]: e.detail
    })
    console.log(this.data.formData.code)
  },

  // 核销
  signupSend(e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    if (that.data.formData.code == "") {
      wx.showToast({
        title: '请输入核销码',
        icon: 'none',
      })
      return false
    }
  
    var code = that.data.formData.code
    var uid = wx.getStorageSync('uid');
    var list_id = that.data.list_id;
    console.log(list_id)
    console.log(code)
    console.log('数据请求中...')
    wx.request({
      url: globalData.apiUrl + 'user/hexiao?',
      method: 'post',
      data: { code: code, uid: uid, list_id: list_id },
      success: res => {
        console.log(res.data.code);
        if(res.data.code ==1){
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/coupons/coupons',
                })
              }, 2000);
            }
          })
          this.setData({
            popupShow: false,
          });
        }else{
          console.log(1)
          wx.showToast({
            title: res.data.info,
            icon: 'none',
          })
          return;
        }
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid')
    wx.request({
      url: globalData.apiUrl+'index/getmycouponlist?',
      method: 'post',
      data:{uid:uid},
      success: res => {
        this.setData({
          datalist: res.data.data.resultlist,
        })
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