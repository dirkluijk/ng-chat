import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private afAuth: AngularFireAuth) { }

  loginFacebook(): void {
    this.doLogin(new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle(): void {
    this.doLogin(new firebase.auth.GoogleAuthProvider());
  }

  loginGitHub(): void {
    this.doLogin(new firebase.auth.GithubAuthProvider());
  }

  private doLogin(provider: firebase.auth.AuthProvider) {
    this.afAuth.auth.signInWithRedirect(provider).then(() => {
      this.dialogRef.close();
    });
  }
}
