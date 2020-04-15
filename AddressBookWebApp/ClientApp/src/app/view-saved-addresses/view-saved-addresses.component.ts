import { Component, OnInit } from '@angular/core';
import { AddressService, SplitNamePerson } from '../Services/address.service';

@Component({
  selector: 'app-view-saved-addresses',
  templateUrl: './view-saved-addresses.component.html',
  styleUrls: ['./view-saved-addresses.component.css']
})
export class ViewSavedAddressesComponent implements OnInit {

  private People: SplitNamePerson[];
  private Headers: string[];
  private PeopleProperties: string[];
  
  constructor(private _addressService: AddressService) {}

  ngOnInit() {
    this.Headers = ["First Name", "Last Name", "Email", "Phone"];
    this.PeopleProperties = ["firstName", "lastName", "email", "phone"];
    //The component is notified if VisiblePeople is changed, either on initialisation from address.service or from the filter-list component
    this._addressService.VisiblePeopleModified.subscribe( () => this.People = this._addressService.VisiblePeople)
  }

  private Delete(person: SplitNamePerson): void {
    this._addressService.DeletePerson(person);
  }

}


  
  





