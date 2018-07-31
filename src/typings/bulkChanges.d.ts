interface IBulkChange {
  public_ids: string[];
}

interface IBulkChangeCollaborator extends IBulkChange {
  collaborator: string;
}

interface IBulkChangeLocation extends IBulkChange {
  location: string;
}

interface IBulkChangeStatus extends IBulkChange {
  status: string;
}
