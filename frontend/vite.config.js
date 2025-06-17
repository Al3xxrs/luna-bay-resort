import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
    plugins: [tailwindcss(), react()],
    server: {
        proxy:
            mode === "development"
                ? {
                      "/api": "http://localhost:18473",
                  }
                : undefined,
    },
}));
