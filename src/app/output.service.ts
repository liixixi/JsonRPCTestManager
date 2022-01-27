import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  Output(text: string) {
    this.subjectOutput.next(text);
  }

  constructor() { }

  public  subjectOutput = new Subject<string>();
}
