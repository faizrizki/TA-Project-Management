export interface Activity {
  id: string;
  actorId: string;
  actorName: string;
  message: string;
  createdAt: string;
}

export interface ActivityPayload {
  actorId: string;
  actorName: string;
  message: string;
}
