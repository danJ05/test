import { Injectable, inject } from "@angular/core";
import { Observable, from } from "rxjs";
import { CommonApiService } from "src/app/core/common/common-api.service";
import {
  ResetPasswordData,
  SignInData,
} from "src/app/core/entities/user-model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private afAuth = inject(AngularFireAuth);
  private router = inject(Router);
  
  signIn(data: SignInData): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(data.email, data.password));
  }

  resetPassword(data: ResetPasswordData): Observable<any> {
    return from(this.afAuth.sendPasswordResetEmail(data.email));
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/auth/sign-in']);
  }

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
}
