export enum WorkspaceMode {
    Document,
    Canvas,
    Split,
};

export type WorkspaceState =
    | { mode: WorkspaceMode.Document }
    | { mode: WorkspaceMode.Canvas }
    | { mode: WorkspaceMode.Split };