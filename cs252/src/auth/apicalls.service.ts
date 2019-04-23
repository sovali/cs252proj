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

  callApi() {
      return this.http.get(this.apiLink + "t=" + this.apiReq + "&" + this.apiKey);
  }
  search: any;
  public getMovie(search:string) {
      this.apiReq = search;
      console.log(this.getapireq())
      this.callApi().subscribe((data: Movie) => console.log(data["Year"] + "is now currMovie"));
    }

    getapireq() {
        return this.apiReq;
    }

}
