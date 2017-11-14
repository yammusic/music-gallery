import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class MusicService {
  public limitCollection: number;
  private baseApi: string;

  constructor(
    public auth: AuthenticationService,
    private http: Http
  ) {
    this.limitCollection = 10;
    this.baseApi = `http://localhost/music-gallery-api/wp-json/music-gallery/api`;
  }

  public getItems(option: {page?: number, limit?: number} = {}) {
    const limit = option.limit || this.limitCollection;
    const page = option.page || 0;
    let url = `${this.baseApi}/music/collection`;
    if (page > 0) { url += `?limit=${limit}&page=${page}`; }
    return this.http.get(url).map((res: Response) => res.json());
  }

  public add(musicModel) {
    const headers = this.auth.getAuthorizationHeader();
    return this.http.post(
      `${this.baseApi}/music/add`,
      {music: musicModel},
      {headers: headers}
    );
  }
}
