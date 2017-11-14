import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavbarService {
  public searchModel;
  public showSearchIcon: boolean;
  public showSearchNav: boolean;

  constructor(private router: Router) {
    this.showSearchIcon = this.showSearchNav = false;
  }

  public toggleSearchNav() {
    this.showSearchNav = !this.showSearchNav;

    if (!this.showSearchNav) {
      this.searchModel = ``;
    }
  }
}
