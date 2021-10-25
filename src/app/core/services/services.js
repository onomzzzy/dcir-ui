import axios                   from "axios";
import qs                      from 'qs';
import {API}                   from "../api/api";
import {CONFIG}                from "../../shared/config/config";
import {LOCAL_STORAGE_SERVICE} from "./storage-service";



function login  (params) {
   const url = `${CONFIG.COMOS}/${API.LOGIN_API}`
    const basicAuth = 'Basic ' + btoa(`${CONFIG.AUTH_USER_NAME}`+ ':' + `${CONFIG.AUTH_PASSWORD}`);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': basicAuth
    }
    return new Promise((resolve, reject) => {
     axios.post(url,qs.stringify(params),{headers:headers})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getChargeType(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_CHARGE_TYPE}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function searchChargeType(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_CHARGE_MODEL}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function searchParticipant(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function searchTransactions(params,pageParam){
    const url = `${CONFIG.DCIR_HOST}${API.SEARCH_TRANSACTION}?${pageParam}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,params,{headers:header}) //change to put
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function deleteChargeModel(e){
    const url = `${CONFIG.DCIR_HOST}${API.DELETE_CHARGE_MODEL}/${e}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,{headers:header})//remember to change to put
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function deleteParticipant(e){
    const url = `${CONFIG.DCIR_HOST}${API.DELETE_PARTICIPANT}/${e}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function deleteMerchant(e){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}/${e}`;//change to delete api
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.delete(url,{headers:header})//remember to change to put
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getSettlementType(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_SETTLEMENT_TYPE}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getSettlementParticipantGlobal(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_SETTLEMENT_PARTICIPANT_GLOBAL}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getSettlementParticipantNonGlobal(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_SETTLEMENT_PARTICIPANT_NON_GLOBAL}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getChargeModels(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_CHARGE_MODEL}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

  function viewChargeModel(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_CHARGE_MODEL}/${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
  }

function viewParticipant(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}/${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function geMerchantUsers(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_MERCHANT_USER}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getParticipants(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getTransactions(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_TRANSACTIONS}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getBulkSettlement(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_BULK_SETTLEMENT}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getFrontOfficeBulkSettlement(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_FRONT_OFFICE_BULK_SETTLEMENT}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getBulkSettlementTransactions(params,bulkSettlementKey){
    const url = `${CONFIG.DCIR_HOST}${API.GET_BULK_SETTLEMENT_TRANSACTION}${bulkSettlementKey}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getFrontOfficeBulkSettlementTransactions(params,bulkSettlementKey){
    const url = `${CONFIG.DCIR_HOST}${API.GET_FRONT_OFFICE_BULK_SETTLEMENT_TRANSACTION}${bulkSettlementKey}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getPaymentRequest(params,bulkSettlementKey){
    const url = `${CONFIG.DCIR_HOST}${API.GET_PAYMENT_REQUEST}${bulkSettlementKey}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getFrontOfficePaymentRequest(params,bulkSettlementKey){
    const url = `${CONFIG.DCIR_HOST}${API.GET_PAYMENT_REQUEST}${bulkSettlementKey}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getDisputes(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_DISPUTE}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getDisputeCodes(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_DISPUTE_CODES}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getMerchants(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getMerchantUsers(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_MERCHANT_USER}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getFrontOfficeMerchantUsers(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_FRONT_OFFICE_MERCHANT_USER}?${params}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function viewMerchantUser(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_MERCHANT_USER}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getMerchant(e){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}/${e}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function getFrontOfficeUserRoles(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_FRONT_OFFICE_MERCHANT_ROLES}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.get(url,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

 function createMerchant(params){
     const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}`;
     const header = getBasicHeader();
     return new Promise((resolve, reject) => {
         axios.post(url,params,{headers:header})
             .then(function (data) {
                 resolve(data.data);
             })
             .catch(function (error) {
                 if (error.response) {
                     reject(error.response);
                 }
             });
     });
 }


function updateMerchant(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}/${params.merchantId}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function createParticipant(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function createDispute(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_DISPUTE}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function createMerchantUsers(params){
    const url = `${CONFIG.DCIR_HOST}${API.GET_MERCHANT_USER}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function createFrontOfficeMerchantUsers(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_FRONT_OFFICE_MERCHANT_USER}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}



function createChargeTypeModel(params){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_CHARGE_TYPE_MODEL}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.post(url,params,{headers:header})
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function updateChargeTypeModel(params){//re work if needed
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_CHARGE_TYPE_MODEL}/${params?.id}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,params,{headers:header}) //change to put
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

function updateParticipant(params){//re work if needed
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}/${params?.id}`;
    const header = getBasicHeader();
    return new Promise((resolve, reject) => {
        axios.put(url,params,{headers:header}) //change to put
            .then(function (data) {
                resolve(data.data);
            })
            .catch(function (error) {
                if (error.response) {
                    reject(error.response);
                }
            });
    });
}

const getBasicHeader = () =>{
    const token = LOCAL_STORAGE_SERVICE.GET_TOKEN();
    // const tokenBearer = `Bearer ${token}`
    return {
        'Content-Type': 'application/json',
         // Authorization: tokenBearer,
        'Access-Control-Allow-Origin': '*',
    }
}

export const SERVICES = {
  LOGIN:login,
  CREATE_MERCHANT:createMerchant,
  CREATE_PARTICIPANT:createParticipant,
  CREATE_CHARGE_TYPE_MODEL:createChargeTypeModel,
  UPDATE_CHARGE_TYPE_MODEL:updateChargeTypeModel,
  GET_SETTLEMENT_PARTICIPANT_NON_GLOBAL:getSettlementParticipantNonGlobal,
  GET_SETTLEMENT_PARTICIPANT_GLOBAL:getSettlementParticipantGlobal,
  GET_SETTLEMENT_TYPE:getSettlementType,
  GET_CHARGE_TYPE:getChargeType,
  DELETE_CHARGE_MODEL: deleteChargeModel,
  SEARCH_CHARGE_MODEL: searchChargeType,
  GET_CHARGE_MODELS: getChargeModels,
  VIEW_CHARGE_MODEL: viewChargeModel,
  GET_PARTICIPANTS: getParticipants,
  DELETE_PARTICIPANT: deleteParticipant,
  UPDATE_PARTICIPANT: updateParticipant,
  SEARCH_PARTICIPANT: searchParticipant,
  GET_MERCHANTS: getMerchants,
  GET_MERCHANT: getMerchant,
  DELETE_MERCHANT: deleteMerchant,
  UPDATE_MERCHANT: updateMerchant,
  GET_TRANSACTION: getTransactions,
  SEARCH_TRANSACTIONS: searchTransactions,
  GET_DISPUTE_CODES:getDisputeCodes,
  CREATE_DISPUTE: createDispute,
  GET_DISPUTE: getDisputes,
  GET_MERCHANT_USER: getMerchantUsers,
  CREATE_MERCHANT_USER: createMerchantUsers,
  CREATE_FRONT_OFFICE_MERCHANT_USER: createFrontOfficeMerchantUsers,
  VIEW_PARTICIPANT: viewParticipant,
  VIEW_MERCHANT_USER: viewMerchantUser,
  GET_BULK_SETTLEMENT: getBulkSettlement,
  GET_FRONT_OFFICE_BULK_SETTLEMENT: getFrontOfficeBulkSettlement,
  GET_BULK_SETTLEMENT_TRANSACTION:getBulkSettlementTransactions,
  GET_FRONT_OFFICE_BULK_SETTLEMENT_TRANSACTION: getFrontOfficeBulkSettlementTransactions,
  GET_PAYMENT_REQUEST: getPaymentRequest,
  GET_FRONT_OFFICE_PAYMENT_REQUEST: getFrontOfficePaymentRequest,
  GET_FRONT_OFFICE_MERCHANT_ROLES: getFrontOfficeUserRoles,
  GET_FRONT_OFFICE_MERCHANT_USERS: getFrontOfficeMerchantUsers
}
