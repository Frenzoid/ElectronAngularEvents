import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { FacebookLoginModule } from '../facebook-login/facebook-login.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ]),
    GoogleLoginModule.forRoot('1000210216448-aj9dktsl8voehnolhtdobce0c6inrd77.apps.googleusercontent.com'),
    FacebookLoginModule.forRoot({app_id: '1633716063376852', version: 'v2.11'})
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
