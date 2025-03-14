import styles from './sidebar-toggle.module.css';
import Image from 'next/image'

export interface SidebarToggleProps {
    handleToggle: () => void;
}
export default function SidebarToggle({
    handleToggle
}: SidebarToggleProps) {
    return (
        <div className={styles.sidebarToggle} onClick={handleToggle}>
            <Image src="/panel-symbol.png" alt="t" width={256} height={256}/>
        </div>
    )
}
