<!-- 基本设置 > 医院管理 > 新增医院 -->
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm generalNew">
      <el-form-item label="医院全称" prop="name" class="nameInput">
        <el-input v-model="ruleForm.name" placeholder="1-50位汉字、英文、数字、符号及组合"></el-input>
      </el-form-item>
      <el-form-item label="医院等级" prop="grade">
        <el-select v-model="ruleForm.grade">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="areaId">
        <select-index
          ref="areaObj"
          :options="optionsSite"
          :options1="optionsSite1"
          :options2="optionsSite2"
          @dataTransmit="dataTransmit"
          @judgeIndex="judgeIndexTwo"
          textDefault="选择省"
          textDefault1="选择市"
          textDefault2="选择区"/>
      </el-form-item>
       <el-form-item class="nameInput">
          <el-input v-model="ruleForm.address" placeholder="详细街道地址"></el-input>
        </el-form-item>
      <!-- <el-form-item label="医院logo">
        <upload-index/>
      </el-form-item> -->
      <!-- <el-form-item label="医院简介" class="nameInput">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="ruleForm.intro">
        </el-input>
      </el-form-item> -->
      <el-form-item>
         <el-button type="primary" @click="addClick">+ 添加分院</el-button>
      </el-form-item>
      <p class="borderP"></p>
      <ul>
        <!-- v-for动态数据循环表单验证的处理方式 -->
        <li v-for="(item,index) in ruleForm.other" :key="index">
          <el-form-item label="分院名称" class="nameInput" :prop="'other.' + index + '.name'" :rules="item.rules.name">
            <el-input v-model="item.name"></el-input>
            <span class="spanLeft">
              <el-button type="danger" icon="el-icon-delete" @click="deleteClick(index)"></el-button>
            </span>
          </el-form-item>
          <el-form-item label="地址" :prop="'other.' + index + '.areaId'" :rules="item.rules.areaId">
            <select-index
              :ref="item.itemName"
              :options="optionsSiteTwo"
              :options1="optionsSiteTwo1"
              :options2="optionsSiteTwo2"
              :itemIndex="index"
              @dataTransmit="dataTransmitTwo"
              @judgeIndex="judgeIndex"
              textDefault="选择省"
              textDefault1="选择市"
              textDefault2="选择区"/>
          </el-form-item>
          <el-form-item class="nameInput">
            <el-input v-model="item.address" placeholder="详细街道地址"></el-input>
          </el-form-item>
        </li>
      </ul>
      <el-form-item class="bottomBotton">
        <el-button @click="fuRouter">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadIndex from "@com/upload"
import {hospitalAdd,getCity,edit} from "@/api"
import selectIndex from "@com/select"

