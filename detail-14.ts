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
  public comments: any=[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public api: ApiProvider) {
    this.post = navParams.get('post');
    if(this.post["_embedded"].replies){
      this.comments = this.post["_embedded"].replies[0];
    }
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

  getComments() {
    return this.comments = this.api.getComments(this.post.id,this.page);

  }

  loadMoreComments(infiniteScroll) {
    if (this.post["_embedded"].replies){
    let page = Math.ceil((this.comments.length/10)) + 1;
    this.comments
    .subscribe(data => {
      for(let item of data){
        this.comments.push(item);
      }
      infiniteScroll.complete();
    }, err => {
      console.log(err);
      this.morePagesAvailable = false;
    })
   }
  }

 openDetail(item) {
  this.navCtrl.push(DetailPage, {post:item})
 }
}
