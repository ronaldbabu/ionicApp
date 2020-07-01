import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    public toastController: ToastController,
    private commonservice: CommonServiceService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get isFieldValid() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    const userCredentials = {
      email: this.loginForm.controls.emailId.value,
      password: this.loginForm.controls.password.value,
    };

    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.login(userCredentials)
        .pipe(first())
        .subscribe((res) => {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          if (res.success === true) {
            this.submitted = false;
            this.getUserData();
          } else if (res.success === false) {
            this.submitted = false;
            this.presentToast();
            this.router.navigate(['/login']);
          }
        },
          (err) => {
          });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Wrong Credentials! Please try again.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async profileToast() {
    const toast = await this.toastController.create({
      message: 'User data not found.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  async unauthorizedToast() {
    const toast = await this.toastController.create({
      message: 'Access denied.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  getUserData() {
    this.commonservice.profileData()
      .pipe(first())
      .subscribe((res) => {
        if (res.success === true) {
          this.userData = res.data.userData;
          this.commonservice.getUserData(this.userData);
          this.router.navigate(['/home']);
          this.loginForm.reset();
        } else if (res.success === false) {
          this.profileToast();
        }
      },
        (err) => {
         this.unauthorizedToast();
        });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
