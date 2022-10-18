import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../types/user-interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user$ = new BehaviorSubject<UserInterface | null>(null);

  constructor() {}
}
