import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { IAuth } from '../services/auth';
import { IEldersService } from '../services/elders-service';
import { IAlert } from '../utils/alert';
import { ILoader } from '../utils/loader';

@Component({
  selector: 'app-vital-signs-form',
  templateUrl: './vital-signs-form.page.html',
  styleUrls: ['./vital-signs-form.page.scss'],
})
export class VitalSignsFormPage implements OnInit {
  elderId: string = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly authProvider: IAuth,
    private readonly eldersService: IEldersService,
    private readonly loader: ILoader,
    private readonly alert: IAlert,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.authProvider.onAuthStateChanged(this.authStateChangedCallback);
    this.elderId = this.activatedRoute.snapshot.paramMap.get('elder');
    console.log('this.elderId: ', this.elderId);
  }

  authStateChangedCallback = (user: User | undefined) => {
    if (!user) { this.router.navigate(['/login']); }
  };

  async logoff() {
    await this.authProvider.signOut();
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/home']);
  }

}
