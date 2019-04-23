import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie';

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

  public callApi1(search:string) {
      return this.http.get(this.apiLink + "t=" + search + "&" + this.apiKey).subscribe((data: Movie) => console.log("callapi1" + this.currMovie["Title"]));;
  }

  public callApi2(search:string,year:string) {
    return this.http.get(this.apiLink + "t=" + search + "&y=" + search + "&" +this.apiKey).subscribe((data: Movie) => console.log("callapi2" + this.currMovie["Title"]));;
  }

  public callApi3(year:string) {
    return this.http.get(this.apiLink + "y=" + year + "&" + this.apiKey).subscribe((data: Movie) => console.log("callapi3" + this.currMovie["year"]));;
  }
  
}
