import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventAddComponent } from './event-add/event-add.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventService } from './services/event.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsShowComponent } from './events-show/events-show.component';
import { EventPipePipe } from './pipes/event-pipe.pipe';
import { EventResolverService } from './resolvers/event-resolver.service';
import { AtendeesService } from './services/atendees.service';
import { AgmCoreModule } from '@agm/core';
import { UsersModule } from '../users/users.module';
import { PaypalButtonModule } from '../paypal-button/paypal-button.module';
import { GmapsAutocompleteDirective } from '../directives/gmaps-autocomplete.directive';
import { UserAttendCardComponent } from './user-attend-card/user-attend-card.component';
import { EventDeactiveEditGuard } from '../guards/event-edit-deactivate.guard';
import { MatButtonModule } from '@angular/material/button';

// import { MinDateDirective } from './validators/min-date.validator';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    FormsModule,
    SharedModule,
    PaypalButtonModule.forRoot({
      sandbox:
        'Afzid68khnIdIIJfwlJXJLPr2YFz1HxuKCJ65kJi0NhpR9EA4WvsYTxVqQYbHXuqLAn0QbT0oBhF9l-r',
      production: '',
      environment: 'sandbox'
    }),
    RouterModule.forChild([
    { path: '',
      component: EventsShowComponent
    },
    { path: 'mine',
      component: EventsShowComponent
    },
    { path: 'attend',
    component: EventsShowComponent
    },
    { path: 'edit/:id',
      component: EventAddComponent,
      resolve: {
        event: EventResolverService
      },
      canDeactivate: [
        EventDeactiveEditGuard
      ]
    },
    { path: 'add',
      component: EventAddComponent
    },
    { path: 'user/:id',
      component: EventsShowComponent
    },
    { path: ':id',
      component: EventDetailsComponent,
      resolve: {
        event: EventResolverService
      }
    }
    ])
  ],
  declarations: [
    GmapsAutocompleteDirective,
    EventsShowComponent,
    EventAddComponent,
    EventItemComponent,
    EventDetailsComponent,
    EventPipePipe,
    UserAttendCardComponent
  ],
  providers: [
    EventDeactiveEditGuard,
    AtendeesService,
    EventService,
    EventResolverService
  ]
})
export class EventsModule { }
