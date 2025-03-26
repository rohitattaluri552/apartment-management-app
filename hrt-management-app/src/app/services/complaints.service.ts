import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

export interface IComplaint {
  name: string;
  mobile: string;
  email: string;
  complaint: string;
  files: any;
}
@Injectable()
export class ComplaintsService {
  constructor(private httpClient: HttpClient) {}

  // Handle complaint submission logic here
  submitComplaint(complaint: FormData) {
    return this.httpClient.post(`/api/complaints`, complaint);
  }
}
