"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import type { ClubMember } from "@/components/mock-app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type MembersBoardProps = {
  membersList: ClubMember[];
  adminId: string;
  /** Simulate current logged-in user – in prod this would come from auth context */
  currentUserId: string;
};

export default function MembersBoard({
  membersList,
  adminId,
  currentUserId,
}: MembersBoardProps) {
  const [members, setMembers] = useState(membersList);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const isAdmin = currentUserId === adminId;
  const admin = membersList.find((m) => m.id === adminId);

  const query = search.trim().toLowerCase();
  const visibleMembers = query
    ? members.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.username.toLowerCase().includes(query)
      )
    : members;

  function handleRemoveClick(id: string) {
    setConfirmId(id);
  }

  function handleConfirmRemove(id: string) {
    setRemovingId(id);
    setTimeout(() => {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setRemovingId(null);
      setConfirmId(null);
    }, 380);
  }

  function handleCancelRemove() {
    setConfirmId(null);
  }

  return (
    <div className="grid gap-4">
      <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
          <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
            <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Members</CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-4">
            <p className="text-5xl leading-none font-black">{members.length}</p>
            <p className="mt-2 text-xs font-black tracking-[0.07em] text-muted-foreground uppercase">Miembros activos en este club</p>
          </CardContent>
        </Card>

        {admin ? (
          <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
            <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
              <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Administrador</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3 px-4 py-4">
              <Link href={`/profile/${admin.id}`} className="relative h-14 w-14 overflow-hidden rounded-none border-2 border-border">
                <Image src={admin.avatar} alt={admin.name} fill sizes="56px" className="object-cover" />
              </Link>
              <div className="min-w-0">
                <Link href={`/profile/${admin.id}`} className="block no-underline">
                  <p className="truncate text-sm font-black tracking-[0.05em] uppercase">{admin.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{admin.username}</p>
                </Link>
                <span className="mt-2 inline-flex h-7 items-center border-2 border-border bg-[var(--color-red-light)] px-2 text-[0.65rem] font-black tracking-[0.08em] uppercase">Admin</span>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      <Card className="rounded-none border-4 border-border bg-card shadow-[8px_8px_0_var(--color-border)]">
        <CardHeader className="border-b-2 border-border bg-muted/40 px-4 py-3">
          <CardTitle className="text-xs font-black tracking-[0.1em] uppercase">Lista de miembros</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 px-4 py-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input
              type="search"
              className="h-11 rounded-none border-2 border-border bg-card px-3 text-sm"
              placeholder="Buscar por nombre o usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar miembros"
            />
            {search ? (
              <Button type="button" variant="outline" className="h-11 rounded-none border-2 border-border px-3" onClick={() => setSearch("")}>Limpiar</Button>
            ) : null}
          </div>

          <ul className="grid gap-2">
            {visibleMembers.length === 0 ? <li className="border-2 border-border bg-muted px-3 py-3 text-sm">No se encontraron miembros para &ldquo;{search}&rdquo;</li> : null}

            {visibleMembers.map((member) => {
              const isAdminMember = member.id === adminId;
              const isRemoving = removingId === member.id;
              const isConfirming = confirmId === member.id;

              return (
                <li key={member.id} className={`grid items-center gap-3 border-2 border-border bg-card px-3 py-2 transition sm:grid-cols-[56px_minmax(0,1fr)_auto_auto] ${isRemoving ? "opacity-40" : "opacity-100"}`}>
                  <Link href={`/profile/${member.id}`} className="relative h-12 w-12 overflow-hidden rounded-none border-2 border-border">
                    <Image src={member.avatar} alt={member.name} fill sizes="48px" className="object-cover" />
                  </Link>

                  <Link href={`/profile/${member.id}`} className="min-w-0 no-underline">
                    <p className="truncate text-sm font-black tracking-[0.04em] uppercase">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.username}</p>
                  </Link>

                  <p className="text-[0.68rem] font-black tracking-[0.06em] text-muted-foreground uppercase">Se unio: {member.joinDate}</p>

                  {isAdminMember ? (
                    <span className="inline-flex h-8 items-center justify-center border-2 border-border bg-[var(--color-red-light)] px-2 text-[0.65rem] font-black tracking-[0.08em] uppercase">Admin</span>
                  ) : isAdmin ? (
                    isConfirming ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[0.65rem] font-black tracking-[0.05em] uppercase">Eliminar?</span>
                        <Button type="button" className="h-8 rounded-none border-2 border-border px-2 text-[0.6rem] font-black tracking-[0.07em] uppercase" onClick={() => handleConfirmRemove(member.id)}>Si</Button>
                        <Button type="button" variant="outline" className="h-8 rounded-none border-2 border-border px-2 text-[0.6rem] font-black tracking-[0.07em] uppercase" onClick={handleCancelRemove}>No</Button>
                      </div>
                    ) : (
                      <Button type="button" variant="outline" className="h-8 rounded-none border-2 border-border px-2 text-[0.62rem] font-black tracking-[0.07em] uppercase" onClick={() => handleRemoveClick(member.id)} aria-label={`Eliminar a ${member.name}`}>
                        Eliminar
                      </Button>
                    )
                  ) : null}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
