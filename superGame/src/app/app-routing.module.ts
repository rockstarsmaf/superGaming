import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './logins/logins.component';
import { UnitsComponent } from './units/units.component';
import { authGuard } from './common/shared/auth.guard';
import { UnitDetailsComponent } from './units/unit-details/unit-details.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [authGuard] },
  { path: 'units', component: UnitsComponent, canActivate: [authGuard] },
  { path: 'units/:id', component: UnitDetailsComponent },
  { path: 'sales', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
