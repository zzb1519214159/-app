<!-- 药品列表浮层 -->
<template>
  <el-dialog
      class="dialogDrug"
      :title="title"
      :visible.sync="dialogVisibleTwo"
      width="50%"
      :before-close="handleClose">
      <div>
        <el-form class="paddingClass">
          <div class="demo-ruleForm registerRouleForm">
            <el-form-item label="药品名称">
              <el-input placeholder="请输入药品关键字"></el-input>
            </el-form-item>
            <el-form-item label="按疾病匹配" v-if="state!==1">
              <el-input placeholder="请输入疾病关键字"></el-input>
            </el-form-item>
            <el-form-item label="按科室选择" v-else>
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <div class="tableTop">
          <el-table :data="tableDataTwo" border style="width: 100%" @selection-change="handleSelectionChange" class="bodyTable">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in listParameter"
              :key="index"
              :prop="item.prop"
              :label="item.title"
              :width="item.size"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="addDrugClick(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBatch">批量添加</el-button>
      </span>
    </el-dialog>
</template>
<script>
export default {
  props:{
    tableDataTwo:Array,//数据源
    dialogVisible:Boolean,//是否显示浮层
    title:String,//标题
    state:Number,//显示状态
  },
  data(){
    return{
      listParameter: [
        {
          prop: "num",
          title: "药品编号"
        },
        {
          prop: "drugsName",
          title: "药品名称"
        },
        {
          prop: "specifications",
          title: "规格"
        },
        {
          prop: "manufactor",
          title: "厂家"
        },
        {
          prop: "tradeName",
          title: "商品名"
        },
        {
          prop: "price",
          title: "零售价"
        },
        {
          prop: "state",
          title: "状态"
        }
      ],
      dialogVisibleTwo:false,
      multipleSelection: [],
    }
  },
  watch:{
    dialogVisible(val){
      this.dialogVisibleTwo = val;
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('booleEmit');
          done();
        })
        .catch(_ => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 单选添加
    addDrugClick(item){
      this.$emit('dialogDrug',item);
    },
    // 多选添加
    addBatch(){
      this.$emit('multiple',this.multipleSelection);
    },
  },
}
</script>
<style lang="scss" scoped>
.dialogDrug{
  .paddingClass{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.bodyTable{
  /deep/.el-table__body-wrapper {
    height: 300px;
    overflow-y: auto;
  }
}
</style>