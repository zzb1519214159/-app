<!-- 医生主页关联弹窗 -->
<template>
	<view class="homepage overall">
		<view class="header">
			<image src="http://app.yunshangyijia.com/static/homepage1.png" class="viewImgage"></image>
			<ul>
				<li>
					<text class="font16">张璐璐</text>
				</li>
				<li>
					<text class="font30 liLeft">呼吸内科</text>
					<span></span>
					<text class="font30">主治医生</text>
				</li>
				<li>
					<text class="font24">湖南省人民医院三甲医院</text>
					<van-image width="24" height="14" src="http://app.yunshangyijia.com/static/label.png" class="labelImage"/>
				</li>
			</ul>
			<view class="relevance">
					<text>已关联</text>
			</view>
		</view>
		<view class="bodyIndex">
			<!-- 标题卡片模式 -->
			<view class="card"
				
			>
			<view class="headerImage">
					<image class="controls-play" src="http://app.yunshangyijia.com/static/newButton.png" @click="establish"></image>
					<span></span>
					<image class="controls-play" src="http://app.yunshangyijia.com/static/pushButton.png"></image>
			</view>
			<van-divider />
				<ul>
					<li v-for="(item,index) in arryList" :key="index">
						<view class="cardHeader">
							<text></text>
							<text>{{item.name}}</text>
						</view>
						<text class="cardBody" :class="{textHeight:item.boole}">{{item.name1}}</text>
						<view class="iconClick" v-show="item.boole">
							<view @click="examine(index,false)">
								<text>查看全部</text>
								<image src="http://app.yunshangyijia.com/static/icon.png" class="iconImage"></image>
							</view>
						</view>
						<view class="iconClick" v-show="!item.boole">
							<view @click="examine(index,true)">
								<text>收起更多</text>
								<image src="http://app.yunshangyijia.com/static/icon1.png" class="iconImage"></image>
							</view>
						</view>
					</li>
				</ul>
			</view>
			<view class="card"
			
			>
			<view class="cardHeader">
				<text></text>
				<text>TA的视频讲座</text>
			</view>
			<view class="listView">
				<view class="listLocation" @click="tosevideo">
					<image src="http://app.yunshangyijia.com/static/listImg.png"></image>
					<image src="http://app.yunshangyijia.com/static/shade.png" class="cover"></image>
					<text class="cover textCenter">呼吸常见病自查（一）</text>
				</view>
				<view class="listLocation" @click="tosevideo">
					<image src="http://app.yunshangyijia.com/static/listImg1.png"></image>
					<image src="http://app.yunshangyijia.com/static/shade.png" class="cover"></image>
					<text class="cover textCenter">呼吸常见病自查（二）</text>
				</view>
			</view>
			</view>
			<view class="card"
			
			>
			<view class="bottom">
				<view class="right-img">
					<van-icon name="http://app.yunshangyijia.com/static/code.png" size="313rpx"/>
				</view>
			</view>
			</view>
		</view>

<van-overlay :show=" show " @click="onClickHide" z-index="999">
  <view class="wrapper">
    <view class="block" catch:tap="noop">
		<view class="popup">
				<view class="fontRelevance">
					关联成功！
				</view>
				<view class="popuPbody">
					<button type="primary" @click="dataClick">建立病程管理</button>
				</view>
				<view class="topDoctor color7f">
					让医生关注你的整个病程
				</view>
				<view class="color015">
					<text @click="onClickHide">暂不创建</text>
				</view>
			</view>
	</view>
  </view>
</van-overlay>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				arryList:[
					{
						name:"擅长疾病",
						name1:"慢性咳嗽、发热，支气管炎、肺部感染、慢性阻塞性肺疾病、支气管哮喘、肺心病、呼吸衰竭、肺部结节、胸腔积液、肺部肿瘤、支气管扩张伴咯血、睡眠呼吸疾病等疾病的诊治",
						boole:true
					},{
						name:"个人简介",
						name1:"医学硕士，从事呼吸临床工作近10年，曾于湘雅医院及北京学习研讨。对内科各系统疾病和呼吸系统急危重症疑难杂症有丰富的临床诊治经验。曾参与国家自然科学基金《低氧诱导因子对肺动脉高压形成机制》的研究。发表论文数篇。",
						boole:true
					}
				],
				show: true,
			};
		},
		methods:{
			examine(index,val){
				this.arryList[index].boole = val;
			},
			establish(){
				uni.navigateTo({
					url: '/pages/course/message/index',
				});
			},
			tosevideo(){
				uni.navigateTo({
					url: "/pages/sevideo/sevideo"
				});
			},
			onClickHide() {
    			this.show =  false 
			  },
			  	dataClick(){
				uni.navigateTo({
					url: '/pages/course/message/index',
				});
			},
		}
	}
