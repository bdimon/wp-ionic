
1. private showMore: boolean=true;
2. private showMore: boolean=false;
3. private isLoading: boolean=false;


1. getComments() {
     let url:string='comments?_embed&post=' + this.post.id + 'per_page='+this.per_page+'&page='+this.page;
     url+=this.sort=='1'? '&order-asc': '';
    this.api.get(url)
    .subscribe((data:any) => {
      this.items = this.items.concat(data);
      this.page++;
      }, (error) => {
        if(error.error.code=='rest_error_no_more_pages') {
          this.showMore=false;
        }
        // console.log(showMore);
      }
    );
  }

2.getComments() {
     let url:string='comments?_embed&post=' + this.post.id + 'per_page='+this.per_page+'&page='+this.page;
     url+=this.sort=='1'? '&order-asc': '';
    this.api.get(url)
    .subscribe((data:any) => {
      this.items = this.items.concat(data);
      if(data.length===this.per_page) {
        this.page++;
        this.showMore=true;
      }
      
      }, (error) => {
        if(error.error.code=='rest_error_no_more_pages') {
          this.showMore=false;
        }
        // console.log(showMore);
      }
    );
  }

3.getComments() {
  if(!this.isLoading) {
    this.isLoading=true;

   let url:string='comments?_embed&post=' + this.post.id + 'per_page='+this.per_page+'&page='+this.page;
   url+=this.sort=='1'? '&order-asc': '';
  this.api.get(url)
  .subscribe((data:any) => {
    this.isLoading=false;
    this.items = this.items.concat(data);
    if(data.length===this.per_page) {
      this.page++;
      this.showMore=true;
      }
    }, (error) => {
      this.isLoading=false;
      if(error.error.code=='rest_error_no_more_pages') {
        this.showMore=false;
      }
    });
  }
}
4.getComments() {
  if(!this.isLoading) {
    this.isLoading=true;
    let url:string='comments?_embed&post=' + this.post.id + 'per_page='+this.per_page+'&page='+this.page;
    url+=this.sort=='1'? '&order-asc': '';
    this.api.get(url)
    .subscribe((data:any) => {
      this.isLoading=false;
      this.items = this.items.concat(data);
      if(data.length===this.per_page) {
        this.page++;
        this.showMore=true;
      }else {
        this.showMore=false;
      }
    }, (error) => {
      this.isLoading=false;
      if(error.error.code=='rest_error_no_more_pages') {
        this.showMore=false;
      }
    });
  }
}