import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Voucher } from './voucher.model';
import { catchError, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "http://localhost:3000/voucher";
  updateURL: string = "http://localhost:3000/update";
  selectedOption: any;
  isSelect = false;
  search: any;
  isSearch = false;
  sortBy = 'id';
  isSort = true;
  sort = false;

  constructor(private http: HttpClient) { }

  addVoucher(voucher: Voucher): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    return this.http.post('http://localhost:3000/voucher', JSON.stringify(voucher), { 'headers': headers })
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
  }

  // deleteVoucher(id:any): Observable<Voucher[]>{
  //   const headers = { 'content-type': 'application/json' };
  //   return this.http.delete<Voucher[]>('http://localhost:3000/voucher?ms=abc' , { headers })
  //   // return this.http.delete<void>(`${this._url}/${id}`)
  // }

  deleteVoucher(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`)
      .pipe(catchError((err) => {
        console.error(err);
        throw err;
      }));
  }


  updateVoucher(voucher: any, id: any) {
    const headers = { 'content-type': 'application/json' }
    return this.http.put(`${this.baseURL}/${id}`, voucher, { 'headers': headers })
      .pipe(catchError((err) => {

        console.error(err);
        throw err;
      }));
  }

  // updateTraveller(traveller: Traveller, id){
  //   return this.client.put(`${DATA_ACCESS_PREFIX}/${id}`, traveller);
  // }

  // params= new HttpParams()
  // .set('id',2)
  // .set('ms','abc');

  // getVoucher(){
  //   return this.http.get<Voucher[]>(this.baseURL).pipe(
  //               catchError((err) => {
  //                 console.error(err);
  //                 throw err;
  //               })
  //             );
  // }


  getVoucher(): Observable<Voucher[]> {
    if (this.isSelect == true) {
      if (this.selectedOption == "all") {
        return this.http.get<Voucher[]>(this.baseURL)
          .pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            })
          )
      } else {
        return this.http.get<Voucher[]>('http://localhost:3000/voucher?id=' + this.selectedOption)
          .pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            })
          )
      }

    }
    else if (this.isSearch == true) {
      return this.http.get<Voucher[]>('http://localhost:3000/voucher?q=' + this.search)
        .pipe(
          catchError((err) => {
            console.error(err);
            throw err;
          })
        )
    }
    else {
      if (this.sort == true) {
        // if (this.sortBy == "id") {
        //   return this.http.get<Voucher[]>('http://localhost:3000/voucher?_sort=id')
        //     .pipe(
        //       catchError((err) => {
        //         console.error(err);
        //         throw err;
        //       })
        //     )
        // } else {
        //   return this.http.get<Voucher[]>('http://localhost:3000/voucher?_sort=' + this.sortBy)
        //     .pipe(
        //       catchError((err) => {
        //         console.error(err);
        //         throw err;
        //       })
        //     )
        // }
        return this.http.get<Voucher[]>('http://localhost:3000/voucher?_sort=' + this.sortBy)
          .pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            })
          )
      }
      else {
        return this.http.get<Voucher[]>('http://localhost:3000/voucher?_sort=id')
          .pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            })
          )
      }
    }
  }



  //with query parameters
  // return this.http.get<Voucher[]>(this.baseURL + 'voucher',{ 'params': this.params })
  // .pipe(
  //   catchError((err)=>{
  //     console.error(err);
  //     throw err;
  //   })
  // )
}
