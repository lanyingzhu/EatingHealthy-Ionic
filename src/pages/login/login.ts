import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  
  async login(user: User) {
    try{
        const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        console.log(result);
        if(result) {
            this.navCtrl.setRoot(HomePage);
        
        }
       
    }
    catch(e) {
        console.error(e);
    }
  }
  
  openRegister() {
  
        this.navCtrl.push(RegisterPage);
  }
}
