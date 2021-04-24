import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url: string;
  constructor(private http: HttpClient) { 
    this.url = environment.api + "teams";
  }
  
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.url}`, team);
  }

  getTeam(team: Team): Observable<Team> {
    return this.http.get<Team>(`${this.url}/${team.id}`);
  }

  getAllTeams(): Observable<Team> {
    return this.http.get<Team>(`${this.url}`);
  }

  editTeam(team: Team): Observable<any> {
    return this.http.put(`${this.url}/${team.id}`, team, { responseType: 'json' });
  }

  deleteTeam(team: Team): Observable<any> {
    return this.http.delete(`${this.url}/${team.id}`, { responseType: 'json' });
  }
}
