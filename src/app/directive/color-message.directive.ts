import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appColorMessage]'
})
export class ColorMessageDirective {
  @HostBinding('style.backgroundColor') color = 'red';

  constructor() { }

}
