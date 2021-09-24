import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { IAuth } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private readonly authProvider: IAuth,
    private router: Router,
  ) {}

  authStateChangedCallback = (user: User | undefined) => {
    if (!user) { this.router.navigate(['/login']); }
  };

  ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
  }

  async logoff() {
    await this.authProvider.signOut();
    this.router.navigate(['/login']);
  }

}
