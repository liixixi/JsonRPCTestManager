import { Injectable } from '@angular/core';
import { TSMethodSignature } from '@babel/types';
import { Subject } from 'rxjs';
import { InterfaceDefination } from './interface-defination';

@Injectable({
  providedIn: 'root'
})
export class InterfaceSelectionService {

  interfaceSelected : InterfaceDefination | undefined;
  methodSelected : TSMethodSignature | undefined;

  public  subjectInterfacesSelected = new Subject<InterfaceDefination>();
  public  subjectMethodSelected = new Subject<TSMethodSignature>();

  select(i: InterfaceDefination, f: TSMethodSignature) {

    this.interfaceSelected = i;
    this.methodSelected = f;

    this.subjectInterfacesSelected.next(i);
    this.subjectMethodSelected.next(f);
  }

  constructor() { }
}
