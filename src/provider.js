import { AuthProvider } from "./context/auth";
import { VideoProvider } from "./context/videos";
import { PlaylistProvider } from "./context/playlist";

export function Provider({ children }) {
    return (
        <AuthProvider>
            <VideoProvider>
                <PlaylistProvider>
                    {children}
                </PlaylistProvider>
            </VideoProvider>
        </AuthProvider>
    )
}