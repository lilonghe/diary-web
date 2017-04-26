
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
        this.login = true;
        for(let i=0; i<this.loginCallBack.length; i++){
            if(this.loginCallBack[i]){
                this.loginCallBack[i]();
            }
        }
    }
}
const store = new AppStore();
export default store;