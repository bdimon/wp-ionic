import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';


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
  public items: any =[];
  public post: any = [];
  public commentsCount: number;
  public isLoading: boolean=false;
  public comments: any=[];
  public page:number=1;
  public sort:string='1';
  public showMore: boolean = false;
  public pages: number=1;
  public count:number=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    
    }
    
  ionViewDidLoad() {
    this.getComments();
    }

 
  getComments(infiniteScroll = null) {
    this.showMore = true;
    if(!this.isLoading) {
      this.isLoading= true;
    let url:string = 'comments?_envelope&post='+this.post.id+'&page='+this.page+'&order=asc';
    this.api.get(url)
    .subscribe((resp:any) => {
      if(resp.body.length==0) {
        this.isLoading=false;
        if(infiniteScroll != null) {
          infiniteScroll.complete();
          this.showMore = false;
          return;
        }
      }
      this.isLoading=false;
      this.comments = this.comments.concat(resp.body);
      this.page++;
      if(infiniteScroll != null){
         infiniteScroll.complete()
        }
      }, (error) => {
        if(infiniteScroll != null){
          infiniteScroll.complete();
        }
      this.isLoading=false;
      });
    } 
  }
}  

