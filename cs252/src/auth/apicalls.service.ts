import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie';
import { getLocaleDayNames } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Apicalls {
    private apiKey: string = "apikey=fce88d4b";
    private apiLink: string = "http://www.omdbapi.com/?"
    apiReq: string;
    currMovie: Movie = {
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: "",
        Ratings: [ {
            Source: "",
            Value: "",
            }
        ],
        Metascore: "",
        imbdRating: "",
        imbdVotes: "",
        imbdID: "",
        Type: "",
        DVD: "",
        BoxOffice: "",
        Production: "",
        Website: "",
        Response: "",
    };
    constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private injector: Injector,
    private router: Router,
    private http:HttpClient,
  ) { }

  public getMovie(search:string, year:string) {
    if ((year == undefined || year == "") && (search == undefined || search == "")) {
        alert("Please enter value for at least one of the inputs.");
      } else if (search == undefined || search == "") {
        if (+year < 1888) {
          alert("The earliest surviving motion-picture film is from 1888! Sorry!");
        } else if (+year > 2019) {
          alert("We don't have any movies from the future!");
        } else {
          this.callApi3(year).subscribe((data: Movie) => this.currMovie = {
            Title: data.Title,
            Year: data.Year,
            Rated: data.Rated,
            Released: data.Released,
            Runtime: data.Runtime,
            Genre: data.Genre,
            Director: data.Director,
            Writer: data.Writer,
            Actors: data.Actors,
            Plot: data.Plot,
            Language: data.Language,
            Country: data.Country,
            Awards: data.Awards,
            Poster: data.Poster,
            Ratings: data.Ratings,
            Metascore: data.Metascore,
            imbdRating: data.imbdRating,
            imbdVotes: data.imbdVotes,
            imbdID: data.imbdID,
            Type: data.Type,
            DVD: data.DVD,
            BoxOffice: data.BoxOffice,
            Production: data.Production,
            Website: data.Website,
            Response: data.Response,
        })
        }
      } else if (year == undefined || year == "") {
        this.callApi1(search).subscribe((data: Movie) => this.currMovie = {
            Title: data.Title,
            Year: data.Year,
            Rated: data.Rated,
            Released: data.Released,
            Runtime: data.Runtime,
            Genre: data.Genre,
            Director: data.Director,
            Writer: data.Writer,
            Actors: data.Actors,
            Plot: data.Plot,
            Language: data.Language,
            Country: data.Country,
            Awards: data.Awards,
            Poster: data.Poster,
            Ratings: data.Ratings,
            Metascore: data.Metascore,
            imbdRating: data.imbdRating,
            imbdVotes: data.imbdVotes,
            imbdID: data.imbdID,
            Type: data.Type,
            DVD: data.DVD,
            BoxOffice: data.BoxOffice,
            Production: data.Production,
            Website: data.Website,
            Response: data.Response,
        })
      } else {
        if (+year < 1888) {
            alert("The earliest surviving motion-picture film is from 1888! Sorry!");
          } else if (+year > 2019) {
            alert("We don't have any movies from the future!");
          } else {
            this.callApi2(search,year).subscribe((data: Movie) => this.currMovie = {
                Title: data.Title,
                Year: data.Year,
                Rated: data.Rated,
                Released: data.Released,
                Runtime: data.Runtime,
                Genre: data.Genre,
                Director: data.Director,
                Writer: data.Writer,
                Actors: data.Actors,
                Plot: data.Plot,
                Language: data.Language,
                Country: data.Country,
                Awards: data.Awards,
                Poster: data.Poster,
                Ratings: data.Ratings,
                Metascore: data.Metascore,
                imbdRating: data.imbdRating,
                imbdVotes: data.imbdVotes,
                imbdID: data.imbdID,
                Type: data.Type,
                DVD: data.DVD,
                BoxOffice: data.BoxOffice,
                Production: data.Production,
                Website: data.Website,
                Response: data.Response,
            })
          }

    }
  }

  public callApi1(search:string) {
    return this.http.get(this.apiLink + "t=" + search + "&" + this.apiKey);
  }

  public callApi2(search:string,year:string) {
    return this.http.get(this.apiLink + "t=" + search + "&y=" + search + "&" +this.apiKey);
  }

  public callApi3(year:string) {
    return this.http.get(this.apiLink + "y=" + year + "&" + this.apiKey);
  }
  
}
