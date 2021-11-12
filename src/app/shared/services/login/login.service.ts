import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  $checkLogin = new Subject<boolean>()

  constructor(private route: Router, private Auth: Auth, private firestore: Firestore,private router:Router) { }
  getUser(id: string) {
    return getDoc(doc(this.firestore, 'users', id))
  }

  faceBookAuth() {
    this.socialLogin(new FacebookAuthProvider())
  }

  googleAuth() {
    this.socialLogin(new GoogleAuthProvider())
  }
  socialLogin(provider: any) {
    const auth = getAuth()
    return signInWithPopup(auth, provider).then(result => {
      let user = {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        phoneNumber: '',
        address: '',
        counry: '',
        city: '',
        orders: [],
        role: 'USER'
      }
      setDoc(doc(this.firestore, "users", result.user.uid), user);
      this.getUser(result.user.uid).then(user => {
        localStorage.setItem('user', JSON.stringify(user.data()));
        this.route.navigate(['/profile']);
        this.$checkLogin.next(true);
      })
    })
  }

  // logOut():void{
  //   signOut(this.Auth).then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['']);
  //     this.$checkLogin.next(false)
  //   })
  // }
}
