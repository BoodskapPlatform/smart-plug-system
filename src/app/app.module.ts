import { AppService } from './services/app.services';
import { UserDataService } from './services/userdata.service';
import { HttpService } from './utils/http.services';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/public/login/login.component';
import { DomainsComponent } from './views/public/domains/domains.component';
import { RegisterComponent } from './views/public/register/register.component';
import { HomeComponent } from './views/secured/home/home.component';
import { MessagehistoryComponent } from './views/secured/messagehistory/messagehistory.component';
import { ProfileComponent } from './views/secured/profile/profile.component';
import { InventoryComponent } from './views/secured/inventory/inventory.component';
import { CustomersComponent } from './views/secured/customers/customers.component';
import { DevicesComponent } from './views/secured/devices/devices.component';
import { AssetsComponent } from './views/secured/assets/assets.component';
import { HelpComponent } from './views/secured/help/help.component';
import { SupportComponent } from './views/public/support/support.component';
import { PublicLayoutComponent } from './views/layouts/public.layout/public.layout.component';
import { SecuredLayoutComponent } from './views/layouts/secured.layout/secured.layout.component';
import { AuthService } from './services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    InventoryComponent,
    CustomersComponent,
    DevicesComponent,
    AssetsComponent,
    HelpComponent,
    SupportComponent,
    PublicLayoutComponent,
    SecuredLayoutComponent,
    DomainsComponent,
    MessagehistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AgGridModule
  ],
  providers: [
    AuthService,
    HttpService,
    UserDataService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
