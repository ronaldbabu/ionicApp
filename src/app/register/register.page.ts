import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  responseMsg: string;

  constructor(
    private commonservice: CommonServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')]],
      passwordConfirm: ['', [Validators.required]],
    });
  }

  get isFieldValid() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;

    const registerData = {
      email: this.registerForm.controls.emailId.value,
      password: this.registerForm.controls.password.value,
      username: this.registerForm.controls.userName.value,
      phone: this.registerForm.controls.phone.value
    };

    const passwordVal = this.registerForm.controls.password.value;
    const passwordConf = this.registerForm.controls.passwordConfirm.value;

    if (passwordVal === passwordConf){
      if (this.registerForm.invalid) {
        return;
      } else {
        this.commonservice.registerUser(registerData)
          .pipe(first())
          .subscribe((res) => {
            if (res.success === true) {
              this.submitted = false;
              this.successToast();
              this.router.navigate(['/login']);
            } else if (res.success === false) {
              this.submitted = false;
              this.responseMsg = res.message;
              this.presentToast();
              this.router.navigate(['/register']);
            }
          },
            (err) => {
            });
      }
    } else {
      this.passwordToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.responseMsg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'User registered successfully.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async passwordToast() {
    const toast = await this.toastController.create({
      message: 'Passwords do not match',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async emailToast() {
    const toast = await this.toastController.create({
      message: 'E-mail id already exists! Try another one',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  emailCheck() {
    this.submitted = true;

    const userEmail = {
      email: this.registerForm.controls.emailId.value
    };

    if (this.registerForm.invalid) {
      return;
    } else {
      this.commonservice.emailCheck(userEmail)
        .pipe(first())
        .subscribe((res) => {
          if (res.success === true) {
            this.submitted = false;
            this.onSubmit();
          } else if (res.success === false) {
            this.submitted = false;
            this.emailToast();
          }
        },
          (err) => {
          });
    }

  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
