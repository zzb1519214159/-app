// 主要书写API的封装过程
import request from '../utils/request.js'
/* 小程序**患者端 */ 
// 登录接口
export function doctorLogin(data) {
	return request('user/codeLogin',data,'post');
}
export function addUser(data) {
	return request('user/addUser',data,'post');
}
// 新增/修改就诊人
export function addPatient(data) {
	return request('user/addPatient',data,'post');
}
// 我的就诊人
export function myPatients(params) {
	return request('user/myPatients',params,'get');
}
