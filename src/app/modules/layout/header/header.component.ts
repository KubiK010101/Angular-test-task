import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/types/user-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggined: boolean = false;
  public username: string = '';

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.checkAuthStatus();
  }
  public signOut(): void {
    this.isLoggined = false;
    this.username = '';
    localStorage.removeItem('user');
  }

  private checkAuthStatus(): void {
    const user: UserInterface = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    if (!!Object.keys(user).length) {
      this.isLoggined = true;
      this.username = user.username;
    }
    this.userService.user$.subscribe((userData: UserInterface | null) => {
      if (userData) {
        this.isLoggined = true;
        this.username = user.username;
      }
    });
  }
}
