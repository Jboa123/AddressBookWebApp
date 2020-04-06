import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../Services/address.service';



@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(private FormBuilder: FormBuilder, private _saveAddressService: AddressService) { }

  ngOnInit() {
  }

  NewAddressForm = this.FormBuilder.group(
    {
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      phone: [""]
    }
  );

  /*Called when the Save Contact Details button is clicked.*/
  public onSubmit()
  {
    this._saveAddressService.SaveAddress(this.NewAddressForm.value)
  }

  get FirstNameIsValid()  {
    return (this.NewAddressForm.get("firstName").invalid && this.NewAddressForm.get("firstName").touched) ? false : true;
  }

  get LastNameIsValid() {
    return (this.NewAddressForm.get("lastName").invalid && this.NewAddressForm.get("lastName").touched) ? false : true;
  }

  get EmailIsValid() {
    return (this.NewAddressForm.get("email").invalid && this.NewAddressForm.get("email").touched) ? false : true;
  }

  get Email()  {
    return this.NewAddressForm.get("email");
  }

}


