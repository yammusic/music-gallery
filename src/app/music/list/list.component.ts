import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ng2-materialize';

import { NavbarService } from '../../_services/navbar.service';
import { MusicService } from '../../_services/music.service';

@Component({
  selector: "app-list-music",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListMusicComponent implements OnInit {
  public modalComponent;
  public masonryOptions;
  public loading: boolean;
  public submitted: boolean;
  public dataFinished: boolean;
  public currentPage: number;
  public musicCollection: Array<any> = [];
  public modal = {
    title: `Modal Title`,
    content: `Modal Content`,
    musicModel: null
  };

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: "100%", // Starting top style attribute
    endingTop: "10%", // Ending top style attribute
    ready: (modal, trigger) => { }, // Callback for Modal open. Modal and trigger parameters available.
    complete: () => { } // Callback for Modal close
  };

  constructor(
    public nav: NavbarService,
    public music: MusicService,
    private toast: MzToastService
  ) {
    this.loading = true;
    this.currentPage = 1;
    this.getCollection();
  }

  ngOnInit() {
    this.masonryOptions = { transitionDuration: "0.7s" };
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
    return this.music.getItems({ page: this.currentPage }).subscribe(data => {
      this.loading = false;
      this.musicCollection = this.musicCollection.concat(data);

      if (data.length === 0 || data.length < this.music.limitCollection) {
        this.dataFinished = true;
      }
    });
  }

  public onModalDelete(modal, music) {
    this.modalComponent = modal;
    this.modal.title = `Delete Music: ${music.title} ?`;
    this.modal.content = `Are you sure want to delete this music: "${music.title}" ?.`;
    this.modal.musicModel = music;
    this.modalComponent.open();
  }

  public onDelete() {
    this.submitted = true;

    this.music.delete(this.modal.musicModel.id).subscribe(
      res => {
        this.toast.show(res.text(), 3000);

        this.submitted = false;
        this.modalComponent.close();
        this.musicCollection = [];
        this.loading = true;
        this.currentPage = 1;
        this.dataFinished = false;
        this.getCollection();
      },
      err => {
        this.submitted = false;
        this.modalComponent.close();
      }
    );
  }
}
