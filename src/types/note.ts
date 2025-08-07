interface Note {
  _id: string;
  title: string;
  content: string;
  user_id: string;
  favorite: boolean;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export { type Note };
