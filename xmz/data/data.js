// pages/data/data.js
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:[true,true,true,true,true],
    disabled:false,
    name:'谢小秋',
    sex:'男',
    phone:'15207394594',
    birth:'1998-02-18',
    chanping:'冰箱/ KA50SE43TI',
    mendian:'长沙苏宁保利国际店',
    mr_address:'湖南省长沙市芙蓉区芙蓉中路338号定王台小区2栋 1308室',
    sh_address:'湖南省长沙市芙蓉区芙蓉中路338号定王台小区2栋 1308室',
    az_address:'湖南省长沙市芙蓉区芙蓉中路338号定王台小区2栋 1308室'
  },
  changeInput(e){
    console.log(e)
    this.setData({
      [`${e.currentTarget.dataset.id}`]:e.detail.value
    })
  },
  changeInput_cp(e){
    // console.log(this.data.chanping)
    let chanping=this.data.chanping;
    chanping[e.currentTarget.dataset.id] = e.detail.value
    // console.log(chanping)
    this.setData({
      chanping
    })
  },
  focusInput(e){
    console.log(e)
    let show=this.data.show;
    show[e.target.dataset.index]=false
    this.setData({
      show
    })
  },
  focusInput_cp(e){
    console.log(e)
    let show_cp = this.data.show_cp;
    show_cp[e.target.dataset.index] = false
    console.log(show_cp)
    this.setData({
      show_cp
    })
  },
  xiugai(){
    console.log(this.data)
    var uid = wx.getStorageSync('uid')
    if(uid){
      if (this.data.name==''){
        wx.showToast({
          title: '姓名不能为空',
          icon:'none'
        })
      } else if (this.data.sex == ''){
        wx.showToast({
          title: '性别不能为空',
          icon: 'none'
        })
      } else if (this.data.phone == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
      } else if (this.data.birth == '') {
        wx.showToast({
          title: '生日不能为空',
          icon: 'none'
        })
      }else{
        wx.request({
          url: globalData.apiUrl + 'user/UpdateUser',
          method: 'post',
          data: {
            uid: uid,
            name: this.data.name,
            sex: this.data.sex,
            phone: this.data.phone,
            birth: this.data.birth,
            chanping: this.data.chanping,
            mendian: this.data.mendian,
            mr_address: this.data.mr_address,
            sh_address: this.data.sh_address,
            az_address: this.data.az_address
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: res.data.info,
              icon: 'none',
              duration: 2000,
              success: function () {
                // setTimeout(function () {
                //   wx.nava({
                //     url: '/pages/data/data',
                //   })
                // }, 2000);
              }
            })
          }
        })
      }
      
    }
 
    // this.setData({
    //   disabled:false
    // })
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
          console.log(res)
          let show_cp=[]
          for (let i = 0; i < res.data.data.goods.length;i++){
            show_cp.push(true)
          }
          this.setData({
            show_cp,
            name: res.data.data.realname,
            sex: res.data.data.sex,
            phone: res.data.data.phone,
            birth: res.data.data.birth,
            chanping: res.data.data.goods,
            mendian: res.data.data.door,
            mr_address: res.data.data.familyAddress,
            sh_address: res.data.data.emailAddress,
            az_address: res.data.data.installAddress,
          })
          console.log(this.data)
        }
      })
    }
  },
})