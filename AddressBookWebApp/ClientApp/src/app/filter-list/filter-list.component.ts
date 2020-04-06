import { Component, OnInit } from '@angular/core';
import { AddressService, SplitNamePerson } from '../Services/address.service';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {


  constructor(private _addressService: AddressService) { }

  ngOnInit() {

  }

  //Search all the people to see if any of the properties contain the user input. The VisiblePeople array is initially cleared, each person fulfilling the criteria is added to visible people.
  // An event is emitted so the View-saved-addresses component is alerted.
  private FilterPeople(userInput: string): void {
    this._addressService.VisiblePeople = [];

        this._addressService.SplitNamePeople.forEach(person => {
          if (person.email.includes(userInput) || person.lastName.includes(userInput) || person.firstName.includes(userInput) || person.phone.includes(userInput) ) {
            this._addressService.VisiblePeople.push(person);
          }
        })

    this._addressService.VisiblePeopleModified.emit();
  }

}
