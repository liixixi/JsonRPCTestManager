import { Component, OnInit } from '@angular/core';
import { OutputService } from '../output.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  constructor(outputService:OutputService) {
    outputService.subjectOutput.subscribe( o => {
      this.outputText.push(o);
    })
   }

  ngOnInit(): void {
  }
  outputText :string[] = [];
}
