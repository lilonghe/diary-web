var config = {
    api_endPoint: !global.dev ? 'https://diary.lilonghe.net/api/' : 'http://localhost:8362/',
    sso_endPoint: !global.dev ? 'https://sso.lilonghe.net/' : 'http://localhost:8360/',
    appid: 'llhmKEiAK9WjwsnyPxGY3hnrG',
    goSSO: function(logout){
        let url = `${this.sso_endPoint}auth/authorize?app_id=${this.appid}&redirect_uri=${this.api_endPoint}oauth2/authorize${encodeURIComponent('?redirect_uri=' + window.location.href)}`;       
        if(logout) {
            url += '&logout=true';
        }
        window.location = url;
    }
};
export default config;