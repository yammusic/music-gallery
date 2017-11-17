import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasonryModule } from "angular2-masonry";
import { MaterializeModule } from 'ng2-materialize';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AuthenticationService } from './../_services/authentication.service';
import { MusicService } from './../_services/music.service';
import { MusicRouteModule } from './music-route.routing';
import { HeaderComponent } from '../header/header.component';
import { AddMusicComponent } from './add/add.component';
import { ListMusicComponent } from './list/list.component';
import { EditMusicComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasonryModule,
    MaterializeModule.forRoot(),
    Ng2SearchPipeModule,
    InfiniteScrollModule,
    MusicRouteModule
  ],
  declarations: [
    AddMusicComponent,
    ListMusicComponent,
    EditMusicComponent
  ],
  exports: [
    AddMusicComponent,
    ListMusicComponent,
    EditMusicComponent
  ],
  providers: [
    AuthenticationService,
    MusicService
  ]
})
export class MusicModule { }
