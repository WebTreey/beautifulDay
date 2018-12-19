import Axios from 'axios';
// const HOST = 'http://192.168.1.191:9080';

const getHost = () =>{
    const wd = document.domain;
    let port = window.location.port || '';
    port = port === '' ? '' : ':' + port
    const http = window.location.protocol+'//';
    const host = http + wd + port
    console.log(wd,port,host)
    if(host.indexOf('localhost')>-1 || host.indexOf('192.168.1.188')>-1 ){
        return 'http://192.168.1.191:9080'
    }else{
        return host
    }
}
const HOST = getHost()




//获取产品列表
export const getPullProLt = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/activity/pullProLt',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: data
    })
}
//获取用户奖金
export const getGtUrBs = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/activity/gtUrBs',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: data
    })
}
//获取我的进度
export const getGtPrges = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/activity/gtPrges',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: data
    })
}
//统计
export const getClkLg = (data) => {
    return Axios({
        method: 'post',
        url: HOST + '/activity/clkLg',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: data
    })
}
//获取验证码
export const getSendSms = (data) =>{
    return Axios({
        method: 'post',
        url: HOST + '/front/sendSms',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: data
    })
}