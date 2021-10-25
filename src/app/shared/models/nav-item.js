

export const NavItems = [
    {
        text: 'Dashboard',
        route: '/dashboard',
        icon: 'dashboard',
        authority: 'all',
        roles: '',
        index:0,
        uniqueId:0,
        children:[]
    },
    {
        text: 'Merchant',
        route: '/merchant',
        icon: 'merchant',
        authority: 'dcir_view_merchants',
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        index:1,
        uniqueId:1,
        children:[ ]
    },
    {
        text: 'Merchant User',
        route: '/merchant-user',
        icon: 'merchant-user',
        authority: 'dcir_create_merchants_admin',
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        index:2,
        uniqueId:2,
        children:[ ]
    },
    {
        text: 'Transactions',
        route: '/transactions',
        icon: 'transaction',
        authority: 'dcir_view_transactions',
        index:3,
        uniqueId:3,
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        children:[ ]
    },
    {
        text: 'Dispute',
        route: '/disputes',
        icon: 'dispute',
        authority: 'dcir_view_disputes',
        index:4,
        uniqueId:4,
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        children:[]
    },
    {
        text: 'Charge Type',
        route: '/charge-type',
        icon: 'charge-type',
        authority: 'dcir_configure_charges',
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        index:5,
        uniqueId:5,
        children:[ ]
    },
    {
        text: 'Participant',
        route: '/settlement-participant',
        icon: 'settlement',
        authority: 'dcir_configure_participant',
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        index:6,
        uniqueId:6,
        children:[]
    },
    {
        text: 'Bulk Settlement',
        route: '/bulk-settlement',
        icon: 'terminals',
        authority: 'dcir_view_settlements',
        roles: ['DCIR_BACKOFFICE_ADMIN'],
        index:7,
        uniqueId:7,
        children:[]
    },
    {
        text: 'Merchant User',
        route: '/front-office/merchant-user',
        icon: 'merchant-user',
        authority: 'dcir_create_merchants_admin',
        roles: ['DCIR_MERCHANT_SUPER_ADMIN'],
        index:2,
        uniqueId:8,
        children:[ ]
    },
    {
        text: 'Bulk Settlement',
        route: '/front-office/bulk-settlement',
        icon: 'terminals',
        authority: 'dcir_view_settlements',
        roles: ['DCIR_MERCHANT_SUPER_ADMIN'],
        index:7,
        uniqueId:9,
        children:[]
    }

]
