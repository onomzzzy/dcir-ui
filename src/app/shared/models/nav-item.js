

export const NavItems = [
    {
        text: 'Dashboard',
        route: '/dashboard',
        icon: 'dashboard',
        authority: 'all',
        roles: '',
        index:0,
        children:[]
    },
    {
        text: 'Merchant',
        route: '/merchant',
        icon: 'merchant',
        authority: 'dcir_view_merchants',
        roles: '',
        index:1,
        children:[ ]
    },
    {
        text: 'Merchant User',
        route: '/merchant-user',
        icon: 'merchant-user',
        authority: 'dcir_create_merchants_admin',
        roles: '',
        index:2,
        children:[ ]
    },
    {
        text: 'Transactions',
        route: '/transactions',
        icon: 'transaction',
        authority: 'dcir_view_transactions',
        index:3,
        roles: '',
        children:[ ]
    },
    {
        text: 'Dispute',
        route: '/disputes',
        icon: 'dispute',
        authority: 'dcir_view_disputes',
        index:4,
        roles: '',
        children:[]
    },
    {
        text: 'Charge Type',
        route: '/charge-type',
        icon: 'charge-type',
        authority: 'dcir_configure_charges',
        roles: '',
        index:5,
        children:[ ]
    },
    {
        text: 'Participant',
        route: '/settlement-participant',
        icon: 'settlement',
        authority: 'dcir_configure_participant',
        roles: '',
        index:6,
        children:[]
    },
    {
        text: 'Bulk Settlement',
        route: '/bulk-settlement',
        icon: 'terminals',
        authority: 'all',
        roles: '',
        index:7,
        children:[]
    }

]
