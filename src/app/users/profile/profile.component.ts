import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ng2-materialize';

import { AuthenticationService } from './../../_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public loading: boolean;
  public userModel: {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    id_number: number;
    birthdate: string;
    telephone: string;
  };

  constructor(
    public auth: AuthenticationService,
    private toast: MzToastService
  ) {
    this.loading = true;
    this.auth.getCurrentUserData().subscribe(
      userData => {
        this.userModel = userData;
        this.loading = false;
      },
      err => {
        const error = err.json();
        this.toast.show(error.message, 4000, "red");
        this.loading = false;
      }
    )
  }

  ngOnInit() {
  }

}
