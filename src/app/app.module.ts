import { MenuModule } from './menu/menu.module';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { LoginActiveGuard } from './guards/login-activate.guard';
import { AuthTokenInterceptorService } from './interceptors/auth-token-interceptor.service';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { AgmCoreModule } from '@agm/core';
import { CommonsModule } from './commons/commons.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ModalConfirmComponent
  ],

  entryComponents: [ModalConfirmComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    CommonsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MenuModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2sYQIcXgK0jbglbKQHc_ImsBieJwohHQ',
      libraries: ['places']
    }),
    RouterModule.forRoot(APP_ROUTES,  {preloadingStrategy: PreloadAllModules, enableTracing: true}, )
  ],
  providers: [
    LoginActiveGuard,
    LogoutActivateGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptorService,
      multi: true,
    }],
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

