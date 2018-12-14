import Axios from 'axios';
const HOST = 'http://113.31.86.153:41090';

export const getHomeInof = (data) =>{
    return Axios({
            method:'post',
            url: HOST + '/v3/homeinfo',
            headers:{
                "Content-Type":"application/json"
            },
            params:data
        })
}