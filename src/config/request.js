import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export default new class Request {

    constructor(){
        try{
            this.user = JSON.parse(localStorage.getItem('user'));
        }catch(err){
            localStorage.clear();
        }
    }

    get(param){
        let queryString = "?";
        for(let obj in param.data){
            if(param.data.hasOwnProperty(obj)){
                queryString += (obj + '=' + param.data[obj] + "&");
            }
        }
        if(queryString.length<2)
            queryString += '&';
        if(this.user)
            queryString += 'token='+this.user.token;
            

        fetch(param.url + queryString, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.errno==0)
                    param.success && param.success(data);
                else
                    param.fail && param.fail(data);
            });
    }

    post(param){
        if(this.user){
            param.data.token = this.user.token;
        }
        fetch(param.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param.data)
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.errno==0)
                    param.success && param.success(data);      
                else
                    param.fail && param.fail(data);          
            });
    }

    login(param,fail,success) {
        let that = this;
        this.post({
            url: '/api/session',
            data: param,
            success: (data) => {
                that.user = data.data;
                success && success(data);
            },
            fail: (data) => fail && fail(data)
        })
    }

    diaryList(param, fail, success) {
        this.get({
            url: '/api/diary',
            data: param,
            success: (data) => success && success(data),
            fail: (data) => fail && fail(data)
        })
    }

    userDiaryList(param, fail, success) {
        this.get({
            url: '/api/user/diary',
            data: param,
            success: (data) => success && success(data),
            fail: (data) => fail && fail(data)
        });
    }

    reg(param, fail, success) {
        this.post({
            url: '/api/user',
            data: param,
            success: (data) => success && success(data),
            fail: (data) => fail && fail(data)
        });
    }

    postDiary(param,fail,success){
        this.post({
            url: '/api/user/diary',
            data: param,
            success: (data) => success && success(data),
            fail: (data) => fail && fail(data)
        });
    }
}