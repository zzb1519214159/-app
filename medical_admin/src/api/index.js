// 主要书写API的封装过程
import request from '@/utils/request'
/* 基础接口 */
// 获取区域
export function getCity(params) {
    return request({
        url: 'base/getCity',
        method: 'get',
        params,
    });
}
// 后台图片上传
export function uploadImg(data) {
    return request({
        url: 'base/uploadImg',
        method: 'post',
        data,
    });
}
// 文件上传/视频上传
export function uploadFile(data) {
    return request({
        url: 'base/uploadFile',
        method: 'post',
        data,
    });
}
/*系统管理*/
// 后台用户登录
export function doLogin(data) {
    return request({
        url: 'admin/doLogin',
        method: 'post',
        data,
    });
}
// 全部角色
export function paginateRole(params) {
    return request({
        url: 'admin/paginateRole',
        method: 'get',
        params,
    });
}
// 添加角色
export function addRole(data) {
    return request({
        url: 'admin/addRole',
        method: 'post',
        data,
    });
}
// 角色详情
export function detailRole(params) {
    return request({
        url: 'admin/detailRole',
        method: 'get',
        params,
    });
}
// 删除角色
export function deleteRole(data) {
    return request({
        url: 'admin/deleteRole',
        method: 'post',
        data,
    });
}
// 全部用户
export function paginateUser(params) {
    return request({
        url: 'admin/paginateUser',
        method: 'get',
        params,
    });
}
// 添加用户
export function addUser(data) {
    return request({
        url: 'admin/addUser',
        method: 'post',
        data,
    });
}
// 后台用户详情
export function detailUser(params) {
    return request({
        url: 'admin/detailUser',
        method: 'get',
        params,
    });
}
// 删除后台用户
export function deleteUser(data) {
    return request({
        url: 'admin/deleteUser',
        method: 'post',
        data,
    });
}
// 日记记录
export function logRecord(params) {
    return request({
        url: 'admin/log',
        method: 'get',
        params,
    });
}
/* 基础设置 */
// 添加医院
export function hospitalAdd(data) {
    return request({
        url: 'hospital/add',
        method: 'post',
        data,
    });
}
// 医院列表
export function hospitalList(params) {
    return request({
        url: 'hospital/hospital',
        method: 'get',
        params,
    });
}
// 获取医院详情数据
export function detailList(params) {
    return request({
        url: 'hospital/detail',
        method: 'get',
        params,
    });
}
// 获取医院编辑数据
export function edit(params) {
    return request({
        url: 'hospital/edit',
        method: 'get',
        params,
    });
}
// 删除医院
export function deleteList(data) {
    return request({
        url: 'hospital/delete',
        method: 'post',
        data,
    });
}
// 获取医院详情数据
export function hospitalDetail(params) {
    return request({
        url: 'hospital/detail',
        method: 'get',
        params,
    });
}
// 关联医院科室
export function relation(data) {
    return request({
        url: 'hospital/relation',
        method: 'post',
        data,
    });
}
// 获取医院科室医生
export function doctor(params) {
    return request({
        url: 'hospital/doctor',
        method: 'get',
        params,
    });
}
// 添加科室
export function addDepartments(data) {
    return request({
        url: 'departments/addDepartments',
        method: 'post',
        data,
    });
}
// 科室列表
export function departmentsList(params) {
    return request({
        url: 'departments',
        method: 'get',
        params,
    });
}
// 科室下拉框数据
export function listDepartments(params) {
    return request({
        url: 'departments/list',
        method: 'get',
        params,
    });
}
// 删除科室
export function deleteDepartments(data) {
    return request({
        url: 'departments/delete',
        method: 'post',
        data,
    });
}
// 编辑科室
export function updateDepartments(data) {
    return request({
        url: 'departments/updateDepartments',
        method: 'post',
        data,
    });
}
// 科室关联的药品
export function relationDrugs(params) {
    return request({
        url: 'departments/relationDrugs',
        method: 'get',
        params,
    });
}
//添加药品
export function drugsAdd(data) {
    return request({
        url: 'drugs/add',
        method: 'post',
        data,
    });
}
// 药品管理列表
export function medicalDrugs(params) {
    return request({
        url: 'drugs',
        method: 'get',
        params,
    });
}
// 药品详情
export function drugsEdit(params) {
    return request({
        url: 'drugs/detail',
        method: 'get',
        params,
    });
}
// 删除药品
export function drugsDelete(data) {
    return request({
        url: 'drugs/delete',
        method: 'post',
        data,
    });
}
// 疾病查询
export function diseaseSearch(params) {
    return request({
        url: 'disease/search',
        method: 'get',
        params,
    });
}
// 新增疾病/编辑疾病
export function diseaseEdit(data) {
    return request({
        url: 'disease/edit',
        method: 'post',
        data,
    });
}
// 合并疾病
export function diseaseMerge(data) {
    return request({
        url: 'disease/merge',
        method: 'post',
        data,
    });
}
// 删除疾病
export function diseaseDelete(data) {
    return request({
        url: 'disease/delete',
        method: 'post',
        data,
    });
}
// 科室已关联的疾病
export function relationDisease(params) {
    return request({
        url: 'departments/relationDisease',
        method: 'get',
        params,
    });
}
// 科室关联疾病
export function diseaseRelation(data) {
    return request({
        url: 'departments/diseaseRelation',
        method: 'post',
        data,
    });
}
// 删除科室关联的疾病
export function delRelationDisease(data) {
    return request({
        url: 'departments/delRelationDisease',
        method: 'post',
        data,
    });
}
// 科室关联药品
export function drugsRelation(data) {
    return request({
        url: 'departments/drugsRelation',
        method: 'post',
        data,
    });
}
// 删除科室关联的药品
export function delRelationDrugsId(data) {
    return request({
        url: 'departments/delRelationDrugsId',
        method: 'post',
        data,
    });
}
/* 医生管理 */
// 全部医生
export function doctorList(params) {
    return request({
        url: 'doctor',
        method: 'get',
        params,
    });
}
// 添加医生
export function doctorListAdd(data) {
    return request({
        url: 'doctor/add',
        method: 'post',
        data,
    });
}
// 获取医院科室
export function hospitalDepartments(params) {
    return request({
        url: 'hospital/departments',
        method: 'get',
        params,
    });
}
// 重设医生密码
export function updatePassword(data) {
    return request({
        url: 'doctor/updatePassword',
        method: 'post',
        data,
    });
}
// 医生详情
export function doctorDetail(params) {
    return request({
        url: 'doctor/detail',
        method: 'get',
        params,
    });
}
// 删除医生
export function doctorDelete(data) {
    return request({
        url: 'doctor/delete',
        method: 'post',
        data,
    });
}
// 医嘱记录
export function advice(params) {
    return request({
        url: 'doctor/advice',
        method: 'get',
        params,
    });
}
// 医生收入
export function revenue(params) {
    return request({
        url: 'doctor/revenue',
        method: 'get',
        params,
    });
}
/* 运营管理 */
// 添加医生视频
export function addVideo(data) {
    return request({
        url: 'operate/addVideo',
        method: 'post',
        data,
    });
}
// 医生视频管理
export function operateVideo(params) {
    return request({
        url: 'operate/video',
        method: 'get',
        params,
    });
}
// 视频详情
export function operateDetail(params) {
    return request({
        url: 'operate/detail',
        method: 'get',
        params,
    });
}
// 删除视频
export function operateDelete(data) {
    return request({
        url: 'operate/delete',
        method: 'post',
        data,
    });
}
/* 患者管理 */
// 添加患者
export function suffererAdd(data) {
    return request({
        url: 'sufferer/add',
        method: 'post',
        data,
    });
}
// 患者详情
export function suffererDetail(params) {
    return request({
        url: 'sufferer/detail',
        method: 'get',
        params,
    });
}
// 患者列表
export function suffererList(params) {
    return request({
        url: 'sufferer/sufferer',
        method: 'get',
        params,
    });
}
// 删除患者
export function suffererDelete(data) {
    return request({
        url: 'sufferer/delete',
        method: 'post',
        data,
    });
}
// 新增随访记录
export function addFollowUp(data) {
    return request({
        url: 'sufferer/addFollowUp',
        method: 'post',
        data,
    });
}
// 随访记录
export function suffererFollowUp(params) {
    return request({
        url: 'sufferer/followUp',
        method: 'get',
        params,
    });
}
// 随访记录详情
export function followDetail(params) {
    return request({
        url: 'sufferer/followDetail',
        method: 'get',
        params,
    });
}
// 删除随访记录
export function delFollow(params) {
    return request({
        url: 'sufferer/delFollow',
        method: 'get',
        params,
    });
}
// 医佳注册用户列表
export function medicalUser(params) {
    return request({
        url: 'user',
        method: 'get',
        params,
    });
}
// 注册用户详情
export function userDetail(params) {
    return request({
        url: 'user/detail',
        method: 'get',
        params,
    });
}
// 删除注册用户
export function userDelete(data) {
    return request({
        url: 'user/delete',
        method: 'post',
        data,
    });
}
// 用户病程管理
export function userCourseOfDisease(params) {
    return request({
        url: 'user/userCourseOfDisease',
        method: 'get',
        params,
    });
}
// 病程日历
export function userCodDetail(params) {
    return request({
        url: 'user/codDetail',
        method: 'get',
        params,
    });
}