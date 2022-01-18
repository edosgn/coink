import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinkService {
  readonly apiEndpoint = environment.coink.endpoint;
  readonly apiKey = environment.coink.apiKey;

  constructor(
    private httpClient: HttpClient
  ) { }

  verificationNumber(data: any): Observable<any> {
    return this.httpClient.post(this.apiEndpoint + 'sendSmsVerificationNumber?apiKey=' + `${this.apiKey}`, data);
  }

  getDocumentTypes(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint + 'documentTypes?apiKey=' + `${this.apiKey}`);
  }

  getGenders(): Observable<any> {
    return this.httpClient.get(this.apiEndpoint + 'genders?apiKey=' + `${this.apiKey}`);
  }
}
