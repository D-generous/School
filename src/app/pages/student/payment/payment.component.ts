import { Component } from '@angular/core';
import { PaymentService } from '../../../service/payment.service';
import { HttpClient } from '@angular/common/http';
import { UsersserviceService } from '../../../service/usersservice.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService, private studentService: UsersserviceService, public http:HttpClient) {}

  userdetails?: any = ''
  

  


  payWithPaystack() {
    const token = this.studentService.getToken();
    if (token) {
      this.studentService.fetchData(token).subscribe({
        next: (res:any) => {
  
          const paymentDetails = {
            email: res.user.email,
            amount: 5000,
            class: res.user.class
          };
          
          console.log(paymentDetails); // ✅ Correct time to access it


          // Step 1: Call backend to initialize the payment
          this.paymentService.initializePayment(paymentDetails).subscribe(
            (response) => { 
                     
              if (response && response.status) {
                const publicKey = 'pk_test_71c23e56349895029fed608879674f7f80b29573'; // Replace with your Paystack public key
                      
                // Step 2: Open Paystack payment modal
                const paymentHandler = (window as any).PaystackPop.setup({
                  key: publicKey,
                  email: paymentDetails.email,
                  amount: paymentDetails.amount * 100, // Convert amount to kobo
                  ref: response.data.reference, // Reference from backend
                  callback: (paymentResponse: any) => {
              // console.log(paymentResponse);
                    console.log('Payment successful. Reference:', paymentResponse.reference);
      
                    // Step 3: Call backend to verify the payment
                    
                    this.paymentService.verifyPayment(paymentResponse.reference).subscribe(
                      (verifyResponse) => {
                        
                        if (verifyResponse) {
                          alert('Payment verified successfully!');
                        } else {
                          alert('Payment verification failed!');
                        }
                      },
                      (error) => console.error('Verification error:', error)
                    );
                  },
                  onClose: () => {
                    console.log('Payment window closed.');
                  }
                });
      
                paymentHandler.openIframe();
              }
            },
            (error) => console.error('Payment initialization error:', error)
          );
          
        }
      });
    }

  }


}
