// pages/class/students/list/list.js
var app = getApp();
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cls:'',
    //'CLS'||'RPT'
    leixing1: "CLS",
    leixing2:'',
    options:'',
    verifyTotal:0,
    pageNumber:1,
    pageSize:1000,
    list: [],
    noData: false, //没有数据
    noMore: false, //没有更多了
    checkItems: [
      { name: '显示共同填报人', value: 'showRPT' },
    ],
    checkValue: [],
  },

  // 邀请学生（家长）跳转
  goToInvite() {
    wx.navigateTo({
      url: '/pages/class/students/invite/invite',
    })
  },
  handleChange(e){
    console.log(e)
    let that=this;
    that.setData({
      checkValue: e.detail.value
    });
    if (e.currentTarget.id =="checkValue"){
      if(e.detail.value.length==1){
        console.log('进来了')
        that.setData({
          leixing2:'RPT'
        })
      }else{
        that.setData({
          leixing2: ''
        })
      }
    }
  },

  // 获取待审核名单总数
  getVerifyTotal() {
    var that = this;
    let user = wx.getStorageSync('userInfo');
    var erq = {
      orgid: user.orgid,
      class_id: user.classId,
      type: 6
    }
    // console.log(erq);

    wx.request({
      method: 'POST',
      url: cgi.teacher.getNoPassTeacher,
      data: erq,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        // console.log(res);
        if (res.code = 200) {
          that.setData({
            verifyTotal: res.data.data.teachernum
          })
          console.log(that.data.verifyTotal)

        } else {
          wx.showToast({
            icon: "none",
            title: res.message,
          })
        }
      }
    })

  },

  // 获取列表
  getList() {
    var that = this;
    var erq = {
      class_id: wx.getStorageSync('userInfo').classId,
      pageNumber:that.data.pageNumber,
      pageSize:that.data.pageSize,
    }
    console.log(erq);

    wx.request({
      method: 'POST',
      url: cgi.getStudentListByidType,
      data: erq,
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync('token')
      },
      success(res) {
        console.log(res.data.data.records)
        if (res.data.code == 200) {
          if (res.data.data.records && res.data.data.records.length > 0) {
            // console.log(res.data.data.records);
            let cls=[];
            for (let i = 0; i < res.data.data.records.length;i++){
              if (res.data.data.records[i].type=='CLS'){
                cls.push(1)
              }
            }
            that.setData({
              cls
            })
            var ls = that.data.list;
            var newls = ls.concat(res.data.data.records);
            var pageIndex = that.data.pageNumber+1
            that.setData({
              list: newls, // 新增数据到列表
              pageNumber: pageIndex
              
            })
            console.log(that.data.list)
            console.log(that.data.pageNumber)

            //没有返回一整页说明没有下一页
            if (res.data.data.records.length<that.data.pageSize){
              console.log('没有更多数据了...')
              that.setData({
                noMore: true
              })
            }
            
          } else{
             //第一页也没获取到数据
            if (that.data.pageNumber == 1) {
              that.setData({
                noData: true
              })
            } else { //之后隐藏加载更多按钮
              console.log('没有更多数据了...')
              that.setData({
                noMore: true
              })
            }

          } 
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.message,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      options
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
    this.setData({
      noData: false, 
      noMore: false ,
      list: [],
      pageNumber: 1,
    })
    this.getVerifyTotal();
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