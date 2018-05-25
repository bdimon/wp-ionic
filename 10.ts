



getComments() {
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