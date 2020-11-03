<!-- 新增就诊人 -->
<template>
<view class="modify overall">
 <van-cell-group>
  <van-cell
    title="姓名"
    input-align="right"
  >
  <input slot="right-icon" type="text"  placeholder="请输入内容"  style="text-align: right; direction: rtl;" v-model="form.patient">
  </van-cell>
</van-cell-group>
 <van-cell-group>
  <van-cell title="性别">
    <view slot="right-icon" class="righticon">
        <button :class="{active:form.sex == 1}" @click="onsex(1)">男</button>
        <button :class="{active:form.sex == 2}" @click="onsex(2)">女</button>   
    </view>
  </van-cell>
</van-cell-group>
 <van-cell-group>
 <van-cell
    title="年龄"
    input-align="right"
  >
  <view class="righticon" slot="right-icon">
  <input  type="text"  placeholder="请输入年龄"  style="text-align: right; direction: rtl;" v-model="form.age">

  </view>

  </van-cell>
</van-cell-group>
 <van-cell-group class="comtecell">
  <van-cell title="关系">
  </van-cell>
</van-cell-group>

 <view class="buenicon">
         <button v-for="(item,index) in userArry" :key="index"  @click="userClick(index,item)" :class="{active:form.relation == index}" >{{item.name}}</button>
    </view>
    <view class="btnmu">
      <button @click="addPatient">保存</button>
</view>
</view>

</template>
<script>
export default {
  data: () => ({
      nwsap:0,
      liArry:Array,
      userArry:[
					{
						name:"本人"
					},{
						name:"爱人"
					},{
						name:"儿女"
					},{
						name:"父母"
					},{
						name:"其他"
					}
				],
      form:{
          patient :String,
          sex:0,
          age:Number,
          relation:0
        },
  }),
  created () {
    this.myPatients()	
  },
  methods: {
     	myPatients(){
				myPatients().then(res=>{
				if(res.code===0){
					this.liArry = res.data;
					this.$set(this.liArry,res.data)
          this.form.patient = this.liArry[nwsap].patient
          this.form.sex = this.liArry[nwsap].sex
          this.form.age = this.liArry[nwsap].age
          this.form.relation = this.liArry[nwsap].relation
				}
			})
      },
      onsex(e){
        this.form.sex = e 
         //选择性别 默认0 男 1 女 2
      },
      userClick(e,name){
         this.form.relation = e 
      }
  },
  onLoad(options) {
    this.nwsap = options.index
    console.log(this.nwsap)
   
  }
};
</script>

<style lang="scss">
.modify{
   /deep/.van-cell{
      padding: 30rpx;
    }
    padding-top: 12rpx;
    .righticon{
        display: flex;
        align-items: center;
        font-size: 30rpx;
    }
    
    .buenicon{
        display:flex;
        justify-content: space-around;
        background: #fff;
        padding-bottom: 30rpx;
        border-bottom: 1px solid rgba(199, 199, 199, 0.2);
     
    }
   
    /deep/.van-cell__title{
      font-size: 30rpx;
      color: #333;
    }
    /deep/.van-field__input {
      font-size: 30rpx;
      color: #333;
    }
    .comtecell{
        /deep/.van-cell:after {
         border-style: none;
        }
       /deep/.van-hairline--top-bottom:after{
       border-style: none;
         }
    }
    /deep/.van-cell:after {
         border-style: none;
    }
    button{
            width: 119rpx;
            height: 56rpx;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F4F8FC;
            opacity: 1;
            color: #000;
            font-size: 28px;
            border-radius: 28rpx;
            margin-left: 24rpx;
    }
    .active{
        background: rgba(21, 175, 232, 0.12);
        color: #15A7E8;
    }
    .btnmu{
      padding-top: 130rpx;
      background: #fff;
     button{
        width: 406rpx;
        height: 90rpx;
        background: #15A7E8;
        box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.36);
        opacity: 1;
        border-radius: 50rpx;
        font-size: 32rpx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
    }
}
</style>
