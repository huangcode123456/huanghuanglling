// pages/class/students/invite/invite.js
const cgi=require('../../../../constant/cgi.js')
Page({
  data: {
    title: "邀请学生/家长",
    text: "点击下方按钮分享给微信好友",
    orgName:'',
    userInfo:'',
    token:''
  },
  //获取学校名称
  getOrgById(){
    let that=this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        console.log(res)
        wx.request({
          method: 'post',
          url: cgi.gradeSet.getOrg,
          data: {
            orgid:wx.getStorageSync('userInfo').orgid
          },
          header: {
            'content-type': 'application/json', // 默认值
            'token':res.data
          },
          success(res) {
            console.log(res.data)
            that.setData({
              orgName: res.data.data.orgName
            })
          }
        })
      },
    })
  },
  //获取缓存userInfo
  getStorage(){
    let that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res)
        that.setData({
          userInfo:res.data
        })
      },
    })
  },
  onLoad: function (options) {
    console.log(options)
    let that=this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data
        })
      },
    })
    this.getOrgById();
    this.getStorage()
  },
  // 分享设置相关
  onShareAppMessage: function () {
    return {
      title: '邀请你加入' + this.data.orgName + this.data.userInfo.gradeName+this.data.userInfo.className,
      path: '/pages/student/student-register/landing/landing?orgName=' + this.data.orgName + '&classId=' + this.data.userInfo.classId + '&deptId=' + this.data.userInfo.deptId + '&gradeId=' + this.data.userInfo.gradeId + '&token=' + this.data.token + '&orgid=' + this.data.userInfo.orgid + '&userName=' + this.data.userInfo.userName + '&className=' + this.data.userInfo.className + '&gradeName=' + this.data.userInfo.gradeName // 路径，传递参数到指定页面。
    }

  }


})