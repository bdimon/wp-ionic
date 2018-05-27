import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';
import { DetailPage } from './../detail/detail';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public items: any = [];
  private per_page: number= 5;
  private page: number=1;
  private showMore:boolean = false;
  private isLoading:boolean = false;
  searchQuery:string='';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public api: ApiProvider) {
  }

  ionViewDidLoad() {
    
  }
  getPosts() {
    if(!(this.isLoading)&& this.searchQuery.length > 0) {
      this.isLoading=true;
    this.api.get('posts?_embed&per_page=' + this.per_page + '&page='+this.page+'&search='+this.searchQuery )
    .subscribe((data:any) => {
      this.isLoading=false;
      this.items = this.items.concat(data);
      if(data.length===this.per_page){
        this.showMore=true;
        this.page++;
      }else{
        this.showMore=false;
      }
    }, (error) => {
      this.isLoading=false;
      if(error.error.code==='rest_post_invalid_page_number') {
        this.showMore=false;
      }
      
      console.log(error);
    });
  }
  }
  onSearch() {
    this.items=[];
    this.getPosts();
    // console.log(this.searchQuery);
  }
  clearSearch() {
    this.searchQuery = '';
    this.items = [];
    this.page = 1;
    this.showMore = false;
  }
  openDetail(item) {
    this.navCtrl.push(DetailPage, {post:item})
   }

}
