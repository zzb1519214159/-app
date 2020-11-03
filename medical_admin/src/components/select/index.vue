<!-- 多个关联下拉框 -->
<template>
  <div class="selectCommon">
    <div class="relevanceLeft" v-if="textDefault">
      <el-select 
        v-model="ruleForm.provinceId" 
        clearable 
        :placeholder="textDefault" 
        @change="changeVal('provinceId')" 
        @visible-change="visibleChange($event,'',0)"
        @clear="clearVal(ruleForm.provinceId,'provinceId','cityId','areaId','d')">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.name"
          :value="item.cityId">
        </el-option>
      </el-select>
    </div>
    <div class="relevanceLeft" v-if="textDefault1">
      <el-select 
        v-model="ruleForm.cityId" 
        clearable 
        :placeholder="textDefault1" 
        :disabled="!ruleForm.provinceId&&textDefault!=''" 
        @change="changeVal('cityId')"
        @visible-change="visibleChange($event,'provinceId',1)"
        @clear="clearVal(ruleForm.cityId,'cityId','areaId')">
        <el-option
          v-for="(item,index) in options1"
          :key="index"
          :label="item.name"
          :value="item.cityId">
        </el-option>
      </el-select>
    </div>
    <div class="relevanceLeft" v-if="textDefault2">
      <el-select 
        v-model="ruleForm.areaId" 
        clearable 
        :placeholder="textDefault2" 
        :disabled="!ruleForm.cityId"
        @change="changeVal('areaId')"
        @visible-change="visibleChange($event,'cityId',2)"
        @clear="clearVal(ruleForm.areaId,'d')">
        <el-option
          v-for="item in options2"
          :key="item.cityId"
          :label="item.name"
          :value="item.cityId">
        </el-option>
      </el-select>
    </div>
    <template v-if="textDefault3">
      <el-select 
        v-model="ruleForm.d" 
        clearable 
        :placeholder="textDefault3" 
        :disabled="!ruleForm.areaId" 
        @change="changeVal('d')"
        @visible-change="visibleChange($event,'areaId',3)">
        <el-option
          v-for="item in options3"
          :key="item.cityId"
          :label="item.name"
          :value="item.cityId">
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    options:Array, //接口值
    options1:Array,
    options2:Array,
    options3:Array,
    itemIndex:Number,//循环表单下标
    textDefault:{ // 带有默认值
      type: String,
      default: ''
    },
    textDefault1:String,// 占位符
    textDefault2:String,
    textDefault3:String,
  },
  data(){
    return{
      ruleForm:{
        provinceId:null,
        cityId:null,
        areaId:null,
        d:null
      },
    }
  },
  methods:{
    // 选中值发生变化时触发
    changeVal(text){
      this.$nextTick(()=>{
        let data = {
          text,
          ...this.ruleForm,
          index:this.itemIndex
        };
        this.$emit("dataTransmit",data);
      })
    },
    // 清空选中值
    clearVal(val,title,title1,title2,title3){
      if(!val){
        title ? this.ruleForm[title] = null : title;
        title1 ? this.ruleForm[title1] = null : title1;
        title2 ? this.ruleForm[title2] = null : title2;
        title3 ? this.ruleForm[title3] = null : title3;
      };
      // this.$emit("dataTransmit",this.ruleForm);
    },
    // 下拉框出现显示触发
    visibleChange(boole,val,index){
      let data = {boole,val,index};
      this.$emit('judgeIndex',data)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectCommon {
    display: flex;
    flex-wrap: wrap;
    .relevanceLeft {
        margin-right: 10px;
        margin-bottom: 10px;
    }
  /deep/.el-input {
    width: 200px;
  }
}
</style>
