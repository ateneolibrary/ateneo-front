import styles from "./ClubDashboard.module.css";

type ListPanelProps = {
  title: string;
  items: string[];
};

export default function ListPanel({ title, items }: ListPanelProps) {
  return (
    <section className={styles.listPanel}>
      <h3 className={styles.listTitle}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
