import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this._isAuthenticated
    .asObservable()
    .pipe(map((v) => Boolean(v || localStorage.getItem("token"))));

  constructor(private router: Router, private httpClient: HttpClient) {
    this.checkAuth();
  }

  async signIn(email: string, password: string) {
    this.httpClient
      .post(`/v1/login`, {
        email,
        password,
      })
      .subscribe({
        next: (data: any) => {
          if (data.token) {
            this._isAuthenticated.next(true);
            this.router.navigate(["/dashboard"]);
            localStorage.setItem("token", data.token);
          }
        },
        error: (err: any) => console.error("Error signing in:", err),
      });
  }

  signUp(email: string, password: string) {
    return this.httpClient.post(`/v1/register`, {
      email,
      password,
    });
  }

  async signOut() {
    this._isAuthenticated.next(false);
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  private async checkAuth() {}

  isAuthenticated() {
    return this._isAuthenticated.value || localStorage.getItem("token");
  }
}
