function getImgUrl(name, folder) {
    return new URL(`../assets/${folder}/${name}`, import.meta.url);
}

export { getImgUrl };
