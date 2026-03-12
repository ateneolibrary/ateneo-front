"use client";

import Link from "next/link";
import { useState } from "react";
import type { ClubMember } from "@/components/mock-app";
import styles from "./ClubDashboard.module.css";

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
    <div className={styles.membersRoot}>
      {/* ── top stat row ── */}
      <div className={styles.membersTotalRow}>
        <section className={`${styles.membersTotalPanel} ${styles.panelShell}`}>
          <span className={styles.panelBadge}>Members</span>
          <div className={styles.membersTotalInner}>
            <span className={styles.membersTotalNumber}>{members.length}</span>
            <div className={styles.membersTotalMeta}>
              <span className={styles.membersTotalLabel}>Miembros activos</span>
              <span className={styles.membersTotalSub}>en este club</span>
            </div>
          </div>
        </section>

        {admin && (
          <section className={`${styles.membersAdminPanel} ${styles.panelShell}`}>
            <span className={styles.panelBadge}>Administrador</span>
            <div className={styles.membersAdminInner}>
              <Link href={`/profile/${admin.id}`} className={styles.membersAdminAvatarLink}>
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  width={56}
                  height={56}
                  className={styles.membersAdminAvatar}
                />
              </Link>
              <div className={styles.membersAdminInfo}>
                <Link href={`/profile/${admin.id}`} className={styles.membersAdminInfoLink}>
                  <p className={styles.membersAdminName}>{admin.name}</p>
                  <p className={styles.membersAdminUsername}>{admin.username}</p>
                </Link>
                <span className={styles.membersAdminTag}>Admin</span>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── member list ── */}
      <section className={`${styles.membersListPanel} ${styles.panelShell}`}>
        <span className={styles.panelBadge}>Lista de Miembros</span>

        {/* search bar */}
        <div className={styles.membersSearch}>
          <svg
            className={styles.membersSearchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className={styles.membersSearchInput}
            placeholder="Buscar por nombre o usuario…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar miembros"
          />
          {search && (
            <button
              type="button"
              className={styles.membersSearchClear}
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <ul className={styles.membersList}>
          {visibleMembers.length === 0 && (
            <li className={styles.membersEmptyState}>
              No se encontraron miembros para &ldquo;{search}&rdquo;
            </li>
          )}
          {visibleMembers.map((member) => {
            const isAdminMember = member.id === adminId;
            const isRemoving = removingId === member.id;
            const isConfirming = confirmId === member.id;

            return (
              <li
                key={member.id}
                className={`${styles.memberRow} ${isAdminMember ? styles.memberRowAdmin : ""} ${isRemoving ? styles.memberRowRemoving : ""}`}
              >
                {/* avatar */}
                <Link href={`/profile/${member.id}`} className={styles.memberAvatarWrap}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    width={48}
                    height={48}
                    className={styles.memberAvatar}
                  />
                  {isAdminMember && <span className={styles.memberAvatarAdminDot} title="Administrador" />}
                </Link>

                {/* info */}
                <Link href={`/profile/${member.id}`} className={styles.memberInfo}>
                  <p className={styles.memberName}>{member.name}</p>
                  <p className={styles.memberUsername}>{member.username}</p>
                </Link>

                {/* join date */}
                <div className={styles.memberJoinWrap}>
                  <span className={styles.memberJoinLabel}>Se unió</span>
                  <span className={styles.memberJoinDate}>{member.joinDate}</span>
                </div>

                {/* admin badge or remove button */}
                {isAdminMember ? (
                  <span className={styles.memberBadgeAdmin}>Admin</span>
                ) : isAdmin ? (
                  isConfirming ? (
                    <div className={styles.memberConfirmRow}>
                      <span className={styles.memberConfirmText}>¿Eliminar?</span>
                      <button
                        type="button"
                        className={`${styles.memberActionBtn} ${styles.memberActionBtnConfirm}`}
                        onClick={() => handleConfirmRemove(member.id)}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        className={`${styles.memberActionBtn} ${styles.memberActionBtnCancel}`}
                        onClick={handleCancelRemove}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.memberRemoveBtn}
                      onClick={() => handleRemoveClick(member.id)}
                      aria-label={`Eliminar a ${member.name}`}
                    >
                      <svg
                        className={styles.memberRemoveIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  )
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
