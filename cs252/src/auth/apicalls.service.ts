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

    constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private injector: Injector,
    private router: Router,
    private http:HttpClient,
  ) { }



}
