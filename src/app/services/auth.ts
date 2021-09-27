import { User } from './../models/user';

abstract class IAuth {
  signInWithEmailAndPassword(email: string, password: string): Promise<User> { return; };
  signOut(): Promise<void> { return; };
  onAuthStateChanged(callback: (data: User | undefined) => void): Promise<void> { return; };
}

export { IAuth };
