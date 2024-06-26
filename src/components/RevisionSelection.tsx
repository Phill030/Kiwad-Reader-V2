import { ItemRenderer, Select } from "@blueprintjs/select";
import { Button, MenuItem } from "@blueprintjs/core";
import { MouseEvent, useState } from "react";
import "../scss/RevisionSelectionScreen.scss";

export default function RevisionSelection(props: any) {
  const [selectedRevision, setSelectedRevision] = useState<string | undefined>();

  const renderRevision: ItemRenderer<string> = (
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
    props.onRevisionSelected(selectedRevision);
  }

  return (
    <div className="revision-selection-screen">
      <Select
        items={props.revisions}
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
