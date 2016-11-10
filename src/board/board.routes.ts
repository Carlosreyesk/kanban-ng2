import { RouterModule } from "@angular/router";
import { BoardComponent } from "./board.component";

const routes = [
    { path: ':id', component: BoardComponent }
];

export default RouterModule.forChild(routes);