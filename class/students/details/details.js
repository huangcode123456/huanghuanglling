// pages/school/admin/details/details.js
var app = getApp();
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    userid:'',
    userid1:'',
    info:{},
    readonly:1,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      index:options.index,
      readonly:options.readonly,
      userid: options.userid,
      userid1: options.userid,
      id: options.userid,
    })

    if (options.delType){
      this.setData({
        delType: options.delType
      })
      console.log(this.data.delType)
    }
    // console.log(app.globalData.uid + '%%%%%%%' + app.globalData.id)
    
    this.getInfo();
  },

  // 获取详情
  getInfo() {
    var that = this;
    var condition = {
      userid: that.data.userid
    }
    wx.request({
      method: 'POST',
      url: cgi.getTeacherMessgeById,
      data: condition,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        // console.log(res)
        if (res.code = 200) {
          that.setData({
            info:res.data.data
          })
          console.log(that.data.info)
        } else {
          wx.showToast({
            icon: "none",
            title: '查询失败，请重试！',
          })
        }
      }
    })
  },


  // 审核管理员 0-拒绝 ; 2-通过
  updateUserType(event) {
    var that = this;
    var type = event.currentTarget.dataset.type
    var req = {
      userid: that.data.id,
    }
    if (type == "agree") { //同意
      req.status = 2;
    } else if (type == "refuse") { //拒绝
      req.status = 0;
    }
    wx.showModal({
      title: '提示',
      content: type == "agree" ? '确定同意吗？' : '确定拒绝吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(req);

          wx.request({
            method: 'POST',
            url: cgi.adminSet.shadmin,
            data: req,
            header: {
              'content-type': 'application/json', // 默认值
              'token': wx.getStorageSync('token')
            },

            success(res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '操作成功',
                  success() {
                    // 返回上一页
                    wx.navigateBack({
                      delta: 1
                    })
                    // wx.navigateTo({
                    //   url: '/pages/school/admin/list/list',
                    // })
                  }
                })

              } else {
                wx.showToast({
                  title: res.message,
                  icon: "none"
                })
              }
            }
          })
        }
      },
    })
  },
  // 删除
  del() {
    var that = this;
    var req = {
      targetUserId: that.data.userid,
      operateType: that.data.delType
    }

    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(req);

          wx.request({
            method: 'POST',
            url: cgi.userOperate,
            data: req,
            header: {
              'content-type': 'application/json', // 默认值
              'token': wx.getStorageSync('token')
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '操作成功',
                  success() {
                    // 返回上一页
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })

              } else {
                wx.showToast({
                  title: res.message,
                  icon: "none"
                })
              }
            }
          })
        }
      },
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