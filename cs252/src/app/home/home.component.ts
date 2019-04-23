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
  onSubmit(search) {
    console.log(search);
    //console.log(document.getElementById("search").nodeValue);
    this.Apicalls.getMovie(this.search);
    this.getSearch();

  }

  getSearch() {
    console.log(this.search);
  }

}
