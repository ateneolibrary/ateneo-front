import { CreateClubForm } from "@/components/create-club";
import styles from "./page.module.css";

export default function CreateClubPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CreateClubForm />
      </main>
    </div>
  );
}