</script>

<style lang="scss">
.homepage{
	width: 100%;
	min-height: 100vh;
	background-image: url("http://app.yunshangyijia.com/static/homepage.png");
	background-size: 100% 20%;
	background-repeat: no-repeat;
	background-position: top;

// 遮罩层样式代码
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
 width: 640rpx;
 height: 480rpx;
  background-color: #fff;
  border-radius: 15rpx;
}
.popup{
		// vant 组件使用弹窗出现字体内容模糊的问题
		// transform: translate3d(0,0,0);
		text-align: center;
		.fontRelevance{
			margin:70rpx 0;
			font-size: 32rpx;
			font-weight: bold;
			color: #343434;
		}
		.popuPbody{
			text-align: center;
			button{
				width: 428rpx;
				height: 80rpx;
				box-shadow: 0 3rpx 6rpx rgba(21, 167, 232, 0.36);
				background: $uni-text-color-15A7E8;
				border-radius: 50rpx;
				border:none;
				font-size: 32rpx;
			}
		}
		.topDoctor{
			margin-top: 30rpx;
			margin-bottom: 60rpx;
			color: #343434;
		}
		.color015{
			color: #6E6E6E;
			margin-bottom: 20rpx;
		}
	}
	// 
	.colrfff{
		color: $uni-text-color-inverse;
	}
	.font16{
		font-size: 36rpx;
		font-weight:600;
	}
	.font30{
		font-size: 30rpx;
	}
	.font24{
		font-size: 24rpx;
	}
	.header{
		display: flex;
		align-items: end;
		padding: 20rpx 0 20rpx 20rpx;
		position: relative;
		.viewImgage{
			width:248rpx;
			height: 248rpx;
		}
		.relevance{
			position: absolute;
			right: 0;
		}
		ul{
			margin-top: 20rpx;
			margin-left: 30rpx;
			li{
				display: flex;
				align-items: center;
				color: $uni-text-color-inverse;
				&:not(:last-child){
					margin-bottom: 30rpx;
				}
				&:last-child{
					display: flex;
					align-items: center;
				}
				.liLeft{
					margin-right: 12rpx;
				}
				span{
					width:2rpx;
					height: 20rpx;
					display: block;
					background: #f6f6f6;
					margin-right: 12rpx;
				}
				.labelImage{
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
			}
			
		}
		.relevance{
			width: 110rpx;
			height: 52rpx;
			line-height: 52rpx;
			margin-top: 5rpx;
			background-color: #ffffff8c;
			box-shadow: 0px 3rpx 6rpx rgba(8, 147, 209, 0.1);
			border-radius: 30rpx 0 0 30rpx;
			text-align: center;
			text{
				color: $uni-text-color-15A7E8;
			}
		}
	}
	.bodyIndex{
		
		
		.card:nth-child(1){
			margin-top: 0;
			padding: 30rpx 0;
		}
		.card{
			border-radius: 20rpx;
			box-shadow: 0px 3px 6px rgba(21, 167, 232, 0.06);
			background: #fff;
			padding: 30rpx;
			margin: 30rpx;
			.cardHeader{
				margin-bottom: 10rpx;
				text{
					&:nth-child(1){
						display: inline-block;
						width: 4rpx;
						height: 24rpx;
						margin-right: 10rpx;
						background: #15A7E8;
						border-radius: 4rpx;
					}
					&:nth-child(2){
						font-weight: bold;
						font-size: 30rpx;
					}
				}
			}
		}
		ul{
			padding: 0 30rpx;
			li{
				&:not(:last-child) { 
				  margin-bottom: 30rpx;
				}
				.iconClick{
					text-align: center;
					margin-top: 10rpx;
					view{
						display: inline-flex;
						align-items: center;
						text{
							color: $uni-text-color-15A7E8;
						}
						.iconImage{
							margin-left: 10rpx;
							width: 14rpx;
							height: 15rpx;
						}
					}
				}
				.cardBody{
					color: $uni-text-color-6E6E6E;
					font-size: 28rpx;
				}
				.textHeight{
					text-overflow: ellipsis;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
		.headerImage{
			display: flex;
			justify-content: space-around;
			align-items: center;
			span{
				width: 2rpx;
				height: 30rpx;
				background: #C7C7C7;
			}
			.controls-play{
				width: 258rpx;
				height: 88rpx;
			}
		}
		.van-divider{
			margin: 20rpx 0;
		}
		.listView{
			display: flex;
			justify-content: space-between;
			.listLocation{
				position: relative;
				image{
					width: 305rpx;
					height: 188rpx;
				}
				// 遮罩层
				.cover{
					top: 0;
					left: 0;
					position: absolute;
				}
				.textCenter{
					top: 40%;
					left: 10%;
					color: $uni-text-color-inverse;
				}
			}
		}
		.bottom{
			width: 100%;
			min-height: 503rpx;
			background-image: url(data:image/png;base64,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gAhx0JaZBhxUTeB3jy6583PwA2b3fNgQ81a3Qey2ktl1O2WfnoeISTNSirpTidNtnaF89VSIR4wYYc8//7ztu+++NmDAgESY3Xnnnfbss8/aAQccYOutt16ifZJudP3119uNN95oO++8sx1zzDFJd8vZbvz48Tb//PMX3H/69Om2yy672AILLGBXX3219enTp+zztba22n/+8x/bdtttrXv37nmPc+uttxr47b777rbffvuVfT7tKASEgBAQAkKgrREQIU4TYpLpfN1hSFzULjFhutmKl6eU0GaO7l3MPj7CbL4e2ShAiMHNKevpUnX1Tq674IIL7LbbbrPDDz/cDjnkkETTdt5559kdd9xhf/nLX2yHHXZItE/Sjb766ivbc889HamEYPbt2zfprpntPvjgAzvyyCNtrbXWsj/96U+O8MbFU089Zb///e9t1VVXdSS8krjkkkvsuuuus7XXXtvOP//8vOf81a9+ZW+99Zadc8459tOf/rSSU2pfISAEhIAQEAJtioAIcYQQk0zHsn+09vB1b5n97rE2nZuGPdk/tzU7aM3s4ZFYR4JdIyXXoVR+/vnnduWVV8Yqm8suu6yhfl511VWZi3nllVfsww8/tI033th4PYxjjz3WOsVI3iij11xzTaL5+vHHH62lpcWR4a5duxbdZ/jw4daly9zlivfff99OO+00+/TTT61fv352xhln2KBBg3KOgwL9wgsvOBIb93rciXfccUdbaKGFcl4Cw+OPP95Gjx5tiy66qF188cW2zDLLZG03ZswYp3xD9h977DHr3bt30WvTBkJACAgBISAEGgWBpifEYe1h7BIQYuwSUd6z//1mD3zUKNNW33FQaYKKE2HMmmM2ZaZZty5zFWJ8xPWyTYwaNcr23ntvW3zxxe2EE05whC4aEOUllljCIIJJArIcR4j//e9/26WXXupI7jzzzFPwUFgZsDz06tXLEdpice+992YRYrafMWOGodqifhNHHXWUHXjggZmxQZr333//YofOeR1SD4GOC4j8qaeeav/73/9swQUXtCuuuCKLFKMc33777Y7k9+/fP9G5wf7yyy9PtK02EgJCQAgIASFQSwREiFvNwtrD2CZ6RoQ7SPOyl5mNn17LqWg/x16gp9knv81+aACj8TNSpep8tQnnJU5fVlt7iS+66CK7+eab7bDDDrNNNtnErr32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FpBgr+xigwitEhki7P/uPcIRe4Q7nD9XFTHSoYSAEBACQkAICAEh8P/tnQecVNXZxp9ZdumINCsqSFGaBUtQxBpBLGABwYYlxhZrTCyxEBJNoqZp1BhNFFBjQQSxYuwtdj8sgFIVojQpAgtb5/s9Z+6ZPXPnzs7M7rRlnvP7Ngu7t5z7Pxe//777nvctNAIS4iysiD9abP01RnxtzrGXNmGjxK4Mmz87XfKCpupWfrBibCO9Vob5dYowB3OE7d/jqkd4N5AIZ+Gl0CVFQAREQAREQAQKloCEOItLExcxdiXYC/LaHOJEn41MB0ixjQjbdIk4MbYRXyfyG5MSYdMtbHRZEeEsvgm6tAiIgAiIgAiIQCETkBBneXWszNoosV9woyLszcP83eYNexvuolO0aRL2C05Kg7v5LejP0bQK34Y5XkoR4Sy/BLq8CIiACIiACIhAQROQEOdweQLl2DNlmyphpuOIcPScRPm8njxHI8TGcL2c4iD5dZ5XIpzDxdetREAEREAEREAECpaAhDgPS+OKsRs5jvmzPzpsI8je5yA/9qdRBASSzZckwnlYdN1SBERABERABESgYAlIiAtgafyC7JfkdKYYKMqqFpEOQh0rAiIgAiIgAiJQZAQkxAW44EGCnOo0Ff1NlZSOEwEREAEREAEREIEIAQmx3gQREAEREAEREAEREIGiJiAhLurl18OLgAiIgAiIgAiIgAhIiPUOiIAIiIAIiIAIiIAIFDUBCXFRL78eXgREQAREQAREQAREQEKsd0AEREAEREAEREAERKCoCUiIi3r59fAiIAIiIAIiIAIiIAISYr0DIiACIiACIiACIiACRU1AQlzUy6+HFwEREAEREAEREAERkBDrHRABERABERABERABEShqAhLiol5+PbwIiIAIiIAIiIAIiICEWO+ACIiACIiACIiACIhAUROQEBf18uvhRUAEREAEREAEREAEJMR6B0RABERABERABERABIqagIS4qJdfDy8CIiACIiACIiACIiAh1jsgAiIgAiIgAiIgAiJQ1AQkxEW9/Hp4ERABERABERABERABCbHeAREQAREQAREQAREQgaImICEu6uXXw4uACIiACIiACIiACEiI9Q6IgAiIgAiIgAiIgAgUNQEJcVEvvx5eBERABERABERABERAQqx3QAREQAREQAREQAREoKgJSIiL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75yY6xlDjoiuGc7fTRTXJ8E2sss0CDdVIirC9us2R9iXHmHlOoN4dCkREAEREAEREAERKEgCEuIsLIs/Wmz9NUZ8bc6xlWQnB9lItJeP7Jds/3StH7v5vjbSa2WYx1CEOZgjbP8eVz3COre9aBbY6JIiIAIiIAIiIAIiUGgEJMRZXJG4iLErwU4U2C/A7t+NTHvRYBsU9oLBEbN18oVtVNcV3SBRlghncdF1aREQAREQAREQgSZHQEKc5SWzMmujxH7BjUaCvXmYv9u8YS9KHJ2ia8RRK4581938FvTnaFqFb8OclegsY9DlRUAEREAEREAERKBgCUiIc7g0gXLsmbLNNTbTcUQ4ek6iNAZPnqOpE54du6kUrju7l/FXrsghCt1KBERABERABERABAqGgIQ4D0vhirHnv9FZRIPA/uiwd4R/b507fbuxzqZR2O/5XVoinIdF1y1FQAREQAREQAQKloCEuACWxi/IfklOZ4pBgWQJcDoEdawIiIAIiIAIiECxEZAQF+CKBwlyqtOU/KZKSseJgAiIgAiIgAiIQISAhFhvggiIgAiIgAiIgAiIQFETkBAX9fLr4UVABERABERABERABCTEegdEQAREQAREQAREQASKmoCEuKiXXw8vAiIgAiIgAiIgAiIgIdY7IAIiIAIiIAIiIAIiUNQEJMRFvfx6eBEQAREQAREQAREQAQmx3gEREAEREAEREAEREIGiJiAhLurl18OLgAiIgAiIgAiIgAhIiPUOiIAIiIAIiIAIiIAIFDUBCXFRL78eXgREQAREQAREQAREQEKsd0AEREAEREAEREAERKCoCUiIi3r59fAiIAIiIAIiIAIiIAISYr0DIiACIiACIiACIiACRU1AQlzUy6+HFwEREAEREAEREAERkBDrHRABERABERABERABEShqAhLiol5+PbwIiIAIiIAIiIAIiICEWO+ACIiACIiACIiACIhAUROQEBf18uvhRUAEREAEREAEREAEJMR6B0RABERABERABERABIqagIS4qJdfDy8CIiACIiACIiACIiAh1jsgAiIgAiIgAiIgAiJQ1AQkxEW9/Hp4ERABERABERABERABCXEBvgPhcMMnFQo1/FydKQIiIAIiIAIiIALFSEBCXACrHiTADXXiIB+WJBfAImsKIiACIiACIiACBUtAQpyHpfELsCu/5nu02rD5v7hhvxYovjzaO9eVYP+xEuQ8LLpuKQIiIAIiIAIiULAEJMQ5XBpXhK3Yms8++aWwWomNfvZZrb0Wz7cSzc9+YTanBVzPfFnpFTlcfd1KBERABERABESgUAlIiHOwMq68Gv/1rNUGg60AZ0pQrRjXWkEOR+TXL9eJZDsHSHQLERABERABERABESgYAhLiLC5FnAh7MkwRLaGg5ihCSzGuqY1Ej3lLI8cpRKGziEaXFgEREAEREAEREIGCISAhzsJSBEWEjYyGgJI8pipwXjVhgIIcjUo781HEOAsvgy4pAiIgAiIgAiJQ8AQkxBlcooQRYYqwE5HN4C0bdCnOs7oWqGWkWhHjBjHUSSIgAiIgAiIgAlsOAQlxhtbSv8nNpiekmxqxeB3wyTLg85XAFyuBuauBDZXA5mqgvCoy2dZlQMtSoG1zYPdOQL/OwIAuwN7bAbu0T/2BYsTYE3Y3cswr5SqtI/VZ60gREAEREAEREAERyCwBCXEGeLrVHeyfKcL8SDa+3wQ8Nht4awnw/nfAyvJkZ9T//W1aA/vvABy0EzCmD9CxVfLrMY2CEeNobrMvjUJSnJyhjhABERABERABEWi6BCTEjVi7mKhwmhvmZi4EHvwceH5BREazMcpKgOE9gDMGAEO7138HPktVDRB28pwVLc7GquiaIiACIiACIiAChUZAQtzAFQlKkUgWFeZmthnzgFvfjaRD5HL06wJcPQg4rlf9keuq2khFCvss0aoU3mQVLc7lquleIiACIiACIiACuSAgIW4A5SAZbpakjBpTIq56BfhiVQNumMFTmG982xHA4K6JL0ohphhTfs1z2Y13kuIMroQuJQIiIAIiIAIiUCgEJMRprkS6MrxiI/Cr14Epc9K8UZYPH9sXuOkQoEvr4Bsxml1RE6lCEY0WBzT3yPI0dXkREAEREAEREAERyDoBCXEaiF0ZpjBy1BcZZn7wBc8DayvSuEkOD+3QErh3ODB01yRS7OUV24oZqlecw0XSrURABERABERABLJOQEKcIuJ0IsOVNcANrwP3fJLixfN4GOX24n2B8UMAbsLzDxsp5nGUf0lxHhdLtxYBERABERABEcgKAQlxClj9MsyiEKUJcoZ/qADGTgfeXprChQvokIN3Bv49EmjXPFiKN3vpE5LiAlo0TUUEREAEREAERCAjBCTEKWC0tYX5uT4ZXrYBOHFq/jfOpfBIgYewuceTJwHbtIn/NjfamZxib6NdSYm32U7NOxqKW+eJgAiIgAiIgAgUCAEJcZKFiJHhMNCsJLhs2fKNwJGPAF+vK5CVbeA0urUHZo4FtmsbfwGmgrBmMhn4q0+oHFsDges0ERABERABERCBvBOQENezBFEZ9ppu8NDSgDzbtZuBox4F5nyf9/XMyAT6dgZeGAu0bxF/uU1VAPcTkoPJJ3ZKskmKM4JfFxEBERABERABEcgxAQlxAuA2b5ibyiiA/Dsl0C99m6uBkVOAd7/N8cpl+XYH7ghMHwW0KI29EXlsqnZSJ+xGO+8wSXGWF0aXFwEREAEREAERyDgBCXE9QmxFmHnDdjOZ//ArXwL+OSvj61IQFzxvr0gTD/9gi2emT9jUCbfyhIS4IJZOkxABERABERABEUiDgIQ4AJZ/Ex3TAoJSJZ6ZB5w2Iw3aTfDQR0YCR/eMn3h5VeRr0Xxir1YxvyYpboILrSmLgAiIgAiIQBETkBDXI8RMD+AH6/P6JY8VJfafCKwr0KYbmXqn2bzj/bPiK0/UMHWiKjZK7OYUZ+r+uo4IiIAIiIAIiIAIZJuAhNhH2F9VwpQZC9hId84zwNQvs708hXH9MX2Ae4+OnwtziWudqhMqxVYY66VZiIAIiIAIiIAIpEdAQuzwim6k8zbRJYoOv/ENcNyU9EA39aOfGwMM7hr7FOSz0YkSR5t2KG2iqS+35i8CIiACIiACRUVAQuwTYruRjikBjA77c4fZoGLQJOCr1UX1noCl2N4eF1+DmbnEFGNysjWaTSk2SXFxvSB6WhEQAREQARFowgQkxD4htmXWKMTNA3KHp8wBzn2uCa94I6Y++ThgZO/YC7BRB6XYCrGixI0ArFNFQAREQAREQATyQkBC7GH3V5bgl7mZzh08htHhuVtIA45037j+nYG3xsVvMFxfCRBVtAwbm3Z4F1fFiXQp63gREAEREAEREIFcE5AQ+4SYEWKmRdiIp7sgLywExkzL9RIV1v2mnAAM3TV2TmxOwrrEpc2AUq9RhypOJF+3jRs3ok2bNskP1BEiIAIiIAIiIAJZJSAhdtoyswEHqybwc4tm8dzPehqY9lVW16PgL35Cb2DicbHT5A8RP1REIuomSuy1dWaUuKlFiDds2ICf/exn6NWrF66//vqU1qO6uhoffPABDjjggJSOX7JkCS6//HLwXtOnT0erVq1SOq/QDvrd736Hjz/+GGeeeSaOO873UhTaZDUfERABERABEaiHgITYE2JuprN1hylx/nSJtZuBXvdEIqHFPJo3A+ZfCLRvEUuBQkxuJrLularLx+a6v//970bSgsa5556LH/3oR1i3bh3at28feMysWbPwk5/8BPvuuy/uueeepEsdDodx1VVX4dVXX8Upp5xiRLdZs4CfpnxXuuiii/D+++/j/PPPx09/+tOk93EP+Oc//4mvvkr8k9kxxxyDQw45BEuXLsWf/vSnlK993XXXoXPnzikdv2DBAvO8fNZp06Zhu+22S+k8HSQCIiACIiAChUhAQuwTYm6m46/9/bWHJ34KXPafQlzC3M/pjqHAmQNi78uNddxgl+/NdZTTV155JRDKTTfdhNdffx1z5szBY489hhYtWuCHH37Ad999Fz2eYkvhHD58OE4//fS467Rr1w477LBDzNffeOMNE00uLy83wn3LLbegbdu29S4MhXLs2LFo3bo1nn322aTHuxe7+OKL8e677ya8/mWXXYYzzjgDc+fODXyGRCc+9dRT2HHHHZO+UBUVFUbiZ8+eje233x6HH3540nPsARRuzk1DBERABERABAqJQNELsVt7mOkSFGKmS/h/1X/6DODpeYW0dPmbCytNsOKEO6pqgY2VQFmzuggx84hznTZhhfhf//oXdtttNzPFW2+9FTNmzMDjjz9uUhT+/e9/45xzzgGjtM8//zxuuOGGlGEOHToUTBXwDwruz3/+c/zvf/9Dv379cOedd4LyXN+wc7UCm+okrBDzGTt06BA97cUXXzRRbb8QDxw4sN70j0svvdREkynm2267bb3TYER8/PjxeO65hpVa6dmzJx599NFUH1XHiYAIiIAIiEBOCEiIw4Bbe5hpEy1LY9lTmrvfDazZnJM1KfibdGwJLLwo9ocGMlpTESlVZ6tNmFxi72lylUtsJfPBBx9Enz59zN0Zif3+++9BYWQUd9SoUVi7di2mTp2K5cuXG1HmoOy9/PLLKCsrMykHQWOPPfYwqQJBY82aNSYFYuHChejbt6+RU95jxYoVgcd/8803eOedd0zu8S677BJ4DKPYFGB3WCF+4YUXYlIcmLpw8803xwnx4MGDcfvttyd8r0aMGIFvv/3WPHuiVBKezFxpXv/pp582qRLXXHNNSvnPr732Gl566SWEQiEj5iNHjiz4d1wTFAEREAERKC4CEmJPiG11CYob82Td8ekKYMiDxfViJHvad8YB/brEHrW2IiLATJvgh4kQh3LbpMMvxKzkcNhhh5kPpjJwMDXgt7/9LZhrO2HChOhD2PxhHnvbbbclQxD4/VWrVuG8887DgAEDTCSV6QFfftnwHt9MvaBQZlOImfLA1JH//ve/5oeBRLLPSLqbqnHggQcajokkura21vxQ8MADD6CkpAS//vWvTSqKhgiIgAiIgAgUGgEJcdjbTIdIugQ3hPk31E36FLhU+cMx7+5dw4DT+8e+zqxHzLQTf9pELrvW+YX4vffeM1Uj+PWTTz7ZTJiRTkaNKcRnn3129CEowcwtZkoEUyMaOlavXm0kkVHUN99802zicwcjsfz6wQcfnDT/loI6bNiwrAnxpk2bMGTIEGy11VYJc6//85//mLQTRsC32WYbMMXiH//4B1gtgznE5MUfANzBiDO/ToEuLS01keUjjjiioUh1ngiIgAiIgAhklYCEmELslVur9rrT+TfU3fgGcPsHWV2HJnfxn+8PjB8SO+2NVUBVjVd+zcslZsTYRIlpxTkYfiFmLu/EiRON6Pbo0SM6A4qgW+6MkeRjjz0W69evx+jRowNTAfbaay8jsY0df/7zn00ec0MqTPDeNmVi8uTJMTnEM2fONLnL/hzi+lImmAt84403on///oaTf2zevNn88MAcY+YiU3K5MY6cGDF+6623TCrE8ccfb37wYIoHr/PQQw+Bm+/InJFhm77SWHY6XwREQAREQASyQaCohTjanY7RYWdDHQXOHadMB55bkA38TfeaI3oBD46Inf+maoBNOhhht+XXSrw84nwJMVMWli1bZvKHKW6JBuXyjjvuqHdBmDt85ZVXRo9hKgTF0D+YZ9y8efOE1/r9739vcosZaR03blzaL0G6VSZcIWZU99prrzUpDMyn/vrrr03uNGXWjZa7k+JzspTdmDFjzHl28Dymn/z1r381NZUZZW7ZsqXJmeZxZE/pr49F2g+vE0RABERABEQgCwQkxE79YZYNa1UaH808YBIwe1UW6DfhSw7oEmnj7I6KaoBRYqZM5KsesRsh5q/zjzzySJOWwPxhbuxipNMOVoPYb7/9TCrASSedZPJoKbN+Mf7kk09wxRVXmM10rhBfeOGFpiGHfySr1sCI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jYCEOAsr4o8WW3+NEV+bc+ylTdgosSvD5s9Ol7ygqbqVH6wY20ivlWF+nSLMwRxh+/e46hHeDSTCWXgpdEkREAEREAEREIGCJSAhzuLSxEWMXQn2grw2hzjRZyPTAVJsI8I2XSJOjG3E14n8xqRE2HQLG11WRDiLb4IuLQIiIAIiIAIiUMgEJMRZXh0rszZK7BfcqAh78zB/t3nD3oa76BRtmoT9gpPS4G5+C/pzNK3Ct2GOl1JEOMsvgS4vAiIgAiIgAiJQ0AQkxDlcnkA59kzZpkqY6TgiHD0nUT6vJ8/RCLExXC+nOEh+neeVCOdw8XUrERABERABERCBgiUgIc7D0rhi7EaOY/7sjw7bCLL3OciP/WkUAYFk8yWJcB4WXbcUAREQAREQAREoWAIS4gJYGr8g+yU5nSkGirKqRaSDUMeKgAiIgAiIgAgUGQEJcQEueJAgpzpNRX9TJaXjREAEREAEREAERCBCQEKsN0EEREAEREAEREAERKCoCUiIi3r59fAiIAIiIAIiIAIiIAISYr0DIiACIiACIiACIiACRU1AQlzUy6+HFwEREAEREAEREAERkBDrHRABERABERABERABEShqAhLiol5+PbwIiIAIiIAIiIAIiICEWO+ACIiACIiACIiACIhAUROQEBf18uvhRUAEREAEREAEREAEJMR6B0RABERABERABERABIqagIS4qJdfDy8CIiACIiACIiACIiAh1jsgAiIgAiIgAiIgAiJQ1AQkxEW9/Hp4ERABERABERABERABCbHeAREQAREQAREQAREQgaImICEu6uXXw4uACIiACIiACIiACEiI9Q6IgAiIgAiIgAiIgAgUNQEJcVEvvx5eBERABERABERABERAQqx3QAREQAREQAREQAREoKgJSIiLevn18CIgAiIgAiIgAiIgAhJivQMiIAIiIAIiIAIiIAJFTUBCXNTLr4cXAREQAREQAREQARGQEOsdEAEREAEREAEREAERKGoCEuKiXn49vAiIgAiIgAiIgAiIgIRY74AIiIAIiIAIiIAIiEBRE5AQF/Xy6+FFQAREQAREQAREQAQkxHoHREAEREAEREAEREAEippAJoV4JYCtipqmHl4EREAEREAEREAERKCpEfghNAVd0AW1OBS1AMII8RFCYfdBzJdiRziEyCEhvIYSrERJ7Wh8HgJ6NTUCmq8IiIAIiIAIiIAIiEDxEggD80qmoH9GhLh6FJ5tFsKPixennlwEREAEREAEREAERKCpEagJ46XSJ3BMBoR4dkn5Cbtf2qq05LamBkHzFQEREAEREAEREAERKF4Cm6rxi9bTZv8NXfo2MGViAkLoixB2Rcmc3ui+ezvMNWkUGiIgAiIgAiIgAiIgAiJQ+ATCc9dX7N7nqxaLsBC1mI0wxqecQ8x043AIVojXoKRnxfyS2T/r+Y+yEpxZ+M+uGYqACIiACIiACIiACBQ7gapaTOp71/zz57foWYsOrhDHbqgjp+CIL4WYYwpKsOajEnTYJ/TRoRU77925xYehENoXO2A9vwiIgAiIgAiIgAiIQEETWPfxyop993mtxTdY81EYHfapxWhTZQIIpSrE8FeamF3SbWPrkg9P7nZUp9aYCqCkoBFociIgAiIgAiIgAiIgAsVKoGZFec2oHz2+5IXFbcprk+UPJ44Q8zsBaRObt2tZMvekrpe1KcHNkuJifcf03CIgAiIgAiIgAiJQsARqN1bjqt2nLb275bLNtamkS6QgxBNC6Ns3hC6jQ1g5u6Rn276hzRuWlswa2XVEh+b4ZwhoW7A4NDEREAEREAEREAEREIFiIrBh5SacPfCZpc+2bNu1dv6G2WETHV45JYzRoxOmS9QvxMwvDodRt7kukkvcbePikuo23UKPHoad9++I8WUlGKNocTG9a3pWERABERABERABESgoAjVVtXj0w+WVN538VvOvSzcuDi9u0602mjscrS5htsjFdKizT5GkjJqXS+xUnEAHeFJcGqpt1Sw0Y79OPXp3Kh3WIhQ6rLQk1KMkhB0AtCsoTJqMCIiACIiACIiACIjAlkJgfW0Y31bXhhdUhEOvfrkeL4x8+7uFJZtqwqUbqz0ZRji2soSJAwfKcLIIceT7Jko8IYTx44EJr5Vg+0NDlOKebRHaPHdpCbp2RW0rhGrWLI/I9bbbonbdStUr3lJeOT2HCIiACIiACIiACBQQgZL2XcJYvtzMqFmHbcMlmxDG0qVouTvTJBDGGoTx3WthjD+0FhMmAOPHh4MqS7iPlJq4mg12nhRPQShSiq1VqOey5qHqdqUhoBuq2ywNAV1Ru+a7yDUZJ9YQAREQAREQAREQAREQgUwR+DZyoZIO24eBpSjd2DUMLEbp+urw/O0qw1izyZZYC6cqw7xeakJcV4Ytcg6luAtC+AohdJgdAvqi57L5IfTsierli1O8ZqbI6DoiIAIiIAIiIAIiIALFRKB0225hzJ+P+dv1DAOzgTV9w+iNMFYiHO1IFzXdxKkSllka8hqtTexttJsSAkbDiDEH5ZjDCLIdfYtpbfSsIiACIiACIiACIiACWSMwu+7KFGAOSjAHRRhTgNmjI+2Z05Dh6KFpzdt2seNJ3Gw33nS0q5Pg2a+FcMihaV1SB4uACIiACIiACIiACIhASgRefw3oe2jdBrnRCGMCEBVhY7jJo8LuvdKIELunOdFiI8YTQpxFdDh/TOnBdJAIiIAIiIAIiIAIiIAIpEKA8hsd3qY5+3djtunJsDkjlfvWc0zIlHNLWMSikVfX6SIgAiIgAiIgAiIgAiJQH4GIBPN/GmykjRXioOlFJFlDBERABERABERABERABDJOoHHym0BeMz5LXVAEREAEREAEREAEREAEmgyBbESIm8zDa6IiIAIiIAIiIAIiIAIiICHWOyACIiACIiACIiACIlDUBCTERb38engREAEREAEREAEREIH/B4uEBdjUsc0uAAAAAElFTkSuQmCC);
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			position: relative;
			.right-img{
				position: absolute;
				right: 10rpx;
				bottom: 10rpx;
			}
		}
	}
}
</style>
