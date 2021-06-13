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
          <el-popover
              class="ml-5"
              placement="bottom-end"
              width="200"
              trigger="click">
            <div slot="reference" class="flex items-center">
              <el-avatar
                  :size="30"
                  icon="el-icon-user"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
              </el-avatar>
              <i class="el-icon-caret-bottom text-gray-400 ml-1"></i>
            </div>
            <div>
              <div class="pt-2 pb-4 text-center">
                <div class="font-bold">LUFUHU</div>
              </div>
              <div class="border-t pt-4">
                <el-row>
                  <el-col class="mb-3" :span="8">
                    <div class="text-center">
                      <i class="el-icon-user text-xl"></i>
                      <div class="text-xs mt-1">我的</div>
                    </div>
                  </el-col>
                  <el-col class="mb-3" :span="8">
                    <div class="text-center">
                      <i class="el-icon-setting text-xl"></i>
                      <div class="text-xs mt-1">设置</div>
                    </div>
                  </el-col>
                  <el-col class="mb-3" :span="8">
                    <router-link to="/edit">
                      <div class="text-center">
                        <i class="el-icon-edit text-xl"></i>
                        <div class="text-xs mt-1">编辑</div>
                      </div>
                    </router-link>
                  </el-col>
                  <el-col class="mb-3" :span="8">
                    <div class="text-center">
                      <i class="el-icon-switch-button text-xl"></i>
                      <div class="text-xs mt-1">退出</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-popover>
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
          <el-link href="https://element.eleme.io" target="_blank">粤ICP备18099781号-6</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link href="https://element.eleme.io" target="_blank">粤公网安备44013330号</el-link>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
  }
}
</script>

<style scoped>
.main{
  min-height: calc(100vh - 200px);
  padding-top: 80px;
}
.footer{
  height: 200px;
}
</style>