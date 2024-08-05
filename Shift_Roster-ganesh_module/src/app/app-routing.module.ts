import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RosterComponent } from './components/roster/roster.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [{
  path:'',component:LoginComponent
}, 
{ path: 'login', component: LoginComponent },
{
  path:'register',component:RegisterComponent
},{
  path:'home',component:HomeComponent,canActivate: [AuthGuard]
},{
  path:'forgot',component:ForgotPasswordComponent
},{
  path:'roster',component:RosterComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
