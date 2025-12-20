export async function loadImage(source) {
    const image = document.createElement("img");
    return new Promise((resolve, reject) => {
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.crossOrigin = "anonymous";
        if (typeof source === "string") {
            image.src = source;
        }
        else {
            if (source.crossOrigin !== undefined) {
                image.crossOrigin = source.crossOrigin;
            }
            if (source.referrerPolicy !== undefined) {
                image.referrerPolicy = source.referrerPolicy;
            }
            image.src = source.src;
        }
    });
}
//# sourceMappingURL=load-image.js.map