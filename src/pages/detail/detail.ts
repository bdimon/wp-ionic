import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public post: any = [];
  public isLoading: boolean=false;
  public relatedItems: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
  }

  ionViewDidLoad() {
    this.getRelated();
  }
  getRelated() {
    if(!(this.isLoading)) {
      this.isLoading=true;
    this.api.get('posts?_embed&categories=' + this.post.categories[0])
    .subscribe((data:any) => {
      this.isLoading=false;
      this.relatedItems = data;

      }, (error) => {
      this.isLoading=false;
      });
    }
  }

 openDetail(item) {
  this.navCtrl.push(DetailPage, {post:item})
 }
}
