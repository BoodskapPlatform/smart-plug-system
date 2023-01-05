import { DomainModel } from 'src/app/models/DomainModel';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserDataService {

    private execChangeSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("userObj")  || '{}'));
    userDataChange$ : Observable<any> = this.execChangeSubject.asObservable();

    constructor() {}

    userDataChange(data:any) {
        localStorage.setItem("userObj", JSON.stringify(data));  
        this.execChangeSubject.next(data);
    }
}