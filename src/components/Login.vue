<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="main">          
        </div>

        <div class="form">
          <h3 @click="showRegister">创建账户</h3>
          <transition name="slide">
            <div v-bind:class="{ show: isShowRegister }" class="register">
              <input type="text" v-model="register.username" placeholder="用户名"/>
              <input type="password" v-model="register.password" placeholder="密码"/>
              <p v-bind:class="{ error: register.isError }">{{ register.notice }}</p>
              <div class="button" @click="onRegister">创建账号</div>
            </div>
          </transition>
          <h3 @click="showLogin">登录</h3>
          <transition name="slide">
            <div v-bind:class="{ show: isShowLogin }" class="login">
              <input type="text" v-model="login.username" placeholder="输入用户名"/>
              <input type="password" v-model="login.password" placeholder="密码"/>
              <p v-bind:class="{ error: login.isError }">{{ login.notice }}</p>
              <div class="button" @click="onLogin">登录</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import Bus from '@/helpers/bus';
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: "hunger1",
        password: "123456",
        notice: "请输入用户名和密码",
        isError: false,
      },
      register: {
        username: "",
        password: "",
        notice: "创建账户后请记住用户名和密码",
        isError: false,
      },
    };
  },
  methods: {
    ...mapActions({
      'loginUser': 'login',
      'registerUser': 'register'
    }),
    showRegister() {
      this.isShowRegister = true;
      this.isShowLogin = false;
    },
    showLogin() {
      this.isShowRegister = false;
      this.isShowLogin = true;
    },
    onRegister() {
      let usernameValidResult = this.validUsername(this.register.username);
      if (!usernameValidResult.isValid) {
        this.register.isError = true;
        this.register.notice = usernameValidResult.notice;
        return;
      }
      let passwordValidResult = this.validPassword(this.register.password);
      if (!passwordValidResult.isValid) {
        this.register.isError = true;
        this.register.notice = passwordValidResult.notice;
        return;
      }
      //注册
      this.registerUser({
        username: this.register.username,
        password: this.register.password,
      }).then(() => {
          this.register.isError = false;
          this.register.notice = "";
          this.$router.push("notebooks");
        }).catch((data) => {
          this.login.isError = true;
          this.login.notice = data.msg;
        });
    },
    onLogin() {
      let usernameValidResult = this.validUsername(this.login.username);
      if (!usernameValidResult.isValid) {
        this.login.isError = true;
        this.login.notice = usernameValidResult.notice;
        return;
      }
      let passwordValidResult = this.validPassword(this.login.password);
      if (!passwordValidResult.isValid) {
        this.login.isError = true;
        this.login.notice = passwordValidResult.notice;
        return;
      }
      //登录
      this.loginUser({
        username: this.login.username,
        password: this.login.password,
      }).then(() => {
          this.login.isError = false;
          this.login.notice = "";
          this.$router.push("notebooks");
        }).catch((data) => {
          this.login.isError = true;
          this.login.notice = data.msg;
        });
    },
    validUsername(username) {
      return {
        isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: "用户名必须是3~15个字符，限于字母数字下划线中文",
      };
    },
    validPassword(password) {
      return {
        isValid: /^.{6,16}$/.test(password),
        notice: "密码长度必须为6~16个字符",
      };
    },
  },
};
</script>
<style lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #36bc64
      url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center
      no-repeat;
    background-size: contain;
  }
  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;
    h3 {
      padding: 10px 20px;
      margin-top: -1px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      text-align: left;
      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }
    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }
    .login,
    .register {
      padding: 0px 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height 0.4s;

      &.show {
        height: 193px;
      }
      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }
      input:focus {
        border: 3px solid #9dcaf8;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
        text-align: left;
      }
      .error {
        color: red;
      }
    }
    .login {
      border-top: 0;
    }
  }
}
</style>