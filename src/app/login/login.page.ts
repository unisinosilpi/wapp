import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { IAuth } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private readonly authProvider: IAuth,
    private readonly router: Router,
  ) {}

  authStateChangedCallback = (user: User) => {
    if (user) { this.router.navigate(['/home']); }
  };

  ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
  }

  async login() {
    try {
      const user = await this.authProvider.signInWithEmailAndPassword('admin@mail.com', '123456');
      if (user) { this.router.navigate(['/home']); }
      else { throw new Error(); }
    } catch (err) {
      console.log('err: ', err);
    }
  }

}
