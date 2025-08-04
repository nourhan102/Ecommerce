import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../core/services/payment/payment.service';

@Component({
  selector: 'app-chekout',
  imports: [ReactiveFormsModule],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.scss'
})
export class ChekoutComponent  implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly formBuilder = inject(FormBuilder)
  private readonly paymentService = inject(PaymentService)
  paymentForm !: FormGroup ;
  cartId :string =''

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group ( {
      details : [null , [Validators.required]],
      phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city : [null ,[ Validators.required ]]
    } )
    this.activatedRoute.paramMap.subscribe ( {
      next:(res)=>{
        console.log(this.cartId);
        
      }, error:(err)=>{
        console.log(err);
        
      }
    } )
    
  }

  pay = new FormGroup ( {
    details : new FormControl (null , [Validators.required]),
    phone : new FormControl (null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city : new FormControl (null ,[ Validators.required ]),
  } )


  submitForm():void{
    console.log(this.paymentForm.value);

    this.paymentService.checkoutSession(this.cartId , this.paymentForm.value).subscribe( {
      next:(res)=>{
        console.log(res);
        if (res.status === "success") {
          window.open(res.session.url , '_blank')
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    } )

    
  }

}
