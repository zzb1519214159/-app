<!-- 基本设置 > 科室管理 > 关联疾病 -->
<template>
  <div class="generalNew">
    <div class="header">
      <p>呼吸内科关联疾病</p>
      <p>
        <el-button type="primary" @click="addClick">+ 添加关联疾病</el-button>
      </p>
    </div>
    <div class="bodyMax commonTag">
      <el-tag
        size="medium"
        v-for="(tag,index) in dynamicTags"
        :key="index"
        closable
        :type="tag.type"
        @close="handleClose(tag.diseaseId)"
        effect="plain"
      >{{tag.diseaseName}}</el-tag>
    </div>
    <dialog-illness
      :dialogVisible="dialogVisible"
      :arryData="arryData"
      @determineClick="determineClick"
      @doneBoole="doneBoole"
    />
  </div>
</template>

<script>
import dialogIllness from "@com/dialogIllness";
import {
  relationDisease,
  diseaseSearch,
  diseaseRelation,
  delRelationDisease
} from "@/api";
export default {
  components: {
    dialogIllness
  },
  data() {
    return {
      dynamicTags: [],
      dialogVisible: false,
      arryData: [],
      sicknessId: -1
    };
  },
  methods: {
    handleClose(id) {
      this.delRelationDiseaseDo(id);
    },
    addClick() {
      this.diseaseSearchDo();
    },
    //病症弹窗
    doneBoole(boole) {
      this.dialogVisible = boole;
    },
    determineClick(array) {
      let data = {
        relation: array.itemPush.join(","),
        ...this.sicknessId
      };
      this.diseaseRelationDo(data);
      this.dialogVisible = array.dialogBoole;
    },
    // 删除接口
    delRelationDiseaseDo(diseaseId) {
      let data = {
        diseaseId,
        ...this.sicknessId
      };
      delRelationDisease(data).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.relationDiseaseDo();
        }
      });
    },
    // 科室关联疾病
    diseaseRelationDo(data) {
      diseaseRelation(data).then(res => {
        if (res.code === 0) {
          this.changLoader(res.message);
          this.relationDiseaseDo();
        }
      });
    },
    // 疾病查询接口
    diseaseSearchDo() {
      diseaseSearch().then(res => {
        if (res.code === 0) {
          res.data.forEach(item => {
            item.boole = false;
          });
          this.arryData = res.data;
          this.dialogVisible = true;
        }
      });
    },
    // 科室已关联的疾病接口
    relationDiseaseDo() {
      relationDisease(this.sicknessId).then(res => {
        if (res.code === 0) {
          this.dynamicTags = res.data;
        }
      });
    }
  },
  created() {
    this.sicknessId = this.$route.query;
    this.relationDiseaseDo();
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.bodyMax {
  height: 700px;
  margin-top: 10px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>