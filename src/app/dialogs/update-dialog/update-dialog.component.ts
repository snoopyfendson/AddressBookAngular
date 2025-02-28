import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contactsInterface } from 'src/app/interfaces/contactsInterface';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  updateformGroup = new FormGroup({    
          firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),      
          lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),   
          phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(8)]),    
          address: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    });

  contactToUpdate!: contactsInterface;

  constructor(@Inject(MAT_DIALOG_DATA) public data: contactsInterface){
    this.contactToUpdate = data;
  }

  ngOnInit(){
    console.log(this.contactToUpdate);
  }

  onSubmit(){

  }


}
