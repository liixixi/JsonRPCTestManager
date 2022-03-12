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
        this.parameters.push({ name: (p as babelParser.Identifier)?.name, value:undefined, isArray:this.isArray((p.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation)});
      })

      this.executionService.applyParameters(this.parameters);
    })
    executionService.subjectParamValue.subscribe(p=>{
      this.parameters = p;
    })
   }

  ngOnInit(): void {
  }

  parameters : {name:string, value:string|undefined, isArray:boolean|undefined}[] = [];

  OnUpdate()
  {
    this.executionService.applyParameters(this.parameters);
  }

  isArray(type:babelParser.TSType): boolean {
    switch(type.type){
      case "TSArrayType": return true;
      default: return false;
    }
  }

}
