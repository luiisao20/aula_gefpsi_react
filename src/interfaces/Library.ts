export interface Category {
  id: number;
  name: string;
}

export interface CategoryHasBooks {
  category: string;
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  url: string;
  authors: string;
}