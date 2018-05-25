ionViewDidLoad() {
  this.getRelated();
}

public relatedItems: any = [];
getRelated() {
  if(!this.isLoading) {
    this.isLoading=true;
    let url:string='posts?_embed&categories='+this.post.categories[0];
    this.api.get(url)
    .subscribe((data:any) => {
      this.isLoading=false;
      this.relatedItems = data;
    }, (error) => {
      this.isLoading=false;
    });
  }
}