import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none"
        })
    ],
    server: {
        allowedHosts: ["5173-calimapp-keycloakcss-i5eet9o80wk.ws-eu118.gitpod.io"]
    }
});
