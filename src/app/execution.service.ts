import { Injectable } from '@angular/core';
import { InterfaceSelectionService } from './interface-selection.service';
import { OutputService } from './output.service';
import * as babelParser from "@babel/types"

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  Execute() {
    if (this.interfaceSelection.methodSelected == undefined)
    {
      this.outputService.Output("no method selected");
      return;
    }

    
    this.outputService.Output("method " +
    this.interfaceSelection.interfaceSelected?.name + '.' + 
    (this.interfaceSelection.methodSelected?.key as babelParser.Identifier)?.name
    + " called");
  }

  constructor(private interfaceSelection:InterfaceSelectionService,
    private outputService:OutputService) { }


}
