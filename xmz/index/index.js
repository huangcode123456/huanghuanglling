// pages/index/index.js
const globalData=getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: globalData.imgUrl,
    avatar:'https://profile.csdnimg.cn/5/2/0/3_qq_29407683',
    name:'谢小秋',
    points:'888',
    coupon:'10',
    level:0,
    realname:'',
    uid :'',
    banner: [
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
      { img: globalData.imgUrl + 'img/longge/bg-user.png', toUrl: '/pages/pointsMall/index/index' },
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    menuList:[
      {
        icon: globalData.imgUrl +'img/longge/icon-jfsc.png',
        title: '积分商城',
        link: '/pages/pointsMall/index/index'
      },
      {
        icon: globalData.imgUrl +'img/longge/icon-yhhd.png',
        title: '优惠活动',
        link: '/pages/promotions/index/index'
      },
      {
        icon: globalData.imgUrl +'img/longge/icon-wyyy.png',
        title: '我要预约',
        link: '/pages/reserve/reserve'
      },
      {
        icon: globalData.imgUrl +'img/longge/icon-wyts.png',
        title: '我要投诉',
        link: ''
      },
      {
        icon: globalData.imgUrl +'img/longge/icon-xmtjz.png',
        title: '自助积分',
        link: '/pages/points/index/index'
      },
      {
        icon: globalData.imgUrl +'img/longge/icon-hyjlb.png',
        title: '会员俱乐部',
        link: '/pages/vipClub/index/index'
      },
    ]
  },
  toDetails(e){
    console.log(e)
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },
  // 菜单跳转前先判断是否登录
  onTapAccess(e) {
    console.log(e)
    var uid = wx.getStorageSync('uid');
    // if (!uid) {
    //   wx.showToast({
    //     title: '请先登陆',
    //     icon: 'none',
    //     duration: 2000,
    //   })
    // } else {
      console.log(e)
      if (e.currentTarget.dataset.title=='新媒体矩阵'){
        wx.showToast({
          icon:'none',
          title: '敬请期待',
        })
      } else if (e.currentTarget.dataset.title == '我要投诉'){
        wx.makePhoneCall({
          phoneNumber: '400-88-99999' //仅为示例，并非真实的电话号码
        })
      }else{
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      }
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  pointBtn(){
    wx.navigateTo({
      url: '/pages/integral/details/details',
    })
  },
  couponBtn() {
    wx.navigateTo({
      url: '/pages/coupons/coupons',
    })
  },
  edit(){
    console.log('edit')
    wx.switchTab({
      url: '/pages/center/center',
    })
  },
  vipLevel(){
    wx.navigateTo({
      url: '/pages/membersLevel/membersLevel',
    })
  },
  getUserInfo(event) {
    console.log(event)
    var that = this
    wx.login({
      success: res => {
          let data = {
              code: res.code,
              nickname: event.detail.userInfo.nickName,
              headimgurl: event.detail.userInfo.avatarUrl,
              sex: event.detail.userInfo.sex,
              city: event.detail.userInfo.city,
              province: event.detail.userInfo.province,
              country: event.detail.userInfo.country,
          }
          wx.request({
            url: globalData.apiUrl+'login/wxlogin?',
            method: 'post',
            data: { code:data.code,nickname:data.nickname,headimgurl:data.headimgurl,sex:data.sex,city:data.city,province:data.province,country:data.country   },
            success: res=>{
              console.log(res.data.data);
              if(res.data.code==1){
                var uid = res.data.data.uid;
                console.log(res.data.data)
                wx.setStorageSync('userInfo', data)
                wx.setStorageSync('uid', uid)
                wx.setStorageSync('realname', res.data.data.realname)
                that.setData({
                  hasUserInfo: true,
                  uid: uid,
                  name: data.nickname,
                  avatar: data.headimgurl
                })
                that.onLoad()
                that.onReady()
              }else{
                wx.showToast({
                  title: res.data.data.info,
                  icon: 'none',
                  duration: 2000,
                })
              }

              }
             
          })   
      }
  });
  },
  registerBtn(event){
    if(  this.showToast() == false){
      return
    }
    wx.navigateTo({
      url: '/pages/reg/reg',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: globalData.apiUrl +'user/banner?',
      method: 'get',
      data:{gid:48},
      success: res => {
        console.log(res.data.banner)
        this.setData({
          banner: res.data.banner,
        })
      }
    }) 
    var uid = wx.getStorageSync('uid')
    if(uid){
      wx.request({
        url: globalData.apiUrl +'user/index?',
        method: 'post',
        data:{uid:uid},
        success: res => {
          this.setData({
            points: res.data.data.integral,
            coupon: res.data.data.coupon,
            level: res.data.data.level,
            avatar:res.data.data.avatar,
            name:res.data.data.nickname,
            uid:res.data.data.uid,
            level:res.data.data.level,
            realname: res.data.data.realname,
          })
        }
      }) 
    }
  },
  jfBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
  yhBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
  jyBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
  tsBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
 mtBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
  memberBtn:function(){
    console.log(this.showToast())
     if(this.showToast() === false){
        return
     } 
     wx.navigateTo({
      url: '/pages/pointsMall/index/index',
    })
  },
  showToast:function(){
    var uid = wx.getStorageSync('uid')
    if(!uid){
    wx.showToast({
      title: '请先登陆',
      icon: 'none',
      duration: 2000,
    })  
    return false;
  }

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

  }
})