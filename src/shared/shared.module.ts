import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { TrelloService } from './service/trello.service';
import { CardService } from './service/card.service';
import { LoginService } from './service/login.service';
import { AuthGuard } from './service/auth-guard.service';
import { AutoFocus } from './directives/auto-focus'; 
import { FlashMessages } from './service/FlashMessages';
// import { MemberIconComponent } from './components/member-icon/member-icon.component';
import { MaterializeDirective } from "angular2-materialize";



/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
    imports: [CommonModule, RouterModule, ModalModule],
    declarations: [AutoFocus],
    exports: [AutoFocus]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [TrelloService, LoginService, AuthGuard, FlashMessages, CardService]
        };
    }
}
