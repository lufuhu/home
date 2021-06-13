<template>
  <div>
    <div class="w-screen h-screen flex">
      <div class="flex-none w-64 flex flex-col h-full">
        <div class="border-b h-10 px-3 flex items-center justify-center">
          <div class="flex-1">Lufuhu</div>
          <div>
            <router-link to="/">
              <el-button size="mini" type="text" round><i class="el-icon-plus"></i>新增</el-button>
            </router-link>
          </div>
        </div>
        <div class="flex-1">
          <el-input
              class="input-b-border"
              placeholder="请输入关键字"
              v-model="params.keyword">
            <i @click="articleMdList(params)" slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
          </el-input>
          <div
              v-for="(item, index) in list"
              :key="index"
              :class="form.id === item.id ? 'item-active':''"
              class="flex items-center justify-between px-3 border-b cursor-pointer">
            <router-link class="flex-1 truncate py-3 text-sm" :to="'/'+item.id">
              {{ item.title }}
            </router-link>
            <div class="px-2">
              <el-dropdown trigger="click">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <a :href="'http://www.luhufu.com/articles/'+item.title +'.html'" target="_blank">查看</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="clickBuild(item.id)">构建</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="clickDel(item)">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="my-2">
            <el-pagination
                :background="true"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :current-page="current_page"
                :total="total"
                :page-size="per_page">
            </el-pagination>
          </div>
        </div>
      </div>
      <div
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(225, 225, 225, 0.8)"
          class="flex-1 flex flex-col w-full h-full">
        <div class="flex-none flex items-center">
          <el-input v-model="form.title" class="input-b-border" placeholder="标题"></el-input>
          <el-button class="mx-1" size="small" type="primary" @click="dialogVisible=true">保存</el-button>
        </div>
        <div class="flex-1">
          <iframe
              class="w-full h-full"
              ref="editormd"
              src="/tools/editor.md/index.html"
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
    <el-dialog
        title="其他"
        :visible.sync="dialogVisible"
        width="60vh">
      <el-form ref="form" size="small" :model="form" label-width="50px">
        <div class="flex">
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                  v-for="(item, index) in enumType"
                  :key="index"
                  :label="item.value"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="ml-3" label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                  v-for="(item, index) in enumStatus"
                  :key="index"
                  :label="item.value"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="form.pic" :src="form.pic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="话题">
          <el-select
              class="w-full"
              v-model="form.topic"
              filterable
              allow-create
              default-first-option
              placeholder="请选择">
            <el-option
                v-for="(item, index) in enumTopic"
                :key="index"
                :label="item.value"
                :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
              class="w-full"
              v-model="form.tag"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择">
            <el-option
                v-for="(item, index) in enumTag"
                :key="index"
                :label="item.value"
                :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  data() {
    return {
      form: {
        id: '',
        title: "",
        type: '',
        pic: "",
        topic: "",
        tag: [],
        content: "",
        status: "",
      },
      enumStatus: {},
      enumType: {},
      enumTag: [],
      enumTopic: [],
      edIframeWin: {},
      isIframeOnload: false,
      isDetailsData: false,
      dialogVisible: false,
      list: [],
      current_page: 0,
      per_page: 0,
      total: 0,
      params: {
        keyword: '',
      },
      loading: false
    }
  },
  watch: {
    articleEnumData: function (val) {
      this.enumStatus = val.data.enumStatus
      this.enumType = val.data.enumType
    },
    articleMdDetailsData: function (val) {
      this.form = val.data
      this.isDetailsData = true;
      this.setContent();
      this.loading = false
    },
    articleMdAddData: function (val) {
      this.onSaveSuccess(val.data)
    },
    articleMdUpdateData: function (val) {
      this.onSaveSuccess(val.data)
    },
    articleMdListData: function (val) {
      this.list = val.data.data
      this.current_page = val.data.current_page
      this.per_page = val.data.per_page
      this.total = val.data.total
    },
    articleMdDelData: function () {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.articleMdList(this.params);
    },
    articleMdBuildData: function () {
      this.$message({
        type: 'success',
        message: '构建成功!'
      });
    },
    $route() {
      this.getDetails();
    }
  },
  mounted() {
    this.edIframeWin = this.$refs.editormd.contentWindow;
    this.articleEnum();
    this.articleMdList(this.params);
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
    ...mapActions(['articleEnum', 'articleMdAdd', 'articleMdDetails', 'articleMdUpdate', "articleMdList", 'articleMdDel', 'articleMdBuild']),
    getDetails() {
      this.loading = false;
      if (this.$route.params.id) {
        this.form.id = this.$route.params.id;
        this.loading = true;
        this.articleMdDetails({id:this.form.id});
      } else {
        this.form = this.$options.data().form;
        this.setContent();
      }
    },
    onSubmit() {
      if (this.form.id) {
        this.articleMdUpdate(this.form);
      } else {
        this.articleMdAdd(this.form);
      }
    },
    onSaveSuccess(val) {
      this.dialogVisible = false;
      this.articleMdList(this.params);
      if (val) {
        this.$router.push('/' + val)
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
    clickBuild(id) {
      this.articleMdBuild({id: id});
    },
    clickDel(item) {
      this.$confirm("是否删除此文章（" + item.title + "）", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.articleMdDel({id: item.id});
        if (parseInt(this.$route.params.id) === item.id) {
          this.$router.push('/');
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.pic = URL.createObjectURL(file.raw);
    },
  },
  computed: {
    ...mapGetters(['articleEnumData', 'articleMdAddData', 'articleMdDetailsData', 'articleMdUpdateData', "articleMdListData", 'articleMdDelData', 'articleMdBuildData'])
  }
}
</script>

<style scoped>
.item-active {
  background-color: #f2f7fa;
}

</style>