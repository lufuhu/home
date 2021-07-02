<template>
  <div>
    <el-row :gutter="16">
      <el-col v-for="(item, index) in list" :key="index" :span="6" class="mb-4">
        <el-card>
          <a :href="item.url" target="_blank" class="flex items-center">
            <img class="w-8 h-8 flex-none mr-2" :src="item.icon">
            <div class="truncate flex-1">{{item.name}}</div>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "tool",
  data() {
    return {
      list: [],
    }
  },
  watch: {
    toolListData: function (val) {
      this.list = val.data
    },
  },
  mounted() {
    this.toolList();
  },
  methods: {
    ...mapActions(["toolList"]),

  },
  computed: {
    ...mapGetters(["toolListData"])
  }
}
</script>

<style scoped>

</style>