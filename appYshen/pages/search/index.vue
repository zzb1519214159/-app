<!-- 搜索患者列表页面 -->
<template>
  <view class="search">
    <view class="search-con">
    <van-search
        :value="value"
        placeholder="请输入患者姓名"
        @focus="onfocus"
				@change="onChange"
				@search="onSearch"
      />
			<van-icon name="/static/sousuo.png" class="iconSearch" @click="jump"/>
    </view>
    <view class="search-wapr">
			<!-- 患者列表 -->
      <list-search v-show="!flag" :listArry="listArry"></list-search>
			<!-- 患者历史记录 -->
      <waprs-search v-show="flag"></waprs-search>
    </view>
  </view>
</template>
<script>
	import {searchUser} from "../../api"
	import listSearch from "../../components/index/list-con";
	import waprsSearch from "../../components/index/waprs";
	export default {
	components: {
	  listSearch,
	  waprsSearch,
	},
  data (){
		return{
			flag: false,
			value:"",
			listArry:[],
			valueInput:""
		}
	},
  methods: {
    onfocus(){
			if(!this.valueInput){
				this.flag = true;
			}
    },
    onblur(){
      // this.flag = false
    },
		onChange(val){
			if(val.detail){
				this.flag = false;
				this.searchUserDo(val.detail);
			}else{
				this.flag = true;
			};
			this.valueInput = val.detail;
		},
		onSearch(event){
			// console.log(event);
			// uni.navigateTo({
			//   url: "/pages/details/index"
			// });
		},
		jump(){
			this.searchUserDo(this.valueInput,true);
		},
		// 列表接口不传name默认全部患者
		searchUserDo(name,boole){
			searchUser({name:name||''}).then(res=>{
				if(res.code===0){
					res.page.list.forEach(item=>{
						item.sex = item.sex === 0 ? '女' : item.sex === 1 ? '男' :'未知';
					});
					this.listArry = res.page.list;
					if(boole&&res.page.list[0].courseCount>0){
						uni.navigateTo({
						  url: "/pages/details/index?item="+JSON.stringify(res.page.list[0])
						});
					}
				}
			})
		}
  },
	onLoad() {
		this.searchUserDo();
	}
};
</script>
<style lang="scss">
.search {
  background: #f6f6f6;
  .search-con {
		position: relative;
    margin-bottom: 20rpx;
    background: #fff;
    .van-search {
			.van-cell__left-icon-wrap{
				display: none;
			}
			.van-search__content {
        position: relative;
        background: #f6f6f6;
		    border-radius:40rpx;
		    padding: 0 40rpx ;
      }
			.van-field__body{
				margin-right: 37rpx;
			}
    }
		.iconSearch {
			position: absolute;
			right: 54rpx;
			top: 37rpx;
		}
  }
}
</style>