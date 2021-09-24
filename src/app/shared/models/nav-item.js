

export const NavItems = [
    {
        text: 'Merchant',
        route: '',
        icon: 'merchant',
        access: '',
        roles: '',
        children:[
            {
                text: 'View Merchant',
                route: '/merchant/view',
                icon: 'merchant',
                access: '',
                roles: '',
            },
            {
                text: 'Update Merchant',
                route: '/merchant/update',
                icon: 'merchant',
                access: '',
                roles: '',
            }
        ]
    },
    {
        text: 'Config',
        route: '/config',
        icon: '',
        access: '',
        roles: '',
        children:[
            {
                text: 'Charge type',
                route: '/configuration/charge-type',
                icon: 'merchant',
                access: '',
                roles: '',
            }
        ]
    },


]
