import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { contactsInterface } from '../interfaces/contactsInterface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsDataArray: contactsInterface[] = [];
  columnsToDisplay = ['FirstName', 'LastName', 'PhoneNumber', 'Address', 'Update', 'Delete'];
  
  constructor(private contactService: ContactsService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.contactsDataArray = this.contactService.getContacts();  /*Récupération de la liste des contacts*/
    console.log(this.contactsDataArray);
  }

  onUpdate(contact: contactsInterface){
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',            /*Taille de la boite de dialogue*/
      width: '500px',
      data: contact,
    });
  }

}
