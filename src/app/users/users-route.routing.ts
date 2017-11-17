import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';

const usersRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit', component: EditComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      usersRoutes
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class UsersRouteModule {}
