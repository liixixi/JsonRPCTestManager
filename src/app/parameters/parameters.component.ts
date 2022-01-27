import { Component, OnInit } from '@angular/core';
import { InterfaceSelectionService } from '../interface-selection.service';
import * as babelParser from "@babel/types"
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  constructor(private interfaceSelection:InterfaceSelectionService) {
    interfaceSelection.subjectMethodSelected.subscribe( f => {

      f.parameters.forEach (p => {
      

 
        this.parameters.push({ name: (p as babelParser.Identifier)?.name, value:""});


      })
    })
   }

  ngOnInit(): void {
  }

  parameters : {name:string, value:string}[] = [];

}
