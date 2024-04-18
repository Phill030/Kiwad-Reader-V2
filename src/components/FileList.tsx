import { Classes, Icon, Intent, Tree, TreeNodeInfo } from "@blueprintjs/core";
import "../scss/FileList.scss";

export default function FileList() {
  const FILES: TreeNodeInfo[] = [{ id: 0, label: "label", icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,  }];

    function handleNodeClick() {}

  return (
    <div className="file-list">
      <Tree contents={FILES} onNodeClick={handleNodeClick} className={Classes.ELEVATION_0}></Tree>
    </div>
  );
}
