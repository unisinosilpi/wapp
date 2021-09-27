import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Elder } from '../models/elder';
import { User } from '../models/user';
import { IAuth } from '../services/auth';
import { IEldersService } from '../services/elders-service';
import { IAlert } from '../utils/alert';
import { ILoader } from '../utils/loader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  elders: Elder[] = [];

  constructor(
    private readonly authProvider: IAuth,
    private readonly eldersService: IEldersService,
    private readonly loader: ILoader,
    private readonly alert: IAlert,
    private router: Router,
  ) {}

  authStateChangedCallback = (user: User | undefined) => {
    if (!user) { this.router.navigate(['/login']); }
    else { this.getElders().then(); }
  };

  async ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
  }

  getElders = async () => {
    try {
      await this.loader.create('Buscando institucionalizados...');
      this.elders = await this.eldersService.getElders();
      await this.loader.dismiss();
    } catch (err) {
      await this.loader.dismiss();
      const error = err.message ? err.message : 'Ops, tivemos um erro interno... Por favor, tente novamente mais tarde.';
      await this.alert.create('Ops', error, 'Ok', () => {});
    }
  };

  selectElder = (elderId: string) => {
    this.router.navigate([`/vital-signs-form/${elderId}`]);
  };

  async logoff() {
    await this.authProvider.signOut();
    this.router.navigate(['/login']);
  }

}
