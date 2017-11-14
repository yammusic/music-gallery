import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MzToastService } from 'ng2-materialize';

import { AuthenticationService } from './../../_services/authentication.service';
import { NavbarService } from './../../_services/navbar.service';
import { MusicService } from '../../_services/music.service';

@Component({
  selector: "app-add-music",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddMusicComponent implements OnInit, OnDestroy {
  private formSubscriptions: Array<Subscription>;
  public mForm: FormGroup;
  public datepickerOptions: {};
  public submitted: boolean;

  public labels: {
    title: string;
    author: string;
    gender: string;
    album: string;
    release_date: string;
  };

  public musicModel: {
    title: string;
    author: string;
    gender: string;
    album: string;
    release_date: string;
  };

  public _errors = {
    title: {
      required: `Please enter a Title.`,
      minlength: `The Title must contain at least 2 characters.`,
      maxlength: `The Title can not contain more than 128 characters.`
    },
    author: {
      required: `Please enter an Author.`,
      minlength: `The Author must contain at least 2 characters.`,
      maxlength: `The Author can not contain more than 128 characters.`
    },
    album: {
      minlength: `The First Name must contain at least 2 characters.`,
      maxlength: `The First Name can not contain more than 128 characters.`
    }
  };

  constructor(
    public auth: AuthenticationService,
    public nav: NavbarService,
    public music: MusicService,
    private router: Router,
    private route: ActivatedRoute,
    private musicForm: FormBuilder,
    private toast: MzToastService
  ) {
    this.formSubscriptions = [];

    this.datepickerOptions = {
      format: 'dddd, dd mmm, yyyy',
      formatSubmit: 'yyyy-mm-dd',
      selectMonths: true,
      selectYears: 100
    };

    this.labels = {
      title: `Title`,
      author: `Author`,
      gender: `Gender`,
      album: `Album`,
      release_date: `Release Date`
    };

    this.musicModel = {
      title: ``,
      author: ``,
      gender: ``,
      album: ``,
      release_date: ``
    };
  }

  ngOnInit() {
    this.formBuild();
    this._formSubscriptions();

    $("nav").ready(() => {
      this.nav.showSearchIcon = false;
    });

    if (!this.auth.currentUser || !this.auth.token) {
      this.router.navigate(["/"]);
    }
  }

  ngOnDestroy() {
    this._formUnsubscription();
  }

  public onSubmit() {
    this.submitted = true;
    console.log(this.musicModel);
    this.music.add(this.musicModel).subscribe(
      res => {
        this.submitted = false;
        this.toast.show(res.text(), 3000, '', () => {
          this.router.navigate(['/']);
        })
      },
      err => {
        const error = err.json();
        this.toast.show(error.message, 4000, "red");
        this.submitted = false;
      }
    );
  }

  private formBuild() {
    this.mForm = this.musicForm.group({
      title: [
        this.musicModel.title,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(128)
        ])
      ],
      author: [
        this.musicModel.author,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(128)
        ])
      ],
      gender: [
        this.musicModel.gender
      ],
      album: [
        this.musicModel.album,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(128)
        ])
      ],
      release_date: [
        this.musicModel.release_date
      ]
    });
  }

  private _formSubscriptions() {
    const subs: Array<string> = [
      `title`,
      `author`,
      `gender`,
      `album`,
      `release_date`
    ];

    subs.map(kind => {
      this.formSubscriptions.push(
        this.mForm.get(kind).valueChanges.subscribe(value => {})
      );
    });
  }

  private _formUnsubscription() {
    this.formSubscriptions.map(sub => {
      sub.unsubscribe();
    });
  }
}
