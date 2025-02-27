import styles from './sidebar-add.module.css';

export interface SidebarAddProps {
    handleAdd: () => void;
}

export default function SidebarAdd({
    handleAdd,
}: SidebarAddProps) {
    return (
        <div className={styles.sidebarAdd} onClick={handleAdd}>p</div>
    )
}
