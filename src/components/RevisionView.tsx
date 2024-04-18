import "../scss/RevisionView.scss";
import FileList from "./FileList";

export default function RevisionView({ revision }: { revision: string }) {
  return (
    <div className="revision-view">
      <FileList revision={revision} />
    </div>
  );
}
