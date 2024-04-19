import "../scss/RevisionView.scss";
import { useEffect, useState } from "react";
import FileList from "./FileList";
import SelectedItem from "./SelectedItem";
import { File } from "../interfaces/File";
import { Classes, Icon, Intent, TreeNodeInfo } from "@blueprintjs/core";
import { invoke } from "@tauri-apps/api";

export default function RevisionView({ revision }: { revision: string }) {
  let [tree, setTree] = useState<TreeNodeInfo[]>([]);
  let [files, setFiles] = useState<File[]>([]);
  let [file, setFile] = useState<File>();

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

      setFiles(parsed);
      setTree(treeNodes);
    }

    getFiles(revision);
  }, []);

  return (
    <div className="revision-view">
      <div className="left-content">
        <FileList
          revision={revision}
          onFileClick={(f: File) => setFile(f)}
          tree={tree}
          files={files}
        />
      </div>
      <div className="right-content">
        <SelectedItem revision={revision} file={file} />
      </div>
    </div>
  );
}
