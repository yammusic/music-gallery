import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
  // {path: '', redirectTo: '/home.php', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRouteModule {}
