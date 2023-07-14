import { createStore } from "zustand/vanilla"
import { devtools } from "zustand/middleware"

interface LockStoreStaate {
    state: boolean
    lock: () => void
    unlock: () => void
}

const burgerStore = createStore<LockStoreStaate, [["zustand/devtools", never]]>(
    devtools(
        set => ({
            state: false,
            lock: () => set(x => ({ ...x, state: true })),
            unlock: () => set(x => ({ ...x, state: false })),
        }),
        { name: "lock" },
    ),
)

export default burgerStore
