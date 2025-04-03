// i LOVE upvalues
const titleMinLen = 1;
const titleMaxLen = 256;

export const validateNoteTitle = (title: string): boolean => {
    if(!title) return false;

    const titleLen = title.length;
    return !(titleLen < titleMinLen || titleLen > titleMaxLen);
}
