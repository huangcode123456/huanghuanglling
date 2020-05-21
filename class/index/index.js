// pages/class/index/index.js
const cgi=require('../../../constant/cgi.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgName:'',
    userInfo:''
  },
  toCenter() {
    wx.navigateTo({
      url: '/pages/class/myCenter/index/index',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('openid'))
    let that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res.data)
        let details = ''
        if (res.data.type == 'MAS') {
          let a = res.data.gradeName == null ? '' : res.data.gradeName;
          let b = res.data.className == null ? '' : res.data.className
          details = a+b+'  班主任'
        } else if (res.data.type == 'DEY') {
          let a = res.data.gradeName == null ? '' : res.data.gradeName;
          let b = res.data.className == null ? '' : res.data.className
          details = a + b +'  副班主任'
        } else if (res.data.type == 'THR') {
          details =res.data.deptName == null ? '' : res.data.deptName;
        }
        that.setData({
          userInfo:res.data,
          orgName: res.data.orgName,
          details
        })
        
        // wx.getStorage({
        //   key: 'token',
        //   success: function (res) {
        //     console.log(res)
        //     wx.request({
        //       method: 'post',
        //       url: cgi.gradeSet.getOrg,
        //       data: {
        //         orgid: wx.getStorageSync('userInfo').orgid
        //       },
        //       header: {
        //         'content-type': 'application/json', // 默认值
        //         'token': res.data
        //       },
        //       success(res) {
        //         console.log(res.data)
        //         that.setData({
        //           orgName: res.data.data.orgName
        //         })
        //       }
        //     })
        //   },
        // })
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
  onShareAppMessage: function () {
    return {
      title: '教委数据统计',
      path: '/pages/index/index',
      imageUrl: this.showTrueConf ? '/images/share1.png' : '../../pages/import_img/share1.png'
    };
  }
});