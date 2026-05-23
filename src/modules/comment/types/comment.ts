export interface Attachment {
  id: string;
  name: string;
  size: number;
  url: string;
}

export interface Comment {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  content: string;
  attachments: Attachment[];
  createdAt: string;
}

export interface CommentPayload {
  projectId: string;
  authorId: string;
  authorName: string;
  content: string;
  attachments: Attachment[];
}
