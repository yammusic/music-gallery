import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../_services/navbar.service';
import { MusicService } from '../../_services/music.service';

@Component({
  selector: "app-list-music",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListMusicComponent implements OnInit {
  public masonryOptions;
  public loading: boolean;
  public dataFinished: boolean;
  public currentPage: number;
  public musicCollection: Array<any> = [];

  constructor(public nav: NavbarService, public music: MusicService) {
    this.loading = true;
    this.currentPage = 1;
    this.getCollection();
  }

  ngOnInit() {
    this.masonryOptions = {transitionDuration: "0.7s"};
  }

  public onScroll() {
    if (!this.dataFinished) {
      console.log("getting data!!");
      this.loading = true;
      this.currentPage += 1;
      this.getCollection();
    } else {
      console.log("data finished!!");
    }
  }

  public getCollection() {
    return this.music.getItems({page: this.currentPage}).subscribe(data => {
      this.loading = false;
      this.musicCollection = this.musicCollection.concat(data);

      if (data.length === 0 || data.length < this.music.limitCollection) {
        this.dataFinished = true;
      }
    });
  }
}
