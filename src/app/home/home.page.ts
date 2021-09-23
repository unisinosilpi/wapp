import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from './../services/firebase-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IAuth } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private readonly authProvider: IAuth) {}

  authStateChangedCallback(data: any) {
    console.log('user: ', data);
  };

  ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
  }

  login() {
    console.log('login() init');
    const user = this.authProvider.signInWithEmailAndPassword('admin@mail.com', '123456');
    console.log('login() end');
  }

  logoff() {
    console.log('logoff() init');
    this.authProvider.signOut();
    console.log('logoff() end');
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

}
