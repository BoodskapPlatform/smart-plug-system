import { HomeComponent } from '../../../views/secured/home/home.component';
import { AssetsComponent } from '../../../views/secured/assets/assets.component';
import { CustomersComponent } from '../../../views/secured/customers/customers.component';
import { DevicesComponent } from '../../../views/secured/devices/devices.component';
import { MessagehistoryComponent } from '../../../views/secured/messagehistory/messagehistory.component';
import { HelpComponent } from '../../../views/secured/help/help.component';
import { ProfileComponent } from '../../../views/secured/profile/profile.component';
import { InventoryComponent } from '../../../views/secured/inventory/inventory.component';

import { Routes } from '@angular/router';

export const SECURE_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },
    { path: 'assets', component: AssetsComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'messages-history', component: MessagehistoryComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'help', component: HelpComponent },
];
