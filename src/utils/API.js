/*
    Date:2018/12/07,
    USE:验证，通用
*/
//纯数字
export const ProvingMobile = (value = "", length) => {
    let s = value.length > length ? (value + '').substring(0, length) : value;
    var rex = /[^\d]/;
    const str = (s + '').replace(rex, '')
    return str;
}
//验证身份证输入
export const ProvingID = (value = "") => {
    let s = value.length > 18 ? (value + '').substring(0, 18) : value;
    const rex = /[^\dxX]/g;
    const str = (s + '').replace(rex, '')
    return str;
}
//邮箱验证
export const ProvingEmail = (value = "") => {
    const rex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (rex.test(value) || value === "") {
        return true
    }
    return false
}

//隐藏中间字符
export const HideConter = (value) => {
    const str = value + '' ;
    const len = str.length;
    if(len===2){
        return str.substring(0,1)+ '*'
    }else if(len===3){
        return str.substring(0,1) + '*' + str.charAt(len-1);
    }else if(len===11){
        return str.substring(0,4) + '****' + str.substring(7);
    }
}

//本地储存
export const myStorage = {
    get: function (key) {
        var value = localStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch (e) {
                return value;
            }
        } else {
            return false;
        }
    },
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
};

//随机数imei
export const ukey = () => {
    let k;
    if (!myStorage.get('ukey')) {
        k = new Date().getTime() + Math.round(Math.random() * 10000)
        myStorage.set("ukey", k)
    } else {
        k = myStorage.get('ukey');
    }
    return k
}

export const setCommparams = {
    appName: ' 闪电借款王',
    appPkgName: 'shandianloanwap',
    osType: 1,
    apkVersion: '1.0',
    channel: 'baidutongji0001',
    isGroup: 1,
    phone: '13312345678',
    city: '深圳市',
    imei: ukey()
}