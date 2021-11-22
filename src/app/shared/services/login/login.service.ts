import { Injectable} from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { doc,  Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  $checkLogin = new Subject<any>();
  public loginSubscription!:Subscription;
  constructor(
    private Auth: Auth, 
    private firestore: Firestore, 
    private router: Router, 
    private toast: ToastrService
    ) { }
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
