import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc } from '@firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy {
  public loginSubscription!: Subscription;
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initLogin()
  }

  initLogin() {
    this.loginForm = this.fb.group({
      email: null,
      password: null
    })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.firestore, 'users', credential.user.uid)).subscribe(user => {
      localStorage.setItem('users', JSON.stringify(user));
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      }
    })
  }
  loginUser() {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => {
      alert('login successfully')
    }).catch(err => {
      alert(err)
    })
  }
  ngOnDestroy(){
    this.loginSubscription.unsubscribe()
  }
}
