

export const NavItems = [
    {
        text: 'Home',
        route: '',
        icon: 'oval',
        access: '',
        roles: '',
        index:0,
        children:[
            {
                text: 'Dashboard',
                route: '/dashboard',
                icon: 'pi pi-home',
                access: '',
                roles: '',
            },
        ]
    },
    {
        text: 'Merchant',
        route: '/merchant',
        icon: 'oval',
        access: '',
        roles: '',
        index:1,
        children:[
            {
                text: 'Merchant',
                route: '/merchant',
                icon: 'pi pi-user-edit',
                access: '',
                roles: '',
            }
        ]
    },
    {
        text: 'Transactions',
        route: '',
        icon: 'oval',
        access: '',
        index:2,
        roles: '',
        children:[
            {
                text: 'transactions',
                route: '/transactions',
                icon: 'pi pi-pencil',
                access: '',
                roles: '',
            }
        ]
    },
    {
        text: 'Charge Type',
        route: '/merchant',
        icon: 'oval',
        access: '',
        roles: '',
        index:1,
        children:[
            {
                text: 'Charge type',
                route: '/charge-type',
                icon: 'pi pi-user-edit',
                access: '',
                roles: '',
            }
        ]
    },
    {
        text: 'Settlement',
        route: '',
        icon: 'oval',
        access: '',
        roles: '',
        index:1,
        children:[
            {
                text: 'Settlement',
                route: '/settlement-participant',
                icon: 'pi pi-user-edit',
                access: '',
                roles: '',
            }
        ]
    },
    {
        text: 'Dispute',
        route: '',
        icon: 'oval',
        access: '',
        index:2,
        roles: '',
        children:[
            {
                text: 'dispute',
                route: '/disputes',
                icon: 'pi pi-pencil',
                access: '',
                roles: '',
            }
        ]
    }



]
