import { FB_CONFIG, FBConfig } from './facebook-login.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbLoginDirective } from './directives/fb-login.directive';
import { LoadFbApiService } from './services/load-fb-api.service';

@NgModule({
  imports: [CommonModule],
  declarations: [FbLoginDirective],
  exports: [FbLoginDirective]
})
export class FacebookLoginModule {
  static forRoot(client_id: FBConfig): ModuleWithProviders {
    return {
      ngModule: FacebookLoginModule,
      providers: [
        LoadFbApiService,
        { provide: FB_CONFIG, useValue: client_id }
      ]
    };
  }
}
