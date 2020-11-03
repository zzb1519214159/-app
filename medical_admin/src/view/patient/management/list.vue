<!-- 患者管理模块 -->
<template>
  <div>
    <el-form ref="ruleForm" class="paddingClass">
      <div class="demo-ruleForm registerRouleForm">
        <el-form-item label="患者">
          <el-input v-model="ruleForm.name" placeholder="请输入患者姓名或手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="ruleForm.sex" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-select v-model="ruleForm.age" placeholder="请选择" clearable>
            <el-option
              v-for="item in optionsAge"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地">
          <select-index
            :options="options1"
            :options1="options2"
            :options2="options3"
            @dataTransmit="dataTransmit"
            @judgeIndex="judgeIndex"
            textDefault="选择省"
            textDefault1="选择市"
            textDefault2="选择区"
          />
        </el-form-item>
      </div>
      <div class="demo-ruleForm ringth registerRouleForm">
        <div class="demo-ruleForm">
          <el-form-item label="更新时间">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="是否注册">
            <el-select v-model="ruleForm.value" placeholder="请选择">
              <el-option
                v-for="item in optionsTree"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </div>
        <div>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="primary" plain @click="addClick('新增')">+ 新增</el-button>
          <el-button type="primary" plain>批量导入</el-button>
        </div>
      </div>
    </el-form>
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
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="particulars(scope.row.id)">详情</el-button>
            <el-button type="text" size="small" @click="addClick('编辑',scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="followClick(scope.row.id)">随访</el-button>
            <el-button type="text" size="small" @click="openClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <kh-pagination @changeLimit="changeLimit" @changePage="changePage" :page="page" :limit="limit" :totalCount="totalCount"></kh-pagination>
    </div>
  </div>
</template>
<script>
import khPagination from "@com/kh-pagination"
import selectIndex from "@com/select";
import { suffererList, suffererDelete,getCity} from "@/api";

export default {
  components: {
    selectIndex,
    khPagination
  },
  data() {
    return {
      ruleForm: { 
        name: "", 
        sex: null, 
        age: null, 
        provinceId:null,
        cityId:null,
        areaId:null
      },
      value: "",
      listParameter: [
        {
          prop: "updateTimeStr",
          title: "更新时间"
        },
        {
          prop: "name",
          title: "患者姓名"
        },
        {
          prop: "sex",
          title: "性别"
        },
        {
          prop: "age",
          title: "年龄"
        },
        {
          prop: "mobile",
          title: "联系电话"
        },
        // {
        //   prop: "j",
        //   title: "是否注册"
        // },
        {
          prop: "provinceCityArea",
          title: "住址"
        },
        // {
        //   prop: "j",
        //   title: "随访记录"
        // },
        {
          prop: "adminName",
          title: "录入者"
        }
      ],
      tableData: [],
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 0,
          label: "女"
        }
      ],
      options1:[],
      options2:[],
      options3:[],
      optionsAge: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "0-3岁"
        },
        {
          value: 2,
          label: "4-12岁"
        },
        {
          value: 3,
          label: "13-18岁"
        },
        {
          value: 4,
          label: "19-50岁"
        },
        {
          value: 5,
          label: "51-70岁"
        },
        {
          value: 6,
          label: "70以上"
        },

      ],
      optionsTree: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "已注册",
          label: "已注册"
        },
        {
          value: "未注册",
          label: "未注册"
        }
      ],
      // 当前页
      page:1,
      // 当前页数
      limit: 10,
      // 总页数
      totalCount:0,
      regionItem:{}
    };
  },
  methods: {
    query(){
      this.page=1;
      this.limit=10;
      if(this.value){
        this.ruleForm.startTime = this.value[0];
        this.ruleForm.endTime = this.value[1];
      }else{
        this.ruleForm.startTime = '';
        this.ruleForm.endTime = '';
      };
      this.suffererListDo();
    },
    // 每页条
    changeLimit(val) {
      this.limit = val;
      this.suffererListDo();
    },
    // 当前页
    changePage(val) {
      this.page = val;
      this.suffererListDo();
    },
    // 父子传值数据
    dataTransmit(item) {
      this.regionItem = item;
      this.ruleForm.provinceId = item.provinceId;
      this.ruleForm.cityId = item.cityId;
      this.ruleForm.areaId = item.areaId;
    },
    judgeIndex(data) {
      if (data.boole) {
        if (data.val === "") {
          this.getCityList();
        } else {
          this.getCityList(this.regionItem[data.val],this.regionItem.text);
        }
      }
    },
    addClick(text, id) {
      this.$router.push({
        path: "/patient/management/addManagement",
        query: { name: text + "患者", id }
      });
    },
    particulars(id) {
      this.$router.push({
        path: "/patient/management/particulars",
        query: { id }
      });
    },
    followClick(id) {
      this.$router.push({path:"/patient/management/follow",query:{id}});
    },
    openClick(id) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.suffererDeleteDo(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 地址接口
    getCityList(parentId,text) {
      getCity({ parentId }).then(res => {
        if (res.code === 0) {
          if (!text) {
            this.options1 = res.data;
          } else if (text === "provinceId") {
            this.options2 = res.data;
          } else {
            this.options3 = res.data;
          }
        }
      });
    },
    // 删除接口
    suffererDeleteDo(id) {
      suffererDelete({ id }).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.suffererListDo();
        }
      });
    },
    // 列表接口
    suffererListDo() {
      let params = {
        page:this.page,
        limit:this.limit,
        ...this.ruleForm
      }
      suffererList(params).then(res => {
        this.totalCount = res.page.totalCount;
        if (res.code === 0) {
          res.page.list.forEach(item=>{
            item.age = item.age+"岁";
            item.sex = item.sex === 0 ? '女' : '男';
            item.provinceCityArea = item.province+" "+item.city+" "+item.area;
          })
          this.tableData = res.page.list;
        }
      });
    }
  },
  created() {
    this.suffererListDo();
  }
};
</script>

<style lang="scss" scoped>
.paddingClass {
  padding: 20px 20px;
}
.bottom{
  /deep/.el-table__body-wrapper{
    height: 510px;
  }
}
</style>