export default {
  components:{uploadIndex,selectIndex},
  data(){
    return{
      ruleForm: {
        name: '',
        grade:null,
        provinceId:null,
        cityId:null,
        areaId:null,
        other:[{
          index: 0,
          name: "",
          provinceId:null,
          cityId:null,
          areaId:null,
          address:"",
          rules: {
            name: [
              { required: true, message: "请输入分院名称", trigger: "change" }
            ],
            areaId: [
              { required: true, message: "请输入地址", trigger: "change" }
            ]
          }
        }],
      },
      rules: {
        name: [
          { required: true, message: '请输入医院全称', trigger: 'blur' },
        ],
        grade: [
          { required: true, message: '请输入医院等级', trigger: 'change' },
        ],
        areaId: [
          { required: true, message: '请输入地址', trigger: 'change' },
        ],
      },
      options: [{
        value: 3,
        label: '三级甲等'
      },{
        value: 2,
        label: '二级甲等'
      }],
      optionsSite:[],
      optionsSite1:[],
      optionsSite2:[],
      listIndex:0,
      regionItem:{},
      optionsSiteTwo:[],
      optionsSiteTwo1:[],
      optionsSiteTwo2:[],
    }
  },
  methods:{
    // 父子传值数据
    dataTransmit(item){
      this.regionItem = item;
      this.ruleForm.provinceId = item.provinceId;
      this.ruleForm.cityId = item.cityId;
      this.ruleForm.areaId = item.areaId;
    },
    judgeIndexTwo(data){
      if(data.boole){
        this.getCityList(this.regionItem[data.val],this.regionItem.text,false);
      }
    },
    dataTransmitTwo(item){
      this.regionItem = item;
      //拿到数组下标对象名称<--->//获取到对象值
      this.ruleForm.other[item.index].provinceId = item.provinceId;
      this.ruleForm.other[item.index].cityId = item.cityId;
      this.ruleForm.other[item.index].areaId = item.areaId;
    },
    judgeIndex(data){
      if(data.boole){
        this.getCityList(this.regionItem[data.val],this.regionItem.text,true);
      }
    },
    addClick(){
      this.listIndex++;
      let listObj ={
          index: 0,
          name: "",
          provinceId:null,
          cityId:null,
          areaId:null,
          address:"",
          rules: {
            name: [
              { required: true, message: "请输入分院名称", trigger: "change" }
            ],
            areaId: [
              { required: true, message: "请输入地址", trigger: "change" }
            ]
          }
      };
      this.ruleForm.other.push(listObj);
      this.ruleForm.other[this.listIndex].index = this.listIndex
    },
    deleteClick(index){
      this.ruleForm.data.splice(index,1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let dataArry = [];
          this.ruleForm.other.forEach(item=>{
            if(!item.id){
              item.id = 0;
            }
            dataArry.push({
              name:item.name,
              provinceId:item.provinceId,
              cityId:item.cityId,
              areaId:item.areaId,
              address:item.address,
              id:item.id
            })
          })
          delete this.ruleForm.other;
          let data = {
            ...this.ruleForm,
            other:JSON.stringify(dataArry)
          };
          this.hospitalAddAdd(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    fuRouter(){
      this.$router.go(-1);
    },
    // 回显接口
    editList(id){
      edit({id}).then(res=>{
        if(res.code===0){
          let dataArry = [];
          res.data.child.forEach((item,index)=>{
            item.rules =  {
              name: [
                { required: true, message: "请输入分院名称", trigger: "change" }
              ],
              areaId: [
                { required: true, message: "请输入地址", trigger: "change" }
              ]
            },
            item.index=index,
            item.itemName='itemName'
          });
          let data = {
            ...res.data,
            other:res.data.child
          };
          delete data.child;
          delete this.ruleForm.other
          this.ruleForm = data;
          this.regionItem = data;
          // 子组件通过ref回显
          this.$refs.areaObj.ruleForm = this.regionItem;
          this.$nextTick(()=>{
            this.$refs.itemName.forEach((item,index)=>{
              this.getCityList(0,'',true);
              this.getCityList(data.other[index].provinceId,'provinceId',true);
              this.getCityList(data.other[index].cityId,'cityId',true);
              item.ruleForm = data.other[index];
            });
          })
          this.getCityList();
          this.getCityList(data.provinceId,'provinceId');
          this.getCityList(data.cityId,'cityId');
        }
      })
    },
    // 地址接口
    getCityList(parentId,text,val){
      getCity({parentId}).then(res=>{
        if(res.code===0){
          if(val){
            if(!text){
              this.optionsSiteTwo = res.data;
            }else if(text === 'provinceId'){
              this.optionsSiteTwo1 = res.data;
            }else{
              this.optionsSiteTwo2 = res.data;
            }
          }else{
            if(!text){
              this.optionsSite = res.data;
            }else if(text === 'provinceId'){
              this.optionsSite1 = res.data;
            }else{
              this.optionsSite2 = res.data;
            }
          }
        }
      })
    },
    // 新增接口
    hospitalAddAdd(data){
      hospitalAdd(data).then(res=>{
        if(res.code===0){
          this.changLoader(res.message);
          this.fuRouter()
        }
      })
    }
  },
  created(){
    this.getCityList();
  },
  mounted() {
    if(this.$route.query.name==='编辑医院'){
      this.editList(this.$route.query.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.nameInput{
  /deep/ .el-input,.el-textarea{
    width: 20%;
  }
  .spanLeft{
    margin-left: 10px;
  }
}
</style>