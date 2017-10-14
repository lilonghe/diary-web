import axios from 'axios';
import config from './config';

const request = async (url, options={ query: {} }) => {
  if(!options.method){
  	options.method = 'get';
  }
  options.query.appid='llhmKEiAK9WjwsnyPxGY3hnrG';
  try{
	  let { data } = await axios({
		  method: options.method,
		  url: url.indexOf("http")==-1 ? `${config.api_endPoint}${url}` : url,
		  data: options.method == 'post' ? options.query:undefined,
          params: options.method == 'get' ? options.query:undefined,
		  withCredentials: true,
		  headers: { 'token': window.diary_token, 'openid': window.diary_openid }
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
}

export default request;