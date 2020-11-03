<!-- 封装视频 -->
<template>
  <div>
    <!-- action必选参数, 上传的地址 -->
    <el-upload 
      class="avatar-uploader el-upload--text" 
      :action="user_img+'/medical/base/uploadFile'" 
      :headers="headers" 
      :show-file-list="false" 
      :on-success="handleVideoSuccess" 
      :before-upload="beforeUploadVideo" 
      :on-progress="uploadVideoProcess">
      <video v-if="videoForm.video&&!videoFlag" :src="videoForm.video" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
      <el-button type="text" v-else-if="!videoForm.video&& !videoFlag" >上传视频</el-button>
      <el-progress v-else type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
    </el-upload>
    <!-- ，且不超过10M -->
    <p class="text">请保证视频格式正确</p>
  </div>
</template>

<script>
export default {
  props: {
    videoUrl: String //视频地址
  },
  data(){
    return{
      videoForm:{
        video:""
      },
      videoFlag:false,
      headers:{
        token:this.$store.state.token
      }
    }
  },
  watch: {
    videoUrl(url) {
      if(url){
        this.videoFlag = false;
        this.videoForm.video = this.user_img+url;
      }
    }
  },
  methods:{
    beforeUploadVideo(file) {
      // const isLt10M = file.size / 1024 / 1024  < 10;
      if (['video/mp4'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
      }
      // if (!isLt10M) {
      //     this.$message.error('上传视频大小不能超过10MB哦!');
      //     return false;
      // }
    },
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true
      // this.videoUploadPercent = file.percentage.toFixed(0)
      // this.videoUploadPercent = event.percent.toFixed(0)
      this.videoUploadPercent = Math.floor(event.percent)
    },
    handleVideoSuccess(res, file) {//获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if(res.code === 0){
          // this.videoForm.videoUploadId = res.data.uploadId;
          this.videoForm.video = this.user_img+res.url;
          this.$emit("videoData",res.url)
      }else{
          this.$message.error(res.message);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar{
   width: 200px;
  height: 150px;
}
</style>