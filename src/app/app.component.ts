import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe(user => this.loggedIn = !!user);
  }

  logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
