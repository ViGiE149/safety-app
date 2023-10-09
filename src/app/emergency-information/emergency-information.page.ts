import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-information',
  templateUrl: './emergency-information.page.html',
  styleUrls: ['./emergency-information.page.scss'],
})
export class EmergencyInformationPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToFaq(){

  }
  goToAboutMe(){
    this.router.navigateByUrl ('/about-me');
  }

  goToMedical(){
    this.router.navigateByUrl ('/medical');
  }
  goToAddresses(){
    this.router.navigateByUrl ('/addresses');
  }
}
