import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatListModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, LoginDialogComponent],
  exports: [],
  entryComponents: [LoginDialogComponent]
})
export class LoginModule {}
