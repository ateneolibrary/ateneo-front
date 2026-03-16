import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";

type ReadHistoryItemProps = {
  href: string;
  title: string;
  author: string;
  year: string;
  cover: string;
  rating: number;
};

function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export default function ReadHistoryItem({ href, title, author, year, cover, rating }: ReadHistoryItemProps) {
  return (
    <Link href={href} className="block text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <Card className="grid min-w-[250px] max-w-[250px] grid-cols-[48px_minmax(0,1fr)] items-center gap-2 rounded-none border-2 border-border bg-card p-1.5">
        <div className="relative aspect-[0.68] w-12 overflow-hidden border-2 border-border">
          <Image src={cover} alt={`Portada de ${title}`} fill sizes="48px" className="object-cover" />
        </div>
        <div className="grid gap-0.5">
          <p className="text-xs font-black tracking-[0.05em] uppercase">{title}</p>
          <p className="text-[0.62rem] font-bold tracking-[0.06em] text-muted-foreground uppercase">{author}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-[0.68rem] tracking-[0.06em] text-primary">{stars(rating)}</span>
            <span className="text-[0.68rem] font-black">{rating.toFixed(1)}/5</span>
            <span className="ml-auto text-[0.6rem] font-bold tracking-[0.06em] text-muted-foreground uppercase">{year}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
