import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Contact, Contacts, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Error : any;
  constructor(private router: Router,
              private contact$ : Contacts,
              private platform$: Platform,
              private toast$ : Toast,
              private androidPermissions$ : AndroidPermissions,
              private flashlight$ : Flashlight ) { 
    this.platform$.ready().then((a) => {
      // console.log(a);
      this.androidPermissions$.checkPermission(this.androidPermissions$.PERMISSION.CONTACTS).then(
        res => this.createContact(),
        err => this.androidPermissions$.requestPermission(this.androidPermissions$.PERMISSION.CONTACTS)
      )
    });
    this.androidPermissions$.requestPermission(this.androidPermissions$.PERMISSION.CONTACTS);
  }
  
  createContact(): void {
    let _contact : Contact = this.contact$.create();
    _contact.name = new ContactName(null,'Vodafone','');
    _contact.phoneNumbers = [new ContactField('mobile', '8778809631')];
    _contact.save().then(
      () => {
        this.toast$.show('Saved','2000','center').subscribe();
      },
      (error: any) => {
        this.Error = error;
        this.toast$.show(error,'2000','center').subscribe();
      }
    )
  }

  ngOnInit() {
  }

  login() {
    this.flashlight$.switchOn();
  	// this.router.navigateByUrl('/menu/home');
  }

}
