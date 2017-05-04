
class AppStore{
    constructor(){
        this.loginCallBack = [];
        this.login = false;
    }

    addLoginCallBack(cb){
        this.loginCallBack.push(cb);
        if(this.login){
            cb && cb();
        }
    }

    executeLogin(){
        let user = localStorage.getItem('user');
        if(!user) return;
        this.login = true;
        for(let i=0; i<this.loginCallBack.length; i++){
            this.loginCallBack[i] && this.loginCallBack[i]();
        }
    }

    logout(){
        localStorage.clear();
    }
}
const store = new AppStore();
export default store;