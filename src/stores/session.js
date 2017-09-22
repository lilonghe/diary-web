import { action, computed, observable } from 'mobx';
import request from '../utils/request';	

class Session {
	@observable user;
	@observable state = "pending";

	@action
	clear() {
		this.user = undefined;
	}

	@action 
	async login({ name, pass }) {
		let {err, data} = await request('user/info');
		console.log('store', err, data);
		if(!err){
			this.user = data.user;
			return {};
		}else{
			return { err, data };
		}
	}

	@action
	async get() {
		this.state = "pending"
		let { err, data } = await services.session.get();
		if(!err){
			this.user = data;
		}
		this.state = "done";
	}
}

const session = new Session();
export default session;