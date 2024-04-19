import {
  Callout,
  Classes,
  Code,
  Icon,
  Intent,
  NonIdealState,
  NonIdealStateIconSize,
  Text,
  Tooltip,
  Tree,
} from "@blueprintjs/core";
import "../scss/SelectedItem.scss";
import { File } from "../interfaces/File";

export default function SelectedItem({ revision, file }: { revision: string, file: File | undefined }) {
  function handleDownload() {
    window.open(`http://phill030.de:12369/patcher/${revision}/wads/${file?.filename}.wad`);
  }
  
  return (
    <div className="selected-item">
      {!file ? (
        <NonIdealState
          icon="cross"
          iconSize={64 as NonIdealStateIconSize}
          title="No file selected"
          description="You need to select an item to be able to view it's content."
        />
      ) : (
        <div className="properties">
          <Callout icon="info-sign" title="Properties" className="info">
            <Text>
              Filename: {file.filename}{".wad "}
              <Icon icon="cloud-download" intent="primary" className="icon" onClick={handleDownload} />
            </Text>
            <Text>Size: {Math.ceil(file.size/1024)}kb</Text>
            <Text>CRC: <Code>{file.crc}</Code></Text>
          </Callout>
          <Tree contents={[{
          id: 0,
          label: `${file.filename}.wad`,
          icon: (
            <Icon
              icon="compressed"
              intent={Intent.PRIMARY}
              className={Classes.TREE_NODE_ICON}
            />
          ),
        }]} />
        </div>
      )}
    </div>
  );
}
