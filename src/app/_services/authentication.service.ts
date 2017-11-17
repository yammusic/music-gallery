import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment.prod';

import { MzToastService } from 'ng2-materialize';

@Injectable()
export class AuthenticationService {
  public token: string;
  public baseApi: string;
  public currentUser: any;
  public referrerRoute: string;

  constructor(
    private http: Http,
    private toast: MzToastService,
    private router: Router
  ) {
    if (!environment.production) {
      this.baseApi = `http://localhost/music-gallery-api/wp-json/music-gallery/api`;
    } else {
      this.baseApi = `http://musicgalleryapi.apps-1and1.com/wp-json/music-gallery/api`;
    }

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

  public getCurrentUserData() {
    const headers = this.getAuthorizationHeader();
    const email = encodeURIComponent(this.currentUser.email);
    return this.http.get(
      `${this.baseApi}/auth/user?email=${email}`,
      {headers: headers}
    ).map((response: Response) => response.json());
  }

  public editUser(model: {}) {
    const headers = this.getAuthorizationHeader();
    return this.http.put(
      `${this.baseApi}/auth/edit`,
      { user: model },
      {headers: headers}
    ).map((response: Response) => response);
  }

  public logout(): void {
    this.token = null;
    this.currentUser = false;
    localStorage.removeItem('currentUser');

    this.toast.show(`You have finished session`, 4000);
    this.router.navigate(['/']);
  }

  public getAuthorizationHeader() {
    // if (!this.currentUser || !this.currentUser.token || !this.token) {return false;}
    const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
