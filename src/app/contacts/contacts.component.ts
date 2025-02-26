import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { contactsInterface } from '../interfaces/contactsInterface';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsDataArray: contactsInterface[] = [];
  columnsToDisplay = ['FirstName', 'LastName', 'PhoneNumber', 'Address', 'Update', 'Delete'];
  
  constructor(private contactService: ContactsService){

  }
  ngOnInit(): void {
    this.contactsDataArray = this.contactService.getContacts();  /*Récupération de la liste des contacts*/
    console.log(this.contactsDataArray);
  }

}
