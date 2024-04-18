import cloneDeep from 'lodash.clonedeep';
import { Classes, Icon, Intent, Tree, TreeNodeInfo } from "@blueprintjs/core";
import "../scss/FileList.scss";
import { invoke } from "@tauri-apps/api";
import { File } from "../interfaces/File";
import React, { useReducer, useState } from "react";

type NodePath = number[];

type TreeAction =
  | {
      type: "SET_IS_EXPANDED";
      payload: { path: NodePath; isExpanded: boolean };
    }
  | { type: "DESELECT_ALL" }
  | {
      type: "SET_IS_SELECTED";
      payload: { path: NodePath; isSelected: boolean };
    };



function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case "DESELECT_ALL":
      const newState1 = cloneDeep(state);
      forEachNode(newState1, (node) => (node.isSelected = false));
      return newState1;
    case "SET_IS_EXPANDED":
      const newState2 = cloneDeep(state);
      forNodeAtPath(
        newState2,
        action.payload.path,
        (node) => (node.isExpanded = action.payload.isExpanded)
      );
      return newState2;
    case "SET_IS_SELECTED":
      const newState3 = cloneDeep(state);
      forNodeAtPath(
        newState3,
        action.payload.path,
        (node) => (node.isSelected = action.payload.isSelected)
      );
      return newState3;
    default:
      return state;
  }
}

function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
  if (nodes === undefined) {
      return;
  }

  for (const node of nodes) {
      callback(node);
      forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
  callback(Tree.nodeFromPath(path, nodes));
}

async function get_files(revision: String): Promise<File[]> {
  const files = await invoke<string>("fetch_files", { revision });
  return JSON.parse(files);
}

export default function FileList({ revision }: { revision: string }) {
  const FILES: TreeNodeInfo[] = [
    {
      id: 0,
      label: `${revision}`,
      icon: (
        <Icon
          icon="compressed"
          intent={Intent.PRIMARY}
          className={Classes.TREE_NODE_ICON}
        />
      ),
      childNodes: [
        {
          id: 1,
          label: `${revision}`,
          icon: (
            <Icon
              icon="compressed"
              intent={Intent.PRIMARY}
              className={Classes.TREE_NODE_ICON}
            />
          ),
        },
      ],
    },
  ];

  let [files, setFiles] = useState<File[]>();
  const [nodes, dispatch] = useReducer(treeExampleReducer, FILES);


  get_files(revision).then((f: File[]) => {
    console.log(f);

    f.forEach((v, idx) => {
      FILES[0].childNodes?.push({
        id: idx + 1,
        label: `${v.filename}`,
        icon: <Icon icon="folder-open" className={Classes.TREE_NODE_ICON} />,
      } as TreeNodeInfo);
    });
  });

  function handleNodeClick() {}

  const handleNodeCollapse = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: false },
        type: "SET_IS_EXPANDED",
      });
    },
    []
  );

  const handleNodeExpand = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: true },
        type: "SET_IS_EXPANDED",
      });
    },
    []
  );

  return (
    <div className="file-list">
      <Tree
        contents={FILES}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
        className={Classes.ELEVATION_0}
      ></Tree>
    </div>
  );
}
