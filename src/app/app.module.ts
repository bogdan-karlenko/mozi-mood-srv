import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { KeysPipe } from './keys.pipe';
import { AuthenticationService } from "./services/authentication.service";

const appRoutes: Routes = [
  { path: 'user', component: UserDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailsComponent,
    KeysPipe,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
