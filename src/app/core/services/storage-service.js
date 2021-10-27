

import {LOCAL_STORAGE} from "../../shared/models/utilities";

 function saveUserCredentials(loginCredentials){
  localStorage.setItem(LOCAL_STORAGE.AUTHORITIES,JSON.stringify(loginCredentials.authorities));
    localStorage.setItem(LOCAL_STORAGE.TOKEN,loginCredentials.access_token);
    localStorage.setItem(LOCAL_STORAGE.CURRENT_PAGE_STORAGE_NAME,loginCredentials.selectedSideNav);
    localStorage.setItem(LOCAL_STORAGE.IS_LOGIN,JSON.stringify(loginCredentials.isAuthenticated));
    localStorage.setItem(LOCAL_STORAGE.USER_NAME,loginCredentials.username);
    localStorage.setItem(LOCAL_STORAGE.EXPIRE_IN,JSON.stringify(loginCredentials.expires_in));
    localStorage.setItem(LOCAL_STORAGE.FIRST_NAME,loginCredentials.firstName);
    localStorage.setItem(LOCAL_STORAGE.LAST_NAME,loginCredentials.lastName);
    localStorage.setItem(LOCAL_STORAGE.ROLES,JSON.stringify(loginCredentials.roles));
    localStorage.setItem(LOCAL_STORAGE.NAME,loginCredentials.name);
     localStorage.setItem(LOCAL_STORAGE.CURRENT_PAGE_INDEX,loginCredentials.selectedSideNavIndex.toString());
     localStorage.setItem(LOCAL_STORAGE.CURRENT_PAGE_STORAGE_NAME,loginCredentials.selectedSideNav);
}

 function getUserCredentials(){
     let authorities = localStorage.getItem(LOCAL_STORAGE.AUTHORITIES);
     authorities = authorities?JSON.parse(authorities):[];
     let roles = localStorage.getItem(LOCAL_STORAGE.ROLES);
     roles = roles?JSON.parse(roles):[];
     const currentPageIndex = localStorage.getItem(LOCAL_STORAGE.CURRENT_PAGE_INDEX) || '0'
    return{
        username:localStorage.getItem(LOCAL_STORAGE.USER_NAME),
        selectedSideNav:localStorage.getItem(LOCAL_STORAGE.CURRENT_PAGE_STORAGE_NAME),
        isAuthenticated:localStorage.getItem(LOCAL_STORAGE.IS_LOGIN),
        access_token:localStorage.getItem(LOCAL_STORAGE.TOKEN),
        authorities:authorities,
        expires_in:Number(localStorage.getItem(LOCAL_STORAGE.EXPIRE_IN)),
        firstName:localStorage.getItem(LOCAL_STORAGE.FIRST_NAME),
        lastName:localStorage.getItem(LOCAL_STORAGE.LAST_NAME),
        name:localStorage.getItem(LOCAL_STORAGE.NAME),
        selectedSideNavIndex:parseInt(currentPageIndex),
        roles:roles
    }
}

 function isLogin(){
    const loginStatus = localStorage.getItem(LOCAL_STORAGE.IS_LOGIN);
   return loginStatus && loginStatus === 'true';
}

 function isTokenExpire(){
    const expire_in = Number(localStorage.getItem(LOCAL_STORAGE.EXPIRE_IN));
}

 function getToken(){
    return localStorage.getItem(LOCAL_STORAGE.TOKEN);
}

function storeCurrentPage(page,index){
     localStorage.setItem(LOCAL_STORAGE.CURRENT_PAGE_STORAGE_NAME,page);
     localStorage.setItem(LOCAL_STORAGE.CURRENT_PAGE_INDEX,index.toString())
}

function clearStorage(){
     localStorage.clear();
}

function getRoles(){
     return JSON.parse(localStorage.getItem(LOCAL_STORAGE.ROLES));
}

function getCurrentSideNav(){
    return {
        selectedSideNav: localStorage.getItem(LOCAL_STORAGE.CURRENT_PAGE_STORAGE_NAME),
        selectedSideNavIndex:Number(localStorage.getItem(LOCAL_STORAGE.CURRENT_PAGE_INDEX))
    }
}

function getAuthorities(){
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE.AUTHORITIES));
}

export const LOCAL_STORAGE_SERVICE = {
    GET_TOKEN:getToken,
    SAVE_USER_CREDENTIAL:saveUserCredentials,
    GET_USER_CREDENTIALS:getUserCredentials,
    IS_LOGIN:isLogin,
    CLEAR_STORAGE:clearStorage,
    IS_TOKEN_EXPIRE:isTokenExpire,
    GET_ROLES:getRoles,
    GET_AUTHORITIES:getAuthorities,
    STORE_CURRENT_PAGE:storeCurrentPage,
    GET_CURRENT_NAV:getCurrentSideNav
}
