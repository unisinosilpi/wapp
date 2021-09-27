import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { IAuth } from '../services/auth';
import { IEldersService } from '../services/elders-service';
import { IAlert } from '../utils/alert';
import { ILoader } from '../utils/loader';
import { VitalSigns } from '../models/vital-signs';

@Component({
  selector: 'app-vital-signs-form',
  templateUrl: './vital-signs-form.page.html',
  styleUrls: ['./vital-signs-form.page.scss'],
})
export class VitalSignsFormPage implements OnInit {
  elderId: string = undefined;
  nurseId: string = undefined;

  vitalSigns: VitalSigns = {
    oxygenSaturation: 0,
    bloodPressure: 0,
    heartRate: 0,
    breathRate: 0,
    bodyTemperature: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly authProvider: IAuth,
    private readonly eldersService: IEldersService,
    private readonly loader: ILoader,
    private readonly alert: IAlert,
    private router: Router
  ) {}

  async ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
    this.elderId = this.activatedRoute.snapshot.paramMap.get('elder');
  }

  authStateChangedCallback = (user: User | undefined) => {
    if (!user) {
      this.router.navigate(['/login']);
    }
    this.nurseId = user.id;
  };

  async logoff() {
    await this.authProvider.signOut();
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/home']);
  }

  async register() {
    await this.loader.create('Aguarde...');

    try {
      await this.eldersService.registerVitalSigns(this.vitalSigns, this.nurseId, this.elderId);
      this.alert.create('Sucesso', 'Sinais vitais salvos com sucesso!', 'ok', () => {
        this.router.navigate(['/home']);
      });
    } catch (err) {
      const error = err.message ? err.message : 'Ops, tivemos um erro interno... Por favor, tente novamente mais tarde.';
      await this.alert.create('Ops', error, 'Ok', () => {});
    } finally {
      await this.loader.dismiss();
    }
  }
}
