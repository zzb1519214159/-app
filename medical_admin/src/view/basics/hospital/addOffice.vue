<!-- 基本设置 > 医院管理 > 添加科室 -->
<template>
  <div class="container generalNew">
   <div class="header">
      <p><img src="../../../assets/images/u2789.png"></p>
      <div class="textTab">
        <div class="flexOverall">
          <p class="fontText">{{listData.name}}</p>
          <p><el-button type="primary" @click="addoffice">+ 添加科室</el-button></p>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in listData.child" :key="index" :label="item.name" :name="item.id+''"></el-tab-pane>
        </el-tabs>
     </div>
   </div>
   <p class="borderP"></p>
   <div class="main">
     <ul class="ulOne">
      <li 
        class="littleHand"
        v-for="(item,index) in mainListLi" 
        :key="index" 
        :class="{colorClick:index===mainIndex}" 
        @click="indexClick(index,item.departmentId)">{{item.name}}
        <span v-show="index===mainIndex">（{{ulTwoArry.length}}）</span>
      </li>
     </ul>
     <div class="bodyDiv">
      <p class="fontTextA">{{ulTwoArry.length>0 ? ulTwoArry[0].level2Departments :'暂无'}}（{{ulTwoArry.length}} 名）
      </p>
      <ul class="ulTwo">
        <li class="bodyLi" v-for="(item,index) in ulTwoArry" :key="index" >
          <p>
            <img :src="user_img+item.header" v-if="item.header">
            <img src="../../../assets/images/404.png" v-else>
          </p>
          <div>
            <p class="fontTextA">{{item.name}}</p>
            <p class="fontsize12">{{item.title}}</p>
            <p class="fontsize12">{{item.level2Departments}}</p>
          </div>
        </li>
      </ul>
     </div>
   </div>
   <el-dialog
    title="选择科室"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    class="dialogText">
      <tree-transfer 
        :title="title" 
        :from_data='formData' 
        :to_data='rightTreeDo' 
        :defaultProps="{label:'name'}" 
        @addBtn='add' 
        @removeBtn='remove' 
        :mode='mode' 
        height='540px' 
        filter 
        openAll>
      </tree-transfer>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm" :disabled="departments.length===0">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'; // 引入
