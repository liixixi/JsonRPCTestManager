import { Component, OnInit } from '@angular/core';
import { ExecutionService } from '../execution.service';

@Component({
  selector: 'app-connection-path',
  templateUrl: './connection-path.component.html',
  styleUrls: ['./connection-path.component.css']
})
export class ConnectionPathComponent implements OnInit {

  connectionPath:String = "";
  constructor(private execution:ExecutionService) { }

  ngOnInit(): void {
  }
  OnUpdate(value:string)
  {
    this.connectionPath=value;
    this.execution.SetConnectionString(value);
  }
}
