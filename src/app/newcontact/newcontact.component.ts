import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { contactsInterface } from '../interfaces/contactsInterface';

@Component({
  selector: 'app-newcontact',
  standalone: false,
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.scss']
})
export class NewcontactComponent {

  newContact!: contactsInterface;
  contactformGroup = new FormGroup({    
        firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),      
        lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),   
        phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(8)]),    
        address: new FormControl('', [Validators.required, Validators.maxLength(9)]),
  });

  constructor(private router: Router, private contactService: ContactsService){

  }
  onSubmit(){
    this.newContact = {
      Id: 0,
      FirstName: this.contactformGroup.controls['firstName'].value as string,
      LastName: this.contactformGroup.controls['firstName'].value as string,
      PhoneNumber: this.contactformGroup.controls['firstName'].value as string,
      Address: this.contactformGroup.controls['firstName'].value as string,
    }

    this.contactService.updateContacts(this.newContact);

    console.log(this.contactService.getContacts());

    this.router.navigate(['/contacts']);    /*Renvoit vers la page "/Contacts"*/
  }

  onCancel(){
    this.router.navigate(['/contacts']);    /*Renvoit vers la page "/Contacts"*/
  }
}
