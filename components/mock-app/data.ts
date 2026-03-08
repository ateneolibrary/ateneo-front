import type { ClubMock } from "./types";

export const clubs: ClubMock[] = [
  {
    id: "sci-fi-valencia",
    name: "SciFi Valencia",
    book: "Dune",
    bookCover: "/images/books/dune.jpg",
    author: "Frank Herbert",
    members: 12,
    city: "Valencia",
    nextSession: "Jueves 19:00",
    description: "Club para lectores de ciencia ficción con foco en clásicos contemporáneos.",
    mode: "Presencial",
    stats: {
      booksRead: 42,
      attendance: "89%",
      genres: 6,
      quotes: 138,
    },
    upcomingEvents: [
      { date: "Jue 19:00", title: "Debate capítulos 5-8", location: "Russafa Lab" },
      { date: "Sáb 11:30", title: "Sesión abierta + invitados", location: "Biblioteca Central" },
      { date: "Mar 20:00", title: "Q&A de personajes", location: "Discord del club" },
    ],
    readHistory: [
      { title: "Fundación", author: "Isaac Asimov", year: "1951", cover: "/images/books/dune.jpg", rating: 4.6 },
      { title: "Neuromante", author: "William Gibson", year: "1984", cover: "/images/books/1984.jpg", rating: 4.4 },
      { title: "Solaris", author: "Stanislaw Lem", year: "1961", cover: "/images/books/hobbit.jpg", rating: 4.2 },
      { title: "Dune", author: "Frank Herbert", year: "1965", cover: "/images/books/dune.jpg", rating: 4.8 },
      { title: "1984", author: "George Orwell", year: "1949", cover: "/images/books/1984.jpg", rating: 4.7 },
    ],
    wishList: [
      { title: "Hyperion", author: "Dan Simmons", cover: "/images/books/dune.jpg", votes: 18 },
      { title: "La mano izquierda de la oscuridad", author: "U. K. Le Guin", cover: "/images/books/1984.jpg", votes: 22 },
      { title: "Children of Time", author: "Adrian Tchaikovsky", cover: "/images/books/hobbit.jpg", votes: 15 },
    ],
  },
  {
    id: "clasicos-madrid",
    name: "Clásicos Madrid",
    book: "1984",
    bookCover: "/images/books/1984.jpg",
    author: "George Orwell",
    members: 14,
    city: "Madrid",
    nextSession: "Domingo 11:30",
    description: "Sesiones de análisis literario de clásicos modernos y obras del siglo XX.",
    mode: "Presencial",
    stats: {
      booksRead: 57,
      attendance: "92%",
      genres: 9,
      quotes: 204,
    },
    upcomingEvents: [
      { date: "Dom 11:30", title: "Mesa redonda: poder y vigilancia", location: "La Fugitiva" },
      { date: "Mié 19:00", title: "Club de ensayo crítico", location: "Online" },
      { date: "Vie 18:00", title: "Lectura compartida de pasajes", location: "Conde Duque" },
    ],
    readHistory: [
      { title: "Crimen y castigo", author: "Fiódor Dostoievski", year: "1866", cover: "/images/books/1984.jpg", rating: 4.7 },
      { title: "Madame Bovary", author: "Gustave Flaubert", year: "1856", cover: "/images/books/hobbit.jpg", rating: 4.3 },
      { title: "El gran Gatsby", author: "F. Scott Fitzgerald", year: "1925", cover: "/images/books/1984.jpg", rating: 4.9 },
      { title: "1984", author: "George Orwell", year: "1949", cover: "/images/books/1984.jpg", rating: 4.8 },
      { title: "Dune", author: "Frank Herbert", year: "1965", cover: "/images/books/dune.jpg", rating: 4.5 },
    ],
    wishList: [
      { title: "Rayuela", author: "Julio Cortázar", cover: "/images/books/1984.jpg", votes: 31 },
      { title: "Pedro Páramo", author: "Juan Rulfo", cover: "/images/books/hobbit.jpg", votes: 27 },
      { title: "La montaña mágica", author: "Thomas Mann", cover: "/images/books/dune.jpg", votes: 19 },
    ],
  },
  {
    id: "fantasia-online",
    name: "Fantasía Online",
    book: "El Hobbit",
    bookCover: "/images/books/hobbit.jpg",
    author: "J.R.R. Tolkien",
    members: 21,
    city: "Online",
    nextSession: "Martes 20:00",
    description: "Comunidad distribuida para lecturas de fantasía épica y worldbuilding.",
    mode: "Online",
    stats: {
      booksRead: 36,
      attendance: "86%",
      genres: 5,
      quotes: 121,
    },
    upcomingEvents: [
      { date: "Mar 20:00", title: "Mapa de la Tierra Media", location: "Zoom" },
      { date: "Jue 21:00", title: "Taller de personajes", location: "Discord" },
      { date: "Sáb 17:00", title: "Club de fan art", location: "Miro board" },
    ],
    readHistory: [
      { title: "Terramar", author: "Ursula K. Le Guin", year: "1968", cover: "/images/books/hobbit.jpg", rating: 4.6 },
      { title: "El nombre del viento", author: "Patrick Rothfuss", year: "2007", cover: "/images/books/dune.jpg", rating: 4.8 },
      { title: "Nacidos de la bruma", author: "Brandon Sanderson", year: "2006", cover: "/images/books/1984.jpg", rating: 4.4 },
      { title: "El Hobbit", author: "J.R.R. Tolkien", year: "1937", cover: "/images/books/hobbit.jpg", rating: 5.0 },
      { title: "Dune", author: "Frank Herbert", year: "1965", cover: "/images/books/dune.jpg", rating: 4.7 },
    ],
    wishList: [
      { title: "El priorato del naranjo", author: "Samantha Shannon", cover: "/images/books/hobbit.jpg", votes: 24 },
      { title: "La rueda del tiempo", author: "Robert Jordan", cover: "/images/books/dune.jpg", votes: 20 },
      { title: "La quinta estación", author: "N. K. Jemisin", cover: "/images/books/1984.jpg", votes: 17 },
    ],
  },
];

export function getClubById(id: string): ClubMock | undefined {
  return clubs.find((club) => club.id === id);
}
