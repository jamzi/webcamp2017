import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import { NgForm } from "@angular/forms";

import { HomePage } from "../home/home";
import { SignupPage } from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: { email?: string, password?: string } = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public af: AngularFire) { }

  onLoginEmailPassword(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.af.auth.login({
        email: this.login.email,
        password: this.login.password
      },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(() => {
          this.navCtrl.setRoot(HomePage);
        }).catch((err) => {
          let toast = this.toastCtrl.create({
            message: err.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
