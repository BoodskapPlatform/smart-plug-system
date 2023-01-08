import { UserDataService } from './../services/userdata.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
class Post {
  constructor(public status: Boolean, public result: any) {}
}

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  private API_BASE_PATH = environment.api_base_path;
  private httpOptions:any;
  private atoken:string = "";

  constructor(private http: HttpClient, private _userDataService: UserDataService) {

    this._userDataService.userDataChange$.subscribe(value => {
      this.atoken = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.atoken
        })
      };
    });
  }

  //=========================================
  //Get Request
  //=========================================
  getCall(url: String): Observable<any> {
    return this.http
      .get<Post[]>(this.API_BASE_PATH + url)
      .pipe(retry(1), catchError(this.handleError));
  }


  //=========================================
  //Post Request
  //=========================================
  postCall(url: String, req_data:any): Observable<any> {
    return this.http
      .post<any>(this.API_BASE_PATH + url, req_data)
      .pipe(retry(1), catchError(this.handleError));
  }


  //=========================================
  //Put Request
  //=========================================
  putCall(url: String, req_data:any): Observable<any> {
    return this.http
      .put<any>(this.API_BASE_PATH + url, req_data)
      .pipe(retry(1), catchError(this.handleError));
  }


  //=========================================
  //Delete Request
  //=========================================
  deleteCall(url: String): Observable<any> {
    return this.http
      .delete<any>(this.API_BASE_PATH + url)
      .pipe(retry(1), catchError(this.handleError));
  }


  //=========================================
  //Error Handler
  //=========================================
  public handleError(error: HttpErrorResponse) {
    
    let errorMessage = {
        "status" : false,
        "status_code" : error.status,
        "message" : error.error
      };

    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


  //=========================================
  //Boodskap : Domain Login 
  //=========================================
  public loginAPI(req_data:any): Observable<any> {
    return this.http
      .post<any>(this.API_BASE_PATH + `/domain/login`, req_data)
      .pipe(retry(1), catchError(this.handleError));
  }

  //=========================================
  //Boodskap : Micro API 
  //=========================================
  public microAPI(slug:string, api:string, method:string, data:any, key:string, token:string, obj:any): Observable<any> {

    let headers:any = {};
    
    if(obj.authType == 'TOKEN'){
        headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'TOKEN': token
        });
    }else if(obj.authType == 'KEY'){
        headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'TOKEN': key
        });
    }

    return this.http
      .post<any>(this.API_BASE_PATH + `/micro/service/call/${method}/${slug}/${api}`, data, {
        headers : headers
      }).pipe(retry(1), catchError(this.handleError));
  }
}