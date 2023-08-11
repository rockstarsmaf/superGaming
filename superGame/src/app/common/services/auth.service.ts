import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMsg: any = '';
  private expireTime: any;
  public isLoggedIn: any = false;
  isInterval: boolean = false;
  setInt: any;
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) { }
  // keeps creating new tokens and if error then redirects to login page
  autoLogout() {
    if (this.isInterval) {
      this.isInterval = false;
    }
    this.setInt = window.setInterval(() => {
      this.isInterval = true;
      let payload = {
        'refreshToken': this.cookie.get('refreshToken')
      }
      this.http.post<any>('https://test.indusgame.com/auths', payload).subscribe((data) => {
        this.cookie.deleteAll();
        this.cookie.set('auth', data?.accessToken, undefined, '');
        this.cookie.set('refreshToken', data?.refreshToken, undefined, '');
        this.cookie.set('tokenType', data?.tokenType, undefined, '');
        this.expireTime = data?.expiresInSeconds;
      },
        (errors) => {
          this.logOut();
        });
    }, (60) * 1000);
  }

  public login(payload: any) {
    this.http.post<any>('https://test.indusgame.com/logins', payload).subscribe((data) => {
      this.cookie.set('auth', data?.auth?.accessToken, undefined, '');
      this.cookie.set('refreshToken', data?.auth?.refreshToken, undefined, '');
      this.cookie.set('tokenType', data?.auth?.tokenType, undefined, '');
      this.errorMsg = '';
      this.expireTime = data?.auth?.expiresInSeconds;
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/units']);
    },
      (errors) => {
        if (errors.status == 409) {
          this.errorMsg = 'Incorrect Password';
        }
        else if (errors.status == 404) {
          this.errorMsg = 'Username does not exist';
        }
        else if (errors.status == 400) {
          this.errorMsg = errors?.error?.reason
        }
      }
    )
  }

  public logOut() {
    this.cookie.deleteAll('');
    this.isLoggedIn = false;
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['']);
  }

  checkIsLoggedIn() {
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    return false;
  }
}
