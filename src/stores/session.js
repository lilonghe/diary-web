import { action, observable } from 'mobx';
import config from '../utils/config';
import request from '../utils/request';	

class Session {
    @observable user;
    @observable state;

    @action
    clear() {
        this.user = undefined;
    }

    @action 
    async getUser() {
        let {err, data} = await request(`${config.sso_endPoint}auth/user`, { query: { appid: config.appid } });

        if(!err){
            this.user = data.user;
            window.diary_openid = this.user.open_id;
        }
    }

    @action
    async logout() {
        let { err } = await request('user/logout');
        if (!err) {
            config.goSSO(true);    
        }

    }
}

const session = new Session();
export default session;