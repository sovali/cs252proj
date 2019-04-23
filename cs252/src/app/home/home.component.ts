import { Component, OnInit } from '@angular/core';
import { Apicalls } from '../../auth/apicalls.service';
import {NgForm} from '@angular/forms';
import { stringify } from 'querystring';

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
  year: string;
  onSubmit(search:string,year:string) {
    document.getElementById("movie").style.display = "none";

    this.search=search;
    this.year=year;
    this.Apicalls.getMovie(search,year);
    this.getCurrMovie();
  }

  getCurrMovie() {

    console.log(JSON.stringify(this.Apicalls.currMovie.Response));
    if (this.Apicalls.currMovie.Response == "" || this.Apicalls.currMovie.Response.length == 0) {
      this.Apicalls.getMovie(this.search, this.year);
    }

    this.printMovie();

  }

  printMovie() {
    document.getElementById("poster").innerHTML = '<img src="' + this.Apicalls.currMovie.Poster + '" alt="Movie Poster">';   //document.getElementById('poster').setAttribute("src", this.Apicalls.currMovie.Poster);
    document.getElementById("movie").style.display = "inline";
  }


}
