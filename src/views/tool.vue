<template>
  <div>
    <el-row :gutter="16">
      <el-col v-for="(item, index) in list" :key="index" :span="6" class="mb-4">
        <el-card>
          <div slot="header">
            {{ item.title }}
          </div>
          <el-link class="mb-2" :href="item1.url" v-for="(item1,index1) in item.children" :key="index1" target="_blank">
            <div class="truncate">{{ item1.title }}</div>
          </el-link>
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