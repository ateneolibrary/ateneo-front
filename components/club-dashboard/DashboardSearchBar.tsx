import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardSearchBar() {
  return (
    <section className="grid grid-cols-[44px_minmax(0,1fr)] gap-2 sm:grid-cols-[44px_minmax(0,1fr)_130px]">
      <div className="grid h-11 place-items-center border-2 border-border bg-muted text-xl font-bold">⌕</div>
      <Input
        className="h-11 rounded-none border-2 border-border bg-card px-4 text-sm font-bold tracking-[0.03em] uppercase placeholder:text-muted-foreground"
        type="text"
        placeholder="BUSCAR TITULOS, AUTORES O CLUBES..."
        aria-label="Buscar títulos, autores o clubes"
      />
      <Button type="button" className="hidden h-11 rounded-none border-2 border-border px-4 text-xs font-black tracking-[0.1em] uppercase sm:inline-flex">
        SEARCH
      </Button>
    </section>
  );
}
