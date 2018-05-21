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
  public comment: any=[];
  public reply:any=[];
  public post_id: number;
  //  a_name:string='';
  //  a_url:string='';
  //  r_content:any [];
  //  r_data: string='';
  //  com_count:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    console.log(this.post.id);
  }

  ionViewDidLoad() {
    this.getComment();
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
  getComment() {
    
    this.api.get('comments?post='+ this.post.id)
    .subscribe((data:any) => {
      if(data.length==0) {
        return;
      }
      data.forEach(element => {
       return element.author_name,
        element.date,
        element.content.rendered,
        element.author_avatar_urls[48],
        data.length;
      });
      

      

    });
  }

 openDetail(item) {
  this.navCtrl.push(DetailPage, {post:item})
 }
}
