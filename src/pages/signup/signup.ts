import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { LoginPage } from "../login/login";
import { AngularFire } from "angularfire2";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: { email?: string, password?: string } = {};
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public af: AngularFire
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.af.auth.createUser({
        email: this.signup.email,
        password: this.signup.password
      }).then(() => {
        this.navCtrl.setRoot(LoginPage);
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
}