<!-- 上传图片组件 -->
<template>
  <div>
    <el-upload
      action="#"
      ref="my-upload"
      class="avatar-uploader"
      :class="{'demo-httpRequestImg':httpRequestImg,'demo-httpRequestImgb':httpRequestImgb}"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="httpRequest"
      :file-list="fileList"
    >
      <!-- v-model="addMaterial.img_id" -->
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisibleImg" append-to-body class="ImgClass">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg } from "@/api";
export default {
  props: {
    uploadDo: String //图片地址
  },
  watch: {
    uploadDo(val) {
      if(val){
        this.httpRequestImgb = false;
        this.httpRequestImg = true;
        this.fileList.push({ url: this.user_img + val });
      }
    }
  },
  data() {
    return {
      httpRequestImg: false,
      httpRequestImgb: false,
      addMaterial:{},
      fileList: [],
      dialogVisibleImg: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    handleRemove(file, fileList) {
      this.httpRequestImg = false;
      // this.addMaterial.img_id = null;
      // this.addMaterial.img = "";
    },
    //上传图片成功
    httpRequest(a) {
      this.httpRequestImgb = false;
      this.httpRequestImg = true;
      this.getBase64(a.file).then(res => {
        let data = {
          imgBase64: res,
          type: 2
        };
        uploadImg(data).then(res => {
          if (res.code === 0) {
            console.log(res);
            this.$emit("uploadData", res.url);
          }
        });
      });
    },
    // base64位
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-httpRequestImg {
  // 隐藏上传图片样式
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
.demo-httpRequestImgb {
  // 隐藏第一个图片样式
  /deep/ .el-upload-list__item {
    display: none;
  }
}
.ImgClass {
  /deep/ .el-dialog__header {
    padding: 40px 20px 10px;
  }
}
</style>