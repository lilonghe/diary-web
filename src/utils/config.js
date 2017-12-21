var config = {
    api_endPoint:  process.env!='development' ? 'https://sso.lilonghe.net/diary/' : 'http://localhost:8360/diary/',
    sso_endPoint: process.env!='development' ? 'https://sso.lilonghe.net/' : 'http://localhost:8360/',
    appid: 'llhmKEiAK9WjwsnyPxGY3hnrG'
};
export default config;