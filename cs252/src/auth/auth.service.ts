import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
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

  addUser(prevuser) {
    var user = this.afAuth.auth.currentUser;
    var userprops = this.afs.collection('users').doc(user.uid).set({
      userEmail: user.email,
      firebaseUser: prevuser,
    }).then((result) => {
      //console.log('firebase updated!')
    }).catch((error) => {
      //console.log(error)
    })
  }

  currUser() {
    let uid;
    if (this.afAuth.auth.currentUser != null) {
      uid = this.afAuth.auth.currentUser.uid;
    }

    this.currentUser = uid;
    let userdoc = this.afs.collection('users').doc(this.currentUser);

    userdoc.ref.get().then((doc) => {
      if (!doc.exists) {
        return;
      }
    });
  }


  authorize(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        var user = this.afAuth.auth.currentUser;
        var fire = this.afs.collection('users').doc(user.uid);

        this.loggedIn.next(true);
        fire.ref.get().then((doc) => {
          if (!doc.exists) {
            this.addUser(1);
          }

          // move to page
          const ngZone = this.injector.get(NgZone);

          ngZone.run(() => {
            this.router.navigate(['../home'], { skipLocationChange: true })
          });
        })
      })
  }

}
