import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instance } from '../models/instance.model';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InstancesService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = environment.api + "instances";
  }
  
  addInstance(instance: Instance): Observable<Instance> {
    return this.http.post<Instance>(`${this.url}`, instance);
  }

  getInstance(instance: Instance): Observable<Instance> {
    return this.http.get<Instance>(`${this.url}/${instance.id}`);
  }

  getAllInstances(args: any): Observable<Instance> {
    let params = new HttpParams();
    params = params.append('team', args);
    return this.http.get<Instance>(`${this.url}`, {params: params});
  }

  editInstance(instance: Instance): Observable<any> {
    return this.http.put(`${this.url}/${instance.id}`, instance, { responseType: 'json' });
  }

  deleteInstance(instance: Instance): Observable<any> {
    return this.http.delete(`${this.url}/${instance.id}`, { responseType: 'json' });
  }
}
