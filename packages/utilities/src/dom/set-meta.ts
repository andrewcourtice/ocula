export default function setMeta(key: string, value: string = ''): void {
    let meta = document.querySelector(`meta[name=${key}]`);
    
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', key);
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', value);
} 