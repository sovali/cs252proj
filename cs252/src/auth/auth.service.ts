import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {of as observableOf,  Observable, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentUser: string = "";
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private injector: Injector,
    private router: Router
  ) { }

  googleLogin() {
    return this.authorize(new auth.GoogleAuthProvider());
  }

  authorize(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        var user = this.afAuth.auth.currentUser;
        var fire = this.afs.collection('users').doc(user.uid);
        this.loggedIn.next(true);
        //this.fireservice.currUser()
        fire.ref.get().then((doc) => {
          if (!doc.exists) {
            // add user to database
          }
            // move to page
            const ngZone = this.injector.get(NgZone);

            ngZone.run(() => {
              this.router.navigate(['../home'],{skipLocationChange: true}) 
            });
        })
      })
  }

}
