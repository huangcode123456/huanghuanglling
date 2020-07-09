<template>
  <div class="login-container">
    <el-form ref="regForm" :model="regForm" :rules="regRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">企业账号注册</h3>
      </div>

      <el-form-item prop="orgName">
        <span class="svg-container">
          <i class="el-icon-postcard"></i>
        </span>
        <el-input
				 size='small'
          ref="orgName"
          v-model="regForm.orgName"
          placeholder="组织名称(与工商执照一致)"
          name="orgName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="contacts">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
				 size='small'
          ref="contacts"
          v-model="regForm.contacts"
          placeholder="联系人姓名"
          name="contacts"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <span class="svg-container">
          <i class="el-icon-mobile-phone"></i>
        </span>
        <el-input
          ref="phone"
					 size='small'
          v-model="regForm.phone"
          placeholder="联系人手机号"
          name="phone"
          type="text"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>
      <p style="font-size:12px;color:#666">注册成功后,用户名为联系人手机号,例：13500000000</p>
      <div style="display:flex">
        <el-form-item prop="smsCode" style="flex:1">
          <span class="svg-container">
            <i class="el-icon-message"></i>
          </span>
          <el-input
            ref="smsCode"
						 size='small'
            v-model="regForm.smsCode"
            type="text"
            placeholder="验证码"
            name="smsCode"
            tabindex="4"
            auto-complete="on"
            @keyup.enter.native="handleReg"
          />
        </el-form-item>
        <el-button type="info" :disabled="timer!=null" :loading="btnLoading" @click="getCode()" class="btn-getcode">{{btnText}}</el-button>
      </div>
      <div style="line-height:19px">
        <el-checkbox v-model="agree">注册代表您同意</el-checkbox>
        <el-link type="primary">《全运用户协议》</el-link>
      </div>
      <el-button :disabled="!agree" :loading="loading" type="primary" style="width:100%;margin:30px 0;" @click.native.prevent="handleReg">注　　　　册</el-button>
      <div class="tips">
        <router-link to='login'>
        <span><i class="el-icon-back"></i> 返回登录</span>
        </router-link>
      </div>

    </el-form>
  </div>
</template>

<script>
import {enterpriseRegist, sendRegCodeSms } from '../../api/regist'
export default {
  name: 'register',
  data() {
    const validatePhone = (rule, value, callback) => {
      // 手机号码验证
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateSmsCode = (rule, value, callback) => {
      // 四位数字的验证码验证
      if (!(/^\d{4}$/.test(value))) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        orgName:'',
        contacts: '',
        phone: '',
        smsCode:''
      },
      regRules: {
        orgName: [{ required: true, trigger: 'blur', message: '请输入组织名称' }],
        contacts: [{ required: true, trigger: 'blur', message: '请输入联系人姓名'}],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        smsCode: [{ required: true, trigger: 'blur', validator: validateSmsCode }],
      },
      agree:false,
      timer: null,
      btnText:'获取验证码',
      btnLoading:false,
      loading: false
    }
  },
  watch: {
    
  },
  methods: {
    // 获取验证码
    getCode(){
      this.$refs.regForm.validateField("phone", errMsg => {
        if (errMsg) {
          console.log("手机号校验未通过");
          this.$message.error('请输入正确的手机号');
        } else {
          this.btnLoading = true
          const data={
            phone:this.regForm.phone
          }
          sendRegCodeSms(data).then(res => {
            this.btnLoading = false
            console.log(res)
            this.$message({message:'验证码发送成功，请查看手机！',type:'success'});
            // 请求成功开始倒计时
            if (!this.timer) {
              const TIME_COUNT = 60
              let count = TIME_COUNT
              this.timer = setInterval(() => {
                if (count > 1 && count <= TIME_COUNT) {
                  count--;
                  this.btnText =count + 'S后重新获取'
                } else {
                  this.btnText = '重新获取验证码'
                  clearInterval(this.timer)
                  this.timer = null
                }
                console.log(this.timer)
              }, 1000)
            }
          }).catch(err =>{
            this.btnLoading = false
          })
        }
      });
    }, 
    // 注册
    handleReg() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = this.regForm
          console.log(data)
          enterpriseRegist(data).then(res => {
            this.loading = false
            console.log('res',res)
            // 注册成功弹出信息确认窗口
            const h = this.$createElement;
            this.$msgbox({
              title: '恭喜您，注册成功！',
              message: h('div', null, [
                  h('p', null, [
                    h('span', null, '您的登录账号是： '),
                    h('span', { style: 'color: red; font-weight:800' }, this.regForm.phone)
                  ]),
                  h('p', null, [
                    h('span', null, '您的默认密码是： '),
                    h('span', { style: 'color: red; font-weight:800' }, '123456')
                  ])
              ]),
              showCancelButton: false,
              confirmButtonText: '立即登录',
              cancelButtonText: '取消',
            }).then(action => {
              // 跳转至登录界面
              this.$router.push('/login')
            });
          }).catch((err) => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  // 销毁定时器
  beforeDestroy: function() {
    if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除时间定时器
    }
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url('../../assets/images/backImg1.jpg') center;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .btn-getcode{
    margin:0 0 22px 20px;
    width: 150px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    columns: #1692b8;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    font-size:18px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $dark_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
