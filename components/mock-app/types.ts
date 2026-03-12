export type MeetingAttendee = {
  userId: string;
  name: string;
  avatar: string;
  status: "si" | "quizas" | "no";
};

export type ClubMeeting = {
  id: string;
  title: string;
  date: string;          // ISO date string e.g. "2026-03-19"
  time: string;          // e.g. "19:00"
  durationMinutes: number;
  location: string;      // address or URL
  attendees: MeetingAttendee[];
};

export type FavoriteBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  color: string;
};

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  favoriteBooks: (FavoriteBook | null)[];
  favoriteGenres: string[];
  clubIds: string[];
};

export type ClubMember = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  joinDate: string;
};

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
  adminId: string;
  membersList: ClubMember[];
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
  meetings: ClubMeeting[];
  readHistory: ReadHistoryBook[];
  wishList: Array<{
    title: string;
    author: string;
    cover: string;
    votes: number;
  }>;
};
