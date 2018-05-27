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
  private isLoading: boolean=false;
  public comments: any=[];
  public page:number = 1;
  private sort:string='1';
  public showMore: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {
    this.post = navParams.get('post');
    }
    
  ionViewWillEnter() {
    this.getStatus();
    this.getHeaders();
    }

   changeSort() {
    console.log(this.sort);
      this.comments=[];
      this.page=1;
      this.getHeaders();
    }

    getStatus() {
      let url:string='comments?_envelope&post=' + this.post.id;
      this.api.get(url).subscribe((resp:any) => {
      if (resp.status==200) {
        // return commentsCount = resp.headers['X-WP-Total'];
        console.log(resp.headers['X-WP-Total']);
        console.log(resp.headers['X-WP-TotalPages']);
      }
    });
  }

   getHeaders(infiniteScroll=null) {
    this.showMore = true;
    if(!this.isLoading){
      this.isLoading = true;
      let url:string='comments?_embed&page='+this.page + '&post=' + this.post.id;
    url += this.sort=='1'? '&order=asc#': '#';
    console.log(url);
    this.api.get(url).
    subscribe((resp:any) => {
      this.isLoading = false;
      this.comments = this.comments.concat(resp);
      this.page++;
      if (this.comments.length == this.commentsCount){
            this.showMore = false;
            
            return ;            
            }
            else {
            this.showMore = true;
          }
          if (infiniteScroll!=null){
            infiniteScroll.complete();
          }
      
    }, (error) => {
      this.isLoading = false;
      this.showMore = false;
      console.log('error');
    });
  }
  }
}
