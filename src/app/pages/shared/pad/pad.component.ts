import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PadService } from 'src/app/services/pad.service';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.scss'],
})
export class PadComponent implements OnInit {
  @Output() padEvent = new EventEmitter<any>();
  @Input() set updateType(type: string) {
    this.type = type;
    this.ngOnInit();
  }
  
  type: any;
  keyboard: any;

  constructor(
    private padService: PadService
  ) { }

  ngOnInit() {
    this.keyboard = this.padService.getPad(this.type);    
  }

  selected(item: any){
    this.padEvent.emit(item);
  }

}
