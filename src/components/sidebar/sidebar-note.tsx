import SidebarNoteReg from './sidebar-note-reg';
import SidebarNoteMin from './sidebar-note-min';
export interface SidebarNoteProps {
    title: string;
    minimized: boolean;
    handleRemove: (title: string) => void;
    handleRename: (prevName: string, newName: string) => void;
}
export default function SidebarNote({
    title,
    minimized,
    handleRemove,
    handleRename,
}: SidebarNoteProps) {
    return (
        minimized ? (
        <SidebarNoteMin title={title} handleRemove={handleRemove} handleRename={handleRename}/>
        )
        : (
        <SidebarNoteReg title={title} handleRemove={handleRemove} handleRename={handleRename}/>
        )
    );
}


