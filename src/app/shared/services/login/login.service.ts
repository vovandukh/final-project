import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  $checkLogin = new Subject<any>();
  constructor(private route: Router, private Auth: Auth, private firestore: Firestore,private router:Router,private toast:ToastrService) { }
  getUser(id: string) {
    return getDoc(doc(this.firestore, 'users', id))
  }

  faceBookAuth() {
    this.socialLoginUP(new FacebookAuthProvider())
  }

  googleAuth() {
    this.socialLoginUP(new GoogleAuthProvider())
  }
  socialLoginUP(provider: any) {
    const auth = getAuth()
    return signInWithPopup(auth, provider).then(result => {
      let user = {
        id: result.user.uid,
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
        localStorage.setItem('users', JSON.stringify(user.data()));
        this.route.navigate(['/profile']);
        this.$checkLogin.next(true);
        this.toast.success('Thanks for signing up');
      })
    })
  }

  logOut():void{
    signOut(this.Auth).then(() => {
      localStorage.removeItem('users');
      this.router.navigate(['']);
      this.toast.success('logout successfully')
      this.$checkLogin.next(true)
    })
  }
}
