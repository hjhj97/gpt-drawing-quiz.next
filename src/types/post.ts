export interface IPost {
  id: string;
  image_url: string;
  answer: string;
  guess?: string;
  is_correct: boolean;
  created_at: string;
}
