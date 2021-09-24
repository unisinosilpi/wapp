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
      const name = userCredential.user.displayName ? userCredential.user.displayName : userCredential.user.email;
      return { name };
    } catch (err) {
      // eslint-disable-next-line curly
      if (err.code === 'auth/invalid-email') throw new EmailIsNotValid();
      // eslint-disable-next-line curly
      if (err.code === 'auth/user-not-found') throw new UserDoesNotExist();
      throw new InternalServerError();
    }
  }

  async signOut(): Promise<void> {
    await this.fbAuth.signOut();
  }

  async onAuthStateChanged(callback: (data: User | undefined) => void): Promise<void> {
    this.fbAuth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        callback(undefined);
      } else {
        const name = firebaseUser.displayName ? firebaseUser.displayName : firebaseUser.email;
        callback({ name });
      }
    });
  }
}

export { FirebaseAuth };
