import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AsianPage } from '../pages/asian/asian';
import { AmericaPage } from '../pages/america/america';
import { EuropePage } from '../pages/europe/europe';
import { RecipeDetailPage } from '../pages/recipe-detail/recipe-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RecipesService } from '../providers/recipes-service';
import { AuthService } from '../providers/auth-service';
import { AngularFireModule } from'angularfire2';
        
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AsianPage,
    AmericaPage,
    EuropePage,
    RecipeDetailPage,
    LoginPage,
    RegisterPage

    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AsianPage,
    AmericaPage,
    EuropePage,
    RecipeDetailPage,
    LoginPage,
    RegisterPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
