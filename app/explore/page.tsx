import { ExploreBoard } from "@/components/explore";
import styles from "./page.module.css";

export default function ExplorePage() {
  return (
    <div className={styles.page}>
      <ExploreBoard />
    </div>
  );
}
