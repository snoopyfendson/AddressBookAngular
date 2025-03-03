import { ContactsService } from './../../services/contacts.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { contactsInterface } from 'src/app/interfaces/contactsInterface';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  ContactToDelete!: contactsInterface;

   deleteformGroup = new FormGroup({    
            firstName: new FormControl({value: '', disabled: true}),      //Toutes les cellules du formulaire sont désactivées et ne peuvent être modifiées
            lastName: new FormControl({value: '', disabled: true}),   
            phoneNumber: new FormControl({value: '', disabled: true}),    
            address: new FormControl({value: '', disabled: true}),
      });

    IdToDelete!: number;

      constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: contactsInterface, private ContactsService: ContactsService){
        this.ContactToDelete = data;
      }
    
      ngOnInit(){
        //Récupération des différentes valeurs pour l'enregistrement correspondant au bouton Update pour populer le formulaire
        this.deleteformGroup.controls['firstName'].setValue(this.ContactToDelete.FirstName);
        this.deleteformGroup.controls['lastName'].setValue(this.ContactToDelete.LastName);
        this.deleteformGroup.controls['phoneNumber'].setValue(this.ContactToDelete.PhoneNumber);
        this.deleteformGroup.controls['address'].setValue(this.ContactToDelete.Address);
         
      }

      onSubmit(){

        let contactId = this.ContactToDelete.Id;

        this.ContactsService.deleteContact(contactId)  ;
        
        console.log(this.ContactsService.getContacts());
           
        this.dialogRef.close();  //Fermeture de la boite de dialogue "Delete"
        
      }
}
