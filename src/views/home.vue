<template>
  <div>
    <el-carousel indicator-position="outside" :interval="4000">
      <el-carousel-item v-for="item in 6" :key="item">
        <div>
          <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="text-center">
      <div class="text-2xl mt-6">话题</div>
      <el-divider></el-divider>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in 5" :key="index" :span="index === 0 ? 16:8" class="mb-3">
        <el-card :body-style="{ padding: '0px' }">
          <div class="h-60 bg-center bg-cover"
               style="background-image: url('https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png')">
            1231
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center">
      <div class="text-2xl mt-6">话题</div>
      <el-divider></el-divider>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in 5" :key="index" :span="6" class="mb-3">
        <el-card>
          <div slot="header" class="flex items-center justify-between">
            <div>卡片名称</div>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="mb-2">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center">
      <div class="text-2xl mt-6">标签</div>
      <el-divider></el-divider>
    </div>
    <div>
      <el-tag v-for="(item, index) in 30" :key="index" class="m-2">
        标签一
      </el-tag>
    </div>
    <div class="text-center">
      <div class="text-2xl mt-6">统计</div>
      <el-divider></el-divider>
    </div>
    <div class="flex items-center justify-center">


    </div>
    <div class="max-w-screen-md mx-auto mb-10">
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">博文</div>
            <div class="text-sm mt-1 text-gray-500">123123</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">开源</div>
            <div class="text-sm mt-1 text-gray-500">123123</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">话题</div>
            <div class="text-sm mt-1 text-gray-500">123123</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">标签</div>
            <div class="text-sm mt-1 text-gray-500">123123</div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style scoped>

</style>