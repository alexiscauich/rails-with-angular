import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public apiService: ApiService , public router : Router) {}

  public columns = ['id','name'];
  public rows : Array<Product>;

ngOnInit() {
    this.apiService.get("products").subscribe((data : Product[])=>{
    console.log(data);
    this.rows = data;
  });
}
public delete(id:string){

    console.log("delete : " + id);
    var path = 'products/' + id;
    this.apiService.delete(path).subscribe((r)=>{

    this.rows = this.rows.filter((p,i)=>{
      if(Number(id) === p.id )
        {
          return false;
        }
        return true;
    },this.rows)

    });

}
public update(id:string){
    console.log("update : " + id );
    this.router.navigateByUrl('/products/add/' + id);
}

}
