import { Component, OnInit } from '@angular/core';
import { InterfaceDefination } from '../interface-defination';
import { SolutionService } from '../solution.service';
import * as babelParser from "@babel/types"
import {InterfaceSelectionService} from '../interface-selection.service'

@Component({
  selector: 'app-interface-explorer',
  templateUrl: './interface-explorer.component.html',
  styleUrls: ['./interface-explorer.component.css']
})
export class InterfaceExplorerComponent implements OnInit {

  constructor(private solutionService : SolutionService,
    private selection:InterfaceSelectionService) { 
    solutionService.subjectInterfacesAdded.subscribe( i => {
      this.interfaces.push(i);
    })
  }

  ngOnInit(): void {
  }

  interfaces: InterfaceDefination[] = [];

  OnMethodSelected(i:InterfaceDefination, f:babelParser.TSMethodSignature)
  {
    this.selection.select(i,f);
  }
}
