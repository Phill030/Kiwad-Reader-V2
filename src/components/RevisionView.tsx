import "../scss/RevisionView.scss";
import { useState } from "react";
import FileList from "./FileList";
import SelectedItem from "./Selecteditem";
import { File } from "../interfaces/File";

export default function RevisionView({ revision }: { revision: string }) {
  let [file, setFile] = useState<File>();

  return (
    <div className="revision-view">
      <FileList revision={revision} onFileClick={(f: File) => setFile(f)} />
      <SelectedItem file={file} />
    </div>
  );
}
