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
  public reply:any=[];
  public postid: number;
  public per_page:number = 50;
  public page:number = 1;
  //  a_name:string='';
  //  a_url:string='';
  //  r_content:any [];
  //  r_data: string='';
  //  com_count:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    console.log(this.post.id);
    // if(this.post["_embedded"].replies){
      // console.log(this.post["_embedded"].replies);
      // this.comments=this.post["_embedded"].replies[0];
      // console.log(this.post["_embedded"].replies[0]);
    }
    // this.comments=this.api.getComments(this.post.id);
    // (this.comments);
    
  

  ionViewDidLoad() {
    // this.comments=this.api.getComments(this.post.id);
    
    this.getComments();
    // this.getRelated();
  }
  // getRelated() {
  //   if(!(this.isLoading)) {
  //     this.isLoading=true;
  //   this.api.get('posts?_embed&categories=' + this.post.categories[0])
  //   .subscribe((data:any) => {
  //     this.isLoading=false;
  //     this.relatedItems = data;

  //     }, (error) => {
  //     this.isLoading=false;
  //     });
  //   }
  // }
  // getComment(postid) {
  //   // console.log(this.api.getComments(postid));
  //   return this.comments =this.api.getComments(postid)
  // }
      
      // data.forEach(element => {
      //  return element.author_name,
      //   element.date,
      //   element.content.rendered,
      //   element.author_avatar_urls[48],
      //   data.length;
  // }
  getComments(infiniteScroll=null) {
    if(!(this.isLoading)) {
      this.isLoading=true;
    
      if(infiniteScroll!=null && infiniteScroll.ionRefresh) {
        this.page=1;
      }
      let url:string='comments?_embed&post=' + this.post.id + '&page='+this.page;
      this.api.get(url)
      // console.log(this.api.get(url));
    .subscribe((data:any) => {
      this.isLoading=false;
      this.comments = this.comments.concat(data);
      if(data.length==this.per_page){
        this.page++;
        // return this.comments;
        // this.showLoadMore=true;
      }
    
      else{
      //   this.showLoadMore=false;
      // }
      if(infiniteScroll!=null){
        infiniteScroll.complete();
      }
      }; 
    }, (error) => {
      this.isLoading=false;
      if(infiniteScroll!=null){
        infiniteScroll.complete();
      // if(error.error.code==='rest_post_invalid_page_number') {
      //   this.showLoadMore=false;
      }
      
      console.log(error);
    });
  }
} 
    
  

 openDetail(item) {
  this.navCtrl.push(DetailPage, {post:item})
 }
}
