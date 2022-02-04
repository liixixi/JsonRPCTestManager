import { Component, OnInit } from '@angular/core';
import { ExecutionService } from '../execution.service';
import { OutputService } from '../output.service';
import { SolutionService } from '../solution.service';

interface test{ f1(a:number):Promise<number>; f2(a:number, b:string):Promise<string>;  };

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private solutionService: SolutionService,
    private outputService:OutputService,
    private executionService:ExecutionService) { }

  ngOnInit(): void {
  }

  on_MenuOpen()
  {
    var input = "interface test{ f1(a:number):Promise<number>; f3(a:number, b:number,c:string):Promise<{a:number, b:string}>; f2(a:number, b:string):Promise<string>; a:number;};";
    document.querySelector('input')?.click();
    

    
  }

  OpenFile(e:any)
  {
    const reader = new FileReader();
    reader.onload = (e:ProgressEvent<FileReader>) => {
      if (e.target?.result)
        this.solutionService.Add(e.target?.result as string);
    }

    reader.readAsText(e?.target.files[0]);
  }

  OnRun()
  {
    this.executionService.Execute();
  }

  OnConnect()
  {
    this.executionService.Connect();
  }
  
  LoadConnector()
  {
    var code = "function init() { console.log('init') } function call() { console.log('call') } function __init(){  return { init: init, call: call } } __init();";
    var connector = eval(code);
    console.log(connector);
    connector.init();
    connector.call();
  }

  onAutoTest(){
    this.executionService.autoTest();
  }
}
