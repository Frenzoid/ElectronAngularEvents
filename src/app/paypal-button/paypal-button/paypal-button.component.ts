import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { PAYPAL_CONFIG, PaypalConfig } from '../paypal-button.config';
import { PaypalLoadService } from '../services/paypal-load.service';

declare var paypal: any;

@Component({
  selector: 'ap-paypal-button',
  template: '',
  styles: ['']
})
export class PaypalButtonComponent implements OnInit {
  @Input() amount: number;
  // true (payment completed), false (payment cancelled)
  @Output() paymentCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(PAYPAL_CONFIG) private config: PaypalConfig, private ngZone: NgZone,
              private paypalService: PaypalLoadService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.paypalService.loadPaypal().subscribe(
      () => this.render()
    );
  }

  private render() {
    paypal.Button.render(
      {
        env: this.config.environment,
        client: {
          sandbox: this.config.sandbox, // development (fake payments)
          production: this.config.production // Only when your app is in production (real payments)
        },
        payment: (data, actions) => {
          // Payment details
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: this.amount,
                  currency: 'EUR'
                }
              }
            ]
          });
        },
        commit: true, // Display a "Pay Now" button rather than a "Continue" button
        onAuthorize: (data, actions) => {
          // Payment completed
          return actions.payment.execute().then(response => {
            this.paymentCompleted.emit(true);
          });
        },
        onCancel: (data) => {
          // Payment cancelled
          this.paymentCompleted.emit(false);
        }
      },
      '#' + this.elementRef.nativeElement.id
    );
  }
}
