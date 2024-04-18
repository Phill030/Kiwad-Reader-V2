import { ProgressBar, Text } from "@blueprintjs/core";

export default function LoadingBar() {
  return (
    <div className="revision-view">
      <Text>Fetching</Text>
      <ProgressBar
        intent="primary"
        value={0.0}
        className="progress-bar"
      />
    </div>
  );
}
