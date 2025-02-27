import SidebarAdd from './sidebar-add';
import SidebarToggle from './sidebar-toggle';
import styles from './sidebar-controls.module.css';

export interface SidebarControlsProps {
    handleToggle: () => void;
    handleAdd: () => void;
    minimized: boolean;
}
export default function SidebarControls({
    handleToggle,
    handleAdd,
    minimized,
}: SidebarControlsProps) {
    return (
        <div className={styles.sidebarControls}>
            <SidebarToggle handleToggle={handleToggle}/>
            {!minimized &&
                <SidebarAdd handleAdd={handleAdd} />
            }
        </div>
    )
}
