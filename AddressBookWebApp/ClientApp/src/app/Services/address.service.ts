import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private SplitNamePeople: SplitNamePerson[];
  public VisiblePeople: SplitNamePerson[];
  public PeopleInitialised: EventEmitter<any> = new EventEmitter();
  private AddressControllerUrl: string;
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.AddressControllerUrl = baseUrl + "PersonAddress";
    this.InitialisePeople();
  }

  /*Called when the Save Contact Details Button is clicked. The data is added to the SplitNamePeople array and sorted by lastName.*/
  public SaveAddress(userData: SplitNamePerson) {

    this.CapitaliseNames(userData);
    this.SplitNamePeople.push(userData);

    this.SplitNamePeople.sort((p1, p2) => {
      if (p1.lastName > p2.lastName) { return 1 };
      if (p1.lastName < p2.lastName) { return -1 };
      return 0;
    })

    this._http.post<any>(this.AddressControllerUrl, userData).subscribe(
        response => console.log("Success!", response),
        error => console.error("Error", error)
    );
  }

  /*Load data from DB as type SplitNamePerson and populate SplitNamePeople array. Convert each person to type FullNamePerson and populate FullNamePeople array.
   Waits for the server to return all data before converting to type FullNamePerson*/
  private InitialisePeople() {
      this._http.get<SplitNamePerson[]>(this.AddressControllerUrl).subscribe(result => {
        this.SplitNamePeople = result;
        this.VisiblePeople = result;
      }, error => console.log(error), () => {
          this.PeopleInitialised.emit();
      })
  }

  private CapitaliseNames(splitNamePerson: SplitNamePerson) {
    splitNamePerson.lastName = splitNamePerson.lastName[0].toUpperCase() + splitNamePerson.lastName.slice(1);
    splitNamePerson.firstName = splitNamePerson.firstName[0].toUpperCase() + splitNamePerson.firstName.slice(1);
  }

}

export interface SplitNamePerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

