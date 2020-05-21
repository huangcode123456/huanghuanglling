// pages/school/teacher/verifyList/verifyList.js
var app = getApp()
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    list1: [],
    noData: ''
  },

  //获取头部学校信息
  getOrgById() {
    let that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res)
        that.setData({
          token: res.data
        })
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            console.log(res, "eee")
            that.setData({
              orgid: res.data.orgid
            })
            wx.request({
              method: 'POST',
              url: cgi.gradeSet.getOrg,
              data: {
                orgid: that.data.orgid
              },
              header: {
                'content-type': 'application/json', // 默认值
                'token': that.data.token
              },
              success(res) {
                console.log(res.data.data)
                that.setData({
                  school: res.data.data
                })
              }
            })
          },
        })
      },
    })


  },
  toCenter() {
    console.log('跳转')
    wx.navigateTo({
      url: '/pages/school/myCenter/index/index',
    })
  },


  // 初始化未通过列表
  info() {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data.classId,"userinfo");
        console.log(res.data.orgid, '****************orgid')
        console.log(that.data.token, '********************token')
        wx.request({
          method: 'POST', 
          url: cgi.teacher.getNoPassTeacher,  
          data: {
            orgid: res.data.orgid,//非正式orgid
            class_id: res.data.classId,
            type: '6'
          },
          header: {
            'Content-Type': 'application/json',
            'token': that.data.token
          },
          success: function (res) {
            console.log(res, "获取未通过学生列表")
            if (res.data.data.records !== null) {
              console.log(res.data.data.records)
              that.setData({
                list1: res.data.data.records,
                noData: true
              })
            } else {
              that.setData({
                noData: false
              })
            }
          }
        })
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrgById()
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
    this.info()
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



// // pages/school/teacher/verifyList/verifyList.js
// var app = getApp()
// const cgi = require('../../../../constant/cgi.js');
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     token: '',
//     list1:[],
//     noData:''
//   },
  
//   // 初始化未通过列表
//   info(){
//     var that = this
//     wx.getStorage({
//       key: 'token',
//       success: function(res) {
//         that.setData({
//           token:res.data
//         })
//       },
//     })
//     wx.getStorage({
//       key: 'userInfo',
//       success: function(res) {
//         console.log(res.data.orgid,'****************orgid')
//         console.log(that.data.token, '********************token')
//         // 获取学生列表
//         wx.request({
//           method: 'POST',
//           url: cgi.teacher.getNoPassTeacher,
//           data:{
//             orgid:res.data.orgid,//非正式orgid
//             type:'3'
//           },
//           header: {
//             'Content-Type': 'application/json',
//             'token': that.data.token 
//           },
//           success: function (res) {
//             console.log(res, "获取学生列表")
//             if (res.data.data.records!==null) {
//               console.log(res.data.data.records)
//               that.setData({
//                 list: res.data.data.records,
//                 noData: false
//               })
//             } else {
//               that.setData({
//                 noData: true
//               })
//             }     
//             that.setData({
//               list1:res.data.data.records
//             })
//           }
//         })
//       },
//     })
//   },


//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     this.info()
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })