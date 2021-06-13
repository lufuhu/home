<template>
  <div>
    <el-carousel indicator-position="outside" :interval="4000">
      <el-carousel-item v-for="(item, index) in swiper" :key="index">
        <div class="w-full h-full bg-center	bg-no-repeat bg-cover px-32" v-lazy:background-image="item.pic">
          <div class="flex items-center justify-center text-white flex-col h-full">
           <a :href="item.url" target="_blank">
             <div class="mb-2 text-2xl">{{item.title}}</div>
           </a>
            <div class="text-sm" v-html="item.summary"></div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="text-center">
      <div class="text-2xl mt-6">话题</div>
      <el-divider></el-divider>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in project" :key="index" :span="index === 0 ? 16:8" class="mb-3">
        <el-card :body-style="{ padding: '0px' }">
          <div class="h-60 bg-center	bg-no-repeat bg-cover px-32" v-lazy:background-image="item.pic">
            <div class="flex items-center justify-center text-white flex-col h-full">
              <a :href="item.url" target="_blank">
                <div class="mb-2 text-2xl">{{item.title}}</div>
              </a>
              <div class="text-sm" v-html="item.summary"></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center">
      <div class="text-2xl mt-6">话题</div>
      <el-divider></el-divider>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in topic" :key="index" :span="6" class="mb-3">
        <el-card :body-style="{ padding: '10px' }">
          <div class="flex items-center justify-between border-b pb-1 mb-1">
            <div>{{ item.name }}</div>
            <router-link class="text-xs text-gray-500" :to="'/article?topic='+item.name">
              更多
            </router-link>
          </div>
          <div class="h-36 pt-1">
            <div v-for="(item1, index1) in item.children" :key="index1" class="mb-1">
              <el-link type="info" class="truncate-link" target="_blank" :href="item1.url">{{ item1.title }}</el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center">
      <div class="text-2xl mt-6">标签</div>
      <el-divider></el-divider>
    </div>
    <div>
      <router-link v-for="(item, index) in tag" :key="index" :to="'/article?tag='+item">
        <el-tag class="m-2">
          {{ item }}
        </el-tag>
      </router-link>
    </div>
    <div class="text-center">
      <div class="text-2xl mt-6">统计</div>
      <el-divider></el-divider>
    </div>
    <div class="max-w-screen-md mx-auto mb-10">
      <el-row :gutter="30">
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">博文</div>
            <div class="text-sm mt-1 text-gray-500">{{ statistics.article }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">开源</div>
            <div class="text-sm mt-1 text-gray-500">{{ statistics.project }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">话题</div>
            <div class="text-sm mt-1 text-gray-500">{{ statistics.topic }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center flex-col justify-center bg-gray-300 rounded-full w-24 h-24 mx-auto">
            <div class="text-xl font-bold">标签</div>
            <div class="text-sm mt-1 text-gray-500">{{ statistics.tag }}</div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "home",
  data() {
    return {
      swiper: [],
      tag: [],
      topic: [],
      project: [],
      statistics: {},
    }
  },
  watch: {
    homeDataData: function (val) {
      this.swiper = val.data.swiper
      this.tag = val.data.tag
      this.topic = val.data.topic
      this.project = val.data.project
      this.statistics = val.data.statistics
    },
  },
  mounted() {
    this.homeData();
  },
  methods: {
    ...mapActions(["homeData"]),
  },
  computed: {
    ...mapGetters(["homeDataData"])
  }
}
</script>


<style scoped>

</style>