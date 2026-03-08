export type ClubMock = {
  id: string;
  name: string;
  book: string;
  bookCover: string;
  author: string;
  members: number;
  city: string;
  nextSession: string;
  description: string;
  mode: "Presencial" | "Online";
  stats: {
    booksRead: number;
    attendance: string;
    genres: number;
    quotes: number;
  };
  upcomingEvents: Array<{
    date: string;
    title: string;
    location: string;
  }>;
  readHistory: Array<{
    title: string;
    author: string;
    year: string;
    cover: string;
    rating: number;
  }>;
  wishList: Array<{
    title: string;
    author: string;
    cover: string;
    votes: number;
  }>;
};
