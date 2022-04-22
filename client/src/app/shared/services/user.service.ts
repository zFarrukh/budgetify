import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myUser: IUser | null = null;
  get user(): IUser | null {
    return this.myUser;
  }

  set user(user: IUser | null) {
    this.myUser = user;
  }

  removeUser(): void {
    this.myUser = null;
  }
}
