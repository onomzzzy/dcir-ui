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

function searchTransactions(params){
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

function deleteChargeModel(e){
    const url = `${CONFIG.DCIR_HOST}${API.GET_CHARGE_MODEL}/${e}`;//change to delete api
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

function deleteParticipant(e){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}/${e}`;//change to delete api
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

function getSettlementParticipantGlobal(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_SETTLEMENT_PARTICIPANT_GLOBAL}`;
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

function getParticipants(){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_PARTICIPANT}`;
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

function getTransactions(){
    const url = `${CONFIG.DCIR_HOST}${API.GET_TRANSACTIONS}`;
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

function getDisputes(){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_DISPUTE}`;
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

function getMerchants(){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}`;
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

function getMerchant(e){
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}?id=${e}`;
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
    const url = `${CONFIG.DCIR_HOST}${API.CREATE_MERCHANT}/${params.id}`;
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
    const tokenBearer = `Bearer ${token}`
    return {
        'Content-Type': 'application/json',
        'Authorization': tokenBearer
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
  GET_DISPUTE: getDisputes
}
