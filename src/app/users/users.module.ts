import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'ng2-materialize';

import { UsersRouteModule } from './users-route.routing';
import { AuthenticationService } from './../_services/authentication.service';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    UsersRouteModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class UsersModule { }
