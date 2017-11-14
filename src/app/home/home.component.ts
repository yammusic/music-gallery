import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService } from './../_services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public bricks: Array<{title: string, type: number}>;

  constructor(
    public nav: NavbarService,
    private router: Router
  ) {
    this.bricks = [
      {title: 'Brick 1', type: 3},
      {title: 'Brick 2', type: 1},
      {title: 'Brick 3', type: 2},
      {title: 'Brick 4', type: 3},
      {title: 'Brick 5', type: 2},
      {title: 'Brick 6', type: 2}
    ];
  }

  ngOnInit() {
    $("nav").ready(() => {
      if (this.router.url === "/") {
        this.nav.showSearchIcon = true;
      }
    });
  }

}
