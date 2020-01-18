import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private innerUserIsAuthenticated = true;
  get userIsAuthenticated() {
    return this.innerUserIsAuthenticated;
  }

  constructor() { }
  login() {
    this.innerUserIsAuthenticated = true;
  }
  logout() {
    this.innerUserIsAuthenticated = false;
  }
}
