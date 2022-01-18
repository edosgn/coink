import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PadService implements OnInit {
  keyboard: any = [];

  constructor() {}

  ngOnInit(): void {
    this.keyboard = [
      {
        row: 1,
        cols: [
          { type: 'number', value: '1', visible: true },
          { type: 'number', value: '2', visible: true },
          { type: 'number', value: '3', visible: true },
        ]
      },
      {
        cols: [
          { type: 'number', value: '4', visible: true },
          { type: 'number', value: '5', visible: true },
          { type: 'number', value: '6', visible: true },
        ]
      },
      {
        cols: [
          { type: 'number', value: '7', visible: true },
          { type: 'number', value: '8', visible: true },
          { type: 'number', value: '9', visible: true },
        ]
      }
    ];
  }

  getPad(type: string){
    this.ngOnInit();

    switch (type) {
      case 'full_disable':
        this.keyboard.push({
          cols: [
            { type: 'button', value: 'backspace.svg', visible: true, class: 'backspace', method: 'backspace' },
            { type: 'number', value: '0', visible: true },
            { type: 'button', value: 'check-white.svg', visible: true, class: 'circle-gray', method: 'check_disable' },
          ]
        });
        
        break;

      case 'full_enable':
        this.keyboard.push({
          cols: [
            { type: 'button', value: 'backspace.svg', visible: true, class: 'backspace', method: 'backspace' },
            { type: 'number', value: '0', visible: true },
            { type: 'button', value: 'check-white.svg', visible: true, class: 'circle-green', method: 'check_enable' },
          ]
        });
        
        break;

      case 'only_backspace':
        this.keyboard.push({
          cols: [
            { type: 'button', value: null, visible: false, class: null, method: null },
            { type: 'number', value: '0', visible: true },
            { type: 'button', value: 'backspace.svg', visible: true, class: 'backspace', method: 'backspace' },
          ]
        });
        
        break;
    }

    return this.keyboard;
  }
}
