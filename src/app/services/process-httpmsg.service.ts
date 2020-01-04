import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http'
 
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  handleError (errorResponse:HttpErrorResponse | any){
    let errMsg:string;
    if(errorResponse.error instanceof ErrorEvent){
        // A client-side or network error occurred. Handle it accordingly.
      errMsg=errorResponse.error.message;
    }else{
       // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
      errMsg=`${errorResponse.status} - ${errorResponse.statusText || ''} ${errorResponse.error}` 
    }

    return throwError(errMsg);
  }

}
