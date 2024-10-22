import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { FooterComponent } from '../footer/footer.component';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, AvatarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  public userData?: User;

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

  public logout(): void {
    this.authService.logout();
  }
}
