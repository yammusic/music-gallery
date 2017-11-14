import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService } from './../_services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public nav: NavbarService,
    private router: Router
  ) { }

  ngOnInit() {
    $("nav").ready(() => {
      if (this.router.url === "/") {
        this.nav.showSearchIcon = true;
      }
    });
  }

}
