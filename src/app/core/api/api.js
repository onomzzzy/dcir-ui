const login = '/oauth/token';
const create_merchant = '/api/v1/backoffice/merchant';
const create_merchant_user ='/api/v1/backoffice/merchant-user';
const create_front_office_merchant_user ='/api/v1/frontoffice/user';
const get_front_office_merchant_roles ='/api/v1/frontoffice/user/roles';
const create_charge_type_model = '/api/v1/backoffice/charge-model';
const verify_account_number ='/api/v1/common/account/name-enquiry/'
const get_charge_model = '/api/v1/backoffice/charge-model';
const delete_charge_model = '/api/v1/backoffice/charge-model/remove';
const get_charge_type = '/api/v1/backoffice/charge-model/types';//remember to remove the s from backoffice
const get_settlement_type = '/api/v1/backoffice/merchant/settlement/types';
const create_settlement = '/api/v1/backoffice/settlement-participant';
const delete_settlement = '/api/v1/backoffice/settlement-participant/remove';
const deactivate_merchant = '/api/v1/frontoffice/user/status/change';
const create_dispute = '/api/v1/backoffice/dispute';
const get_transactions = '/api/v1/backoffice/transaction';
const get_front_office_transactions = '/api/v1/frontoffice/transaction';
const get_bulk_settlement = '/api/v1/backoffice/settlement/bulk';
const get_front_office_bulk_settlement = '/api/v1/frontoffice/settlement/bulk';
const get_bulk_settlement_transactions = '/api/v1/backoffice/settlement/';
const get_front_office_bulk_settlement_transactions = '/api/v1/frontoffice/settlement/';
const get_payment_request = '/api/v1/backoffice/paymentrequest/';
const get_front_office_payment_request = '/api/v1/frontoffice/paymentrequest/';
const search_transactions = '/api/v1/backoffice/transaction/filter';
const get_dispute_codes = '/api/v1/backoffice/dispute/disputable-codes';
const filter_transactions = '/api/v1/backoffice/transaction/filter';
const get_settlement_participant_global = '/api/v1/backoffice/settlement-participant';
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
    CREATE_DISPUTE: `${create_dispute}`,
    GET_MERCHANT_USER: `${create_merchant_user}`,
    SEARCH_TRANSACTION: `${search_transactions}`,
    DELETE_PARTICIPANT: `${delete_settlement}`,
    GET_BULK_SETTLEMENT: `${get_bulk_settlement}`,
    GET_FRONT_OFFICE_BULK_SETTLEMENT: `${get_front_office_bulk_settlement}`,
    GET_BULK_SETTLEMENT_TRANSACTION: `${get_bulk_settlement_transactions}`,
    GET_FRONT_OFFICE_BULK_SETTLEMENT_TRANSACTION: `${get_front_office_bulk_settlement_transactions}`,
    GET_PAYMENT_REQUEST:`${get_payment_request}`,
    GET_FRONT_OFFICE_PAYMENT_REQUEST: `${get_front_office_payment_request}`,
    CREATE_FRONT_OFFICE_MERCHANT_USER: `${create_front_office_merchant_user}`,
    GET_FRONT_OFFICE_MERCHANT_ROLES: `${get_front_office_merchant_roles}`,
    GET_FRONT_OFFICE_TRANSACTIONS: `${get_front_office_transactions}`,
    DEACTIVATE_MERCHANT: `${deactivate_merchant}`,
    VERIFY_ACCOUNT_NUMBER: `${verify_account_number}`
}
