import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { environment } from './../../environments/environment.prod';

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class MusicService {
  public limitCollection: number;
  private baseApi: string;

  constructor(public auth: AuthenticationService, private http: Http) {
    this.limitCollection = 10;
    if (!environment.production) {
      this.baseApi = `http://localhost/music-gallery-api/wp-json/music-gallery/api`;
    } else {
      this.baseApi = `http://musicgalleryapi.apps-1and1.com/wp-json/music-gallery/api`;
    }
  }

  public getItems(option: { page?: number; limit?: number } = {}) {
    const limit = option.limit || this.limitCollection;
    const page = option.page || 0;
    let url = `${this.baseApi}/music/collection`;
    if (page > 0) {
      url += `?limit=${limit}&page=${page}`;
    }
    return this.http.get(url).map((res: Response) => res.json());
  }

  public get(musicID) {
    return this.http
      .get(`${this.baseApi}/music/${musicID}`)
      .map((response: Response) => response.json());
  }

  public add(musicModel) {
    const headers = this.auth.getAuthorizationHeader();
    return this.http.post(
      `${this.baseApi}/music/add`,
      { music: musicModel },
      { headers: headers }
    );
  }

  public edit(musicModel) {
    const headers = this.auth.getAuthorizationHeader();
    const musicID = musicModel.id;
    delete musicModel.id;

    return this.http.put(
      `${this.baseApi}/music/${musicID}/edit`,
      { music: musicModel },
      { headers: headers }
    );
  }

  public delete(musicID) {
    const headers = this.auth.getAuthorizationHeader();
    return this.http
      .delete(`${this.baseApi}/music/${musicID}/delete`, { headers: headers })
      .map((response: Response) => response);
  }
}
