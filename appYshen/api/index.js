// 主要书写API的封装过程
import request from '../utils/request.js'
/* 小程序**医生端 */ 
// 登录接口
export function doctorLogin(data) {
	return request('doctor/doctorLogin',data,'post');
}
// 医生端患者（异常）记录(未写健康建议记录)
export function diseaseRecord(params) {
	return request('doctor/diseaseRecord',params,'get');
}
// 医生账户详情
export function doctorAccount(params) {
	return request('doctor/doctorAccount',params,'get');
}
// 医生端患者病程列表
export function courseOfDisease(params) {
	return request('doctor/courseOfDisease',params,'get');
}
// 医生编辑个人资料
export function editDoctor(data) {
	return request('doctor/editDoctor',data,'post');
}
// 医生发出的常用语列表
export function healthAdvice(params) {
	return request('doctor/healthAdvice',params,'get');
}
// 获取常用健康建议
export function loadUsuallyAdvice(params) {
	return request('doctor/loadUsuallyAdvice',params,'get');
}
// 医生修改密码
export function updatePassword(data) {
	return request('doctor/updatePassword',data,'post');
}
// 新增常用健康建议
export function editUsuallyAdvice(data) {
	return request('doctor/editUsuallyAdvice',data,'post');
}
// 医生端我的患者
export function searchUser(params) {
	return request('doctor/searchUser',params,'get');
}
// 病程记录详情
export function courseOfDiseaseDetail(params) {
	return request('doctor/courseOfDiseaseDetail',params,'get');
}