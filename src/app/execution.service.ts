import { Injectable } from '@angular/core';
import { InterfaceSelectionService } from './interface-selection.service';
import { OutputService } from './output.service';
import * as babelParser from "@babel/types"
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  parameters : { name: string; value: string|undefined; isArray:boolean|undefined;}[] = [];

  applyParameters(parameters: { name: string; value: string|undefined; isArray:boolean|undefined;}[]) {
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
    //Demo: only works for pcdc.interface
    
    var data: {[index:string]:string[]} = {
      'catalogNumbers':['1756-IB16','1756-L71','1715-AENTR','1769-L36ERM','1756-L85E'],
      'productName':['1756-IB16','1756-L71','1715-AENTR','1769-L36ERM','1756-L85E'],
      'includeDescInSearch':['true','false'],
      'limitSearchToCipProducts':['true','false'],
      'productIds':['1756-IB16','1756-L71','1715-AENTR','1769-L36ERM','1756-L85E'],
      'versionIds':['1756-IB16','1756-L71','1715-AENTR','1769-L36ERM','1756-L85E'],
      'sdrsIDs':[''],
      'language':[''],
      'sessionID': [''],
      'eulaAcceptance': ['true','false'],
      'eulaAnswers':['']
    };
    var autoTestValue:string|string[];
    var randomCount:number=1;

    for(var p in this.parameters){
      if(this.parameters[p].isArray){
        randomCount= Math.round(Math.random()*data[this.parameters[p].name].length);
      }
      autoTestValue=this.randomString(data[this.parameters[p].name],randomCount);
      if(this.parameters[p].isArray){
        this.parameters[p].value = '['+autoTestValue.toString()+']';
      }
      else{
        this.parameters[p].value = autoTestValue.toString();
      }
    }
    this.subjectParamValue.next(this.parameters);
    this.Execute();
  }

  public subjectParamValue = new Subject<{ name: string; value: string|undefined; isArray:boolean|undefined; }[]>();

  randomString(baseString:string|string[],randomCount:number):string[]{
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
