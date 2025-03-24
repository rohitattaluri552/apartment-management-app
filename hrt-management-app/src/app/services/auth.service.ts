import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private httpClient: HttpClient) {
    this.checkAuth();
  }

  async signIn(username: string, password: string) {
    this.httpClient
      .post(`${environment.baseUrl}/v1/login`, {
        username,
        password,
      })
      .pipe(
        tap((data: any) => {
          if (data.token) {
            this._isAuthenticated.next(true);
            this.router.navigate(["/dashboard"]);
            localStorage.setItem("token", data.token);
          }
        })
      )
      .subscribe((data) => {
        next: (data: any) => {
          console.log("Signed in successfully!", data);
          // this._isAuthenticated.next(true);
          // this.router.navigate(["/dashboard"]);
        };
        error: (err: any) => console.error("Error signing in:", err);
      });
  }

  signUp(username: string, password: string) {
    return this.httpClient.post(`${environment.baseUrl}/v1/register`, {
      username,
      password,
    });
  }

  async signOut() {
    this._isAuthenticated.next(false);
    this.router.navigate(["/login"]);
  }

  private async checkAuth() {}

  isAuthenticated() {
    return this._isAuthenticated.value || localStorage.getItem("token");
  }
}
