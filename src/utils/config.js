import Axios from 'axios';
const HOST = 'http://192.168.1.191:9080';

export const getPullProLt = (data)=>{
    return Axios({
        method:'post',
        url: HOST + '/activity/pullProLt',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        params:data
    })
}

export const getgtUrBs = (data)=>{
    return Axios({
        method:'post',
        url: HOST + '/activity/gtUrBs',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        params:data
    })
}