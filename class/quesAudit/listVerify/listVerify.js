// pages/class/quesAudit/listVerify/listVerify.js
const cgi = require('../../../../constant/cgi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'S',//
    checkAll:false,
    checkList: [],
    checkItems: [],
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class_id: options.class_id,
      gradeName: wx.getStorageSync('userInfo').gradeName,
      className: wx.getStorageSync('userInfo').className
    })
    console.log(this.data.class_id);
    
  },


  // 获取列表
  getList() {
    var that = this;
    wx.request({
      method: 'POST',
      url: cgi.getTypeByClassId,
      data: {
        class_id: that.data.class_id,
        status: 0, //待审核
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync("token") //从缓存获取token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            let list = res.data.data.map((item) => {
              item.id = item.id.toString(); //转为字符串
              item.checked = false
              return item
            })
            // console.log(list)
            that.setData({
              checkItems: list
            })
            
          } else {
            //待审核数数据为0，返回上一页
            that.setData({
              noData: true
            });
            wx.showToast({
              icon: 'none',
              title: '暂无待审核名单',
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
          console.log(that.data.checkItems)
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      }
    })
  },


  // 全选/全不选 操作
  selectAll(e) {
    if (!this.data.checkAll) {
      // 全选
      console.log('全选操作...')
      let selArr = this.data.checkItems.map((item) => {
        return item.id
      })
      let cItems = this.data.checkItems.map((item) => {
        item.checked = true
        return item
      })
      this.setData({
        checkList: selArr,
        checkItems: cItems
      })
    } else {
      // 全不选
      console.log('全不选操作...')
      let cItems = this.data.checkItems.map((item) => {
        item.checked = false
        return item
      })
      this.setData({
        checkList: [],
        checkItems: cItems
      })

    }
    this.setData({
      checkAll: !this.data.checkAll
    });
    console.log(this.data.checkList);
    console.log(this.data.checkItems);

  },

  // 多选操作
  checkChange(e) {
    var cid = e.detail.name;
    var clist = this.data.checkList;
    var citems =this.data.checkItems;
   
    if (clist.includes(cid)) { 
      //存在，删除
      clist.splice(clist.findIndex(item => item == cid), 1);
    } else {
       //不存在，添加
      clist.push(cid);
    }
    //原属数据checked状态改变
    citems = citems.map(item => {
      if (item.id == cid) {
        item.checked = !item.checked
      }
      return item
    })
    this.setData({
      checkList: clist,
      checkItems: citems
    })
    console.log(this.data.checkList);
    console.log(this.data.checkItems);

    // 如果列表被全选则自动选中全选按钮
    if (this.data.checkList.length == this.data.checkItems.length) {
      this.setData({
        checkAll: true
      })
    } else {
      this.setData({
        checkAll: false
      })
    }
  },


  // 批量审核 0-驳回 ; 2-通过
  verify(event) {
    var that = this;
    var type = event.currentTarget.dataset.type
    var req = {
      operateType: '',
      ids: that.data.checkList,
      approveInfo: type == 'agree' ? '班主任批量通过' : '班主任批量驳回',
    }

    //根据链接参数选择用户审核类型
    if (that.data.type == "S") { //学生
      req.operateType = 'auditStudent'
    } else if (that.data.type == "T") { //教师
      req.operateType = 'auditTeacher'
    }
    if (type == "agree") { //通过
      req.status = 2;
    } else if (type == "refuse") { //驳回
      req.status = 0;
    }
    wx.showModal({
      title: '提示',
      content: type == "agree" ? '确定批量通过所选学生的问卷吗？' : '确定批量驳回所选学生的问卷吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(req);

          wx.request({
            method: 'POST',
            url: cgi.updateStudentListType,
            data: req,
            header: {
              'content-type': 'application/json', // 默认值
              'token': wx.getStorageSync('token')
            },

            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                // 清空选中id、清空全选状态
                that.setData({
                  checkAll: false,
                  checkList:[],
                })
                wx.showToast({
                  title: '操作成功',
                  duration: 2000,
                  success: function () {
                    setTimeout(function () {
                      that.getList();
                    }, 2001);
                  }
                })

              } else {
                wx.showToast({
                  title: res.data.message,
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
    this.getList();//获取待审核列表
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