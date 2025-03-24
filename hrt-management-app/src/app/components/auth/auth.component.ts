import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { max } from "date-fns";

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
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      try {
        const { email, password } = this.authForm.value;
        if (this.isLogin) {
          this.authService.signIn(email, password);
        } else {
          this.authService.signUp(email, password).subscribe((data) => {
            next: ({ message }: { message: string }) => {
              if (message) {
                this.snackBar.open(
                  "Registration successful! Please login.",
                  "Close",
                  {
                    duration: 3000,
                  }
                );
              }
            };
            error: (err: any) => console.error("Error signing up:", err);
          });
          this.authForm.reset();
          this.isLogin = true;
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
