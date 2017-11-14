import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const usersRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: "user", component: CerebroComponent, children: [
    // {path: '', component: CerebroListComponent},
    // {path: ':id', component: CerebroShowComponent},
    // {path: ':id/edit', component: CerebroFormComponent}
  // ]}
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
