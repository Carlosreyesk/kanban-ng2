import { RouterModule } from "@angular/router";
import { SignupComponent } from './signup.component';

const routes = [
    { path: '', component: SignupComponent }
];

export default RouterModule.forChild(routes);
