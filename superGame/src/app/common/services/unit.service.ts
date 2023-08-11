import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  public unitData: any;
  url: any = 'https://test.indusgame.com/'
  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getUnitDetails() {
    let headerObj: HttpHeaders = new HttpHeaders({
      "Authorization": this.cookie.get('tokenType') + " " + this.cookie.get('auth')
    })
    const options = { headers: headerObj };
    return this.http.get(this.url + 'units', options);
  }

  getPacks() {
    let headerObj: HttpHeaders = new HttpHeaders({
      "Authorization": this.cookie.get('tokenType') + " " + this.cookie.get('auth')
    })
    const options = { headers: headerObj };
    return this.http.get(this.url + 'packs', options);
  }

  getSales() {
    let headerObj: HttpHeaders = new HttpHeaders({
      "Authorization": this.cookie.get('tokenType') + " " + this.cookie.get('auth')
    });
    const options = { headers: headerObj };
    return this.http.get(this.url + 'sales', options);
  }
}
