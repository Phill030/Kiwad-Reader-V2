import RevisionSelection from "./components/RevisionSelection";
import RevisionView from "./components/RevisionView";
import { FocusStyleManager } from "@blueprintjs/core";
import { invoke } from "@tauri-apps/api";
import "./scss/App.scss";
import { useState } from "react";

const revisions: string[] = await invoke("get_revisions");
export default function App() {
  let [selectedRevision, setSelectedRevision] = useState<string | undefined>();

  FocusStyleManager.onlyShowFocusOnTabs();

  function handleRevisionSelect(revision: string) {
    setSelectedRevision(revision);
  }

  return (
    <div id="window" className="bp5-dark">
      {!selectedRevision ? <RevisionSelection revisions={revisions} onRevisionSelected={handleRevisionSelect}/> : <RevisionView revision={selectedRevision}/>}
    </div>
  );
}
