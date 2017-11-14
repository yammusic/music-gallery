import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MzToastService } from 'ng2-materialize';

import { AuthenticationService } from './../../_services/authentication.service';
import { NavbarService } from './../../_services/navbar.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private formSubscriptions: Array<Subscription>;
  public lForm: FormGroup;
  public labels: { username: string; password: string };
  public loginModel: { username: string; password: string };
  public submitted: boolean;

  public _errors = {
    username: {
      required: `Please enter your username or your email.`
    },
    password: {
      required: `Please enter your password.`
    }
  };

  constructor(
    public auth: AuthenticationService,
    public nav: NavbarService,
    private router: Router,
    private route: ActivatedRoute,
    private loginForm: FormBuilder,
    private toast: MzToastService
  ) {
    this.formSubscriptions = [];

    this.labels = {
      username: `Username`,
      password: `Password`
    };

    this.loginModel = {
      username: ``,
      password: ``
    };
  }

  ngOnInit() {
    this.formBuild();
    this._formSubscriptions();

    $("nav").ready(() => {
      this.nav.showSearchIcon = false;
    });

    if (this.auth.currentUser && this.auth.token) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this._formUnsubscription();
  }

  public onSubmit() {
    this.submitted = true;
    this.auth.login(this.loginModel.username, this.loginModel.password).subscribe(
      userAuth => {
        this.submitted = false;
        this.router.navigate(['/']);
      },
      err => {
        const error = err.json();
        this.toast.show(error.message, 4000, "red");
        this.submitted = false;
      }
    );
  }

  private formBuild() {
    this.lForm = this.loginForm.group({
      username: [
        this.loginModel.username,
        Validators.compose([Validators.required])
      ],
      password: [
        this.loginModel.password,
        Validators.compose([Validators.required])
      ]
    });
  }

  private _formSubscriptions() {
    const subs: Array<string> = [`username`, `password`];

    subs.map(kind => {
      this.formSubscriptions.push(
        this.lForm.get(kind).valueChanges.subscribe(value => {})
      );
    });
  }

  private _formUnsubscription() {
    this.formSubscriptions.map(sub => {
      sub.unsubscribe();
    });
  }
}
