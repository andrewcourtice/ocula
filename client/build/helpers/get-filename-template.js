export default function(extension = 'js') {
    const hash = process.env.NODE_ENV === 'development' ? 'hash' : 'contenthash';

    return `[name]-[${hash}].${extension}`;
}