import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = environment.api + "users";
  }
  

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}`, user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${this.url}/${user.id}`);
  }

  getAllUsers(args: any): Observable<User[]> {
    let params = new HttpParams();
    console.log(args, "args");
    params = params.append('email', args);
    return this.http.get<User[]>(`${this.url}`, {params: params});
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`${this.url}/${user.id}`, user, { responseType: 'json' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`${this.url}/${user.id}`, { responseType: 'json' });
  }

}