import {hospitalDetail,relation,doctor,departmentsList} from "@/api"
export default {
  components:{
    treeTransfer
  },
  data(){
    return{
      activeName: null,
      mainListLi:[
        // {
        // id:0,
        // name:'呼吸内科（3）',
        // },{
        //   id:1,
        //   name:'消化科',
        // },{
        //   id:2,
        //   name:'儿科',
        // }
      ],
      mainIndex:0,
      ulTwoArry:[],
      dialogVisible: false,
      mode: "transfer", // transfer addressList
      //自定义pid的参数名，默认为"pid" 必填：false
      formData:[ ],
      //目标数据 类型：Array 必填：true 补充：数据格式同element-ui tree组件，但必须有id和pid
      toData:[],
      title:['待选科室', '已选科室'],
      listData:{},
      departments:[],
      hospitalId:null,
      hospitalId:-1,
      departmentId:-1,
      rightTree:[],
      rightTreeDo:[],
      // listDoctor:[]
    }
  },
  methods:{
    handleClick(tab, event) {
      this.hospitalId = tab.name;
      this.doctorlist();
    },
    indexClick(index,id){
      this.mainIndex = index;
      this.departmentId = id;
      this.doctorlist();
    },
    addoffice(){
      this.departmentsListDo();
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      obj.nodes.forEach(item=>{
        if(item.pid===1){
          this.departments.push(item.id);
        }
      })
    },
    // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      this.departments.forEach((item,index)=>{
        obj.keys.forEach(item1=>{
          if(item==item1){
            this.departments.splice(index,obj.nodes.length)
          }
        })
      })
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
    },
    confirm(){
      let data = {
        id:this.hospitalId,
        departments:this.departments.join(",")
      };
      relation(data).then(res=>{
        if(res.code===0){
          this.dialogVisible = false;
          this.changLoader(res.message);
          this.hospitalDetailList();
        };
      })
    },
    // 科室列表
    departmentsListDo(){
      departmentsList({limit:500}).then(res=>{
        if(res.code===0){
          /*拿到数据源处理parentName=null一级科室*/
          let data = [];
          res.page.list.forEach((item,index)=>{
            if(!item.parentName){
              item.children = [];
              item.pid = 0;
              data.push(item);
            }
            data.forEach((item1,index)=>{
              if(item.parentName&&item.parentName===item.parentName){
                item.pid = 1;
                data[index].children.push(item);
              }
            })
          });
          let rigthArry = [];
          data.forEach(item=>{
            this.rightTree.forEach(item1=>{
              if(item.id===item1.parentId){
                rigthArry.push(JSON.parse(JSON.stringify(item)));
              };
              item.children.forEach((item2,index)=>{
                this.rightTree.forEach(item3=>{
                  item3.id = item3.departmentId;
                  if(item2.id===item3.departmentId){
                    rigthArry.map(item4=>{
                      item4.children = [];
                      item4.children.push(item3);
                      this.departments.push(item3.departmentId);
                      item.children.splice(index,this.rightTree.length)
                      return
                    })
                  }
                })
              })
            });
          });
          // 右侧的数据源
          this.rightTreeDo = rigthArry;
          // 左侧的数据源
          this.formData = data;
        }
      })
    },
    // 新增接口
    // 获取医院科室医生接口
    doctorlist(){
      let data = {
        id:this.hospitalId,
        departmentId:this.departmentId
      };
      doctor(data).then(res=>{
        if(res.code===0){
          this.ulTwoArry = res.data;
        }
      })
    },
    // 医院详情接口
    hospitalDetailList(){
      hospitalDetail({id:this.hospitalId}).then(res=>{
        if(res.code===0){
          res.data.departments.forEach(item=>{
            item.pid = 1;
          })
          this.rightTree = res.data.departments;
          res.data.child.unshift({name:'全部',id:res.data.id})
          this.listData = res.data;
          this.mainListLi = res.data.departments;
          this.activeName = res.data.id+'';
          this.hospitalId = res.data.id;
          this.departmentId = res.data.departments[0].departmentId
          this.doctorlist();
        }
      })
    }
  },
  created(){
    this.hospitalId = this.$route.query.id;
    this.hospitalDetailList();
    let list = [];
    for (let i = 1; i <= 15; i++) {
      list.push({
        key: i,
        label: `备选项 ${ i }`,
        disabled: i === 1
      });
    }
    this.data = list;
  }
}
</script>

<style lang="scss" scoped>
.container{
  .header,.flexOverall,.main,.ulOne,.bodyLi,.ulTwo,.dialogOne{
    display: flex;
  }
  img{
    width: 95px;
  }
  .fontText{
    font-size: 16px;
    font-weight: 700;
  }
  .fontTextA{
    font-size: 14px;
  }
  .fontsize12{
    font-size: 12px;
  }
  .header{
    .textTab{
      margin-top: 6px;
      margin-left: 10px;
      .flexOverall{
        margin-bottom: 20px;
        align-items: center;
        P{
          &:nth-child(1){
            margin-right: 30px;
          }
        }
      }
    }
    /deep/.el-tabs__nav-wrap::after{
      background-color:$colorfff;
    }
  }
  .borderP{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .main{
    .ulOne{
        flex-direction: column;
        text-align: center;
      li{
        width: 136px;
        height: 42px;
        line-height: 42px;
        margin-bottom: 3px;
        font-size: 13px;
        color: $colorfff;
        background-color: $color909399;
      }
      .colorClick{
        background-color: $color409EFF;
      }
    }
    .bodyDiv{
      margin-left: 30px;
      .ulTwo{
        margin: 15px 0;
        flex-wrap: wrap;
        li{
          margin-right: 10px;
          margin-bottom: 10px;
          padding: 15px;
          align-items: center;
          background-color: $colorDCDFE6;
          div{
             margin-left: 10px;
             p{
              margin-bottom: 10px;
             }
          }
        }
      }
    }
  }
  .dialogText{
    .dialogOne{
      justify-content: center;
    }
  }
}
</style>