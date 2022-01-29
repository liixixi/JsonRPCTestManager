import { Injectable } from '@angular/core';
import { InterfaceDefination } from './interface-defination';
import * as babelParser from '@babel/parser'
import * as babelType from "@babel/types"
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
      
      if (i.type == 'ExportNamedDeclaration' && i.declaration)
      {
        var interfaceDefination = new InterfaceDefination(i.declaration as babelType.TSInterfaceDeclaration);
        var hasMethod:boolean = false;
        interfaceDefination.declaration.body.body.forEach(j =>{
          if(!hasMethod && j.type == 'TSMethodSignature'){
            interfaces.push(interfaceDefination);
            hasMethod = true;
          }
        })
      }
    } )
    return interfaces;
  }

  constructor() { }
}
