import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, verifyPasswordResetCode } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginSubscription!: Subscription;
  public loginForm!: FormGroup;
  public errorPassword = { 'border': '1px solid #dfdeee' };
  public errorEmail = { 'border': '1px solid #dfdeee' };

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private authService: LoginService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initLogin()
  }

  initLogin() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.firestore, 'users', credential.user.uid)).subscribe(user => {
      localStorage.setItem('users', JSON.stringify(user));
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin'])
        this.authService.$checkLogin.next(false)
      }
    })
  }
  loginUser() {
    const { email, password } = this.loginForm.value;
    this.login(email, password).then(() => {
      this.toast.success('login successfully')
      this.errorPassword = { 'border': '1px solid #dfdeee' };
      this.errorEmail = { 'border': '1px solid #dfdeee' };
    }).catch(err => {
      if (err.code as string == 'auth/invalid-email') {
        this.toast.error('Incorect Email')
        this.errorEmail = { 'border': '1px solid red' };
      }
      if (err.code as string == 'auth/wrong-password') {
        this.toast.error('Invalid Email or Password');
        this.errorPassword = { 'border': '1px solid red' };
        this.errorEmail = { 'border': '1px solid red' };
      }
      if (err.code as string == 'auth/user-not-found') {
        this.toast.error('User Not Found');
      }

    })

  }
  ngOnDestroy() {
    this.loginSubscription.unsubscribe()
  }
}
