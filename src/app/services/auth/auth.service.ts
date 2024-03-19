import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import {ApiService} from '../api/api.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _uid = new BehaviorSubject<any>(null);
  currentuser: any;
  constructor(public fireAuth: Auth , public ApiService:ApiService) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(
        this.fireAuth,
        email,
        password
      );
      console.log(response);
      if (response.user) {
        this.setUserdata(response.user.uid);
      }
    } catch (e) {
      console.log('error in logging in');
    }
  }

  getId(){
    const auth = getAuth();
    this.currentuser = auth.currentUser;
    return this.currentuser?.uid;
  }
  setUserdata(uid: string){
    this._uid.next(uid);
  }

  randomIntFromInterval(min,max){
return Math.floor(Math.random()*(max-min+1)+min);
  }

async register(formvalue:any){
 try{
  const registerUser = await createUserWithEmailAndPassword(this.fireAuth, formvalue.email , formvalue.password)

const data = {
  email:formvalue.email,
  name: formvalue.username,
  uid: registerUser.user.uid,
  photo:'https://i.pravatar.cc/' + this.randomIntFromInterval(200,400)
};
await this.ApiService.setDocument(`users/${registerUser.user.uid}`, data);
const userdata = {
  id: registerUser.user.uid
};
return userdata

 }catch(err){console.log("Error while submitting")}
}

async logout(){
  try{
    await this.fireAuth.signOut();
    this._uid.next(null);
    return null;
    }catch(error){ console.log('Logout failed',)}
}

checkAuth():Promise<any>{
  return new Promise((resolve,reject)=>{
    onAuthStateChanged(this.fireAuth,user=>{
      console.log('auth user',user);
      resolve(user);
    })
  })
}

async getUserData(id) {
  const docSnap: any = await this.ApiService.getDocById(`users/${id}`);
    if(docSnap?.exists()) {
      return docSnap.data();
    } else {
      throw('No such document exists');
    }
}

}
