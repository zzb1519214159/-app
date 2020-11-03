<!-- 基本设置 > 科室管理 > 关联药品 -->
<!-- 基本设置 > 科室管理 > 关联疾病 -->
<template>
  <div class="generalNew">
    <div class="header">
      <p>呼吸内科关联药品</p>
      <p><el-button type="primary" @click="addClick">+ 添加关联药品</el-button></p>
    </div>
    <!-- 表格 -->
    <div class="paddingClass tableTop">
      <el-table :data="tableData" border style="width: 100%" class="bottom">
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
            <el-button type="text" size="small" @click="openClick(scope.row.drugsId)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 关联药品浮层 -->
    <dialog-drug 
      :tableDataTwo="tableDataTwo" 
      :dialogVisible="dialogVisible"
      @dialogDrug="dialogDrug"
      @multiple="multiple"
      @booleEmit="booleEmit"
      title="添加关联药品"/>
  </div>
</template>

<script>

import { relationDrugs,medicalDrugs,diseaseRelation,drugsRelation,delRelationDrugsId} from "@/api";
import dialogDrug from "@com/dialogDrug"
export default {
  components:{
    dialogDrug
  },
  data(){
    return{
      tableData: [],
      tableDataTwo:[],
      dialogVisible: false,
      drugId:-1,
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
    }
  },
  methods:{
    addClick(){
      this.medicalDrugsDo();
      this.dialogVisible = true;
    },
    booleEmit(){
      this.dialogVisible = false;
    },
    dialogDrug(data){
      this.drugsRelationDo(data.id);
    },
    multiple(data){
      let dataArry = [];
      data.forEach(item=>{
        dataArry.push(item.id);
      });
      let dataSting = dataArry.join(",");
      this.drugsRelationDo(dataSting);
    },
    openClick(id) {
      this.$confirm("此操作将移除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.delRelationDrugsIdDo(id);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 删除接口
    delRelationDrugsIdDo(drugsId){
      let data = {
        id:this.drugId,
        drugsId
      };
      delRelationDrugsId(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.relationDrugsDo();
        }
      })
    },
    // 科室关联药品/新增接口
    drugsRelationDo(relation){
      let data = {
        id:this.drugId,
        relation
      };
      drugsRelation(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.relationDrugsDo();
          this.dialogVisible = false;
        }
      })
    },
    // 药品列表
    medicalDrugsDo(){
      medicalDrugs({limit:100}).then(res=>{
        if(res.code===0){
          this.tableDataTwo = res.page.list;
        }
      })
    },
    // 科室关联的药品/列表接口
    relationDrugsDo(){
      relationDrugs({id:this.drugId}).then(res=>{
        if(res.code===0){
          this.tableData = res.data;
        }
      })
    }
  },
  created() {
    this.drugId = this.$route.query.id;
    this.relationDrugsDo()
  },
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
}
.paddingClass{
  padding: 0;
}
</style>