import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  authForm: FormGroup;
  isLogin = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      email: ["hrt@gmail.com", [Validators.required, Validators.email]],
      password: ["12345678", Validators.required],
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      try {
        const { email, password } = this.authForm.value;
        if (this.isLogin) {
          this.authService.signIn(email, password);
        } else {
          this.authService
            .signUp(email, password)
            .pipe(tap(console.log))
            .subscribe({
              next: ({ message }: { message: string }) => {
                console.log("Signed up successfully!", message);
                if (message) {
                  this.snackBar.open(
                    "Registration successful! Please login.",
                    "Close",
                    {
                      duration: 3000,
                    }
                  );
                }

                this.authForm.reset();
                this.isLogin = true;
              },
              error: (err: any) => console.error("Error signing up:", err),
            });
        }
      } catch (error: any) {
        this.snackBar.open(error.message || "An error occurred", "Close", {
          duration: 3000,
        });
      }
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
  }
}
