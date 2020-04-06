import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { ViewSavedAddressesComponent } from './view-saved-addresses/view-saved-addresses.component';
import { AboutComponent } from './about/about.component';
import { FilterListComponent } from './filter-list/filter-list.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AddressBookComponent,
    AddPersonComponent,
    ViewSavedAddressesComponent,
    AboutComponent,
    FilterListComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AddressBookComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
