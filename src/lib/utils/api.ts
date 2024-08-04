import type { Enclosure } from '$lib/api';

export const findEnclosure = (enclosures: Enclosure[], mime_type: string): Enclosure | undefined => {
    return enclosures.find((enclosure) => enclosure.mime_type.startsWith(mime_type));
};
