const localStorage = require("localStorage");

exports.getToken = (key)=>{
    return JSON.parse(localStorage.getItem(key));
}

exports.setToken =(key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}

exports.removeToken = (key)=> {
    localStorage.removeItem(key);
}