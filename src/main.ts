import 'core-js';
import 'zone.js';

import "materialize-css";
import "angular2-materialize";

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule); 