// pages/class/myCenter/profileEdit/profileEdit.js
const cgi = require('../../../../constant/cgi.js');
Page({
  data: {
    userInfo: null,
    userLabel:'姓名',
    isChild:true,
    formData: {
      userName: '',
      sex: '',
      age: '',
      phone: '',
      childName:'',
      userNumber:'',
      idcard: '',
      link: '',
      linkphone: '',
      remark: '',
      address: '',
      origin: ""
    },
    rules: {
      userName: [{ type: 'required', message: '请填写姓名' }],
      sex: [{ type: 'required', message: '请选择性别' }],
      age: [
        { type: 'required', message: '请填写年龄' },
        { type: 'customAge', message: '请填写正确的年龄' }
      ],
      // origin: [{ type: 'required', message: '请填写籍贯' }],
      phone: [
        { type: 'required', message: '请填写手机号码' },
        { type: 'customPhone', message: '请填写正确的手机号码' },
      ],
      // childName: [{ type: 'required', message: '请填写学生姓名' }],
      // userNumber: [{ type: 'required', message: '请填写学号' }],

      // address: [{ type: 'required', message: '请填写居住地址' }],
      // idcard: [
      //   { type: 'required', message: '请填写身份证号码' },
      //   { type: 'customIdcard', message: '请填写正确的身份证号码' },
      // ],
    },
    validateType: {
      // customIdcard(value, formData) {
      //   return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
      // },
      customPhone(value, formData) {
        return /^1[3456789]\d{9}$/.test(value)
      },
      customPwd(value, formData) {
        return value.length >= 6 && value.length <= 12
      },
      customAge(value, formData) {
        return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(value)
      },
    },
    genderRange: [
      { name: '男', value: 'M', displayName: '男' },
      { name: '女', value: 'F', displayName: '女' }
    ],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res, "userres")
        let isChild = true;
        let rule = that.data.rules;
        let userLabel = that.data.userLabel;
        if(res.data.type=='RPT'){
          isChild = false;
          rule.remark= [{ type: 'required', message: '请填写与学生关系' }];
        }
        that.setData({
          isChild: isChild,
          formData: res.data,
          userInfo: res.data,
          userLabel: userLabel,
          rules:rule
        });
      },
    })
  },

  handleChange(e) {
    this.setData({
      [`formData.${e.target.id}`]: e.detail.value
    })
  },
  idCardChange(e) {
    let idcard = e.detail.value;
    let sex = this.data.formData.sex;
    let age = this.data.formData.age;
    if (this.data.validateType.customIdcard(idcard)) {
      // if (!sex) {
        if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
          sex = 'M';
        } else {
          sex = 'F';
        }
      // }
      // if (!age) {
        var curDate = new Date();
        age = curDate.getFullYear() - parseInt(idcard.substr(6, 4));
      // }
    }
    this.setData({
      'formData.idcard': idcard,
      'formData.sex': sex,
      'formData.age': age
    })
  },

  handleFormSubmit(e) {
    const { validStatus, value: { name, password } } = e.detail
    console.log(e.detail);

    if (validStatus) {
      // 判断保存后的跳转页面
      let obj = {};
      obj.userName = this.data.formData.userName;
      obj.sex = this.data.formData.sex;
      obj.phone = this.data.formData.phone;
      obj.idcard = this.data.formData.idcard;
      obj.address = this.data.formData.address;
      obj.age = this.data.formData.age;
      obj.remark = this.data.formData.remark;
      obj.childName = this.data.formData.childName;
      obj.userNumber = this.data.formData.userNumber;
      try {
        obj.openid = wx.getStorageSync('openid');
      } catch (e) {
      }
      let that = this;
      wx.request({
        method: 'POST',
        url: cgi.myCenter.updateUser,
        header: {
          'token': wx.getStorageSync('token')
        },
        data: obj,
        success(res) {
          //更新userInfo缓存 
          let user = that.data.userInfo;
          user.phone = obj.phone;
          user.userName = obj.userName;
          user.sex = obj.sex;
          user.idcard = obj.idcard;
          user.address = obj.address;
          user.age = obj.age;
          user.remark = obj.remark;
          user.childName = obj.childName;
          user.userNumber = obj.userNumber;
          wx.removeStorageSync("userInfo");
          wx.setStorage({
            key: 'userInfo',
            data: user,
            success(res) {
              console.log('保存后返回个人中心');
              wx.navigateBack({
                delta: 1,
              })
            }
          });
        }
      })
    }

  },


 
  
  // // 取消
  // goBack() {
  //   wx.navigateBack({
  //   })
  // }
})