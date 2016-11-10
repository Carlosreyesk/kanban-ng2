import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ButtonsModule } from 'ng2-bootstrap/components/buttons';
import { HttpModule } from '@angular/http';
import { credentials } from '../config/credentials';
import { DndModule } from 'ng2-dnd';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NoContentComponent } from './no-content/';
import { MaterializeDirective } from "angular2-materialize";
import { Select2Component } from 'ng2-select2/ng2-select2';

import 'ng2-dnd-css';
import 'material-css';

import appRoutes from "./app.routes";

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule, 
    ButtonsModule, 
    SharedModule.forRoot(), 
    DndModule.forRoot(), 
    appRoutes, 
    HttpModule, 
    FlashMessagesModule, 
    DragulaModule, 
  ],
  declarations: [
    AppComponent,
    NoContentComponent,
    // todo: implemnet
    Select2Component
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    credentials,
    Title
  ]
})
export class AppModule {}