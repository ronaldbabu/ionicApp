import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  userinfo = {};
  private userData = new BehaviorSubject(this.userinfo);
  userVal = this.userData.asObservable();

  constructor(private http: HttpClient) { }

  getUserData(userinfo: string) {
    this.userData.next(userinfo);
  }

  emailCheck(data): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/auth/checkMail`, data);
  }

  registerUser(data): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}api/auth/register`, data);
  }

  profileData(): Observable<any> {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`${environment.apiBaseUrl}api/user`,
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userData.token}`}
    });
  }
}
