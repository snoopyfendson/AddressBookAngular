import { Injectable } from '@angular/core';
import { contactsInterface } from '../interfaces/contactsInterface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: contactsInterface[] = [
    {  Id: 1,
       FirstName: 'John',
       LastName: 'Johnson',
       PhoneNumber: '111-111-1111',
       Address: '111 Main St, Minneapolis' }, 

    {  Id: 2,
        FirstName: 'Jack',
        LastName: 'Jackson',
        PhoneNumber: '222-222-2222',
        Address: '222 Main St, Los Angeles' },

    {  Id: 3,
          FirstName: 'Mary',
          LastName: 'Erikson',
          PhoneNumber: '333-333-3333',
          Address: '333 Main St, Indiana' },
  ]

  constructor() { }

  getContacts(){
    return this.contacts;
  }

  createContact(newContact: contactsInterface){
    
    //finding the highest Id
    let highestId = 0;
    this.contacts.forEach(contactObject => {
      if (contactObject.Id > highestId)
        highestId = contactObject.Id ;
    })  
    
    //Adding new contact
    this.contacts.push({
      Id: highestId+1,
      FirstName: newContact.FirstName,
      LastName: newContact.LastName,
      PhoneNumber: newContact.PhoneNumber,
      Address: newContact.Address,

    })
  }

  updateContact(updateContact: contactsInterface){

    const index = this.contacts.findIndex(contact => contact.Id == updateContact.Id ); //Récupération de l'index du tableau "Contacts"
    //MAJ du tableau "contacts" avec le contenu du formulaire
    this.contacts[index].FirstName = updateContact.FirstName ;
    this.contacts[index].LastName = updateContact.LastName ;
    this.contacts[index].PhoneNumber = updateContact.PhoneNumber ;
    this.contacts[index].Address = updateContact.Address ;

  }

  deleteContact(id: number){
    const index = this.contacts.findIndex(contact => contact.Id == id );
    this.contacts.splice(index, 1);     //Supprime le contact avec l'index correspondant
  }
}
