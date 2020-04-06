import { Component, OnInit } from '@angular/core';
import { AddressService, SplitNamePerson } from '../Services/address.service';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  private Filter: string;


  constructor(private AddressService: AddressService) { }

  ngOnInit() {
  }

}
