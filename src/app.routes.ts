import { RouterModule } from "@angular/router";
import { AuthGuard } from './shared/service/auth-guard.service';
import { NoContentComponent } from './no-content/index';
// console.log(AuthGuard);

const routes = [
    { path: '', loadChildren: 'dashboard/dashboard.module#', canActivate: [AuthGuard]  },
    { path: 'board', loadChildren: 'board/board.module', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: 'login/login.module' },
    { path: 'signup', loadChildren: 'signup/signup.module' },
    { path: '**',  component: NoContentComponent }
];


export default RouterModule.forRoot(routes);
