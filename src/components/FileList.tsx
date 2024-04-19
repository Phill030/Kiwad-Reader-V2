import {
  Spinner,
  Tree,
} from "@blueprintjs/core";
import "../scss/FileList.scss";
import { File } from "../interfaces/File";


export default function FileList(props: any) {
  const handleNodeClick = (node: any, nodePath: any) => {
    console.log(node);
    console.log(nodePath);

    let file = props.files.find((f: File) => f.filename.replace("Data/GameData/", "").replace(".wad", "") == node.label);
    props.onFileClick(file);
  };

  return (
    <div className="file-list">
      {props.tree.length > 0 ? (
        <Tree
          contents={props.tree}
          onNodeClick={handleNodeClick}
        ></Tree>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
