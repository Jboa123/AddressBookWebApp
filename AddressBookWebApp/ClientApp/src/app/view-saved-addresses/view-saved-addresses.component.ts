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
    this.Headers = ["First Name", "Last Name", "email", "phone"];
    this.PeopleProperties = ["firstName", "lastName", "email", "phone"];
    this._addressService.PeopleInitialised.subscribe( () => this.People = this._addressService.VisiblePeople)
  }

}


  
  





