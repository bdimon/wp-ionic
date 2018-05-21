import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ApiProvider } from './../providers/api/api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

    constructor(public platform: Platform,
       public statusBar: StatusBar,
        public splashScreen: SplashScreen,
      public api: ApiProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.api.getCategories();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(cat_id: number) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage, {cat_id: cat_id});
  }
}
