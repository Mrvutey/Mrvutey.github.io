
import dayjs from "dayjs";

export const Config = {
    base_url :"http://localhost:8081/api/",
    image_path : "http://localhost:80/full_stack/image/",
    version : "",
    token : ""
}

export const isEmptyOrNull = (value) => {
    if(value === "" || value === null || value === undefined || value === "null" || value === "undefined"){
      return true;
    }
    return false;
}

export const getUser = () => {
    var user =  localStorage.getItem("profile");
    if(user != null && user !== ""){
        user = JSON.parse(user);
        return user;
    }
    return null;
}

export const setUser = (user={}) => {
    localStorage.setItem("profile",JSON.stringify(user)) 
    localStorage.setItem("isLogin","1")
}

export const setAccessToken = (access_token) => {
    localStorage.setItem("access_token",access_token)
}

export const getAccessToken = () => {
    localStorage.getItem("access_token")
}

export const setRefreshToken = (refresh_token) => {
    localStorage.setItem("refresh_token",refresh_token)
}

export const getRefreshToken = () => {
    localStorage.getItem("refresh_token")
}

export const logout = () => {
    localStorage.setItem("profile","") 
    localStorage.setItem("isLogin","0")
    window.location.href = "login";
}

export const isLogin = () => {
    if(localStorage.getItem("isLogin") === "1"){
        return true
    }else{
        return false
    }
}

export const formartDateClient = (date) => {
    if(date !== null && date !== ""){
        return dayjs(date).format("DD/MM/YYYY")
    }
    return null;
}

export const formartDateServer = (date) => {
    if(date !== null && date !== ""){
        return dayjs(date).format("YYYY-MM-DD")
    }
    return null;
}