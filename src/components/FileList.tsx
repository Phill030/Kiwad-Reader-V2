import {
  Classes,
  Icon,
  Intent,
  Spinner,
  Tree,
  TreeNodeInfo,
} from "@blueprintjs/core";
import "../scss/FileList.scss";
import { invoke } from "@tauri-apps/api";
import { File } from "../interfaces/File";
import { useEffect, useState } from "react";

export default function FileList(props: any) {
  let [tree, setTree] = useState<TreeNodeInfo[]>([]);
  let [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function getFiles(revision: String): Promise<void> {
      const files = await invoke<string>("fetch_files", { revision });
      let parsed: File[] = JSON.parse(files);

      let treeNodes: TreeNodeInfo[] = [];
      parsed.forEach((v, idx) => {
        treeNodes.push({
          id: idx + 1,
          label: `${v.filename}`,
          icon: (
            <Icon
              icon="compressed"
              intent={Intent.PRIMARY}
              className={Classes.TREE_NODE_ICON}
            />
          ),
        });
      });

      setTree(treeNodes);
      setFiles(parsed);
    }

    getFiles(props.revision);
  }, []);

  const handleNodeExpand = async (node: any, nodePath: any) => {
    console.log(node);
    console.log(nodePath);
  };

  const handleNodeClick = (node: any, nodePath: any) => {
    console.log(node);
    console.log(nodePath);

    let file = files.find(f => f.filename.replace("Data/GameData/", "").replace(".wad", "") == node.label);
    props.onFileClick(file);
  };

  const handleNodeCollapse = (node: any, nodePath: any) => {
    console.log(node);
    console.log(nodePath);
  };

  return (
    <div className="file-list">
      {tree.length > 0 ? (
        <Tree
          contents={tree}
          onNodeClick={handleNodeClick}
          onNodeCollapse={handleNodeCollapse}
          onNodeExpand={handleNodeExpand}
        ></Tree>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
