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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    DomainsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    HttpService,
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
