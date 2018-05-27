import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
// import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';


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
  // public relatedItems: any=[];
  public comments: any=[];
  public page:number = 1;
  // private sort:string='1';
  public showMore: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    // console.log(this.post);
    // this.getPost();
    // this.api.getComments(this.post.id, this.page, this.sort);
    }
    
  ionViewDidLoad() {
    this.getHeaders();
    do {
      this.getMoreComments();
      
    }
    while(this.comments.length < this.commentsCount);
   }

  getPost() {
      let url:string='posts?_embed&post='+this.post.id;
      this.api.get(url)
    .subscribe((data:any) => {
       this.items = data;
      }, (error) => {
        this.isLoading=false;
    });
  }

  getHeaders() {
    this.showMore = true;
    let url:string='comments?_envelope&page='+this.page + '&post=' + this.post.id + '&order=asc';
    return this.api.get(url).
    subscribe((data:any) => {
      this.commentsCount = data.headers['X-WP-Total'];
      // console.log(this.countComments);

    }, (error) => {
      console.log('error');
    });
  }

  getMoreComments() {
    // let page = (this.comments.length%10);
    this.showMore = true;
    console.log(this.showMore);
    let url:string='comments?_embed&page='+this.page + '&post=' + this.post.id + '&order=asc';
    this.api.get(url).
    subscribe((data:any) => {
     this.comments  = this.comments.concat(data);
     console.log(this.commentsCount);
    //  this.comments.length = this.comments.length - 10;
     console.log(this.comments.length);
     this.page++;
     if(this.comments.length == this.commentsCount){this.showMore = false;
      return ;
    }}, (error) => {
      console.log('error');
    });
  }
}
