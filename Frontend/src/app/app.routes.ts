import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { UsersComponent } from './users/users';
import { UserDetailComponent } from './user-detail/user-detail';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'users/:name', component: UserDetailComponent },
];
