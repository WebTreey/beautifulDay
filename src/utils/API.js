/*
    Date:2018/12/07,
    USE:验证，通用
*/
//纯数字
export const ProvingMobile = (value="",length) => {
    let s = value.length > length ? (value+'').substring(0,length) : value;
    var rex = /[^\d]/;
    const str = (s+'').replace(rex,'')
    return str;
}
//验证身份证输入
export const ProvingID = (value="") => {
    let s = value.length > 18 ? (value+'').substring(0,18) : value;
    const rex = /[^\dxX]/g;
    const str = (s+'').replace(rex,'')
    return str;
}
//邮箱验证
export const ProvingEmail = (value="")=>{
    const rex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if(rex.test(value) || value === ""){
        return true
    }
    return false
}

export const setCommparams = {
    appName:' 闪电借款王',
    appPkgName :'shandianloanwap',
    osType :1,
    apkVersion:'1.0',
    channel:'baidutongji0001',
    isGroup:1
}