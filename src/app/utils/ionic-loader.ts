import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ILoader } from './loader';

@Injectable({
  providedIn: 'root'
})
class IonicLoader implements ILoader {
  pageLoader?: HTMLIonLoadingElement = undefined;

  constructor(
    public loadingController: LoadingController,
  ) {}

  async create(message: string): Promise<void> {
    this.pageLoader = await this.loadingController.create({ message });
    await this.pageLoader.present();
  }

  async dismiss(): Promise<void> {
    if (this.pageLoader) { await this.pageLoader.dismiss(); }
    this.pageLoader = undefined;
  }
}

export { IonicLoader };
