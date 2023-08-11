import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../common/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMsg: any = ''
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookie: CookieService,
    public auth: AuthService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.cookie.deleteAll();
    sessionStorage.setItem('isLoggedIn', 'false');
  }
  Next() {
    let payload = {
      'username': this.loginForm.controls['username'].value,
      'password': this.loginForm.controls['password'].value
    }
    this.auth.login(payload);
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }
}
