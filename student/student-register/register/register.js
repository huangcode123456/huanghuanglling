// pages/student/student-register/register/register.js
const cgi=require('../../../../constant/cgi.js')
Page({
  data: {
    // idacrd_title:'身份证号',
    // idcard_tishi:'请输入您的身份证号码',
    // checkItems: [
    //   { name: '是', value: 'Y' },
    //   { name: '否', value: 'N' }
    // ],
    disabled_show: 'disabled',
    zhuce:true,
    texts: "学校学生注册",
    isShow:false,
    openid:'',
    zjh:true,
    orgName:'',
    userName:'',
    gradeName:'',
    gradeId:'',
    className:'',
    classId:'',
    forbidenPhones:[],
    orgid:'',
    formData: {
      remark:'',
      userName: '',
      phone: '',
      password: '123456',
      passwordConfirm: '123456',
      type:'CLS',
      age:'',
      sex:''
    },
    rules: {
      // origin:[
      //   { type  : 'required', message: '籍贯不能为空' }
      // ],
      sex:[
        { type: 'required', message: '请选择您的性别' }
      ],
      // address:[
      //   { type: 'required', message: '居住地址不能为空' }
      // ],
      // accountType: [
      //   { type: 'required', message: '请选择您的身份' }
      // ],
      userName: [
        { type: 'required', message: '学生姓名不能为空' }
      ],
      phone: [
        { type: 'required', message: '手机号不能为空' },
        { type: 'customPhone', message: '请填写正确的手机号码' },
      ],
      // studentID: [
      //   { type: 'required', message: '学号不能为空' }
      // ],
      // phone: [
      //   { type: 'required', message: '手机号不能为空' }
      // ],
      // idCard: [
      //   { type: 'required', message: '身份证号码不能为空' },
      //   { type: 'customIdcard', message: '请填写正确的身份证号码' }
      // ],
      age:[
        { type: 'required', message: '年龄不能为空' },
        { type: 'customAge', message: '请填写正确的年龄' },
      ],
      // password: [
      //   { type: 'required', message: '密码不能为空' }
      // ],
      // passwordConfirm: [
      //   { type: 'required', message: '确认密码不能为空' }
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
      // passwordConfirm(value, formData) {
      //   return value == formData.password
      // },
    },
    // accountTypeRange: [
    //   { name: '学生本人', value:'S', displayName: '学生' },
    //   { name: '学生家长', value:'P', displayName: '家长' }
    // ],
    sexTypeRange: [
      { name: '男', value: 'M', displayName: '男' },
      { name: '女', value: 'F', displayName: '女' }
    ],
  },
  getOpenid() {//获取openid
    let that = this;
    wx.login({
      success(res) {
        const code = res.code;
        console.log(code, "code");
        wx.request({
          url: cgi.loginTask.code2openid,
          data: { "code": code },
          success(res) {
            console.log(res.data.data.openid);
            that.setData({
              openid: res.data.data.openid
            })
          }
        })
      }
    })
  },
  onLoad: function (options) {
    this.getOpenid()
    console.log(options)
    this.setData({
      orgid: options.orgid,
      token: options.token,
      gradeId: options.gradeId,
      classId: options.classId,
      userName: options.userName,
      className: options.className,
      gradeName: options.gradeName,
      orgName:options.orgName
    })
  },
  handleNameChange(e) {
    let name = e.detail.value;
    let that = this;
    wx.request({
      method: "post",
      url: cgi.register.nameCheck,
      data: {
        classId:that.data.classId,
        name: name
      },
      success(res){
        console.log(res,'23423')
        if(res.data.code==200){
          if(res.data.data.existSameName==0){
            //不存在
            let rules = that.data.rules;
            delete rules.remark
            that.setData({
              [`formData.type`]:'CLS',
              [`formData.studentUserId`]: '',
              [`formData.userNumber`]: '',
              rules: rules
            });
          } else if (res.data.data.existSameName == 1) {
            //存在同名
            var tips = that.data.gradeName + that.data.className + "中已存在【" + name+"】,请确认是否是同一人？"
            wx.showModal({
              title: '提示',
              content: tips,
              success(resp) {
                if (resp.confirm) {
                  let rules = that.data.rules;
                  rules.remark = [
                    { type: 'required', message: '您与学生的关系不能为空' }
                  ];
                  let phones = [];
                  let records = res.data.data.records;
                  for (var i = 0; i < records.length;i++){
                    phones.push(records[i].phone);
                  }
                  let student = records[0];
                  that.setData({
                    [`formData.type`]: 'RPT',
                    [`formData.studentUserId`]: student.id,
                    [`formData.userNumber`]: student.userNumber,
                    [`formData.sex`]: student.sex,
                    [`formData.age`]: student.age,
                    forbidenPhones: phones,
                    rules: rules
                  });
                } else if (resp.cancel) {
                  let rules = that.data.rules;
                  delete rules.remark;
                  that.setData({
                    [`formData.type`]: 'CLS',
                    [`formData.studentUserId`]: '',
                    [`formData.userNumber`]: '',
                    forbidenPhones: [],
                    rules: rules
                  });
                }
              }
            })
          }
        }
      }
    });
  },
  // 输入
  handleChange(e) {
    this.setData({
      [`formData.${e.target.id}`]: e.detail.value.replace(/\s/g, '')
    })
  },
  idcardChange(e) {
    let idcard = e.detail.value;
    let sex = this.data.formData.sex;
    let age = this.data.formData.age;
    if (this.data.validateType.customIdcard(idcard)) {
      if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
        sex = 'M';
      } else {
        sex = 'F';
      }
      var curDate = new Date();
      age = curDate.getFullYear() - parseInt(idcard.substr(6, 4));
    }
    if (this.data.formData.accountType == 'S') {
      this.setData({
        'formData.idCard': idcard,
        'formData.sex': sex,
        'formData.age': age
      })
    }else{
      this.setData({
        'formData.sex': sex,
        'formData.idCard': idcard
      })
    }
  },

  // 注册
  handleFormSubmit(e) {
    console.log(e)
    let that=this;
    if (e.detail.validStatus){
      var forbidenPhones = that.data.forbidenPhones;
      if (forbidenPhones && forbidenPhones.length > 0) {
        var phone = that.data.formData.phone;
        for (var i = 0; i < forbidenPhones.length; i++) {
          if (phone == forbidenPhones[i]){
            wx.showToast({
              title: '对不起，该学生信息下的手机号码已注册，请更改手机号码',
              icon: 'none',
              duration: 5000
            })
            return;
          }
        }
      }
      if (that.data.zhuce){
        that.setData({
          zhuce:false
        })
        if (that.data.formData.type=='CLS'){
          wx.setStorage({
            key: 'clsRole',
            data: 'CLS',
          });
          wx.request({
            method: "post",
            url: cgi.studentRegist,
            data: {
              classId: that.data.classId,
              gradeId: that.data.gradeId,
              openid: that.data.openid,
              orgid: that.data.orgid,
              type:'CLS',
              userName: that.data.formData.userName,
              phone: that.data.formData.phone,
              age: that.data.formData.age,
              sex: that.data.formData.sex,
              remark: that.data.formData.remark,
              userPwd: that.data.formData.password,
            },
            header: {
              'content-type': 'application/json', // 默认值
              'token': that.data.token
            },
            success(res) {
              that.setData({
                zhuce: true
              })
              console.log(res.data,'reg info')
              if (res.data.code == 200) {
                wx.showToast({
                  icon: 'none',
                  title: '注册成功',
                })
                wx.redirectTo({
                  url: '/pages/student/student-register/status/status?status=' + 1 + '&orgid=' + that.data.orgid + '&className=' + that.data.className + '&classId=' + that.data.classId + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName + '&gradeName=' + that.data.gradeName + '&orgName=' + that.data.orgName + '&openid=' + that.data.openid,
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.data.message,
                })
              }
            }
          })
        }else{
          wx.setStorage({
            key: 'clsRole',
            data: 'RPT',
          });
          wx.request({
            method: "post",
            url: cgi.informantRegist,
            data: {
              childName: that.data.formData.name,
              classId: that.data.classId,
              gradeId: that.data.gradeId,
              openid: that.data.openid,
              orgid: that.data.orgid,
              type: 'RPT',
              userName: that.data.formData.userName,
              userNumber: that.data.formData.userNumber,
              studentUserId: that.data.formData.studentUserId,
              age: that.data.formData.age,
              sex: that.data.formData.sex,
              phone: that.data.formData.phone,
              remark: that.data.formData.remark,
              userPwd: that.data.formData.password,
            },
            header: {
              'content-type': 'application/json', // 默认值
              'token': that.data.token
            },
            success(res) {
              that.setData({
                zhuce: true
              })
              console.log(res.data)
              if (res.data.code == 200) {
                wx.showToast({
                  icon: 'none',
                  title: '注册成功',
                })
                wx.redirectTo({
                  url: '/pages/student/student-register/status/status?status=' + 1 + '&orgid=' + that.data.orgid + '&className=' + that.data.className + '&classId=' + that.data.classId + '&gradeId=' + that.data.gradeId + '&userName=' + that.data.userName + '&gradeName=' + that.data.gradeName + '&orgName=' + that.data.orgName + '&openid=' + that.data.openid,
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.data.message,
                })
              }
            }
          })
        }
      }else{
        wx.showToast({
          icon:'none',
          title: '请勿重复点击',
        })
      }
    }
  },

})