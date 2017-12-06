import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef  } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { KeysPipe } from './keys.pipe';
import { AuthenticationService } from "./services/authentication.service";
import { MoodMockService } from './services/mood-mock.service';
import { HomeComponent } from './home/home.component';
import { SocketService } from './services/socket.service';
import { MoodMockComponent } from './mood-mock/mood-mock.component';
import { AppFooterComponent } from './footer/footer.component';
import { TokenInterceptor } from './token.interceptor';

const appRoutes: Routes = [
  { path: 'user', component: UserDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mood', component: MoodMockComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailsComponent,
    KeysPipe,
    HomeComponent,
    MoodMockComponent,
    AppFooterComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService, MoodMockService, SocketService,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      //deps: [HttpClientModule]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
