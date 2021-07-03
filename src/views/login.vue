<template>
  <div>
    <el-card>
      <div class="flex flex-col items-center">
        <div class="text-lg my-10 flex">
          微信搜索【
          <el-popover
              placement="top"
              width="200"
              trigger="hover">
            <div slot="reference" class="text-blue-300">
              编程问号
            </div>
            <img src="https://www.lufuhu.com/static/qrcode.jpg"/>
          </el-popover>
          】扫码登录
        </div>
        <div
            class="qrcode"
            v-loading="loading"
            element-loading-text="二维码失效"
            element-loading-spinner="el-icon-close"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            id="qrcode">
        </div>
        <div class="h-12">
          <el-button @click="refresh" v-if="loading" type="text">刷新二维码</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import {mapActions, mapGetters} from "vuex";
import Cookies from "js-cookie";

export default {
  name: "login",
  data() {
    return {
      token: '',
      qr: null,
      qrT: null,
      loading: false
    }
  },
  watch: {
    qrcodeTokenData: function (val) {
      this.token = val.data;
      this.loading = false;
      this.makeCode()
    },
    qrcodeVerifyData: function (val) {
      if (val.code === 1021) {
        clearInterval(this.qrT);
        this.loading = true;
      } else if (val.code === 200) {
        clearInterval(this.qrT);
        Cookies.set('userInfo', JSON.stringify(val.data.userInfo));
        Cookies.set('token', val.data.token);
        window.location.href = "/";
      }
    },
  },
  mounted() {
    this.qrcodeToken();
    this.qr = new QRCode(document.getElementById("qrcode"), {
      text: this.token,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  },
  methods: {
    ...mapActions(["qrcodeToken", "qrcodeVerify"]),
    makeCode() {
      this.qr.makeCode(this.token);
      this.qrT = setInterval(() => {
        this.verify();
      }, 2000)
    },
    refresh(){
      this.qrcodeToken();
    },
    verify() {
      this.qrcodeVerify({token: this.token});
    }
  },
  computed: {
    ...mapGetters(["qrcodeTokenData", "qrcodeVerifyData"])
  }
}
</script>

<style scoped>
.qrcode{
  width: 150px;
  height: 150px;
}
</style>