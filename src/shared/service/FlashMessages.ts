import { FlashMessagesService } from 'angular2-flash-messages';
import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessages {
  constructor(private _flashMessagesService: FlashMessagesService) {
        
  }

  show(messages: any, style:string, timeout = 3000){
      var css = this.getStyle(style);
      const parent = this;
      if(messages){
          if(typeof messages === 'string' || messages instanceof String){
            parent._flashMessagesService.show(messages as string, { cssClass: css, timeout: timeout });
          }else{
              if(messages.msg){
                  parent._flashMessagesService.show(messages.msg, { cssClass: css, timeout: timeout });
              }else{
                  let msg = messages as Array<any>;
                  msg.forEach(function(message){
                      parent._flashMessagesService.show(message.msg.toString(), { cssClass: css, timeout: timeout });
                  });
              }
          }
      }   
  }

  getStyle(style: string){
      switch (style) {
          case 'success':
              return 'alert-success';
              
          case 'danger':
              return 'alert-danger';
      
          case 'info':
              return 'alert-info';

          case 'warning':
              return 'alert-warning';

          default:
              return 'alert-success';
      }
  }

}
