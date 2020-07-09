// pages/promotions/details/details.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      globalData.imageUrl+'img/longge/bg-user.png',
      globalData.imageUrl +'img/longge/bg-user.png',
      globalData.imageUrl +'img/longge/bg-user.png',
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    list_id:'',
    popupShow:false,
    combin:0,
    details:{},

    // 报名表单
    formData:{
      phone: '',
      enjoyNumber: '',
    },
    description: '',
    price: 0,
    ot_price: 0,
    store_name: '',
    time:'',
    sumbit: '',
    slider_image: ["https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376f3bfe08.png", "https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376dac0c60.png", "https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376daa5e21.png"],
  },

  // 打开报名弹窗
  showPopup() {
    var realname = wx.getStorageSync('realname')
    if (!realname) {
      wx.showToast({
        title: '您还未注册',
        icon: 'none',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/reg/reg',
            })
          }, 2000);
        }
      })
    } else {
      this.setData({ popupShow: true });
    }
    // this.setData({ popupShow: true });
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
    console.log(this.data.formData.phone, this.data.formData.enjoyNumber)
  },

  // 报名
  signupSend(e){
    console.log(e)
    var that =this;
    if (that.data.formData.phone == "") {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
      })
      return false
    }
    if (that.data.formData.enjoyNumber == "") {
      wx.showToast({
        title: '请输入参加人数',
        icon: 'none',
      })
      return false
    }
    var phone = that.data.formData.phone
    var enjoyNumber = that.data.formData.enjoyNumber
    var uid = wx.getStorageSync('uid');
    var list_id = that.data.list_id;
    console.log('数据请求中...')

    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: ["9A8WzMrIJclQ533NTAv3FVm8Jmv-R6yzkzAlXqMpP8U"],
        success: (res) => {
          if (res['9A8WzMrIJclQ533NTAv3FVm8Jmv-R6yzkzAlXqMpP8U'] === 'accept') {
            // wx.showToast({
            //   title: '订阅OK！',
            //   duration: 1000,
            //   success(data) {
            //     //成功
            //     resolve()
            //   }
            // })
            wx.request({
              url: globalData.apiUrl + 'Combination/opencombinaadd?',
              method: 'post',
              data: { phone: phone, people: enjoyNumber, uid: uid, list_id: list_id },
              success: res => {
                if (res.data.code == 1) {
                  wx.request({
                    url: globalData.apiUrl + 'weixin/index?',
                    method: 'post',
                    data: { uid: uid, list_id: list_id, template_id: '9A8WzMrIJclQ533NTAv3FVm8Jmv-R6yzkzAlXqMpP8U' },
                    success: res => {
                      // wx.showToast({
                      //   title: '订阅OK！',
                      //   duration: 1000,
                      //   success(data) {
                      //     //成功
                      //     resolve()
                      //   }
                      // })
                    }
                  })

                  wx.showToast({
                    title: res.data.info,
                    icon: 'none',
                    duration: 2000,
                    success: function () {
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '/pages/wdbm/wdbm',
                        })
                      }, 2000);
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon: 'none',
                  })
                  return false
                }

                // 调接口成功后，给一个成功提示，并隐藏弹出层、清空表单输入的值
                // wx.showToast({
                //   title: '报名成功',
                // })
                // that.onReady()
                this.setData({
                  popupShow: false,
                  // formData: {
                  //   phone: '',
                  //   enjoyNumber: '',
                  // }
                });
              }
            })

          }
        },
        fail(err) {
          //失败
          console.error(err);
          reject()
        }
      })
    })

   

  },


  // 分享
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      console.log(res.target, res)
    }
    return {
      title: '这里是发送时候的标题',
      path: '/pages/index/index',//这里是被分享的人点击进来之后的页面
      imageUrl: globalData.imgUrl+'img/longge/bg-user.png'//这里是图片的路径
    }
  },
  
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.uid) {
      wx.request({
        url: globalData.apiUrl + 'user/share?',
        method: 'post',
        data: {
          uid: options.uid,
          title: '分享积分'
        },
        success: res => {
          console.log(res.data)

        }
      })
    }

    var uid = wx.getStorageSync('uid');
    console.log(options)
    wx.request({
      url: globalData.apiUrl+'index/getgoodsinfo?',
      method: 'post',
      data: { list_id: options.list_id, uid: uid },
      success: res => {
  
        var goods = res.data.data.goodslist
        this.setData({
          details: res.data,
          store_name: goods.store_name,
          banner: goods.slider_image,
          store_info: goods.store_info,
          description: goods.description,
          time: goods.time,
          list_id: goods.list_id,
          combin: res.data.combin,
          sumbit:res.data.sumbit
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
    return {
      title: '西门子冰箱节',
      path: '/pages/promotions/details/details?list_id='+this.data.list_id+'&uid='+wx.getStorageSync('uid'),
    };
  }
})