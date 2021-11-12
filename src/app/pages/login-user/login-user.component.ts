import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, setDoc, Firestore, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit ,OnDestroy {
  public container = {}
  public registerForm!:FormGroup;
  public authForm!:FormGroup;
  public loginSubscription!:Subscription;

  constructor(public authService : LoginService,private fb:FormBuilder,private auth:Auth,private firestore:Firestore,private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {
   this.initRegisterForm() 
   this.initAuthForm()
  }

  initAuthForm(){
    this.authForm = this.fb.group({
      email:[null,Validators.email],
      password:[null,Validators.required]
    })
  }

  initRegisterForm(){
    this.registerForm = this.fb.group({
      email:[null,Validators.email],
      password:[null,Validators.required]
    })
  }

  registerUser(){
  const {email,password} = this.registerForm.value;
     this.signUp(email,password).then(()=>{
      this.initRegisterForm();
      this.toast.success('Thanks for signing up');
      this.authService.$checkLogin.next(true)
     })
  }
  async signUp(email:string,password:string):Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth,email,password);
    const user = {
      email: credential.user.email,
      name: '',
      photoURL: null,
      phoneNumber: '',
      address: '',
      counry: '',
      city: '',
      orders: [],
      role: 'USER'
    }
    let data = await setDoc(doc(this.firestore, "users", credential.user.uid), user).then();
    this.authService.getUser(credential.user.uid).then(data=>{
      let user = {id:data.id,...data.data() }
      localStorage.setItem('user',JSON.stringify(user));
      this.router.navigate(['profile']);
    })
    return data;
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.firestore, 'users', credential.user.uid),{idField: "uid"}).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
       if(user && user.role === 'USER'){
        this.router.navigate(['profile']);
        this.authService.$checkLogin.next(true)
      }
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toast.success('User successfully login!');
    }).catch(err => {
      this.toast.error(err.message);
    });
  }



  signIn(status:boolean){
    if(status){
      this.container ={'right-panel-active': false}
    } else{
      this.container ={'right-panel-active': true}
    }
  }

  ngOnDestroy(){
    console.log(this.loginSubscription);
    
    // this.loginSubscription.unsubscribe()
  }
}
