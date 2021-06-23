export interface Resources {
    id?: string;
    title?: string;
    banner?: string;
    description?: string;
    authors?: string[],
    type?: string;
    category?: string;
    language?: string,
    keywords?: string[];
    fieldKnowledge?: string;
    license?: string;
    university?: string;
    plataform?: string;
    country?: string
    creationDate?: Date;
    url?: string;
    updateDate?: Date;
    isPublic?: boolean;
}
