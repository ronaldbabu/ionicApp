import { Component } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData: any;
  constructor(
    private commonservice: CommonServiceService,
    private authenticationService: AuthenticationService) {
      this.commonservice.userVal.subscribe(val => this.userData = val);
     }

     logOut(){
      this.authenticationService.logout();
     }
}
