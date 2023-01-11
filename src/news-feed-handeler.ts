interface TargetData {
    img: HTMLElement | null;
    text: HTMLElement | null;
    date: HTMLElement | null;
}

function copyData(source: TargetData, dist: TargetData) {
    if (["img", "text", "date"].some(e => !(e in source)))
        throw Error("source haven't required properties");
    if (["img", "text", "date"].some(e => !(e in dist)))
        throw Error("dist haven't required properties");
    dist.img!.setAttribute("src", source.img!.innerText);
    dist.text!.innerHTML = source.text!.innerHTML;
    dist.date!.innerHTML = source.date!.innerHTML;
}

export default function newsFeedHandler() {
    const feedList = document.querySelector<HTMLElement>(".news-feed__list");
    !!feedList &&
        feedList?.addEventListener("click", ({ target }: MouseEvent) => {
            const item = (target as HTMLElement).closest<HTMLElement>(".news-feed__list-item");
            if (!item) return;

            const targetData: TargetData = { img: null, text: null, date: null };
            const sourceData: TargetData = { img: null, text: null, date: null };

            targetData.img = document.querySelector<HTMLElement>(".news__image");
            targetData.text = document.querySelector<HTMLElement>(".news__text");
            targetData.date = document.querySelector<HTMLElement>(".news__date");

            sourceData.img = item.querySelector<HTMLElement>(".news-feed__itemdata-img");
            sourceData.text = item.querySelector<HTMLElement>(".news-feed__itemdata-text");
            sourceData.date = item.querySelector<HTMLElement>(".news-feed__itemdata-date");

            copyData(sourceData, targetData);
        });
}
