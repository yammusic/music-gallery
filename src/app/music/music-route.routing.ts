import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMusicComponent } from './add/add.component';

const musicRoutes: Routes = [
  { path: 'add', component: AddMusicComponent },
  // { path: "user", component: CerebroComponent, children: [
    // {path: '', component: CerebroListComponent},
    // {path: ':id', component: CerebroShowComponent},
    // {path: ':id/edit', component: CerebroFormComponent}
  // ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      musicRoutes
      // {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class MusicRouteModule {}
