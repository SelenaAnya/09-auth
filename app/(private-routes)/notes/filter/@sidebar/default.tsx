import css from "./SidebarNotes.module.css";
import Link from "next/link";

const tags: string[] = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
];
  
export default function NotesSidebar() {
    return (
        <>
        <ul className={css.menuList}>
            <li className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/All`}>
                All notes
            </Link>
            </li>
            {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
                </Link>
            </li>
            ))}
        </ul>
        </>
    );
    };

