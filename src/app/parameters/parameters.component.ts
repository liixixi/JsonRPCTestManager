import { Component, OnInit } from '@angular/core';
import { InterfaceSelectionService } from '../interface-selection.service';
import * as babelParser from "@babel/types"
import { ExecutionService } from '../execution.service';
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  constructor(private interfaceSelection:InterfaceSelectionService,
    private executionService:ExecutionService) {
    interfaceSelection.subjectMethodSelected.subscribe( f => {
      this.parameters = [];
      
      f.parameters.forEach (p => {
        this.parameters.push({ name: (p as babelParser.Identifier)?.name, value:undefined});
      })

      this.executionService.applyParameters(this.parameters);
    })
   }

  ngOnInit(): void {
  }

  parameters : {name:string, value:string|undefined}[] = [];

  OnUpdate()
  {
    this.executionService.applyParameters(this.parameters);
  }
}
