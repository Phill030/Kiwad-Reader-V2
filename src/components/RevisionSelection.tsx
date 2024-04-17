import { ItemRenderer, Select } from "@blueprintjs/select";
import { Button, MenuItem } from "@blueprintjs/core";
import { MouseEvent, useState } from "react";
import "../scss/RevisionSelectionScreen.scss";
import { invoke } from "@tauri-apps/api";

const revisions: string[] = await invoke("get_revisions");

export default function RevisionSelection() {
  const [selectedRevision, setSelectedRevision] = useState<String | undefined>();

  const renderRevision: ItemRenderer<String> = (
    item,
    { handleClick, handleFocus, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={`${item}`}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        text={item}
      />
    );
  };

  function onClick(_event: MouseEvent) {
    console.log("Selected revision: "+selectedRevision);
    invoke("revision_selected", { revision: selectedRevision });
  }

  return (
    <div className="revision-selection-screen">
      <Select
        items={revisions}
        itemRenderer={renderRevision}
        onItemSelect={setSelectedRevision}
        filterable={false}
        noResults={
          <MenuItem
            disabled={true}
            text="No results."
            roleStructure="listoption"
          />
        }
      >
        <Button
          text={selectedRevision ? selectedRevision : "Select a revision"}
          rightIcon="caret-down"
        />
      </Select>

      <Button
        className="continue-bttn"
        text="Read"
        rightIcon="manual"
        intent="primary"
        disabled={!selectedRevision}
        onClick={onClick}
      ></Button>
    </div>
  );
}
