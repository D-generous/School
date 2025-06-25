import { Component } from '@angular/core';
import { PaymentService } from '../../../service/payment.service';
import { HttpClient } from '@angular/common/http';
import { UsersserviceService } from '../../../service/usersservice.service';
import { StudentService } from '../../../service/student.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService, private userService: UsersserviceService, private studentService: StudentService, public http:HttpClient) {}

  userdetails?: any = ''
  

  currentAcademicYear:any = ''

  fetchcurrentAcademicYear(){
    this.userService.currentAcademicYear().subscribe({
      next: (res:any) =>{
        this.currentAcademicYear = res
        console.log(this.currentAcademicYear);
        
      }
    })
  }


  payWithPaystack() {
    const token = this.studentService.getToken();
    if (token) {
      this.studentService.fetchData(token).subscribe({
        next: (res:any) => {
          console.log(res);
          
          this.userService.currentAcademicYear().subscribe({
            next: (result:any) =>{
              const academicyear = result
              
              const paymentDetails = {
                email: res.user.email,
                userId: res.user.id,
                amount: 5000,
                class: res.user.class,
                term: academicyear.term,
                year: academicyear.year
              };
              
              console.log(paymentDetails); // ✅ Correct time to access it
    
    
              // Step 1: Call backend to initialize the payment
              this.paymentService.initializePayment(paymentDetails).subscribe({
                next: (response)=>{
                  if (response && response.status) {
                    const publicKey = 'pk_test_71c23e56349895029fed608879674f7f80b29573'; // Replace with your Paystack public key
                          
                    // Step 2: Open Paystack payment modal
                    const paymentHandler = (window as any).PaystackPop.setup({
                      key: publicKey,
                      email: paymentDetails.email,
                      amount: paymentDetails.amount * 100, // Convert amount to kobo
                      ref: response.data.reference, // Reference from backend
                      callback: (paymentResponse: any) => {
                  console.log(paymentResponse);
                        console.log('Payment successful. Reference:', paymentResponse.reference);
          
                        // Step 3: Call backend to verify the payment

                        const newPaymentDetails = {...paymentDetails, 'ref': paymentResponse.reference}
                        console.log(paymentDetails);
                        
                        
                        this.paymentService.verifyPayment(paymentResponse.reference, newPaymentDetails).subscribe(
                          (verifyResponse) => {
                            // console.log(paymentDetails);
                            


                            console.log(verifyResponse);
                            
                            
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
                error: (error) => console.error('Payment initialization error:', error)
              })
              
              
            }
          })
  
          
        }
      });
    }

  }

 
}
