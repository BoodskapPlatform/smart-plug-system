import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SecuredLayoutComponent } from './views/layouts/secured.layout/secured.layout.component';
import { PublicLayoutComponent } from './views/layouts/public.layout/public.layout.component';
import { SECURE_ROUTES } from './views/layouts/secured.layout/secured.routes';
import { PUBLIC_ROUTES } from './views/layouts/public.layout/public.routes';

const APP_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: PublicLayoutComponent,
    data: { title: 'Public Views', requiresLogin : false },
    children: PUBLIC_ROUTES,
  },
  {
    path: '',
    component: SecuredLayoutComponent,
    canActivate: [AuthService],
    data: { title: 'Secure Views', requiresLogin : true },
    children: SECURE_ROUTES,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
