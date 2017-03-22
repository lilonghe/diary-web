import 'whatwg-fetch';

export default new class Request {
    login(param,fail,success) {
        fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errno == 0) {
                    
                    success && success(data);
                } else {
                    fail && fail(data);
                }
            });
    }

    diaryList(param, fail, success) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = '/login';
        }
        fetch('/api/diary?token=' + user.token, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                success && success(data);
            });
    }

    userDiaryList(param, fail, success) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = '/login';
        }
        fetch('/api/user/diary?token=' + user.token, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                success && success(data);
            });
    }

    reg(param, fail, success) {
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errno == 0) {

                    success && success(data);
                } else {
                    fail && fail(data);
                }
            });
    }
}