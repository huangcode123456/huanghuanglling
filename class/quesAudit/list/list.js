// pages/class/quesAudit/list/list.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_id:'',
    status:'',
    statusTitle:'',
    list:[],
    noData:false,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 从页面跳转参数获取clss_id和状态
    // if (options.status == '0') {
    //   this.setData({
    //     statusTitle: '待审核名单',
    //   })
    // }
    if(options.status == '1') {
      this.setData({
        statusTitle: '未填报名单',
      })
    }
    if (options.status == '2') {
      this.setData({
        statusTitle: '已驳回名单',
      })
    } 
    if (options.status == '3') {
      this.setData({
        statusTitle: '已通过名单',
      })
    }
    this.setData({
      class_id: options.class_id,
      status: options.status,
       // 从缓存获取年级班级名称
      gradeName: wx.getStorageSync('userInfo').gradeName,
      className: wx.getStorageSync('userInfo').className
    })
    console.log(this.data.statusTitle)
    
  },

  // 获取列表
  getList() {
    var that = this;
    wx.request({
      method: 'POST',
      url: cgi.getTypeByClassId,
      data: {
        class_id: that.data.class_id,
        status: that.data.status,
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.length>0){
            that.setData({
              list: res.data.data
            })
          }else{
            that.setData({
              noData: true
            });
            wx.showToast({
              icon: 'none',
              title: '暂无' + that.data.statusTitle,
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2001);
              }
            })
          }
          console.log(that.data.list)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      }
    })
  },

  // 跳转至批量审核
  goToVerifyMore(){
    console.log('跳转至批量审核...');
    wx.navigateTo({
      url: '/pages/class/quesAudit/listVerify/listVerify?class_id=' + this.data.class_id,
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
    // 每次加载恢复初始值
    this.setData({
      list:[],
      noData:false
    })
    this.getList();
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