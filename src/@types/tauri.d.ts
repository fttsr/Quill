export interface Tauri {
    window: {
        minimize: () => void;
        toggleMaximize: () => void;
        close: () => void;
    };
    app: {
        exit: () => void;
    };
}

declare global {
    interface Window {
        __TAURI__: Tauri;
    }
}