import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDoesNotExist } from '../errors/user-does-not-exist';
import { User } from '../models/user';
import { VitalSigns } from '../models/vital-signs';
import { IAuth } from '../services/auth';
import { IEldersService } from '../services/elders-service';
import { IAlert } from '../utils/alert';
import { ILoader } from '../utils/loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly authProvider: IAuth,
    private readonly router: Router,
    private readonly loader: ILoader,
    private readonly alert: IAlert,
  ) {}

  authStateChangedCallback = async (user: User) => {
    await this.loader.dismiss();
    if (user) { this.router.navigate(['/home']); }
  };

  async ngOnInit() {
    await this.loader.create('Verificando acesso...');
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
  }

  async authenticate() {
    try {
      await this.loader.create('Validando credenciais...');
      const { email, password } = this.login.value;
      const user = await this.authProvider.signInWithEmailAndPassword(email, password);
      if (user) { this.router.navigate(['/home']); }
      else { throw new UserDoesNotExist(); }
    } catch (err) {
      const error = err.message ? err.message : 'Ops, tivemos um erro interno... Por favor, tente novamente mais tarde.';
      await this.alert.create('Ops', error, 'Ok', () => {});
    }

    await this.loader.dismiss();
  }

}
