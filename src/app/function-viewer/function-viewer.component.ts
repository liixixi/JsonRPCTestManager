import * as babelParser from "@babel/types"
import { Component, OnInit } from '@angular/core';
import { InterfaceSelectionService } from '../interface-selection.service';

@Component({
  selector: 'app-function-viewer',
  templateUrl: './function-viewer.component.html',
  styleUrls: ['./function-viewer.component.css']
})
export class FunctionViewerComponent implements OnInit {

  constructor(private selection:InterfaceSelectionService) {
    selection.subjectInterfacesSelected.subscribe( i => {
      console.log("interface selected")
      console.log(i);
    })

    selection.subjectMethodSelected.subscribe(f => {
      console.log("method selected")
      console.log(f);

      this.functionContent = "";
      this.functionContent = (f.key as babelParser.Identifier)?.name;
      this.functionContent += '( '

      var firstParameter = true;
      f.parameters.forEach (p => {
        if (firstParameter == false)
          this.functionContent += ', '

        this.functionContent += (p as babelParser.Identifier)?.name;
        this.functionContent += ' : '
        this.functionContent += 
          (p.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation.type == "TSNumberKeyword" ? 'number'
          :(p.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation.type == "TSStringKeyword" ? 'string'
          : '';

          if (firstParameter != false)
          firstParameter = false;

      })
      this.functionContent += ' ) : '

      this.functionContent += (f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation.type == "TSTypeReference"?
        (((f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation as babelParser.TSTypeReference)?.typeName as babelParser.Identifier).name: "";
      this.functionContent += '<';
      ((f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation as babelParser.TSTypeReference)?.typeParameters?.params.forEach(t => {
        this.functionContent += t.type == "TSStringKeyword" ? "string" : '';
      });

      this.functionContent += '>';

      this.functionContent += ';'
    })
   }

  ngOnInit(): void {
  }

  functionContent = "";
}
