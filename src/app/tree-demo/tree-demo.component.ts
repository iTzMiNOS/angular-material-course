import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import { Course } from '../model/course';
import { InterpolationConfig } from '@angular/compiler';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-demo',
  templateUrl: 'tree-demo.component.html',
  styleUrls: ['tree-demo.component.scss']
})
export class TreeDemoComponent implements OnInit {

  nestedData = new MatTreeNestedDataSource<CourseNode>();

  nestedControl = new NestedTreeControl<CourseNode>(node => node?.children);

  flatControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node:CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: !!node.children && node.children?.length > 0,
        level: level
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  flatData = new MatTreeFlatDataSource(this.flatControl,this.treeFlattener)

  ngOnInit() {

    this.nestedData.data = TREE_DATA;

    this.flatData.data = TREE_DATA;

  }

  hasNestedChild(index: number, node:CourseNode){
    return node?.children?.length > 0;
  }
  hasFlatChild(index: number, node:CourseFlatNode){
    console.log(node);
    return node.expandable;
  }

}


