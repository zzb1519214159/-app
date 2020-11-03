<!-- 患者管理  >  录入患者  >  患者详情 -->
<template>
  <div class="generalNew">
    <div class="header">
      <div>
        <span>{{fromData.name}}</span>
        <span>录入时间：{{fromData.updateTimeStr}}</span>
      </div>
      <div class="adjust">
        <p>性别：{{fromData.sex}}</p>
        <p>年龄：{{fromData.age}}</p>
        <p>手机号：{{fromData.mobile}} <span>（未注册）</span></p>
        <p>住址：{{fromData.province+" "+fromData.city}}{{fromData.address?fromData.address:''}}</p>
      </div>
    </div>
    <p class="borderP borderTop"></p>
    <div class="home">
      <div class="adjust sizeDiv">
        <p> 就医记录时间：{{fromData.visitTime}}</p>
        <p>{{fromData.hospital}}</p>
        <p>{{fromData.department1}} <i v-if="fromData.department1&&fromData.department2">-</i> {{fromData.department2}}</p>
        <p>医生：{{fromData.doctor}}</p>
        <p>疾病：<label v-for="(item,index) in fromData.disease" :key="index">
          {{item.diseaseName}}、
        </label>
        </p>
      </div>
      <div class="paddingClass tableTop">
        <el-table :data="fromData.drugs" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
          <el-table-column
            v-for="(item,index) in listParameter"
            :key="index"
            :prop="item.prop"
            :label="item.title"
            :width="item.size"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <div v-if="$route.query.name==='患者详情'">
        <p class="borderP borderTop"></p>
        <div class="paddingClass tableTop">
          <el-table :data="fromData.followup" border style="width: 100%" :header-cell-style="{background:'#3333330d'}">
            <el-table-column
              v-for="(item,index) in listData"
              :key="index"
              :prop="item.prop"
              :label="item.title"
              :width="item.size"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {suffererDetail} from "@/api"
export default {
  data(){
    return{
      listParameter: [
        {
          prop: "drugsName",
          title: "处方",
        },
        {
          prop: "b",
          title: "规格"
        },
        {
          prop: "num",
          title: "数量"
        },
        {
          prop: "d",
          title: "购买金额"
        },
        {
          prop: "e",
          title: "配送时间"
        },{
          prop: "location",
          title: "收货信息"
        }
      ],
      listData: [
        {
          prop: "followUpDay",
          title: "随访时间",
        },
        {
          prop: "drugs",
          title: "用药情况"
        },
        {
          prop: "pathography",
          title: "病情记录"
        },
        {
          prop: "admin",
          title: "记录人"
        }
      ],
      fromData:{

      }
    }
  },
  methods:{
    // 详情接口
    suffererDetailDo(followUp){
      let data  = {
        id:this.$route.query.id,
        followUp
      }
      suffererDetail(data).then(res=>{
        if(res.code===0){
          res.data.sex = res.data.sex===0?'女':res.data.sex===1?'男':"未知";
          this.fromData = {...res.data,...res.data.visit};
          this.fromData.drugs.forEach(item=>{
            item.location = this.fromData.province+" "+this.fromData.city;
          })
        }
      })
    },
  },
  created() {
    // 患者详情这边的判断是从随访记录跳转过来的
    if(this.$route.query.name === '患者详情'){
      this.suffererDetailDo(1);
    }else{
      this.suffererDetailDo(0);
    }
  },
}
</script>

<style lang="scss" scoped>
.generalNew{
  .header{
    div{
      color: #333;
      &:nth-child(1){
        margin-bottom: 20px;
        span{
          &:nth-child(1){
            margin-right: 20px;
            font-size: 14px;
            font-weight:bold;
          }
          &:nth-child(2){
            font-size: 12px;
          }
        }
      }
      &:nth-child(2){
        span{
          color: #aaa
        }
      }
    }
  }
 .borderTop{
    margin-top: 20px;
  }
  .adjust{
    display: flex;
    font-size: 14px;
    p{
      margin-right: 40px;
      span{
        color: #aaa
      }
    }
  }
      
  .home{
    .sizeDiv{
      font-size: 13px;
    }
    .paddingClass{
      padding-left: 0
    }
  }
}

</style>