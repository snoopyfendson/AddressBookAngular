import { ContactsService } from './../../services/contacts.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { contactsInterface } from 'src/app/interfaces/contactsInterface';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateContact!: contactsInterface;

  updateformGroup = new FormGroup({    
          firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),      
          lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),   
          phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),    
          address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

  contactToUpdate!: contactsInterface;

  constructor(public dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: contactsInterface, private ContactsService: ContactsService){
    this.contactToUpdate = data;
  }

  ngOnInit(){
    //Récupération des différentes valeurs pour l'enregistrement correspondant au bouton Update pour populer le formulaire
    this.updateformGroup.controls['firstName'].setValue(this.contactToUpdate.FirstName);
    this.updateformGroup.controls['lastName'].setValue(this.contactToUpdate.LastName);
    this.updateformGroup.controls['phoneNumber'].setValue(this.contactToUpdate.PhoneNumber);
    this.updateformGroup.controls['address'].setValue(this.contactToUpdate.Address);

    console.log(this.contactToUpdate);
  }

  onSubmit(){
    this.updateContact = {
      Id: this.contactToUpdate.Id,
      FirstName: this.updateformGroup.controls['firstName'].value as string,
      LastName: this.updateformGroup.controls['lastName'].value as string,
      PhoneNumber: this.updateformGroup.controls['phoneNumber'].value as string,
      Address: this.updateformGroup.controls['address'].value as string,
    }

    this.ContactsService.updateContact(this.updateContact);

    console.log(this.ContactsService.getContacts());
    this.dialogRef.close();  //Fermeture de la boite de dialogue "Delete"
  }


}
