import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { FooterComponent } from '../footer/footer.component';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FooterComponent,
    AvatarModule,
    DividerModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  //#region Services
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  //#endregion Services

  //#region Forms
  //#endregion Forms

  //#region Signals
  //#endregion Signals

  //#region Computed signals
  //#endregion Computed signals

  //#region Properties
  public userData?: User;
  //#endregion Properties

  constructor() {}

  ngOnInit(): void {
    this.userService.getUserData(this.authService.getUserId()).subscribe({
      next: (data: User) => {
        this.userData = data;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  //#region Event handlers
  public onLogout(): void {
    this.authService.logout();
  }
  //#endregion Event handlers

  //#region Public functions
  //#endregion Public functions

  //#region Private functions
  //#endregion Private functions
}
