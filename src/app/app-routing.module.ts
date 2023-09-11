import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { UsersResolver } from './core/_resolver/users.resolver';


const routes: Routes = [
  {
    path: 'home',
    component: TableUsersComponent,
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
