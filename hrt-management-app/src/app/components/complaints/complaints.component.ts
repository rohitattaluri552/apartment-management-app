import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComplaintsService } from "src/app/services/complaints.service";

@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.component.html",
  styleUrls: ["./complaints.component.scss"],
  providers: [ComplaintsService],
})
export class ComplaintsComponent {
  complaintForm: FormGroup;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintsService,
    private snackBar: MatSnackBar
  ) {
    this.complaintForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      email: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      files: [null],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.complaintForm.patchValue({ files: this.selectedFile });
  }

  submitComplaint() {
    if (this.complaintForm.valid) {
      const formData = new FormData();
      formData.append("name", this.complaintForm.get("name")?.value);
      formData.append("mobile", this.complaintForm.get("mobile")?.value);
      formData.append("email", this.complaintForm.get("email")?.value);
      formData.append("complaint", this.complaintForm.get("complaint")?.value);

      if (this.selectedFile) {
        formData.append("files", this.selectedFile, this.selectedFile.name);
      }
      this.complaintService
        .submitComplaint(formData)
        .pipe()
        .subscribe({
          next: (data) => {
            console.log("Complaint submitted successfully!", data);
            this.complaintForm.reset();
            this.snackBar.open("Complaint submitted successfully!", "Close", {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error("Error submitting complaint:", err);
          },
        });
    }
  }
}
