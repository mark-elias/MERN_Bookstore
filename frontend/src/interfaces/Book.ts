export interface Book {
    _id: string; // Changed to string to match MongoDB ObjectId
    title: string;
    author: string;
    publishYear: number;
    createdAt: string; // Changed to match the actual field name
    updatedAt: string; // Changed to match the actual field name
  }