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
        this.functionContent += ' : ';
        this.functionContent += this.fetchTypeValue((p.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation);

          if (firstParameter != false)
          firstParameter = false;

      })
      this.functionContent += ' ) : '

      this.functionContent += (f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation.type == "TSTypeReference"?
        (((f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation as babelParser.TSTypeReference)?.typeName as babelParser.Identifier).name: "";
      this.functionContent += '<';
      ((f.typeAnnotation as babelParser.TSTypeAnnotation)?.typeAnnotation as babelParser.TSTypeReference)?.typeParameters?.params.forEach(t => {
        this.functionContent += this.fetchTypeValue(t);
      });

      this.functionContent += '>';

      this.functionContent += ';'
    })
   }

  ngOnInit(): void {
  }

  fetchTypeValue(type:babelParser.TSType): string {
    switch(type.type){
      case "TSNumberKeyword": return 'number';
      case "TSAnyKeyword": return 'any';
      case "TSBooleanKeyword": return 'boolean';
      case "TSStringKeyword": return 'string';
      case "TSTypeReference": return type.typeParameters? this.fetchMapTypeValue(type as babelParser.TSTypeReference):(type.typeName as babelParser.Identifier).name;
      case "TSArrayType": return this.fetchTypeValue(type.elementType)+'[ ]';
      default: return '';
    }
  }

  fetchMapTypeValue(type: babelParser.TSTypeReference): string {
    var param0: boolean = true;
    var mapTypeValue = (type.typeName as babelParser.Identifier).name + '<';
    type.typeParameters?.params.forEach(p => {
        if(!param0) mapTypeValue += ',';
        mapTypeValue += this.fetchTypeValue(p);
        if(param0) param0 = false;
      });
    mapTypeValue += '>';
    return mapTypeValue;
  }

  functionContent = "";
}
