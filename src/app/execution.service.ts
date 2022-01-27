import { Injectable } from '@angular/core';
import { InterfaceSelectionService } from './interface-selection.service';
import { OutputService } from './output.service';
import * as babelParser from "@babel/types"

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  parameters : { name: string; value: string|undefined; }[] = [];

  applyParameters(parameters: { name: string; value: string|undefined; }[]) {
    this.parameters = parameters;
  }

  connectionString:string = "";
  SetConnectionString(connectionString:string)
  {
    this.connectionString = connectionString;
  }

  Connect()
  {
    this.outputService.Output("connect to " + this.connectionString);
  }

  Execute() {
    if (this.interfaceSelection.methodSelected == undefined)
    {
      this.outputService.Output("no method selected");
      return;
    }
    
   
      var output = "method " +
    this.interfaceSelection.interfaceSelected?.name + '.' + 
    (this.interfaceSelection.methodSelected?.key as babelParser.Identifier)?.name
    + '(';
    
    var isFirstParameter = true;
    for (var p in this.parameters)
    {
      if (isFirstParameter == false)
      {
        output += ', '
      }

      output += this.parameters[p].value;

      if (isFirstParameter != false)
        isFirstParameter = false;
    }

    output += ')'
    + " called";

    this.outputService.Output(output);

    this.rpc((this.interfaceSelection.methodSelected?.key as babelParser.Identifier)?.name).then( value => {
      this.outputService.Output("return" + value);
    })
  }

  constructor(private interfaceSelection:InterfaceSelectionService,
    private outputService:OutputService) { }

  rpc(method:string, ...params:any[]) : Promise<any>
  {
    

    return new Promise( (resolve, reject) => {
      resolve(1);
    });
  }
}
