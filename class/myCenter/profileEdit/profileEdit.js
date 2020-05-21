// pages/class/myCenter/profileEdit/profileEdit.js
const cgi = require('../../../../constant/cgi.js');
Page({
  data: {
    token:'',
    userInfo: null,
    formData: {
      userName: '',
      sex: '',
      age: '',
      phone: '',
      idcard: '',
      address: '',
      deptName:'',
      origin: ""
    },
    selectDeptRange:[],
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
      address: [{ type: 'required', message: '请填写居住地址' }],
      // idcard: [
      //   { type: 'required', message: '请填写身份证号码' },
      //   { type: 'customIdcard', message: '请填写正确的身份证号码' },
      // ],
    },
    validateType: {
      customIdcard(value, formData) {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
      },
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

  //获取职能部门
  getDeptList() {
    let that = this;
    wx.request({
      method: "post",
      url: cgi.gradeSet.getDeptList,
      data: {
        parentId: that.data.userInfo.orgid,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': that.data.token
      },
      success(res) {
        console.log(res.data.data)
        let znbm = []
        for (let i = 0; i < res.data.data.length; i++) {
          let str = {};
          str.name = res.data.data[i].orgName;
          str.value = res.data.data[i].orgid;
          str.displayName = res.data.data[i].orgName;
          znbm.push(str)
        }
        console.log(znbm, that.data.userInfo.deptId)
        that.setData({
          selectDeptRange: znbm,
          'formData.deptName': that.data.userInfo.deptId
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token: res.data
        });
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          formData: res.data,
          userInfo: res.data
        });
        that.getDeptList();
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
      obj.origin = this.data.formData.origin;
      obj.deptId = this.data.formData.deptName;
      try {
        obj.openid = wx.getStorageSync('openid');
      } catch (e) {
      }
      let that = this;
      wx.request({
        method: 'POST',
        url: cgi.myCenter.updateUser,
        header: {
          'token': that.data.token
        },
        data: obj,
        success(res) {
          console.log(res, "122121");
          //更新userInfo缓存 
          let user = that.data.userInfo;
          user.phone = obj.phone;
          user.userName = obj.userName;
          user.sex = obj.sex;
          user.idcard = obj.idcard;
          user.address = obj.address;
          user.age = obj.age;
          user.origin = obj.origin;
          user.deptId = obj.deptId;
          let deptRange = that.data.selectDeptRange;
          for(var i=0;i<deptRange.length;i++){
            if(deptRange[i].value==user.deptId){
              user.deptName = deptRange[i].name;
              break;
            }
          }
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