class Utils {
    setItem(key,obj){
        localStorage.setItem(key,JSON.stringify(obj));
    }

    getItem(key){
        return localStorage.getItem(key);
    }
}

const utils = new Utils();

export default utils;