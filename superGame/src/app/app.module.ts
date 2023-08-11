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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService, UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
