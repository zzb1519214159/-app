<!-- 关联疾病 -->
<template>
  <div>
    <el-dialog
      title="选择疾病\症状"
      :visible.sync="dialogBoole"
      width="50%"
      :before-close="handleClose"
      class="dialogIllness">
      <div class="illnessTop">
        <label for="疾病名称">疾病名称</label>
        <el-input placeholder="请输入疾病关键字" id="疾病名称"/>
        <el-button type="primary">查询</el-button>
      </div>
      <p class="borderP topP"></p>
      <div>
        <ul>
          <li v-for="(item,index) in arryDataA" :key="index" @click="itemClick(item,index)" class="littleHand" :class="{liClick:item.boole}">
            {{item.name}}
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">批量添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    arryData:Array,
    dialogVisible:Boolean
  },
  data(){
    return{
      dialogBoole:false,
      arryDataA:[],
      itemPush:[],
    }
  },
  watch:{
    arryData(val){
      this.arryDataA = val
    },
    dialogVisible(val){
      this.dialogBoole = val;
      this.itemPush = [];
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit("doneBoole",false);
          done();
        })
        .catch(_ => {});
    },
    itemClick(item,index){
      this.arryDataA[index].boole = !this.arryDataA[index].boole;
      if(item.boole===true){
        this.itemPush.push({id:item.id,name:item.name});
      }else{
        this.itemPush.splice(index,1)
      }
    },
    determine(){
      this.dialogBoole = false;
      let params = {
        itemPush:this.itemPush,
        dialogBoole:this.dialogBoole
      };
      this.$emit("determineClick",params);
    },
  }
}
</script>

<style lang="scss" scoped>
 .dialogIllness{
  .illnessTop{
    display: flex;
    align-items: center;
    /deep/ .el-input{
      width: 20%;
      margin: 0 10px;
    }
  }
  .topP{
    margin-top: 10px;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    padding: 0 5px;
    li{
      width: 161px;
      height: 35px;
      line-height: 35px;
      margin-top: 10px;
      border: 1px solid rgba(224, 224, 224, 1);
      text-align: center;
      &:not(:last-child){
        margin-right: 10px;
      }
    }
    .liClick{
      border: 0.5px solid rgba(38, 136, 201, 1);
    }

  }
}
</style>