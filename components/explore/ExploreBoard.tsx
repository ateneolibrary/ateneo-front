"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createLibraryMetricEvent,
  exploreClubs,
  getExploreViewerCategories,
  getNearestLibraries,
} from "@/components/mock-app/explore";
import type {
  ExploreClub,
  ExploreLibrary,
  ExploreLibraryMetricEvent,
  ExploreViewerMode,
} from "@/components/mock-app/types";
import styles from "./ExploreBoard.module.css";

const MAX_SELECTED_CATEGORIES = 5;
const PAGE_SIZE = 4;

const ALL_CATEGORIES = Array.from(
  new Set(exploreClubs.flatMap((club) => club.categories)),
).sort((first, second) => first.localeCompare(second));

const compareByName = (first: ExploreClub, second: ExploreClub) => first.name.localeCompare(second.name);

const countCommonCategories = (club: ExploreClub, viewerCategories: string[]) => {
  if (viewerCategories.length === 0) {
    return 0;
  }

  return club.categories.filter((category) => viewerCategories.includes(category)).length;
};

function sortInPersonClubs(clubs: ExploreClub[], viewerMode: ExploreViewerMode, viewerCategories: string[]) {
  return [...clubs].sort((first, second) => {
    const distanceDiff = first.distanceKm - second.distanceKm;
    if (distanceDiff !== 0) {
      return distanceDiff;
    }

    if (viewerMode === "authenticated") {
      const overlapDiff =
        countCommonCategories(second, viewerCategories) - countCommonCategories(first, viewerCategories);
      if (overlapDiff !== 0) {
        return overlapDiff;
      }
    } else {
      const createdAtDiff = Date.parse(first.createdAt) - Date.parse(second.createdAt);
      if (createdAtDiff !== 0) {
        return createdAtDiff;
      }
    }

    return compareByName(first, second);
  });
}

function sortOnlineClubs(clubs: ExploreClub[], viewerMode: ExploreViewerMode, viewerCategories: string[]) {
  return [...clubs].sort((first, second) => {
    if (viewerMode === "authenticated") {
      const overlapDiff =
        countCommonCategories(second, viewerCategories) - countCommonCategories(first, viewerCategories);
      if (overlapDiff !== 0) {
        return overlapDiff;
      }

      const createdAtDiff = Date.parse(first.createdAt) - Date.parse(second.createdAt);
      if (createdAtDiff !== 0) {
        return createdAtDiff;
      }
    } else {
      const createdAtDiff = Date.parse(first.createdAt) - Date.parse(second.createdAt);
      if (createdAtDiff !== 0) {
        return createdAtDiff;
      }
    }

    return compareByName(first, second);
  });
}

type ClubFilterParams = {
  includeFullClubs: boolean;
  selectedCategories: string[];
  bookQuery: string;
  normalizedQuery: string;
  shouldApplyNameFilter: boolean;
};

const paginateClubs = (clubs: ExploreClub[], currentPage: number, pageSize: number) => {
  const start = (currentPage - 1) * pageSize;
  return clubs.slice(start, start + pageSize);
};

const matchesClubFilters = (club: ExploreClub, filters: ClubFilterParams) => {
  const { includeFullClubs, selectedCategories, bookQuery, normalizedQuery, shouldApplyNameFilter } = filters;

  if (!includeFullClubs && club.members === club.maxMembers) {
    return false;
  }

  if (selectedCategories.length > 0) {
    const hasCategoryMatch = selectedCategories.some((category) => club.categories.includes(category));
    if (!hasCategoryMatch) {
      return false;
    }
  }

  if (bookQuery && !club.currentBook.toLowerCase().includes(bookQuery)) {
    return false;
  }

  if (shouldApplyNameFilter && !club.name.toLowerCase().includes(normalizedQuery)) {
    return false;
  }

  return true;
};

const getCapacityPercent = (club: ExploreClub) => {
  if (club.maxMembers <= 0) {
    return 0;
  }

  return Math.round((club.members / club.maxMembers) * 100);
};

