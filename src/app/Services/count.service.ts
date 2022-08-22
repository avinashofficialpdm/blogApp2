import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  //creating a behavior subject with initial value 0 
  public countSubject = new BehaviorSubject<number>(0)
  
  //creating a behavior subject with initial value 0 
  public userCountSubject = new BehaviorSubject<number>(0)


  constructor() {}
  ngOnInit() {}

  // update function for blogsCount
  updateCount(data: number):void {
    this.countSubject.next(data)
  }

  // update function for userCount
  updateUserCount(data: number) :void{
    this.userCountSubject.next(data)
  }

}
