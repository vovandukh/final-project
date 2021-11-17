import { Injectable, OnDestroy } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';
import { user } from 'rxfire/auth';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public loginSubscription!:Subscription;
  $checkLogin = new Subject<any>();
  constructor(private route: Router, private Auth: Auth, private firestore: Firestore, private router: Router, private toast: ToastrService) { }
  getUser(id: string) {
    return getDoc(doc(this.firestore, 'users', id))
  }

  logOut(): void {
    signOut(this.Auth).then(() => {
      localStorage.removeItem('users');
      this.router.navigate(['']);
      this.toast.success('logout successfully')
      this.$checkLogin.next(true)
    })
  }
}
