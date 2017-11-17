import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MzToastService } from 'ng2-materialize';

import { AuthenticationService } from './../../_services/authentication.service';
import { NavbarService } from './../../_services/navbar.service';

@Component({
  selector: "app-profile-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit, OnDestroy {
  private formSubscriptions: Array<Subscription>;
  public eForm: FormGroup;
  public datepickerOptions: {};
  public submitted: boolean;
  public loading: boolean;
  public genderOptions: Array<{
    value: string;
    label: string;
  }>;

  public labels: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthdate: string;
    id_number: string;
    telephone: string;
  };
  public editModel: {
    user_id: number;
    username: string;
    email: string;
    // password: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthdate: string;
    id_number: any;
    telephone: any;
  };

  public _errors = {
    username: {
      required: `Please enter an Username.`,
      minlength: `The Username must contain at least 3 characters.`,
      maxlength: `The Username can not contain more than 128 characters.`
    },
    email: {
      required: `Please enter an Email.`,
      pattern: `The Email is not valid, please enter a valid Email, example: example@mail.com`,
      maxlength: `The Email can not contain more than 128 characters.`
    },
    password: {
      required: `Please enter a Password.`,
      minlength: `The Password must contain at least 3 characters.`,
      maxlength: `The Password can not contain more than 128 characters.`
    },
    first_name: {
      minlength: `The First Name must contain at least 2 characters.`,
      maxlength: `The First Name can not contain more than 128 characters.`
    },
    last_name: {
      minlength: `The Last Name must contain at least 2 characters.`,
      maxlength: `The Last Name can not contain more than 128 characters.`
    },
    id_number: {
      pattern: `The ID Number is not valid, please enter a valid ID Number`,
      minlength: `The ID Number must contain at least 4 characters.`,
      maxlength: `The ID Number can not contain more than 128 characters.`
    },
    telephone: {
      pattern: `The Telephone is not valid, please enter a valid Telephone number`,
      minlength: `The Telephone must contain at least 6 characters.`,
      maxlength: `The Telephone can not contain more than 64 characters.`
    }
  };

  constructor(
    public auth: AuthenticationService,
    public nav: NavbarService,
    private router: Router,
    private route: ActivatedRoute,
    private editForm: FormBuilder,
    private toast: MzToastService
  ) {
    this.loading = true;
    this.formSubscriptions = [];

    this.datepickerOptions = {
      format: "dddd, dd mmm, yyyy",
      formatSubmit: "yyyy-mm-dd",
      selectMonths: true,
      selectYears: 100
    };

    this.labels = {
      username: `Username`,
      email: `Email`,
      password: `Password`,
      first_name: `First Name`,
      last_name: `Last Name`,
      gender: `Gender`,
      birthdate: `Date of birth`,
      id_number: `ID Number`,
      telephone: `Telephone`
    };

    this.editModel = {
      user_id: 0,
      username: ``,
      email: ``,
      // password: ``,
      first_name: ``,
      last_name: ``,
      gender: ``,
      birthdate: ``,
      id_number: ``,
      telephone: ``
    };

    this.genderOptions = [
      {value: `male`, label: `Male`},
      {value: `female`, label: `Female`}
    ];

    this.auth.getCurrentUserData().subscribe(
      userData => {
        delete userData.creator_id;
        delete userData.editor_id;
        delete userData.created_at;
        delete userData.updated_at;

        if (userData.birthdate === `0000-00-00`) {
          userData.birthdate = ``;
        }

        this.editModel = userData;
        this.loading = false;
      },
      err => {
        const error = err.json();
        this.toast.show(error.message, 4000, "red");
        this.loading = false;
      }
    );
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
    this.auth.editUser(this.editModel).subscribe(
      res => {
        this.auth.currentUser.username = this.editModel.username;
        this.auth.currentUser.email = this.editModel.email;
        this.toast.show(res.text(), 2500, ``, () => {
          this.submitted = false;
          this.router.navigate(['/profile']);
        });
      },
      err => {
        const error = err.json();
        this.toast.show(error.message, 4000, 'red');
        this.submitted = false;
      }
    );
  }

  private formBuild() {
    this.eForm = this.editForm.group({
      username: [
        this.editModel.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128)
        ])
      ],
      email: [
        this.editModel.email,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
          Validators.maxLength(128)
        ])
      ],
      /* password: [
        this.editModel.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128)
        ])
      ], */
      first_name: [
        this.editModel.first_name,
        Validators.compose([Validators.minLength(2), Validators.maxLength(128)])
      ],
      last_name: [
        this.editModel.last_name,
        Validators.compose([Validators.minLength(2), Validators.maxLength(128)])
      ],
      gender: [this.editModel.gender],
      birthdate: [this.editModel.birthdate],
      id_number: [
        this.editModel.id_number,
        Validators.compose([
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(4),
          Validators.maxLength(128)
        ])
      ],
      telephone: [
        this.editModel.telephone,
        Validators.compose([
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(6),
          Validators.maxLength(64)
        ])
      ]
    });
  }

  private _formSubscriptions() {
    const subs: Array<string> = [
      `username`,
      `email`,
      // `password`,
      `first_name`,
      `last_name`,
      `gender`,
      `birthdate`,
      `id_number`,
      `telephone`
    ];

    subs.map(kind => {
      this.formSubscriptions.push(
        this.eForm.get(kind).valueChanges.subscribe(value => {
          if (kind === `gender`) {
            $("select").material_select();
          }
        })
      );
    });
  }

  private _formUnsubscription() {
    this.formSubscriptions.map(sub => {
      sub.unsubscribe();
    });
  }
}
