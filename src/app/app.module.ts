import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { FirebaseAuth } from './services/firebase-auth';
import { IAuth } from './services/auth';
import { ILoader } from './utils/loader';
import { IonicLoader } from './utils/ionic-loader';
import { IonicAlert } from './utils/ionic-alert';
import { IAlert } from './utils/alert';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: IAuth, useClass: FirebaseAuth },
    { provide: ILoader, useClass: IonicLoader },
    { provide: IAlert, useClass: IonicAlert },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
