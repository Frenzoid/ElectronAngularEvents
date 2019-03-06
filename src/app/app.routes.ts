import { EventAddComponent } from './events/event-add/event-add.component';
import { EventResolverService } from './events/resolvers/event-resolver.service';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsShowComponent } from './events/events-show/events-show.component';
import { LoginActiveGuard } from './guards/login-activate.guard';
import { LoginComponent } from './auth/login/login.component';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { Route } from '@angular/router';


export const APP_ROUTES: Route[] =  [
  { path: 'auth',
    canActivate: [LogoutActivateGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  { path: 'events',
    canActivate: [LoginActiveGuard],
    loadChildren: './events/events.module#EventsModule'
  },
  {
    path: 'profile',
    canActivate: [LoginActiveGuard],
    loadChildren: './users/users.module#UsersModule'
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];
