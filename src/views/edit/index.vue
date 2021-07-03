<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="6" class="mb-4">
        <router-link to="/edit/article">
          <el-card shadow="hover">
            <div class="h-20 flex items-center justify-center font-bold">
              博客文章
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="6" class="mb-4">
        <router-link to="/edit/cheatsheet">
          <el-card shadow="hover">
            <div class="h-20 flex items-center justify-center font-bold">
              速查表
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="6" class="mb-4">
        <router-link to="/edit/interview">
          <el-card shadow="hover">
            <div class="h-20 flex items-center justify-center font-bold">
              面试题
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>