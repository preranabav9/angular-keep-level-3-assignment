import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private authURL = 'http://localhost:3000/auth/v1/';
  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post(this.authURL, data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken(): string {
    return localStorage.getItem('bearerToken');
  }
  isUserAuthenticated(token): Promise<any> {
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
    return this.httpClient.post(this.authURL + 'isAuthenticated', {}, header).
    pipe
    (map(response => response['isAuthenticated'])).toPromise();
  }
}
