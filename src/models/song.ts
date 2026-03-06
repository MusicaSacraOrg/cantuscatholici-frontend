export type SongTag = {
    id: number;
    name: string;
    categoryColor: string;
};

export type Song = {
    id: number;
    title: string;
    authorName?: string;
    tags: SongTag[];
    description?: string;
};

export type SongDetailTag = {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    categoryColor: string;
};

export type RelatedSong = {
    id: number;
    title: string;
};

export type MsczContent = {
    id: number;
    svgUrl?: string;
    pdfUrl?: string;
    msczUrl?: string;
    mp3Url?: string;
};

export type SongDetail = {
    id: number;
    title: string;
    authorName?: string;
    authorId?: number;
    description?: string;
    tags: SongDetailTag[];
    relatedSong?: RelatedSong;
    addedAt?: string;
    lastEditAt?: string;
    hasLyrics?: boolean;
    msczContent?: MsczContent;
};

export type LyricsPart = {
    partType: string;
    lyrics: string;
};

export type SongLyrics = {
    songId: number;
    parts: LyricsPart[];
};
