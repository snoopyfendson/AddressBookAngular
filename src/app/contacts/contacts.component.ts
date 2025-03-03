import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { contactsInterface } from '../interfaces/contactsInterface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsDataArray: contactsInterface[] = [];
  
  dataSource = new MatTableDataSource<contactsInterface>(); //Création d'une source de données
  
  columnsToDisplay = ['FirstName', 'LastName', 'PhoneNumber', 'Address', 'Update', 'Delete'];
  
  constructor(private contactService: ContactsService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.contactsDataArray = this.contactService.getContacts();  /*Récupération de la liste des contacts*/
    this.dataSource = new MatTableDataSource<contactsInterface>(this.contactsDataArray); //Création de l'instance de stockage de données

    console.log(this.contactsDataArray);
  }

  onUpdate(contact: contactsInterface){
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',            /*Taille de la boite de dialogue*/
      width: '500px',
      data: contact,
    });
  }

  onDelete(contact: contactsInterface){
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',            /*Taille de la boite de dialogue*/
      width: '500px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource(this.contactsDataArray);
    })
  }

  updateDataSource(dataArray: contactsInterface[]){
      this.dataSource.connect().next(dataArray);

  }

}
