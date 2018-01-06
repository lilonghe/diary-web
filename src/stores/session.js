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
        let {err, status, data} = await request(`${config.sso_endPoint}auth/user`);

        if(!err){
            this.user = data.user;
            window.diary_openid = this.user.open_id;
        }else{
            if(status==401) {
                window.location=`${config.sso_endPoint}auth/authorize?app_id=${config.appid}&redirect_uri=${window.location.href}`;
            }else{
                alert(err);
            }
        }
    }

    logout() {
        window.location=`${config.sso_endPoint}auth/authorize?app_id=${config.appid}&redirect_uri=${window.location.href}&logout=true`;
    }
}

const session = new Session();
export default session;