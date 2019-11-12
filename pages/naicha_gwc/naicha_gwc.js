// import {
//   $getData
// } from '../../utils/common.js'

// Page({
//   caclTotalMoney() {
//     //总价重置
//     this.data.totalMoney = 0
//     //遍历当前选中的那些项，累加每项的小计
//     this.data.goodslist.filter(r => r.isSelect).forEach(r => {
//       this.data.totalMoney += r.price * r.count
//     })

//     //通知页面渲染
//     this.setData({
//       totalMoney: this.data.totalMoney
//     })
//   },
//   jian(e) {
//     //根据ID从数组中筛选出自身对象
//     let curr = this.data.goodslist.find(r => r.id === $getData(e).id)
//     if (--curr.count < 1) curr.count = 1
//     //通知页面渲染
//     this.setData({
//       goodslist: this.data.goodslist
//     })

//     this.caclTotalMoney()
//   },
//   jia(e) {
//     //根据ID从数组中筛选出自身对象
//     let curr = this.data.goodslist.find(r => r.id === $getData(e).id)
//     if (++curr.count > 99) curr.count = 99
//     //通知页面渲染
//     this.setData({
//       goodslist: this.data.goodslist
//     })
//     this.caclTotalMoney()
//   },
//   select(e) {
//     //根据ID从数组中筛选出自身对象
//     let curr = this.data.goodslist.find(r => r.id === $getData(e).id)
//     //将对象中的isselect属性取反
//     curr.isSelect = !curr.isSelect
//     //遍历数组，如果所有项的isselect都为true，则代表全选了
//     var isSelectALL = this.data.goodslist.every(r => r.isSelect)
//     //通知页面渲染
//     this.setData({
//       goodslist: this.data.goodslist,
//       isSelectAll: isSelectALL
//     })
//     this.caclTotalMoney()
//   },

//   selectAll() {
//     //自身取反
//     this.data.isSelectAll = !this.data.isSelectAll
//     //变更数组中每一项的isSelect
//     this.data.goodslist.forEach(r => {
//       r.isSelect = this.data.isSelectAll
//     })
//     //通知页面渲染
//     this.setData({
//       isSelectAll: this.data.isSelectAll,
//       goodslist: this.data.goodslist
//     })
//     this.caclTotalMoney()
//   },
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     totalMoney: 0,
//     isSelectAll: false,
//     goodslist: [{
//       id: 1,
//       name: "牛油果奶茶",
//       desc: "大杯",
//       price: 21,
//       count: 1,
//       isSelect: false
//     }, {
//       id: 2,
//       name: "奶绿",
//       desc: "大杯",
//       price: 25,
//       count: 2,
//       isSelect: true
//     }, {
//       id: 3,
//       name: "波霸",
//       desc: "中杯",
//       price: 27,
//       count: 3,
//       isSelect: false
//     }]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     this.caclTotalMoney()
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


// pages/cart0/cart0.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    rows:[],
    checked_all: false,
    totalPrice:0
  },
  // check(event){
  //   console.log(event.target)
  // },
// 单选
  getChecked(e){
    // console.log(2)
    var i = e.target.dataset.i;
    this.setData({
      myindex:i
    })
    // console.log(e.detail)
    this.data.rows[i].checked = e.detail.val;
    // console.log(e.detail.val)
    this.setData({
      rows:this.data.rows
    })
  },
// 全选
  onChange(event) {
    // console.log(3)
    // console.log(event.detail)
    this.setData({
      checked_all: event.detail
    });
    for (let i = 0; i < this.data.rows.length; i++) {
      this.data.rows[i].checked = this.data.checked_all
    }
    this.setData({
      rows:this.data.rows
    })
  },
  ischeckAll(){
    // console.log(4)
    var sum = 0
    for (let  i = 0; i < this.data.rows.length; i++) {
      var sumprice = this.data.rows[i].sl * this.data.rows[i].price * 100
      this.data.rows[i].sumprice= sumprice
      console.log(sumprice)
      if(this.data.rows[i].checked)sum++;
    }
    setTimeout(()=>{
      this.setData({
        rows: this.data.rows
      })
      console.log(this.data.rows)
    },100)
    // console.log(sum)
    if (sum == this.data.rows.length) {
      this.setData({
        checked_all: true
      })
    }else{
      this.setData({
        checked_all:false
      })
    }
    console.log('ischeckAll')
  },
// 加载商品
  loadMore(){
    // console.log(5)
    db.collection("nc_gwc")
    .get()
    .then(res=>{
      // console.log(res.data)
      for (let i = 0,rows = [];i<res.data.length;i++){
        // console.log(res.data[i]._id)
        db.collection("naicha")
          .doc(res.data[i]._id)
          .get()
          .then(res=>{
            rows.push(res.data)
            // console.log(rows)
            this.setData({
              rows:rows
            })
            for (let i = 0; i < this.data.rows.length; i++) {
              this.data.rows[i].checked = false;
              this.data.rows[i].add=i;
              this.data.rows[i].sl=this.data.list[i].sl;
            }
            console.log(this.data.rows)
            this.setData({
              rows: this.data.rows
            })
          })
          .catch(err=>{console.log(err)})
      }
      this.setData({
        list:res.data
      })
      // for (let i = 0; i < this.data.rows.length; i++) {
      //   this.data.rows[i].checked = false;
      // }
      // this.setData({
      //   rows: this.data.rows
      // })
    })
    .catch(err=>{console.log(err)})
  },
  add(event) {
    console.log(1)
    var i=this.data.myindex
    // console.log(i)
    // console.log(this.data.rows[i])
    this.data.rows[i].sl=event.detail
    // console.log(this.data.rows[i].sl)
    this.setData({
      checked: event.detail,
      rows:this.data.rows
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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

  }
})