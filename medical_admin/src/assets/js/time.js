/* 封装10位数字转日期格式 */
export function formatDate(time) {
    if (!time) return;
    var date = new Date(parseInt(time) * 1000)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    let month1 = month > 9 ? month : "0" + month
    var day = date.getDate();
    let day1 = day > 9 ? day : "0" + day
    var hour = date.getHours();
    let hour1 = hour > 9 ? hour : "0" + hour;
    var minute = date.getMinutes();
    let minute1 = minute > 9 ? minute : "0" + minute;
    return year + "-" + month1 + "-" + day1 + " " + hour1 + ":" + minute1;
}