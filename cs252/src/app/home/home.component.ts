import { Component, OnInit } from '@angular/core';
import { Apicalls } from '../../auth/apicalls.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public Apicalls: Apicalls) { }

  ngOnInit() {
  }
  search: string;
  title: string;
  onSubmit(search,year) {
    console.log(year);
    if ((year == undefined || year == "")&& (search == undefined || search == "")) {
      alert("Please enter value for at least one of the inputs.");
    } else if (search == undefined || search == "") {
      if (year < 1888) {
        alert("The earliest surviving motion-picture film is from 1888! Sorry!");
      } else if (year > 2019) {
        alert("We don't have any movies from the future!");
      } else {
        this.Apicalls.callApi3(year);
      }
    } else if (year == undefined || year == "") {
      this.Apicalls.callApi1(search);
    } else {
      this.Apicalls.callApi2(search,year);
    }

    //console.log(document.getElementById("search").nodeValue);
    this.getSearch();

  }

  getSearch() {
    console.log(this.search);
  }

}
