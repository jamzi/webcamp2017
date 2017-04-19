import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFire } from "angularfire2";
import firebase from 'firebase';

import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser: any;
  imageDataUrl = ' safsaf';
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public af: AngularFire) {
    this.currentUser = firebase.auth().currentUser;
  }

  onTakeAndUploadPicture() {
    const cameraOptions: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      let imageDataUrl: string = 'data:image/jpeg;base64,' + imageData;

      let storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.currentUser.uid}/profile.jpg`);

      imageRef.putString(imageDataUrl, firebase.storage.StringFormat.DATA_URL).then((savedPicture) => {
        this.currentUser.updateProfile({
          photoURL: savedPicture.downloadURL
        }).then((response) => {
          this.navCtrl.setRoot(HomePage);
        }, function (error) {
          console.log(error);
        });
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  onLogout() {
    this.af.auth.logout().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
