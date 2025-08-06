import { INavigationMenu } from '@app/shared/layout/navigation/interfaces/navigation-menu.interface';

export const NAVIGATION_MENU: INavigationMenu[] = [

    {
        title: '',
        permissions: ['Logistics'],
        links : [
            {
              title: 'Rutas',
              icon: 'fas fa-shipping-fast',
              link: '/auth/shipment-scheduling/admon',
              permissions: ['Logistics'],
            },
            {
              title: 'Vida util',
              icon: 'fas fa-calculator',
              link: '/auth/converter/view',
              permissions: ['User'],
            },
            {
              title: 'Rutas con pendientes',
              icon: 'fas fa-circle-question',
              link: '/auth/pending-shipment-scheduling/admon',
              permissions: ['Logistics'],
            },
            {
              title: 'Rutas (antiguo)',
              icon: 'fas fa-folder-closed',              
              link: '/auth/route/admon',
              permissions: ['Logistics'],
           },
        ]
    },
    {
        title: '',
        permissions: ['User'],
        links : [
            {
              title: 'Rutas',
              icon: 'fas fa-shipping-fast',
              link: '/auth/shipment-scheduling/view',
              permissions: ['Logistics'],
            },
            {
              title: 'Vida util',
              icon: 'fas fa-calculator',
              link: '/auth/converter/view',
              permissions: ['User'],
            }
        ]
    }

]
