//
//
// const cosmos = 'https://cosmos.development.teamapt.com';
const cosmos = 'http://localhost:8085';

// const dcir = 'http://localhost:8000';

const dcir = 'http://localhost:6011';

// const authUserName = 'monnify-agency-banking-frontoffice';//
const authUserName = 'dcir-management-service'

const authPassword = 'secret';

const grant_type = 'password';

// const authenticationDomain = 'DCIR-BACKOFFICE';
const authenticationDomain = 'DCIR-MANAGEMENT-SERVICE';

const app_data = "mock";

export const CONFIG = {
    DCIR_HOST: `${dcir}`,
    COMOS: `${cosmos}`,
    APP_DATA: `${app_data}`,
    AUTH_USER_NAME: `${authUserName}`,
    AUTH_PASSWORD: `${authPassword}`,
    DOMAIN_ID: 'MONIEPOINT',
    GRANT_TYPE: `${grant_type}`,
    AUTHENTICATION_DOMAIN : `${authenticationDomain}`,
    CLIENT_ID: 'WEB',
    mock: true,
    APP_TIMEOUT: 2000,
    REDIRECT_ACCESS_TOKEN: null,
    REDIRECT_LOGIN_USER_TYPE: '1',
};
