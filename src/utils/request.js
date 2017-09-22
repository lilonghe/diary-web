import axios from 'axios';
import config from 'config';

const request = async (url, options={}) => {
  if(!options.method){
  	options.method = 'get';
  }
  try{
	  let { data } = await axios({
		  method: options.method,
		  url: `${config.api_endPoint}${url}`,
		  data: options.query,
          params: options.method == 'get' ? options.query:undefined,
		  withCredentials: true
	  });
  	return { err: data.error, data: data };
  }catch(err){
  	let resu;
  	if(err.response){
  		resu = { err: err.response.data.error, data: err.response.data};
  	}else{
  		resu = { err: 'Network Error', data: { error:'Network Error', message: '请求网络资源失败' }};
  	}
  	console.log(resu);
  	return resu;
  }
}

export default request;