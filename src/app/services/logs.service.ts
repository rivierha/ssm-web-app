import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = environment.api + "logs";
  }

  addLog(log: Log): Observable<Log> {
    return this.http.post<Log>(`${this.url}`, log);
  }

  getLog(log: Log): Observable<Log> {
    return this.http.get<Log>(`${this.url}/${log.id}`);
  }

  editLog(log: Log): Observable<any> {
    return this.http.put(`${this.url}/${log.id}`, log, { responseType: 'json' });
  }

  deleteLog(log: Log): Observable<any> {
    return this.http.delete(`${this.url}/${log.id}`, { responseType: 'json' });
  }

}
