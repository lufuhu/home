<template>
  <div>
    <el-header class="fixed w-full z-50 bg-white border-b">
      <div class="w-main mx-auto max-w-screen-xl flex items-center justify-between">
        <router-link to="/" class="flex items-center">
          <img class="w-14 h-14" src="../assets/logo.png">
          <div class="font-bold">编程问号</div>
        </router-link>
        <div class="flex items-center justify-center">
          <el-menu router :default-active="$route.path" mode="horizontal">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/article">博客文章</el-menu-item>
          </el-menu>

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
              <el-dropdown-item v-if="userInfo.edit === 1" icon="el-icon-edit">
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
            <a href="/auth" class="flex items-center">
              <el-avatar :size="30" icon="el-icon-user"></el-avatar>
            </a>
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <div class="w-main mx-auto max-w-screen-xl">
        <router-view></router-view>
      </div>
    </el-main>
    <div class="bg-black footer">
      <div class="w-main mx-auto max-w-screen-xl flex justify-center items-center">
        <div class="text-gray-300 text-sm flex justify-center items-center py-10">
          <el-link href="https://beian.miit.gov.cn" target="_blank">鄂ICP备2021009343号-1</el-link>
          <el-divider direction="vertical"></el-divider>
          <div class="flex items-center">
            <img src="../assets/gongan.png" class="mr-1"/>
            <el-link href="http://www.beian.gov.cn" target="_blank">鄂公网安备号</el-link>
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
      this.userInfo = Cookies.get('userInfo');
    }
    console.log(this.userInfo)
  },
  methods: {
    ...mapActions(["loginOut"]),
    onLoginOut() {
      Cookies.remove('userInfo');
      Cookies.remove('token');
      this.loginOut();
    }
  },
}
</script>

<style scoped>
.main {
  min-height: calc(100vh - 200px);
  padding-top: 80px;
}

.footer {
  height: 200px;
}
</style>