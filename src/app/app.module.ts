import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MasonryModule } from 'angular2-masonry';
import { MaterializeModule } from 'ng2-materialize';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NavbarService } from './_services/navbar.service';
import { MusicService } from './_services/music.service';
import { AuthenticationService } from './_services/authentication.service';
import { AppRouteModule } from './app-route.routing';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MasonryModule,
    MaterializeModule.forRoot(),
    Ng2SearchPipeModule,
    UsersModule,
    MusicModule,
    AppRouteModule
  ],
  providers: [
    NavbarService,
    MusicService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
