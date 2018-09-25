import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '200px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
