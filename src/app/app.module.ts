import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoucherComponent } from './voucher/voucher.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimationComponent } from './animation/animation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthguardServiceService } from './authguard-service.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DirectivesComponent } from './directives/directives.component';
import { UrlshortenerComponent } from './urlshortener/urlshortener.component';
import { NgTinyUrlModule } from 'ng-tiny-url';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { KendoComponent } from './kendo/kendo.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { PopupModule } from '@progress/kendo-angular-popup';
import { RandomComponent } from './random/random.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { MenuModule } from '@progress/kendo-angular-menu';
import { MenusModule } from '@progress/kendo-angular-menu';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { SecurepayPaymentsComponent } from './securepay-payments/securepay-payments.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { RouterModule } from '@angular/router';
import { SortableModule } from '@progress/kendo-angular-sortable';

const bottomNavigation = [
  { path: 'kendo', component: KendoComponent, text: 'Kendo'},
  { path: 'voucher', component: VoucherComponent, text: 'Voucher'},
  { path: 'securepay-payments', component: SecurepayPaymentsComponent, text: 'Secure Pay'}
];

@NgModule({
  declarations: [
    AppComponent,
    VoucherComponent,
    UpdateComponent,
    PageNotFoundComponent,
    AnimationComponent,
    LoginComponent,
    HomeComponent,
    DirectivesComponent,
    UrlshortenerComponent,
    KendoComponent,
    RandomComponent,
    SecurepayPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgTinyUrlModule,
    DropDownsModule,
    GridModule,
    DateInputsModule,
    InputsModule,
    IconsModule,
    ButtonsModule,
    PopupModule,
    DialogsModule,
    MenuModule,
    MenusModule,
    NotificationModule,
    NavigationModule,
    RouterModule.forRoot(bottomNavigation),
    SortableModule,
  ],
  providers: [AuthguardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
