import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotService } from '../../../../core/services/forgot/forgot.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  private readonly forgotService = inject(ForgotService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoding: boolean = false;
  step: number = 1;

  fogotPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  fogotPass() {
    let emailValue = this.fogotPassForm.get('email')?.value
    this.resetPassForm.get('email')?.patchValue(emailValue)
    this.isLoding = true;
    this.forgotService.forgotPass(this.fogotPassForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoding = false;
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifyCode() {
    this.isLoding = true;
    this.forgotService.verfyResertCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoding = false;
        if (res.status == 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetPass() {
    this.isLoding = true;
    this.forgotService.resetPass(this.resetPassForm.value).subscribe({
      next: (res) => {
        this.isLoding = false;
        console.log(res);
        localStorage.setItem('myToken', res.token);

        this.authService.getUserData();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.isLoding = false
        console.log(err);
      },
    });
  }
}
