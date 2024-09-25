import type { IndentedTreeOptions } from '@ant-design/graphs';
import { G6, IndentedTree as IndentedTreeComponent } from '@ant-design/graphs';
import type { NodeData, TreeData } from '@antv/g6';
import React from 'react';
import data from '../datasets/algorithm-category.json';

const { treeToGraphData } = G6;

export const IndentedTreeLinear = () => {
  const options: IndentedTreeOptions = {
    type: 'linear',
    data: treeToGraphData(data, {
      getNodeData: (datum: TreeData, depth: number) => {
        datum.data ||= {};
        datum.data.depth = depth;
        if (!datum.children) return datum as NodeData;
        const { children, ...restDatum } = datum;
        return { ...restDatum, children: children.map((child) => child.id) } as NodeData;
      },
    }),
  };

  return <IndentedTreeComponent {...options} />;
};