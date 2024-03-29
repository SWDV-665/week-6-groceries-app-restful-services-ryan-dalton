import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs'

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GroceriesServiceProvider {

    items: any = [];

    dataChanged$: Observable<boolean>;

    private dataChangeSubject: Subject<boolean>;

    baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('GroceriesServiceProvider Provider Started');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
    getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(id){
    console.log("#### Remove Item - id = ", id);
    this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe( res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  //shareItem(index){
  // this.items.splice(index, 1);
 // }

  addItem(item) {
      this.http.post(this.baseURL + "/api/groceries", item).subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }
  
  editItem(item, index) {
    console.log("Edited item = ", index, item);
    this.http.put(this.baseURL + "/api/groceries/" + item._id, item).subscribe( res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
    }

  }



