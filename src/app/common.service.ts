import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  eventName: string = '';
  constructor(private httpClient: HttpClient) {}
  uploadFiles(uploadObj: any): Observable<any> {
    const href = environment.BASE_API_URL + '/uploadfile';
    return this.httpClient.post(href, uploadObj);
  }
}
