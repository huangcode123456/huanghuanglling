// pages/class/teacher/add/add.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    noData:false,
    list:[],
    list1:[]
  },

  // 获取普通教师信息
  getTeacherMessgeById() {
    var th = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data.id)
        th.setData({
          userid: res.data.id
        })
        wx.request({
          method: 'POST',
          url: cgi.adminSet.getTeacher,
          data: {
            'pageNumber': 1,
            'pageSize': 10,
            'type': 'TCH'
          },
          header: {
            'Content-Type': 'application/json',
            'token': wx.getStorageSync("token")
          },
          success: function (res) {
            console.log(res, "res333")
            if (res.data.code == 200 && res.data.data.records.length>0){
              var list1 = [];
              for(var i=0;i<res.data.data.records.length;i++){
                let obj = res.data.data.records[i];
                if(obj.type=='THR'){
                  list1.push(obj);
                }
              }
              console.log(list1);
              if(list1.length==0){
                th.setData({
                  noData: true
                })
              }else{
                console.log("have")
                th.setData({
                  list1: list1,
                  noData: false
                })
              }
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

  },

  // 根据名字搜索本校普通老师列表
  searchSubmit(e) {
    console.log('value', e.detail);
    var userName = e.detail.replace(/\s/g, "") 
    if (userName==""){
      console.log('请输入名字')
      return false
    }
    var that = this;
    var req = {
      orgid: wx.getStorageSync('userInfo').orgid, //从缓存获取学校id
      user_name: userName
    }
    console.log(req)
    wx.request({
      method: 'POST',
      url: cgi.getTeacherBySchoolIdType,
      data: req,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },

      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.records && res.data.data.records.length>0){
            that.setData({
              list: res.data.data.records,
              noData:false
            })
          }else{
            that.setData({
              noData: true
            })
          }
          console.log(that.data.noData)
        } else {
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }
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
    // this.getTeacherMessgeById();
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