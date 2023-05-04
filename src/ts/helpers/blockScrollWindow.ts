export default function blockScrollWindow(): { block: () => void; unblock: () => void } {
    const block = () => {
        document.body.style.height = "100dvh";
        document.body.style.overflowY = "hidden";
    };

    const unblock = () => {
        document.body.style.height = "";
        document.body.style.overflowY = "";
    };
    return { block, unblock };
}
