// pages/jfProduct/jfProduct.js
const globalData = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    shadow: false,
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    user:{
      name: '谢小秋',
      sex: '女',
      phone: '13888888888',
      address: '湖南省长沙市芙蓉区中路338号定王台2栋1308室'
    },
    dd:{
      lx: '礼品兑换',
      xx: '西门子质感多门冰箱',
      xh: 'KA50SE43TI',
      needjf: '55000'
    },
    description:'',
    price:0,
    ot_price:0,
    store_name:'',
    slider_image: ["https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376f3bfe08.png", "https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376dac0c60.png", "https://xmz.h5vx.cn/public/uploads/attach/2020/03/19/5e7376daa5e21.png"],
    listid:'',
    realname:''
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },

  wdzl(){
    console.log('转跳我的资料')
    wx.navigateTo({
      url: '/pages/data/data',
    })
  },
  // 支付
  pay:function(event){
    console.log(event)
    // console.log('立即支付')
    var uid = wx.getStorageSync('uid')

    var list_id = this.data.list_id

    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: ["iZNybKiOU6yzKafpuWKM8H9TBwMm6LiniMlG9YfjRmA"],
        success: (res) => {
          if (res['iZNybKiOU6yzKafpuWKM8H9TBwMm6LiniMlG9YfjRmA'] === 'accept') {
            // wx.showToast({
            //   title: '订阅OK！',
            //   duration: 1000,
            //   success(data) {
            //     //成功
            //     resolve()
            //   }
            // })

          
            wx.request({
              url: globalData.apiUrl + 'index/orderadd?',
              method: 'post',
              data: {
                uid: uid,
                list_id: list_id,

              },
              success: res => {
                console.log(res)
                if (res.data.code == 1) {

                  //发送订阅消息

                  wx.request({
                    url: globalData.apiUrl + 'weixin/index?',
                    method: 'post',
                    data: { uid: uid, list_id: list_id, template_id: 'iZNybKiOU6yzKafpuWKM8H9TBwMm6LiniMlG9YfjRmA' },
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
                          url: '/pages/wddh/wddh',
                        })
                      }, 2000);
                    }
                  })
                  // wx.showToast({
                  //   title: res.data.info,
                  //   icon: 'none',
                  //   duration: 4000,
                  // })  
                  // wx.navigateTo({
                  //   url: '/pages/wddh/wddh',
                  // })
                } else {
                  wx.showToast({
                    title: res.data.info,
                    icon: 'none',
                    duration: 2000,
                  })
                }
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

  requestMsg() {
    
  },
  stw(){
    console.log(this.data.shadow)
    this.setData({
      shadow:!this.data.shadow
    })
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(wx.getStorageSync("vip")!="1"){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请先注册',
    //     success(res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }

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

    var uid = wx.getStorageSync('uid')

    console.log(options.list_id)
    console.log(uid)
    var list_id = options.list_id
    this.setData({
      list_id: options.list_id,
    
    })
    wx.request({
      url: globalData.apiUrl +'index/getgoodsinfo?',
      method: 'post',
      data: { list_id: options.list_id, uid: uid},
      success: res => {
        console.log(res.data)
        this.setData({
          datalist:res.data,
          user:res.data.user,
          list_id: list_id,
        })
        // this.setData({
        //   datalist: res.data.data,
        //   // img1: res.data.data.goodslist.slider_image,
        //   store_name: res.data.data.goodslist.store_name,
        //   slider_image: res.data.data.goodslist.slider_image,
        //   price: res.data.data.goodslist.price,
        //   ot_price: res.data.data.goodslist.ot_price,
        //   description: res.data.data.goodslist.description,
        //   address_id: res.data.user.address_id,
        //   user: res.data.user,
        //   dd: res.data.dd,
        //   list_id: options.list_id,
        // })
      }
    })
  },
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
    }else{
      this.setData({ show: true });
    }

  },

  onClose() {
    this.setData({ show: false });
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
    var uid = wx.getStorageSync('uid')
    // console.log(options.list_id)
    console.log(uid)
    var list_id = this.data.list_id
    wx.request({
      url: globalData.apiUrl +'index/getgoodsinfo?',
      method: 'post',
      data: { list_id, uid },
      success: res => {
        console.log(res.data)
        this.setData({
          datalist: res.data,
          user: res.data.user,
          list_id: list_id,
        })
        // this.setData({
        //   datalist: res.data.data,
        //   // img1: res.data.data.goodslist.slider_image,
        //   store_name: res.data.data.goodslist.store_name,
        //   slider_image: res.data.data.goodslist.slider_image,
        //   price: res.data.data.goodslist.price,
        //   ot_price: res.data.data.goodslist.ot_price,
        //   description: res.data.data.goodslist.description,
        //   address_id: res.data.user.address_id,
        //   user: res.data.user,
        //   dd: res.data.dd,
        //   list_id: options.list_id,
        // })
      }
    })
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
      path: '/pages/promotions/details/details?list_id='+this.data.list_id+'&uid=' + wx.getStorageSync('uid'),
    };
  }
})