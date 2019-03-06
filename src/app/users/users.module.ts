import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UserResolverService } from './resolvers/user-resolver.service';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'edit',
        component: UserEditComponent,
        resolve: {
          user: UserResolverService
        }
      },
      {
        path: ':id',
        component: UserProfileComponent,
        resolve: {
          user: UserResolverService
        }
      }
    ])
  ],
  declarations: [
    UserProfileComponent,
    UserEditComponent
  ],
  providers: [
    UserResolverService,
    UsersService
  ],
  exports: []
})
export class UsersModule { }
