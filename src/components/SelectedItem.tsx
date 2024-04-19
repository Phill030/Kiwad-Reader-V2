import {
  NonIdealState,
  NonIdealStateIconSize,
} from "@blueprintjs/core";
import "../scss/SelectedItem.scss";
import { File } from "../interfaces/File";

export default function SelectedItem({ file }: {file: File | undefined}) {
  return (
    <div className="selected-item">
      {
        !file ? <NonIdealState
        icon="cross"
        iconSize={64 as NonIdealStateIconSize}
        title="No file selected"
        description="You need to select an item to be able to view it's content."
      /> : <div>{JSON.stringify(file)}</div>
      }
    </div>
  );
}
