export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export function getStrapiImage(img: Image, format: 'large' | 'medium' | 'small' | 'thumbnail' = 'large'): {url: string, width: number, height: number, alt: string} {
    const defaultImg = 'https://placehold.co/600x400'
    if (img == null) {
        return {
            url: defaultImg,
            width: 600,
            height: 400,
            alt: ''
        };
    }

    if (img.formats[format]) {
        return {
            url: getStrapiMedia(img.formats[format].url) ?? defaultImg,
            width: img.formats[format].width,
            height: img.formats[format].height,
            alt: img.alternativeText
        }
    } else {
        const order = ['large', 'medium', 'small', 'thumbnail']

        order.forEach(format => {
            if (img.formats[format]) {
                return {
                    url: getStrapiMedia(img.formats[format].url),
                    width: img.formats[format].width,
                    height: img.formats[format].height,
                    alt: img.alternativeText
                }
            }
        })
    }

     return {
            url: defaultImg,
            width: 600,
            height: 400,
            alt: ''
        };

}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));