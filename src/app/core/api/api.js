const login = '/oauth/token';
const create_merchant = '/api/v1/backoffice/merchant';
const create_charge_type_model = '/api/v1/backoffice/charge-model';
const get_charge_model = '/api/v1/backoffice/charge-model';
const delete_charge_model = '/api/v1/backoffice/charge-model/remove/';
const get_charge_type = '/api/v1/backoffices/charge-model/type';//remember to remove the s from backoffice
const get_settlement_type = '/api/v1/backoffice/merchant/settlement/types';
const create_settlement = '/api/v1/backoffice/settlement-participant';
const create_dispute = '/api/v1/backoffice/dispute';
const get_transactions = '/api/v1/backoffice/transaction';
const get_dispute_codes = '/api/v1/backoffice/disputable-codes';//api/v1/backoffice/dispute/disputable-codes
const filter_transactions = '/api/v1/backoffice/transaction/filter';
const get_settlement_participant_global = '/api/v1/backoffice/settlement-participant/all/global';
const get_settlement_participant_non_global = '/api/v1/backoffice/settlement-participant/all/non-global';


export const API = {
    LOGIN_API:`${login}`,
    CREATE_MERCHANT: `${create_merchant}`,
    CREATE_PARTICIPANT: `${create_settlement}`,
    CREATE_CHARGE_TYPE_MODEL: `${create_charge_type_model}`,
    GET_CHARGE_TYPE: `${get_charge_type}`,
    GET_CHARGE_MODEL: `${get_charge_model}`,
    DELETE_CHARGE_MODEL: `${delete_charge_model}`,
    GET_SETTLEMENT_PARTICIPANT_GLOBAL: `${get_settlement_participant_global}`,
    GET_SETTLEMENT_PARTICIPANT_NON_GLOBAL: `${get_settlement_participant_non_global}`,
    GET_SETTLEMENT_TYPE: `${get_settlement_type}`,
    GET_TRANSACTIONS: `${get_transactions}`,
    FILTER_TRANSACTIONS: `${filter_transactions}`,
    GET_DISPUTE_CODES: `${get_dispute_codes}`,
    CREATE_DISPUTE: `${create_dispute}`
}