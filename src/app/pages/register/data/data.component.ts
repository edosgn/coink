import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoinkService } from 'src/app/services/coink.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  @Output() directionEvent = new EventEmitter<any>();
  @Output() eventFormData = new EventEmitter<any>();

  formData: FormGroup;

  documentTypes: any;
  genders: any;

  fieldPinCodeType: boolean = false;
  fieldPinMatchType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private coinkService: CoinkService,
    private toastService: ToastService
  ) { 
    this.coinkService.getDocumentTypes().subscribe(response => {
      this.documentTypes = response;
    }, (error) => {
      this.toastService.openToast(
        'Error!!',
        'No se pudo realizar la consulta de documentos de identidad, '+ error.message,
        'danger'
      );
    });

    this.coinkService.getGenders().subscribe(response => {
      this.genders = response;
    }, (error) => {
      this.toastService.openToast(
        'Error!!',
        'No se pudo realizar la consulta de documentos de identidad, '+ error.message,
        'danger'
      );
    });
  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      document_type: new FormControl (null, [Validators.required]),
      document_number: new FormControl (null, [Validators.required]),
      date_expedition: new FormControl (null, [Validators.required]),
      date_birth: new FormControl (null, [Validators.required]),
      gender: new FormControl (null, [Validators.required]),
      email_text: new FormControl (null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      email_match: new FormControl (null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      pin_security_code: new FormControl (null, [Validators.required]),
      pin_security_match: new FormControl (null, [Validators.required]),
    });
  }

  toggleFieldPinType(type: string) {
    switch (type) {
      case 'code':
        this.fieldPinCodeType = !this.fieldPinCodeType;
        
        break;
      case 'match':
        this.fieldPinMatchType = !this.fieldPinMatchType;
        
        break;
    }
  }

  back(){
    this.directionEvent.emit('prev');
  }

  next(){
    let response = {
      type: 'success',
      code: 200,
      message: 'Fomulario con datos de cuenta correcto.',
      data: this.formData.value
    }

    this.eventFormData.emit(response);
  }
}
