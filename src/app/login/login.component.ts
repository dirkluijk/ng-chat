import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
      this.router.navigate(['/']);
    });
  }
}
