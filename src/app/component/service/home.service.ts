import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public markAsTouched(objectControl :any) {
    Object.keys(objectControl).forEach(controlName => {
        if (objectControl[controlName].hasOwnProperty('controls')) {
            this.markAsTouched(objectControl[controlName].controls);
        } else {
            objectControl[controlName].markAsTouched();
        }
    });
}

  constructor(private _http : HttpClient) { }

  addProduct(product: any) {
    return this._http.post("http://localhost:3000/posts",product) ;

  } 

  getallProduct() {
    return this._http.get("http://localhost:3000/posts") ;
  }

  updateProduct(product:any) {
    return this._http.put("http://localhost:3000/posts/" + product.id , product) ;
  }

  deleteProduct(product: any) {
    return this._http.delete("http://localhost:3000/posts/" + product.id , product) ;

  } 

}
