import {initialState} from "../state/state";

export const reducer = (state, action) => {
    switch (action.type) {
        case "CLICKED_SIDE_NAV":
            state = {
                ...state,
                selectedSideNav: action.selectedSideNav,
                selectedSideNavIndex: action.selectedSideNavIndex
            };
            return state;
        case "PERSIST_LOGIN_DATA":
            state = {
                ...state,
                username:action?.loginData?.username,
                access_token:action?.loginData?.access_token,
                authorities:action?.loginData?.authorities,
                expires_in:action?.loginData?.expires_in,
                firstName:action?.loginData?.firstName,
                lastName:action?.loginData?.lastName,
                name:action?.loginData?.name,
                roles:action?.loginData?.roles,
                selectedSideNav: action?.loginData?.selectedSideNav,
                selectedSideNavIndex: action?.loginData?.selectedSideNavIndex,
                isAuthenticated:action?.loginData?.isAuthenticated
            };
            console.log('state ',state);
            return state;
        case "LOG_OUT":
            state = {
                ...state,
                username:null,
                access_token:null,
                authorities:[],
                expires_in:0,
                firstName:null,
                lastName:null,
                name:null,
                roles:[],
                isAuthenticated:false
            };
            return state;
        case 'SHOW_DIALOG':
            state ={
                ...state,
                showDialog: action.showDialog
            }
            return state;
        case 'ON_PAGE_CHANGE':
            state ={
                ...state,
                currentPage: action.currentPage
            }
            return state;
        default:
            return initialState;
    }
};
