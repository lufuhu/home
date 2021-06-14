<template>
  <div>
    <el-row :gutter="16">
      <el-col v-for="(item, index) in list" :key="index" :span="12" class="mb-4">
        <el-card>
          <div class="truncate">
            <el-link :href="item.url" target="_blank" class="font-bold">{{ item.title }}</el-link>
          </div>
          <div class="my-3 text-sm text-gray-400 leading-6 truncate-2 h-12" v-html="item.summary"></div>
          <div class="text-sm text-gray-400 flex items-center">
            <div v-if="item.topic" class="flex items-center">
              <i class="el-icon-connection"></i>
              <el-link class="ml-1" type="info">{{ item.topic }}</el-link>
            </div>
            <div v-if="item.tag.length > 0" class="flex items-center">
              <i class="el-icon-price-tag ml-2"></i>
              <el-link v-for="(item1, index1) in item.tag" :key="index1" class="ml-1" type="info">
                {{ item1 }}
              </el-link>
            </div>
            <i class="el-icon-time ml-2"></i>
            <div class="ml-1">{{ $utils.timeFormat(item.created_at) }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="text-center my-4">
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="params.page"
          :total="total"
          :page-size="per_page"
          @current-change="paginationChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "articleList",
  data() {
    return {
      list: [],
      per_page: 0,
      total: 0,
      params: {
        keyword: '',
        page:1,
      },
    }
  },
  watch: {
    articleListData: function (val) {
      this.list = val.data.data
      this.per_page = val.data.per_page
      this.total = val.data.total
    },
  },
  mounted() {
    this.articleList(this.params);
  },
  methods: {
    ...mapActions(["articleList"]),
    paginationChange(page){
      this.params.page = page;
      this.params.cache = false;
      this.articleList(this.params)
    }

  },
  computed: {
    ...mapGetters(["articleListData"])
  }
}
</script>

<style scoped>

</style>