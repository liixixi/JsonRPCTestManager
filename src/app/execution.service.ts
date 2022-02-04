import { Injectable } from '@angular/core';
import { InterfaceSelectionService } from './interface-selection.service';
import { OutputService } from './output.service';
import * as babelParser from "@babel/types"
import { Subject } from 'rxjs';

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

  autoTest(){
    //Demo: only works for pcdc.interface\getProductLifecycle
    
    //plan A: 
    // const catalogNumbers:string[] = ['1756-IB16','1756-L71','1715-AENTR','1769-L36ERM','1756-L85E'];
    // const autoTestValue:string[]=this.randomString(catalogNumbers);

    //plan B:
    const base: string='0123456789-qwertyuiopasdfghjklzxcvbnm';
    var autoTestValue: string[]=[];
    for(var i=0;i<Math.round(Math.random()*10);i++){
      const catalogNumber:string=this.randomString(base).join('');
      autoTestValue.push(catalogNumber);
    }

    this.parameters[0].value = '['+autoTestValue.toString()+']';
    this.subjectParamValue.next(this.parameters);
    this.Execute();
  }

  public subjectParamValue = new Subject<{ name: string; value: string|undefined; }[]>();

  randomString(baseString:string|string[]):string[]{
    const randomCount:number = Math.round(Math.random()*baseString.length);
    var result: string[]=[];
    if(randomCount>0){
      for(var i =0;i<randomCount;i++){
        var index:number = Math.floor(Math.random()*baseString.length);
        result.push(baseString[index]);
      }
    }
    return result;
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
