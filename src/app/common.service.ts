import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  eventName: string = 'Annual Day';
  randomName: string = '';
  constructor(private httpClient: HttpClient) {}
  uploadEmployeeList(uploadObj: any): Observable<any> {
    const href = environment.BASE_API_URL + '/uploadfile';
    return this.httpClient.post(href, uploadObj);
  }
  uploadPrizeList(uploadObj: any): Observable<any> {
    const href = environment.BASE_API_URL + '/uploadfilePrize';
    return this.httpClient.post(href, uploadObj);
  }
  fetchRandomName(): Observable<any> {
    const href = environment.BASE_API_URL + '/get_random_employee';
    return this.httpClient.get<any>(href);
  }
  fetchPrizeName(id: number): Observable<any> {
    const href = environment.BASE_API_URL + '/get_prize_name/?item_id=' + id;
    return this.httpClient.get<any>(href);
  }
  fetchTotalPrizes(): Observable<any> {
    const href = environment.BASE_API_URL + '/get_prize_number';
    return this.httpClient.get<any>(href);
  }
}
