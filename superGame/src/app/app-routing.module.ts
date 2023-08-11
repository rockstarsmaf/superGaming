import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './logins/logins.component';
import { UnitsComponent } from './units/units.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'units', component: UnitsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
