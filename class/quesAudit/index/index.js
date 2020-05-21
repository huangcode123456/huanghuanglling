// pages/class/quesAudit/index/index.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit:false,
    today:'',
    gradeName:'',
    className:'',
    classId:'',
    beApproveCount: '',
    curWriteCount: '',
    noPassCount: '',
    noWriteCount: '',
    studentCount: '',
    submitCount: '',
    successCount: '',

    todayIsSubmit:0, //班主任今日是否提交 0未提交 1已提交
    queryupStudentCount:0,
    queryupnum:0,
    querynotupnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存获取班级班级信息
    this.setData({
      gradeName: wx.getStorageSync('userInfo').gradeName,
      className: wx.getStorageSync('userInfo').className,
      classId: wx.getStorageSync('userInfo').classId,
    })
    var t = new Date();
    this.setData({
      today: t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日'
    });
  },

  // 获取本班学生问卷统计
  getList(){
    var that =this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      method: 'POST',
      url: cgi.getQuestionaryWithClassId,
      data: {
        class_id:that.data.classId,
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res,"eee")
        if(res.data.code==200){
         
          that.setData({
            beApproveCount: res.data.data.beApproveCount, //待审核名单
            noPassCount: res.data.data.noPassCount, //已驳回名单
            noWriteCount: res.data.data.noWriteCount, //未填报名单
            successCount: res.data.data.successCount, //已通过名单
            
            studentCount: res.data.data.studentCount, //本班学生总数
            curWriteCount: res.data.data.curWriteCount, //学生问卷填报总数
            submitCount: res.data.data.submitCount, //已提交问卷数量
          })
         
        }else{
          wx.showToast({
            icon:'none',
            title: res.data.message,
          })
        }
        wx.hideLoading();
      }
    })
  },


  // 查询今日是否提交给学校管理员 
  getQueryCopyIsSubmitRes(){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      method: 'POST',
      url: cgi.getQueryCopyIsSubmitRes,
      data: {
        class_id: that.data.classId,
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.issubmit=='1'){
            that.getQueryStudentNumRes();
          }
          that.setData({
            todayIsSubmit: res.data.data.issubmit
          })
          console.log(that.data.todayIsSubmit)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
        wx.hideLoading();
      }
    })
  },


  // 提交给学校管理员弹窗确认 
  submission(){
    var that = this;
    var notWriteNum = that.data.studentCount - that.data.curWriteCount; //未填报问卷人数
    wx.showModal({
      title: '提示',
      content: notWriteNum > 0 ? '今天还有' + notWriteNum + '名学生未更新问卷，是否确认他们今日问卷无变化？' : '确认是否提交今日学生问卷信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('确认提交');
          that.submitToSchoolAdmin();
        }
      },
    })
  },

  //  提交事件
  submitToSchoolAdmin(){
    var that = this;
    that.setData({
      isSubmit: true
    });
    wx.request({
      method: 'POST',
      url: cgi.submitToSchoolAdmin,
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res);
          wx.showToast({
            title: '提交成功！',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                // that.getQueryCopyIsSubmitRes(); 
              }, 2001);
            }
          })
          that.setData({
            isSubmit: false,
            todayIsSubmit: '1'
          })
        } else {
          that.setData({
            isSubmit: false
          });
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      }
    })
  },

  // 查询已生成问卷数量和待生成的数量 
  getQueryStudentNumRes() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      method: 'POST',
      url: cgi.getQueryStudentNumRes,
      data: {
        class_id: that.data.classId,
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
            that.setData({
              queryupStudentCount: res.data.data.queryupnum + res.data.data.querynotupnum,
              queryupnum: res.data.data.queryupnum,
              querynotupnum: res.data.data.querynotupnum,
              
            })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
        wx.hideLoading();
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
    this.getList();
    this.getQueryCopyIsSubmitRes();
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