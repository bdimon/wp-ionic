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
  public items: any =[];
  public post: any = [];
  public isLoading: boolean=false;
  // public relatedItems: any=[];
  public comments: any=[];
  // public postid: number;
  public per_page:number = 5;
  public page:number = 1;
  private sort:string='1';
  public commentsCount:number=0;
  // public showMore: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    }
    
  ionViewWillEnter() {
    // this.getPost();
        
    // this.getComments();
    
  }

//   getPost() {
          
//       let url:string='posts?_embed&post='+this.post.id;
//       this.api.get(url)
//     .subscribe((data:any) => {
//        this.items = data;
      
//     }, (error) => {
//       this.isLoading=false;
      
//     });
// }
  
  getComments(infiniteScroll=null) {
    if(!this.isLoading) {
      this.isLoading=true;
      if(infiniteScroll!=null && infiniteScroll.ionRefresh) {
        this.page;
      }    
      let url:string='comments?_embed&post=' + this.post.id + '&per_page=' + this.per_page + '&page='+ this.page;
      url += this.sort=='1'? '&order=asc': '';
      this.api.get(url)
      .subscribe((data:any) => {
      this.isLoading=false;
      this.comments = infiniteScroll!=null && infiniteScroll.ionRefresh ? data: this.comments.concat(data);
      if(data.length===this.per_page){
        this.page++;
        }
      if(infiniteScroll!=null){
        infiniteScroll.complete();
        }
      },(error) => {
        this.isLoading=false;
        if(infiniteScroll!=null){
          infiniteScroll.complete();
        }
      });
    }
  }

  changeSort() {
    console.log(this.sort);
    this.comments=[];
    this.page=1;
    // this.showMore=false;
    this.getComments();
  }

//  openDetail(item) {
//    this.navCtrl.push(DetailPage, {post:item});
//   }
}
