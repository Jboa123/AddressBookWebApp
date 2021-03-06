import { Component, OnInit } from '@angular/core';
import { AddressService, SplitNamePerson } from '../Services/address.service';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  private UserSearch = "";
  constructor(private _addressService: AddressService) { }

  ngOnInit() {
    this._addressService.AllPeopleModifiedEmitter.subscribe(() => this.FilterPeople())
  }


  //Search all the people to see if any of the properties contain the user input. The VisiblePeople array is initially cleared, each person fulfilling the criteria is added to visible people.
  // An event is emitted so the View-saved-addresses component is alerted.
  private FilterPeople(): void {
    this._addressService.VisiblePeople = [];

    this._addressService.AllPeople.forEach(person => {
      if (person.email.includes(this.UserSearch.toLowerCase()) || person.lastName.toLowerCase().includes(this.UserSearch.toLowerCase()) || person.firstName.toLowerCase().includes(this.UserSearch.toLowerCase()) || person.phone.includes(this.UserSearch) ) {
            this._addressService.VisiblePeople.push(person);
          }
        })
    this._addressService.VisiblePeopleModified.emit();
  }

}
