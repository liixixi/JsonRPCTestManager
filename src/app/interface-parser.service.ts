import { Injectable } from '@angular/core';
import { InterfaceDefination } from './interface-defination';
import * as babelParser from '@babel/parser'
@Injectable({
  providedIn: 'root'
})
export class InterfaceParserService {
  Parse(input: string) :InterfaceDefination[]{
    var ret= babelParser.parse(input, {
      // parse in strict mode and allow module declarations
      sourceType: "module",
    
      plugins: [
        
        "typescript",
      ],
    });
    console.log(ret);
    var interfaces : InterfaceDefination[]  = [];
    ret.program.body.forEach( i => {
      if (i.type == 'TSInterfaceDeclaration')
      {
        var interfaceDefination = new InterfaceDefination(i);
        interfaces.push(interfaceDefination);
      }
    } )
    return interfaces;
  }

  constructor() { }
}
