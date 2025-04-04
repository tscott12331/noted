import SidebarNoteReg from './sidebar-note-reg';
import SidebarNoteMin from './sidebar-note-min';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
export interface SidebarNoteProps {
    title: string;
    minimized: boolean;
    selected: boolean;
    handleRemove: (title: string) => void;
    handleRename: (prevName: string, newName: string) => Promise<void>;
    handleSelect: (title: string) => void;
}
export default function SidebarNote({
    title,
    minimized,
    selected,
    handleRemove,
    handleRename,
    handleSelect,
}: SidebarNoteProps) {
    return (
        minimized ? (
        <SidebarNoteMin title={title}
        handleRemove={handleRemove}
        handleRename={handleRename}
        selected={selected}
        handleSelect={handleSelect}
        />
        )
        : (
        <SidebarNoteReg title={title}
        handleRemove={handleRemove}
        handleRename={handleRename}
        selected={selected}
        handleSelect={handleSelect}
        />
        )
    );
}


