import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      map(state => !!state)
    ).subscribe(state => {
      if (state) {
        this.router.navigate(['/']);
      }
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '200px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
