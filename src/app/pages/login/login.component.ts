import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  isLoding :boolean = false
  errorMassg : string = ''
  succesMassg : string = ''


  LoginForm : FormGroup = new FormGroup( {

    email : new FormControl (null , [Validators.required , Validators.email]),
    password : new FormControl (null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,12}$/)]),

  })


  

  submitForm(){
    if (this.LoginForm.valid) {
      this.isLoding = true
      this.authService.signin(this.LoginForm.value).subscribe({
        next:(res)=>{
          this.isLoding = false
          this.errorMassg = ''
          console.log(res);
          this.succesMassg = res.message

          localStorage.setItem('myToken' , res.token)

          this.authService.getUserData()



          setTimeout(() => {
            this.router.navigate(['/home'])
            
          }, 1000);
          
        },
        error:(err)=>{
          this.isLoding = false
          console.log(err.error.message);
          this.errorMassg = err.error.message
          
        }
  
  
      })
  
      
    }else{
      this.LoginForm.markAllAsTouched()

    }
    

  }

}
