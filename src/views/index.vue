<template>
  <div>
    <div class="w-full bg-white header">
      <div class="w-main mx-auto max-w-screen-xl flex items-center justify-between">
        <router-link to="/" class="flex items-center">
          <img class="w-14 h-14" src="../assets/logo.png">
          <div class="font-bold">编程问号</div>
        </router-link>
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center">
            <router-link class="hn-item" :class="$route.path === '/' ? 'hn-item-active':''" to="/">首页</router-link>
            <router-link class="hn-item" :class="$route.path === '/article' ? 'hn-item-active':''" to="/article">
              博客文章
            </router-link>
            <router-link class="hn-item" :class="$route.path === '/cheatsheet' ? 'hn-item-active':''" to="/cheatsheet">
              速查表
            </router-link>
            <router-link class="hn-item" :class="$route.path === '/tool' ? 'hn-item-active':''" to="/tool">
              在线工具
            </router-link>
          </div>
          <el-dropdown trigger="click" v-if="userInfo && userInfo.id">
            <div class="flex items-center ml-5">
              <el-avatar
                  :size="30"
                  icon="el-icon-user"
                  :src="userInfo.avatar">
              </el-avatar>
              <i class="el-icon-caret-bottom text-gray-400 ml-1"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="userInfo.edit === true" icon="el-icon-edit">
                <router-link to="/edit">
                  编辑
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">
                <span class="p-1" @click="onLoginOut()">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else class="ml-5">
            <router-link to="/login" class="flex items-center">
              <el-avatar :size="30" icon="el-icon-user"></el-avatar>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <el-main class="main">
      <div class="w-main mx-auto max-w-screen-xl">
        <router-view></router-view>
      </div>
    </el-main>
    <div class="bg-black footer">
      <div class="w-main mx-auto max-w-screen-xl flex flex-col justify-center items-center">
        <div class="flex mt-16 mb-9">
          <a class="footer-icon-1" href="https://github.com/lufuhu" target="_blank"><img
              src="../assets/icon/github.png"/></a>
          <a class="footer-icon-1" href="https://gitee.com/lufuhu" target="_blank"><img src="../assets/icon/gitee.png"/></a>
          <el-popover
              placement="top"
              width="200"
              trigger="hover">
            <div slot="reference">
              <div class="footer-icon-1"><img src="../assets/icon/wexin.png"/></div>
            </div>
            <img src="https://www.lufuhu.com/static/wechat.jpg"/>
          </el-popover>
          <el-popover
              placement="top"
              width="200"
              trigger="hover">
            <div slot="reference">
              <div class="footer-icon-1"><img src="../assets/icon/qq.png"/></div>
            </div>
            <img src="https://www.lufuhu.com/static/qq.png"/>
          </el-popover>
          <el-tooltip class="item" effect="dark" content="master@lufuhu.com" placement="top">
            <div class="footer-icon-1"><img src="../assets/icon/mail.png"/></div>
          </el-tooltip>
        </div>
        <div class="text-gray-300 text-sm flex justify-center items-center w-full">
          <div class="flex flex-1 justify-end" style="margin:0 auto; padding:20px 0;">
            <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
              <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                鄂ICP备2021009343号-1
              </p>
            </a>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="flex flex-1" style="margin:0 auto; padding:20px 0;">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001971" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
              <img src="https://www.lufuhu.com/static/icon/gongan.png" style="float:left;"/>
              <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
                鄂公网安备 42011202001971号
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {mapActions} from "vuex";

export default {
  name: "index",
  data() {
    return {
      userInfo: {},
    }
  },
  mounted() {
    if (Cookies.get('userInfo')) {
      this.userInfo = JSON.parse(Cookies.get('userInfo'));
    }
  },
  methods: {
    ...mapActions(["loginOut"]),
    onLoginOut() {
      Cookies.remove('userInfo');
      Cookies.remove('token');
      this.loginOut();
      this.userInfo = {};
    }
  },
}
</script>

<style scoped>
.main {
  min-height: calc(100vh - 200px);
  padding-top: 30px;
}

.footer {
  height: 200px;
}

.hn-item {
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color .3s, background-color .3s, color .3s;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
}

.hn-item-active {
  border-bottom: 2px solid #409EFF;
  color: #409EFF;
}

.header {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border: 1px solid #ebeef5;
}

.footer-icon-1 {
  border: 1px solid #ffffff;
  border-radius: 50%;
  padding: 6px;
  margin: 0 10px;
  cursor: pointer;
}

.footer-icon-1 img {
  width: 20px;
  height: 20px;
}
</style>