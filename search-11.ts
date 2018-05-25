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
  searchQuery: string='';
  public items: any = [];
  private per_page: number= 8;
  private page: number=1;
  private More: boolean = false;
  private isLoading: boolean = false;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public api: ApiProvider) {
  }

  ionViewDidLoad() {
    
  }

  onSearch() {
    this.items = [];
    this.getPosts();
  }

  getPosts() {
  if(!(this.isLoading) && this.searchQuery.length > 0) {
    this.isLoading = true;
    this.api.get('posts?_embed&per_page=' + this.per_page + '&page=' + this.page + '&search=' + this.searchQuery)
      .subscribe((data:any) => {
        this.isLoading = false;
        this.items = this.items.concat(data);
        if(data.length === this.per_page){
          this.showMore = true;
          this.page++;
        }else{
          this.showMore = false;
        }
      }, (error) => {
        this.isLoading = false;
        if(error.error.code ==='rest_post_invalid_page_number') {
          this.showMore = false;
        }
      });
    }
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
