import { PAYPAL_CONFIG, PaypalConfig } from './paypal-button.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { PaypalLoadService } from './services/paypal-load.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaypalButtonComponent],
  exports: [PaypalButtonComponent],
  providers: []
})
export class PaypalButtonModule {
  static forRoot(paypal_config: PaypalConfig): ModuleWithProviders {
    return {
      ngModule: PaypalButtonModule,
      providers: [
        PaypalLoadService,
        { provide: PAYPAL_CONFIG, useValue: paypal_config }
      ]
    };
  }

}