const getCapacityFillColor = (capacityPercent: number) => {
  const clampedPercent = Math.max(0, Math.min(capacityPercent, 100));
  const ratio = clampedPercent / 100;

  const start = { red: 52, green: 74, blue: 62 };
  const end = { red: 193, green: 18, blue: 31 };

  const red = Math.round(start.red + (end.red - start.red) * ratio);
  const green = Math.round(start.green + (end.green - start.green) * ratio);
  const blue = Math.round(start.blue + (end.blue - start.blue) * ratio);

  return `rgb(${red}, ${green}, ${blue})`;
};

const getCategoryToneClassName = (
  category: string,
  viewerCategories: string[],
  selectedCategories: string[],
) => {
  const matchesViewerCategories = viewerCategories.includes(category);
  const matchesSelectedFilters = selectedCategories.includes(category);

  if (matchesViewerCategories && matchesSelectedFilters) {
    return styles.clubCategoryDualMatch;
  }

  if (matchesSelectedFilters) {
    return styles.clubCategoryFilterMatch;
  }

  if (matchesViewerCategories) {
    return styles.clubCategoryViewerMatch;
  }

  return "";
};

type ClubSectionPaginationProps = {
  sectionLabel: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
};

function ClubSectionPagination({ sectionLabel, currentPage, totalPages, onPageChange }: ClubSectionPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label={`Paginacion de ${sectionLabel}`}>
      <Button
        type="button"
        variant="outline"
        className={styles.paginationArrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={`Pagina anterior de ${sectionLabel}`}
      >
        {"<"}
      </Button>

      <div className={styles.pageControls}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <Button
              key={`${sectionLabel}-page-${page}`}
              type="button"
              variant={isActive ? "default" : "outline"}
              className={`${styles.pageButton} ${isActive ? styles.pageButtonActive : ""}`}
              aria-label={`Ir a pagina ${page} de ${sectionLabel}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        className={styles.paginationArrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={`Pagina siguiente de ${sectionLabel}`}
      >
        {">"}
      </Button>
    </nav>
  );
}

type SectionIconProps = {
  kind: "inPerson" | "online" | "libraries" | "map";
};

type SectionTagProps = {
  kind: SectionIconProps["kind"];
  label: string;
};

function SectionIcon({ kind }: SectionIconProps) {
  if (kind === "inPerson") {
    return (
      <svg viewBox="0 0 24 24" className={styles.sectionIcon} aria-hidden="true" focusable="false">
        <path d="M12 3a6 6 0 0 0-6 6c0 4.13 6 12 6 12s6-7.87 6-12a6 6 0 0 0-6-6Zm0 8.25A2.25 2.25 0 1 1 12 6.75a2.25 2.25 0 0 1 0 4.5Z" />
      </svg>
    );
  }

  if (kind === "online") {
    return (
      <svg viewBox="0 0 24 24" className={styles.sectionIcon} aria-hidden="true" focusable="false">
        <path d="M3 5h18v12H3V5Zm2 2v8h14V7H5Zm4 12h6v2H9z" />
      </svg>
    );
  }

  if (kind === "libraries") {
    return (
      <svg viewBox="0 0 24 24" className={styles.sectionIcon} aria-hidden="true" focusable="false">
        <path d="M4 4h4v16H4V4Zm6 0h4v16h-4V4Zm6 0h4v16h-4V4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={styles.sectionIcon} aria-hidden="true" focusable="false">
      <path d="M3 4h18v14H3V4Zm2 2v10h14V6H5Zm4 14h6v2H9z" />
    </svg>
  );
}

function SectionTag({ kind, label }: SectionTagProps) {
  return (
    <span className={styles.sectionTag}>
      <SectionIcon kind={kind} />
      <span>{label}</span>
    </span>
  );
}

export function ExploreBoard() {
  const viewerMode: ExploreViewerMode = "authenticated";
  const [includeFullClubs, setIncludeFullClubs] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [bookQuery, setBookQuery] = useState<string>("");
  const [clubNameQuery, setClubNameQuery] = useState<string>("");
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(true);
  const [applyFiltersToInPerson, setApplyFiltersToInPerson] = useState<boolean>(true);
  const [applyFiltersToOnline, setApplyFiltersToOnline] = useState<boolean>(true);
  const [inPersonCurrentPage, setInPersonCurrentPage] = useState<number>(1);
  const [onlineCurrentPage, setOnlineCurrentPage] = useState<number>(1);
  const [selectedLibrary, setSelectedLibrary] = useState<ExploreLibrary | null>(null);
  const [libraryEvents, setLibraryEvents] = useState<ExploreLibraryMetricEvent[]>([]);

  const viewerCategories = useMemo(() => getExploreViewerCategories(viewerMode), [viewerMode]);

  const normalizedQuery = clubNameQuery.trim().toLowerCase();
  const normalizedBookQuery = bookQuery.trim().toLowerCase();
  const shouldApplyNameFilter = normalizedQuery.length > 3;
  const hasActiveFilters =
    includeFullClubs ||
    selectedCategories.length > 0 ||
    normalizedBookQuery.length > 0 ||
    shouldApplyNameFilter;

  const filterParams = useMemo<ClubFilterParams>(
    () => ({
      includeFullClubs,
      selectedCategories,
      bookQuery: normalizedBookQuery,
      normalizedQuery,
      shouldApplyNameFilter,
    }),
    [includeFullClubs, normalizedBookQuery, normalizedQuery, selectedCategories, shouldApplyNameFilter],
  );

  const rankedInPersonClubs = useMemo(() => {
    const inPerson = exploreClubs.filter((club) => club.mode === "Presencial");
    return sortInPersonClubs(inPerson, viewerMode, viewerCategories);
  }, [viewerCategories, viewerMode]);

  const rankedOnlineClubs = useMemo(() => {
    const online = exploreClubs.filter((club) => club.mode === "Online");
    return sortOnlineClubs(online, viewerMode, viewerCategories);
  }, [viewerCategories, viewerMode]);

  const inPersonSource = useMemo(() => {
    if (!applyFiltersToInPerson) {
      return rankedInPersonClubs;
    }

    return rankedInPersonClubs.filter((club) => matchesClubFilters(club, filterParams));
  }, [applyFiltersToInPerson, filterParams, rankedInPersonClubs]);

  const onlineSource = useMemo(() => {
    if (!applyFiltersToOnline) {
      return rankedOnlineClubs;
    }

    return rankedOnlineClubs.filter((club) => matchesClubFilters(club, filterParams));
  }, [applyFiltersToOnline, filterParams, rankedOnlineClubs]);

  const inPersonTotalPages = Math.max(1, Math.ceil(inPersonSource.length / PAGE_SIZE));
  const onlineTotalPages = Math.max(1, Math.ceil(onlineSource.length / PAGE_SIZE));

  const effectiveInPersonCurrentPage = Math.min(inPersonCurrentPage, inPersonTotalPages);
  const effectiveOnlineCurrentPage = Math.min(onlineCurrentPage, onlineTotalPages);

  const inPersonClubs = useMemo(
    () => paginateClubs(inPersonSource, effectiveInPersonCurrentPage, PAGE_SIZE),
    [effectiveInPersonCurrentPage, inPersonSource],
  );

  const onlineClubs = useMemo(
    () => paginateClubs(onlineSource, effectiveOnlineCurrentPage, PAGE_SIZE),
    [effectiveOnlineCurrentPage, onlineSource],
  );

  const nearestLibraries = useMemo(() => getNearestLibraries(5), []);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((previous) => {
      if (previous.includes(category)) {
        return previous.filter((item) => item !== category);
      }

      if (previous.length >= MAX_SELECTED_CATEGORIES) {
        return previous;
      }

      return [...previous, category];
    });
  };

  const handleLibraryClick = (library: ExploreLibrary) => {
    setSelectedLibrary(library);
    setLibraryEvents((previous) => [
      createLibraryMetricEvent(library.id, viewerMode, "list-item"),
      ...previous,
    ]);
  };

  const handleMapPinClick = (library: ExploreLibrary) => {
    setSelectedLibrary(library);
    setLibraryEvents((previous) => [createLibraryMetricEvent(library.id, viewerMode, "map-pin"), ...previous]);
  };

  const lastLibraryEvent = libraryEvents[0];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={`${styles.contentLayout} ${!isFiltersVisible ? styles.contentLayoutExpanded : ""}`}
        >
          <section className={styles.resultsColumn} aria-label="Resultados de clubes">
            <div className={styles.resultsToolbar}>
              <Button
                type="button"
                variant={hasActiveFilters ? "default" : "outline"}
                className={`${styles.filtersToggle} ${hasActiveFilters ? styles.filtersToggleActive : ""}`}
                aria-pressed={isFiltersVisible}
                aria-controls="explore-filters-panel"
                aria-label={isFiltersVisible ? "Ocultar filtros" : "Mostrar filtros"}
                title={isFiltersVisible ? "Ocultar filtros" : "Mostrar filtros"}
                onClick={() => setIsFiltersVisible((previous) => !previous)}
              >
                <FunnelIcon />
                <span className={styles.srOnly}>{isFiltersVisible ? "Ocultar filtros" : "Mostrar filtros"}</span>
              </Button>
            </div>

            <Card className={styles.listCard}>
              <div className={styles.sectionHeader}>
                <h2>
                  <SectionTag kind="inPerson" label="PRESENCIAL" />
                </h2>
                <p>
                  Ranking por proximidad y afinidad. Página {effectiveInPersonCurrentPage} de {inPersonTotalPages} · pageSize=
                  {PAGE_SIZE}
                </p>
                {!applyFiltersToInPerson ? (
                  <small className={styles.filterNotice}>Filtros desactivados para presenciales: se muestra ranking base.</small>
                ) : null}
              </div>

              <ul className={styles.clubList}>
                {inPersonClubs.length === 0 ? (
                  <li className={styles.emptyState}>No hay clubes presenciales para estos filtros.</li>
                ) : (
                  inPersonClubs.map((club) => {
                    const capacityPercent = getCapacityPercent(club);
                    const clampedCapacityPercent = Math.min(capacityPercent, 100);
                    const capacityTooltip = `${club.members}/${club.maxMembers} miembros`;

                    return (
                      <li key={club.id} className={styles.clubItem}>
                        <div className={styles.clubCoverFrame}>
                          <Image
                            src={club.bookCover}
                            alt={`Tapa de ${club.currentBook}`}
                            width={88}
                            height={124}
                            className={styles.clubCover}
                          />
                        </div>

                        <div className={styles.clubBody}>
                          <div className={styles.clubHeaderRow}>
                            <h3>{club.name}</h3>
                            <div className={styles.readingBlock}>
                              <p className={styles.readingLabel}>Lectura actual</p>
                              <p className={styles.readingTitle}>{club.currentBook}</p>
                            </div>
                          </div>

                          <p className={styles.clubDescription} title={club.description}>
                            {club.description}
                          </p>

                          <p className={styles.clubMeta}>{`${club.address} · ${club.city} · ${club.distanceKm.toFixed(1)} km`}</p>

                          <ul className={styles.clubCategories} aria-label={`Categorias de ${club.name}`}>
                            {club.categories.map((category) => {
                              const toneClassName = getCategoryToneClassName(
                                category,
                                viewerCategories,
                                selectedCategories,
                              );

                              return (
                                <li
                                  key={`${club.id}-${category}`}
                                  className={`${styles.clubCategory} ${toneClassName}`}
                                >
                                  {category}
                                </li>
                              );
                            })}
                          </ul>

                          <div className={styles.clubStats}>
                            <div className={styles.capacityTrackWrapper}>
                              <div
                                className={styles.capacityTrack}
                                role="progressbar"
                                tabIndex={0}
                                aria-label={`Capacidad de ${club.name}`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={clampedCapacityPercent}
                                aria-valuetext={`${club.members} de ${club.maxMembers} miembros`}
                              >
                                <span
                                  className={styles.capacityFill}
                                  style={{
                                    width: `${clampedCapacityPercent}%`,
                                    backgroundColor: getCapacityFillColor(clampedCapacityPercent),
                                  }}
                                />
                              </div>
                              <span className={styles.capacityTooltip} role="status">
                                {capacityTooltip}
                              </span>
                            </div>
                            <span className={styles.capacityText}>{capacityPercent}% capacidad</span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <ClubSectionPagination
                sectionLabel="clubes presenciales"
                currentPage={effectiveInPersonCurrentPage}
                totalPages={inPersonTotalPages}
                onPageChange={(nextPage) => setInPersonCurrentPage(Math.min(Math.max(nextPage, 1), inPersonTotalPages))}
              />
            </Card>

            <Card className={styles.listCard}>
              <div className={styles.sectionHeader}>
                <h2>
                  <SectionTag kind="online" label="ONLINE" />
                </h2>
                <p>
                  Ranking por afinidad y antiguedad. Página {effectiveOnlineCurrentPage} de {onlineTotalPages} · pageSize=
                  {PAGE_SIZE}
                </p>
                {!applyFiltersToOnline ? (
                  <small className={styles.filterNotice}>Filtros desactivados para online: se muestra ranking base.</small>
                ) : null}
              </div>

              <ul className={styles.clubList}>
                {onlineClubs.length === 0 ? (
                  <li className={styles.emptyState}>No hay clubes online para estos filtros.</li>
                ) : (
                  onlineClubs.map((club) => {
                    const capacityPercent = getCapacityPercent(club);
                    const clampedCapacityPercent = Math.min(capacityPercent, 100);
                    const capacityTooltip = `${club.members}/${club.maxMembers} miembros`;

                    return (
                      <li key={club.id} className={styles.clubItem}>
                        <div className={styles.clubCoverFrame}>
                          <Image
                            src={club.bookCover}
                            alt={`Tapa de ${club.currentBook}`}
                            width={88}
                            height={124}
                            className={styles.clubCover}
                          />
                        </div>

                        <div className={styles.clubBody}>
                          <div className={styles.clubHeaderRow}>
                            <h3>{club.name}</h3>
                            <div className={styles.readingBlock}>
                              <p className={styles.readingLabel}>Lectura actual</p>
                              <p className={styles.readingTitle}>{club.currentBook}</p>
                            </div>
                          </div>

                          <p className={styles.clubDescription} title={club.description}>
                            {club.description}
                          </p>

                          <p className={styles.clubMeta}>{`${club.address} · ${club.city}`}</p>

                          <ul className={styles.clubCategories} aria-label={`Categorias de ${club.name}`}>
                            {club.categories.map((category) => {
                              const toneClassName = getCategoryToneClassName(
                                category,
                                viewerCategories,
                                selectedCategories,
                              );

                              return (
                                <li
                                  key={`${club.id}-${category}`}
                                  className={`${styles.clubCategory} ${toneClassName}`}
                                >
                                  {category}
                                </li>
                              );
                            })}
                          </ul>

                          <div className={styles.clubStats}>
                            <div className={styles.capacityTrackWrapper}>
                              <div
                                className={styles.capacityTrack}
                                role="progressbar"
                                tabIndex={0}
                                aria-label={`Capacidad de ${club.name}`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={clampedCapacityPercent}
                                aria-valuetext={`${club.members} de ${club.maxMembers} miembros`}
                              >
                                <span
                                  className={styles.capacityFill}
                                  style={{
                                    width: `${clampedCapacityPercent}%`,
                                    backgroundColor: getCapacityFillColor(clampedCapacityPercent),
                                  }}
                                />
                              </div>
                              <span className={styles.capacityTooltip} role="status">
                                {capacityTooltip}
                              </span>
                            </div>
                            <span className={styles.capacityText}>{capacityPercent}% capacidad</span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <ClubSectionPagination
                sectionLabel="clubes online"
                currentPage={effectiveOnlineCurrentPage}
                totalPages={onlineTotalPages}
                onPageChange={(nextPage) => setOnlineCurrentPage(Math.min(Math.max(nextPage, 1), onlineTotalPages))}
              />
            </Card>

            <section className={styles.librariesHub} aria-labelledby="libraries-title">
              <Card className={styles.librariesPanel}>
                <div className={styles.sectionHeader}>
                  <h2 id="libraries-title">
                    <SectionTag kind="libraries" label="LIBRERIAS CERCANAS" />
                  </h2>
                  <p>Top 5 por distancia. Selecciona una para registrar evento local mock.</p>
                </div>

                <div className={styles.libraryLayout}>
                  <ul className={styles.libraryList}>
                    {nearestLibraries.map((library) => {
                      const isSelected = selectedLibrary?.id === library.id;

                      return (
                        <li key={library.id}>
                          <Button
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className={`${styles.libraryButton} ${isSelected ? styles.libraryButtonActive : ""}`}
                            onClick={() => handleLibraryClick(library)}
                          >
                            <strong>{library.name}</strong>
                            <span>{library.address}</span>
                            <small>{library.distanceKm.toFixed(1)} km · {library.phone}</small>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>

                  <aside className={styles.libraryDetail} aria-live="polite">
                    {selectedLibrary ? (
                      <>
                        <h3>{selectedLibrary.name}</h3>
                        <p>{selectedLibrary.address}</p>
                        <p>{selectedLibrary.phone}</p>
                        <p>
                          Coordenadas: {selectedLibrary.geo.lat}, {selectedLibrary.geo.lng}
                        </p>
                      </>
                    ) : (
                      <p>Selecciona una libreria para ver detalle y registrar evento.</p>
                    )}

                    <div className={styles.metricBlock}>
                      <p>Eventos capturados: {libraryEvents.length}</p>
                      {lastLibraryEvent ? (
                        <small>
                          Ultimo: {lastLibraryEvent.libraryId} · {lastLibraryEvent.source} · {lastLibraryEvent.viewerMode}
                        </small>
                      ) : (
                        <small>Todavia no hay eventos.</small>
                      )}
                    </div>
                  </aside>
                </div>
              </Card>

              <Card className={styles.mapPrep} aria-labelledby="map-prep-title">
                <div className={styles.sectionHeader}>
                  <h2 id="map-prep-title">
                    <SectionTag kind="map" label="MAPA (PROXIMAMENTE)" />
                  </h2>
                  <p>La estructura de pines ya queda lista para integrar el mapa real sin rehacer la UI.</p>
                </div>

                <div className={styles.mapCanvas} role="img" aria-label="Vista previa de pines en mapa">
                  {nearestLibraries.map((library, index) => {
                    const isSelected = selectedLibrary?.id === library.id;

                    return (
                      <Button
                        key={library.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className={`${styles.mapPin} ${isSelected ? styles.mapPinActive : ""}`}
                        onClick={() => handleMapPinClick(library)}
                        style={{
                          left: `${18 + index * 16}%`,
                          top: `${18 + (index % 3) * 22}%`,
                        }}
                        aria-label={`Registrar evento map-pin para ${library.name}`}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>

                <ul className={styles.pinGrid}>
                  {nearestLibraries.map((library, index) => (
                    <li key={library.id} className={styles.pinCard}>
                      <p>Pin {index + 1}</p>
                      <strong>{library.name}</strong>
                      <span>
                        {library.geo.lat}, {library.geo.lng}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </section>

          {isFiltersVisible ? (
            <aside className={styles.filters} id="explore-filters-panel" aria-labelledby="explore-filters-title">
              <div className={styles.sectionHeader}>
                <h2 id="explore-filters-title">Filtros</h2>
                <p>El filtro por nombre se activa cuando escribis mas de 3 caracteres.</p>
              </div>

              <div className={styles.scopePanel}>
                <p>Aplicar filtros en:</p>

                <ToggleRow
                  id="apply-inperson"
                  label="Presenciales"
                  checked={applyFiltersToInPerson}
                  onToggle={(checked) => {
                    setApplyFiltersToInPerson(checked);
                    setInPersonCurrentPage(1);
                  }}
                />

                <ToggleRow
                  id="apply-online"
                  label="Online"
                  checked={applyFiltersToOnline}
                  onToggle={(checked) => {
                    setApplyFiltersToOnline(checked);
                    setOnlineCurrentPage(1);
                  }}
                />
              </div>

              <label className={styles.searchBar} htmlFor="club-name-query">
                <span className={styles.searchIcon} aria-hidden="true">
                  ⌕
                </span>
                <Input
                  id="club-name-query"
                  className={styles.searchInput}
                  type="text"
                  value={clubNameQuery}
                  onChange={(event) => {
                    setClubNameQuery(event.target.value);
                    setInPersonCurrentPage(1);
                    setOnlineCurrentPage(1);
                  }}
                  placeholder="Buscar club (min 4 letras)"
                />
              </label>

              <label className={styles.searchBar} htmlFor="book-query">
                <span className={styles.searchIcon} aria-hidden="true">
                  ⌕
                </span>
                <Input
                  id="book-query"
                  className={styles.searchInput}
                  type="text"
                  value={bookQuery}
                  onChange={(event) => {
                    setBookQuery(event.target.value);
                    setInPersonCurrentPage(1);
                    setOnlineCurrentPage(1);
                  }}
                  placeholder="Libro actual (coincidencia parcial)"
                />
              </label>

              <ToggleRow
                id="include-full-clubs"
                label="Incluir clubes completos"
                checked={includeFullClubs}
                onToggle={(checked) => {
                  setIncludeFullClubs(checked);
                  setInPersonCurrentPage(1);
                  setOnlineCurrentPage(1);
                }}
              />

              <div className={styles.categoryBlock}>
                <p>
                  Categorias ({selectedCategories.length}/{MAX_SELECTED_CATEGORIES})
                </p>
                <div className={styles.categoryList}>
                  {ALL_CATEGORIES.map((category) => {
                    const isActive = selectedCategories.includes(category);
                    const isBlocked = selectedCategories.length >= MAX_SELECTED_CATEGORIES && !isActive;

                    return (
                      <Button
                        key={category}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        className={`${styles.categoryChip} ${isActive ? styles.categoryChipActive : ""}`}
                        onClick={() => {
                          handleCategoryToggle(category);
                          setInPersonCurrentPage(1);
                          setOnlineCurrentPage(1);
                        }}
                        disabled={isBlocked}
                        aria-pressed={isActive}
                      >
                        {category}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
}

type ToggleRowProps = {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
};

function ToggleRow({ id, label, checked, onToggle }: ToggleRowProps) {
  return (
    <div className={styles.toggleRow}>
      <span id={`${id}-label`}>{label}</span>
      <Button
        id={id}
        type="button"
        variant="outline"
        className={`${styles.toggleButton} ${checked ? styles.toggleButtonOn : ""}`}
        onClick={() => onToggle(!checked)}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
      >
        <span className={styles.toggleThumb} />
      </Button>
    </div>
  );
}

function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.funnelIcon} aria-hidden="true" focusable="false">
      <path d="M3 4h18l-7 8v6l-4 2v-8L3 4Z" />
    </svg>
  );
}
