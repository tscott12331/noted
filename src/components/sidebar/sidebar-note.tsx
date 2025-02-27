import SidebarNoteReg from './sidebar-note-reg';
import SidebarNoteMin from './sidebar-note-min';
export interface SidebarNoteProps {
    title: string;
    minimized: boolean;
    handleRemove: (title: string) => void;
}
export default function SidebarNote({
    title,
    minimized,
    handleRemove,
}: SidebarNoteProps) {
    return (
        minimized ? (
        <SidebarNoteMin title={title} handleRemove={handleRemove}/>
        )
        : (
        <SidebarNoteReg title={title} handleRemove={handleRemove}/>
        )
    );
}


