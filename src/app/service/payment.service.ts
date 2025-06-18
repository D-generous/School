import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private initializePaymentUrl = 'http://localhost/school/payment.php'; // Adjust to match your backend location
  private verifyPaymentUrl = 'http://localhost/school/confirmpayment.php'; // Adjust to match your backend location

  constructor(private http: HttpClient) {}

  // Call backend to initialize a payment
  initializePayment(data: any): Observable<any> {
    return this.http.post(this.initializePaymentUrl, data);
  }

  // Call backend to verify payment
  verifyPayment(reference: string): Observable<any> {
    return this.http.get(`${this.verifyPaymentUrl}?reference=${reference}`);
  }
}
