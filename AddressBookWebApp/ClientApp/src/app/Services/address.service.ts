import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public AllPeople: SplitNamePerson[];
  public VisiblePeople: SplitNamePerson[];
  public VisiblePeopleModified: EventEmitter<void> = new EventEmitter();
  public AllPeopleModifiedEmitter: EventEmitter<void> = new EventEmitter();
  public SaveFailedEmtitter: EventEmitter<boolean> = new EventEmitter();
  private AddressControllerUrl: string;

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.AddressControllerUrl = baseUrl + "PersonAddress";
    this.InitialisePeople();
  }

  /*Called when the Save Contact Details Button is clicked. The data is added to the SplitNamePeople array and sorted by lastName.
   returns true if save has failed, ortherwise true*/
  public SaveAddress(userData: SplitNamePerson): void{

    this.FormatUserData(userData)
    if (this.EmailExists(userData)) {
      this.SaveFailedEmtitter.emit(true);
    }

    this._http.post<any>(this.AddressControllerUrl, userData).subscribe(
      response => {
        this.AllPeople.push(userData);
        console.log("allpep");
      this.AllPeople.sort((p1, p2) => {
        if (p1.lastName > p2.lastName) { return 1 };
        if (p1.lastName < p2.lastName) { return -1 };
        return 0;
      })
        this.AllPeopleModifiedEmitter.emit();
        this.SaveFailedEmtitter.emit(false);
        console.log("Save successful!")
      },
      () => {
        this.SaveFailedEmtitter.emit(true);
        console.log("Save failed!")
      })
  }

  //remove a given person from the Database, the AllPeople array and VisiblePeopleArray.
  public DeletePerson(person: SplitNamePerson) {
    this._http.delete<any>(this.AddressControllerUrl + "/" + person.email).subscribe((ok) => {
      var personIndex = this.AllPeople.indexOf(person);
      this.AllPeople.splice(personIndex, 1);
      this.AllPeopleModifiedEmitter.emit();
      console.log("Delete successful!")
    },    error => console.log("Delete failed!"));

  }

  /*Load data from DB as type SplitNamePerson and populate SplitNamePeople array. Convert each person to type FullNamePerson and populate FullNamePeople array.
   Waits for the server to return all data before converting to type FullNamePerson*/
  private InitialisePeople() {
      this._http.get<SplitNamePerson[]>(this.AddressControllerUrl).subscribe(result => {
        this.AllPeople = result;
      }, error => console.log(error),
        //creates a second array for visible people, this creates consistency as the filter-list component creates a new list for visible people. Meaning the 2 list are always distinct.
        () => {this.VisiblePeople = [];
          this.AllPeople.forEach(person => this.VisiblePeople.push(person))
          this.VisiblePeopleModified.emit()
        }
      )
  }

  private FormatUserData(splitNamePerson: SplitNamePerson) {
    if (splitNamePerson.lastName && splitNamePerson.firstName && splitNamePerson.email) {
      splitNamePerson.lastName = splitNamePerson.lastName[0].toUpperCase() + splitNamePerson.lastName.slice(1);
      splitNamePerson.firstName = splitNamePerson.firstName[0].toUpperCase() + splitNamePerson.firstName.slice(1);
      splitNamePerson.email = splitNamePerson.email.toLocaleLowerCase();
    }
  }

  //Loop through AllPeople array and check if the email of the user input already exists. 
  private EmailExists(newPerson: SplitNamePerson): boolean {
    var emailExists = false

    this.AllPeople.forEach(person => {
      if (person.email === newPerson.email) {
        emailExists = true;
      }
    })
    return emailExists;
  }
}

export interface SplitNamePerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

