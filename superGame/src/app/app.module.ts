import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './logins/logins.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './common/services/auth.service';
import { UnitsComponent } from './units/units.component';
import { UnitService } from './common/services/unit.service';
import { UnitDetailsComponent } from './units/unit-details/unit-details.component';
import { SalesComponent } from './sales/sales.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnitsComponent,
    UnitDetailsComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [AuthService, UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
