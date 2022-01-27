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
    var input = "interface test{ f1(a:number):Promise<number>; f2(a:number, b:string):Promise<string>; a:number;};";
    this.solutionService.Add(input);
  }

  OnRun()
  {
    this.executionService.Execute();
  }

  OnConnect()
  {
    this.executionService.Connect();
  }
}
