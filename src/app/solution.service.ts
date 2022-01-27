import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InterfaceDefination } from './interface-defination';
import { InterfaceParserService } from './interface-parser.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  public  subjectInterfacesAdded = new Subject<InterfaceDefination>();

  interfaces = new Map<string, InterfaceDefination>();

  Add(input: string) {
    var interfaces = this.interfaceParser.Parse(input);
    interfaces.forEach( i => {
      this.interfaces.set(i.name, i);
      this.subjectInterfacesAdded.next(i);
    });
  }

  constructor(private interfaceParser: InterfaceParserService) { 
    
  }
}
