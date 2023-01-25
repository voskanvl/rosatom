export default function listDisabledElementToScroll({ target }: Event) {
    const dcc = (target as HTMLElement).closest<HTMLElement>(".data-center__list");
    dcc &&
        console.log(
            "🚀 ~ dcc.scrollHeight, dcc.scrollTop , dcc.offsetHeight",
            dcc.scrollHeight,
            dcc.scrollTop,
            dcc.offsetHeight,
            dcc.scrollTop + dcc.offsetHeight,
        );
    return (
        (target as HTMLElement).closest(".news-feed__list") ||
        (dcc && dcc.scrollHeight !== dcc.scrollTop + dcc.offsetHeight) ||
        (target as HTMLElement).closest(".service-card__list")
    );
}
