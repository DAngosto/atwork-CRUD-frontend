import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from './modules/shared/components/side-bar/side-bar.component';
import { AuthService } from './modules/shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    ConfirmDialogModule,
    SidebarModule,
    SideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService: AuthService = inject(AuthService);
  title = 'atwork-crud-frontend';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
