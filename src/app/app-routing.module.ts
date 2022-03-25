import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';
import { HomeComponent } from './home/home.component';
import { KendoComponent } from './kendo/kendo.component';
import { LazyLoadingModule } from './lazy-loading/lazy-loading.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SecurepayPaymentsComponent } from './securepay-payments/securepay-payments.component';
import { UpdateComponent } from './update/update.component';
import { UrlshortenerComponent } from './urlshortener/urlshortener.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'voucher',
    component: VoucherComponent,
    // canActivate: [GuardGuard],
  }, 
  {
    path: 'lazy-loading',
    loadChildren: () => import('./lazy-loading/lazy-loading.module')
    .then(m => m.LazyLoadingModule)
  },  
  {
    path: 'kendo',
    component: KendoComponent  
  },  
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'urlshort',
    component: UrlshortenerComponent,  
  },
  {
      path: 'securepay-payments',
      component: SecurepayPaymentsComponent,  
  },
  {
    path:'**',
    component: PageNotFoundComponent,
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
