import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
	styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
	<router-outlet></router-outlet>
  `,
})
export class AppComponent {}