// import axios from 'axios';
import config from './config';
import formData from 'form-data';
import 'isomorphic-fetch';

const request = async (url, options={ method:'get', query: {} }) => {
    if(!options.method){
        options.method = 'get';
    }
    options.query.appid='llhmKEiAK9WjwsnyPxGY3hnrG';
    try{
        var form = new FormData();
        var query = '?';
        if(options.method=='post') {
            Object.keys(options.query).forEach(key => {
                form.append(key, options.query[key]);
            });
        } else {
            Object.keys(options.query).forEach(key => {
                query += `${key}=${options.query[key]}&`;
            });
        }
        
        
        let data = await fetch((url.indexOf('http')==-1 ? `${config.api_endPoint}${url}` : url) + query, {
            method: options.method,
            body: options.method == 'post' ? form:undefined,
            credentials: 'include', //withCredentials: true,
            headers: { 'token': window.diary_token, 'openid': window.diary_openid }
        }).then(function(response) {
            return response.json();
        });

        if(data.status===401) {
            window.location=`${config.sso_endPoint}auth/authorize?app_id=${config.appid}&redirect_uri=${window.location.href}`;		
        }
        return { err: data.error, status: data.status , data: data.data };
    }catch(err){
        let resu;
        if(err.response){
            resu = { err: err.response.data.error, status: err.response.data.status , data: err.response.data.data};
        }else{
            resu = { err: '请求网络资源失败', status: 400};
        }
        return resu;
    }
};

export default request;