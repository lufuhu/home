<template>
  <div>
    <div class="w-screen h-screen flex">
      <div class="flex-none w-96 flex flex-col h-full">
        <div class="border-b flex-none h-12 px-3 flex items-center justify-center">
          <router-link to="/" class="flex-1 flex items-center">
            <img class="w-6 h-6" src="../../assets/logo.png">
            <div class="font-bold text-sm">编程问号</div>
          </router-link>
          <router-link to="/edit/interview">
            <el-button size="mini" type="text" round><i class="el-icon-plus"></i>新增</el-button>
          </router-link>
        </div>
        <div class="flex-1 overflow-y-auto overflow-x-hidden h-0">
          <el-input
              class="input-b-border"
              placeholder="请输入关键字"
              v-model="params.keyword">
            <i @click="onSearch()" slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
          </el-input>
          <div
              v-for="(item, index) in list"
              :key="index"
              :class="form.id === item.id ? 'item-active':''"
              class="flex items-center justify-between px-3 border-b cursor-pointer h-16">
            <router-link class="flex-1 truncate-2 text-sm" :to="'/edit/interview/'+item.id">
              {{ item.title }}
            </router-link>
            <div class="px-2">
              <el-dropdown trigger="click">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="clickDel(item)">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="h-12 flex-none">
          <el-pagination
              class="mt-2"
              :background="true"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              :current-page="params.page"
              :total="total"
              :page-size="per_page"
              @current-change="paginationChange">
          </el-pagination>
        </div>
      </div>
      <div
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(225, 225, 225, 0.8)"
          class="flex-1 flex flex-col w-full h-full">
        <div class="flex-none flex items-end h-12">
          <el-input v-model="form.title" class="input-b-border" placeholder="标题"></el-input>
          <el-select
              class="w-180 input-b-border ml-1"
              v-model="form.tag"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择标签">
            <el-option
                v-for="(item, index) in enumTag"
                :key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
          <el-button size="small" class="mx-1" type="primary" @click="onSubmit()">保存</el-button>
        </div>
        <div class="flex-1">
          <iframe
              class="w-full h-full"
              ref="editormd"
              src="https://www.lufuhu.com/tools/editor.md/index.html"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"
              scrolling="no"
              allowtransparency="yes">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "editInterview",
  data() {
    return {
      form: {
        id: '',
        title: "",
        type: '1',
        pic: "",
        url: "",
        topic: "",
        tag: [],
        sort: 0,
        content: "",
        summary: "",
        status: 1,
      },
      enumTag: [],
      edIframeWin: {},
      isIframeOnload: false,
      isDetailsData: false,
      list: [],
      current_page: 0,
      per_page: 0,
      total: 0,
      params: {
        keyword: '',
      },
      loading: false,
    }
  },
  watch: {
    interviewGetSelectData: function (val) {
      this.enumTag = val.data.tag
    },
    interviewViewData: function (val) {
      this.form = val.data
      this.isDetailsData = true;
      this.setContent();
      this.loading = false
    },
    interviewAddData: function (val) {
      this.onSaveSuccess(val.data)
    },
    interviewEditData: function (val) {
      this.onSaveSuccess(val.data)
    },
    interviewListData: function (val) {
      this.list = val.data.data
      this.per_page = val.data.per_page
      this.total = val.data.total
    },
    interviewDelData: function () {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.interviewList(this.params);
    },
    $route() {
      this.getDetails();
    }
  },
  mounted() {
    this.edIframeWin = this.$refs.editormd.contentWindow;
    this.interviewGetSelect();
    this.interviewList(this.params);
    this.getDetails();
    let that = this;
    window.addEventListener("message", function (event) {
      let data = event.data;
      switch (data.method) {
        case 'onLoad': //初始化完成
          that.isIframeOnload = true;
          that.setContent();
          break;
        case 'onChange': //内容改变事件
          that.form.content = data.content;
          break;
      }
    }, false);
  },
  methods: {
    ...mapActions([
      'interviewGetSelect', 'interviewView', 'interviewList', 'interviewAdd', 'interviewEdit', 'interviewDel'
    ]),
    onSearch(){
      this.params.page = 1;
      this.params.cache = false;
      this.interviewList(this.params)
    },
    paginationChange(page){
      this.params.page = page;
      this.params.cache = false;
      this.interviewList(this.params)
    },
    handleClick(tab) {
      this.form.type = tab.name;
    },
    getDetails() {
      this.loading = false;
      if (this.$route.params.id) {
        this.form.id = this.$route.params.id;
        this.loading = true;
        this.interviewView({id: this.form.id});
      } else {
        this.form = this.$options.data().form;
        this.setContent();
      }
    },
    onSubmit() {
      if (this.form.id) {
        this.interviewEdit(this.form);
      } else {
        this.interviewAdd(this.form);
      }
    },
    onSaveSuccess(val) {
      this.$message({
        type: 'success',
        message: '保存成功!'
      });
      this.interviewList(this.params);
      if (val) {
        this.$router.push('/edit/interview/' + val)
      }
    },
    setContent() {
      if (this.isDetailsData && this.isIframeOnload) {
        this.edIframeWin.postMessage({
          method: 'setContent',
          content: this.form.content
        }, "*");
      }
    },
    clickDel(item) {
      this.$confirm("是否删除此文章（" + item.title + "）", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.interviewDel({id: item.id});
        if (parseInt(this.$route.params.id) === item.id) {
          this.$router.push('/edit/interview');
        }
      });
    },
    handleAvatarSuccess(res) {
      console.log(res)
      this.form.pic = res.data;
    },
  },
  computed: {
    ...mapGetters([
      'interviewGetSelectData', 'interviewViewData', 'interviewListData', 'interviewAddData', 'interviewEditData', 'interviewDelData'
    ])
  }
}
</script>

<style scoped>
.item-active {
  background-color: #f2f7fa;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.w-180{
  width: 45rem;
}
</style>