import RevisionSelection from "./components/RevisionSelection";
import RevisionView from "./components/RevisionView";
import { FocusStyleManager } from "@blueprintjs/core";
import { useState } from "react";
import "./scss/App.scss";

export default function App() {
  FocusStyleManager.onlyShowFocusOnTabs();


  return (
    <div id="window" className="bp5-dark">
      <RevisionSelection/>
      <RevisionView/>
      
    </div>
  );
}
