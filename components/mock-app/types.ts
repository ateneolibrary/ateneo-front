export type BookMemberRating = {
  name: string;
  initial: string;
  rating: number;
  avatar?: string;
  role?: string;
};

export type BookQuote = {
  member: string;
  text: string;
  page: string;
};

export type ReadHistoryBook = {
  id: string;
  title: string;
  author: string;
  year: string;
  cover: string;
  rating: number;
  startDate: string;
  endDate: string;
  memberRatings: BookMemberRating[];
  consensusVerdict: string;
  verdictSwatches: string[];
  quotes: BookQuote[];
  totalHighlights: number;
};

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
  shareRating: boolean;
  shareQuotes: boolean;
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
  readHistory: ReadHistoryBook[];
  wishList: Array<{
    title: string;
    author: string;
    cover: string;
    votes: number;
  }>;
};
