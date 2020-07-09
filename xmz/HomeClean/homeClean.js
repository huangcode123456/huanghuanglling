// pages/HomeClean/homeClean.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: globalData.imgUrl,
    add:[1],
    date:'',
    array:['洗衣机','洗碗机','冰箱','油烟机'],
    value:[],
    phone:'',
    sex:'',
    time:''
  },
  add(){
    let add=this.data.add;
    add.push(1);
    this.setData({
      add
    })
    console.log(1)
  },
  bindTimeChange(e){
    console.log(e)
    this.setData({
      [`${e.target.dataset.id}`]: `${e.detail.value}`
    })
  },
  bindPickerChange(e){
    console.log(e)
    let array=this.data.array;
    let value=this.data.value;
    value[e.currentTarget.dataset.id] = `${this.data.array[e.detail.value]}`
    this.setData({
      value
    })
  },
  yuyue() {
    var uid = wx.getStorageSync('uid');
    console.log(this.data.date)
    // console.log(this.data.time)
    wx.request({
      url: globalData.apiUrl+'index/orderadd2',
      data: {
        uid:uid,
        date: this.data.date,
        // time:this.data.time,
        chanping: this.data.value
      },
      success: res => {
        if (res.data.code == 1) {
          // wx.setStorageSync("vip", "1")
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }, 2000);
            }
          })
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function () {
    var uid = wx.getStorageSync('uid')
    if (uid) {
      wx.request({
        url: globalData.apiUrl +'user/index?',
        method: 'post',
        data: { uid, uid },
        success: res => {
          console.log(res.data.data.realname)
          if (res.data.data.realname==null){
            wx.showModal({
              title: '提示',
              content: '您还没有注册，请先注册',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/reg/reg',
                  })
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta:1
                  })
                }
              }
            })
          }
          this.setData({
            sex: res.data.data.sex,
            phone: res.data.data.phone == null ? '' : res.data.data.phone,
            familyAddress: res.data.data.familyAddress == null ? '' : res.data.data.familyAddress,
            realname: res.data.data.realname == null ? '' : res.data.data.realname,
          })
        }
      }) 
    }
  },
  onShow:function(){
    var uid = wx.getStorageSync('uid')
    if (uid) {
      wx.request({
        url: globalData.apiUrl + 'user/index?',
        method: 'post',
        data: { uid, uid },
        success: res => {
          console.log(res.data.data.realname)
          if (res.data.data.realname == null) {
            // res.data.data.realname='';
            // res.data.data.phone = '';
            wx.showModal({
              title: '提示',
              content: '您还没有注册，请先注册',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/reg/reg',
                  })
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
          this.setData({
            sex: res.data.data.sex,
            phone: res.data.data.phone == null ? '':res.data.data.phone,
            familyAddress: res.data.data.familyAddress == null ? '' : res.data.data.familyAddress,
            realname: res.data.data.realname == null ? '' : res.data.data.realname,
          })
        }
      })
    }
  },
})