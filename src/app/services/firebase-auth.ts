import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EmailIsNotValid } from '../errors/email-isnt-valid';
import { InternalServerError } from '../errors/internal-server-error';
import { UserDoesNotExist } from '../errors/user-does-not-exist';
import { User } from '../models/user';
import { IAuth } from './auth';

@Injectable({
  providedIn: 'root',
})
class FirebaseAuth implements IAuth {
  constructor(private readonly fbAuth: AngularFireAuth) {}

  async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const userCredential = await this.fbAuth.signInWithEmailAndPassword(email, password);
      const id = userCredential.user.uid;
      const name = userCredential.user.displayName
        ? userCredential.user.displayName
        : userCredential.user.email;
      return { id, name };
    } catch (err) {
      // eslint-disable-next-line curly
      if (err.code === 'auth/invalid-email') throw new EmailIsNotValid();
      // eslint-disable-next-line curly
      if (err.code === 'auth/user-not-found') throw new UserDoesNotExist();
      throw new InternalServerError();
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.fbAuth.signOut();
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async onAuthStateChanged(callback: (data: User | undefined) => void): Promise<void> {
    try {
      this.fbAuth.onAuthStateChanged((firebaseUser) => {
        if (!firebaseUser) {
          callback(undefined);
        } else {
          const id = firebaseUser.uid;
          const name = firebaseUser.displayName ? firebaseUser.displayName : firebaseUser.email;
          callback({ id, name });
        }
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

export { FirebaseAuth };
