import {HELPER} from "../helper/helper";

export const chargeTypeMenus = [
    {
        menu: 'Charge Types',
        icon: 'pi pi-home',
        index: 0
    },
    {
        menu: 'Settlement Participants',
        icon: 'pi pi-home',
        index: 1
    },
    {
        menu: 'Configure Settlement',
        icon: 'pi pi-home',
        index: 2
    },
]

export const SpecialLabelCases = [
    {case:"transactionAmount",action:HELPER.TO_CURRENCY_FORMAT},
    {case:"transactionMerchantAmount",action:HELPER.TO_CURRENCY_FORMAT},
    {case:"transactionChargeAmount",action:HELPER.TO_CURRENCY_FORMAT},
    {case:"amount",action:HELPER.TO_CURRENCY_FORMAT},
    {case: "transactionTime",action:HELPER.FORMAT_DATE},
    {case:"transactionDate",action:HELPER.FORMAT_DATE},
    {case: 'chargeAmount',action:HELPER.TO_CURRENCY_FORMAT},
    {case: 'requestTime',action:HELPER.FORMAT_DATE},
    {case: 'settlementTime',action:HELPER.FORMAT_DATE},
    {case: 'responseCode',action:HELPER.RESPONSE_CODE_COLOR},
    {case: 'resolutionStatus',action:HELPER.RESPONSE_STATUS},
    {case: 'status',action:HELPER.RESPONSE_STATUS},
    {case: 'createdOn',action:HELPER.FORMAT_DATE},
    {case: 'active',action:HELPER.RESPONSE_STATUS},
    {case: 'createdAt',action:HELPER.FORMAT_DATE}

]


const tokenStorageName = 'dcir_bo_yhb84sabfy11';
const userNameStorageName = 'dcir_bo_yhb23szbrb12';
const isLoginStorageName = 'dcir_bo_lgb84nemjy15';
const expire_inStorageName = 'dcir_bo_exb84inekm61';
const currentPageStorageName = 'dcir_bo_cpb84snarm19';
const rolesStorageName = 'dcir_bo_rub64slesrk17';
const authoritiesStorageName = 'dcir_bo_aub84sriesrhor08';
const nameStorageName = 'dcir_bo_rob84slesrm17';
const firstNameStorageName = 'dcir_bo_firb84srore18';
const lastNameStorageName = 'dcir_bo_lnb84slagerm23';
const currentPageIndex = 'dcir_bo_pid14sleverm10'

export const LOCAL_STORAGE = {
    TOKEN: `${tokenStorageName}`,
    USER_NAME: `${userNameStorageName}`,
    IS_LOGIN: `${isLoginStorageName}`,
    EXPIRE_IN: `${expire_inStorageName}`,
    CURRENT_PAGE_STORAGE_NAME: `${currentPageStorageName}`,
    ROLES: `${rolesStorageName}`,
    NAME: `${nameStorageName}`,
    FIRST_NAME: `${firstNameStorageName}`,
    LAST_NAME: `${lastNameStorageName}`,
    AUTHORITIES: `${authoritiesStorageName}`,
    CURRENT_PAGE_INDEX: `${currentPageIndex}`
}
