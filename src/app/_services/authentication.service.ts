import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MzToastService } from 'ng2-materialize';

@Injectable()
export class AuthenticationService {
  public token: string;
  public baseApi: string;
  public currentUser: any;
  public referrerRoute: string;

  constructor(
    private http: Http,
    private toast: MzToastService
  ) {
    this.baseApi = `http://localhost/music-gallery-api/wp-json/music-gallery/api`;

    // set token if saved in local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser && this.currentUser.token;
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseApi}/auth/login`,
      {
        username: username,
        password: password
      }
    ).map((response: Response) => {
      const token = response.json() && response.json().token;
      const email = response.json() && response.json().email;
      const expire_at = response.json() && response.json().expire_at;

      if (token) {
        this.token = token;
        this.currentUser = {
          username: username,
          email: email,
          token: token,
          expire_at
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }

      return this.currentUser;
    });
  }

  public register(model: {}) {
    return this.http.post(
      `${this.baseApi}/auth/register`,
      { user: model }
    ).map((response: Response) => response);
  }

  public logout(): void {
    this.token = null;
    this.currentUser = false;
    localStorage.removeItem('currentUser');

    this.toast.show(`You have finished session`, 4000);
  }

  public getAuthorizationHeader() {
    // if (!this.currentUser || !this.currentUser.token || !this.token) {return false;}
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
