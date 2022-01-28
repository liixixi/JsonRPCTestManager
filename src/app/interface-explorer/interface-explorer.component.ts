import { Component, OnInit } from '@angular/core';
import { InterfaceDefination } from '../interface-defination';
import { SolutionService } from '../solution.service';
import * as babelType from "@babel/types"
import {InterfaceSelectionService} from '../interface-selection.service'
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

const TREE_DATA: TreeNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  value?:InterfaceDefination | babelType.TSMethodSignature;
  parent?:InterfaceDefination;
}

interface TreeNode{
  name:string;
  children?:TreeNode[];
  value?:InterfaceDefination | babelType.TSMethodSignature;
  parent?:InterfaceDefination;
}

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
      this.UpdateTreeNode();
    });

    this.dataSource.data = [];
  }
  UpdateTreeNode() {
    var treeNodes : TreeNode[] = [];
    this.interfaces.forEach( i => {
      var node = {name:i.name, children :[] as TreeNode[], value:i};
      i.methods.forEach( f => {
        node.children?.push( {name:(f.key as babelType.Identifier).name, value:f, parent:i});
      })
      treeNodes.push(node);
    })

    this.dataSource.data = treeNodes as TreeNode[];
  }

  ngOnInit(): void {
  }

  interfaces: InterfaceDefination[] = [];

  filterDevices(node:TreeNode)
  {
    if (node.parent == undefined || node.value==undefined)
      return;
    this.selection.select(node.parent, node.value as babelType.TSMethodSignature);
  }

  OnMethodSelected(i:InterfaceDefination, f:babelType.TSMethodSignature)
  {
    this.selection.select(i,f);
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      parent: node.parent,
      value: node.value
    }as ExampleFlatNode ;
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
