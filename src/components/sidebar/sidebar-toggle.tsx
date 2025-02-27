import styles from './sidebar-toggle.module.css';

export interface SidebarToggleProps {
    handleToggle: () => void;
}
export default function SidebarToggle({
    handleToggle
}: SidebarToggleProps) {
    return (
        <div className={styles.sidebarToggle} onClick={handleToggle}>t</div>
    )
}
