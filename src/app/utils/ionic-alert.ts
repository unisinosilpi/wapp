import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { IAlert } from './alert';

@Injectable({
  providedIn: 'root'
})
class IonicAlert implements IAlert {
  constructor(
    public alertController: AlertController,
  ) {}

  async create(title: string, message: string, btnText: string, callback: () => void): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: [{ text: btnText, handler: callback }],
    });
    await alert.present();
  }
}

export { IonicAlert };
