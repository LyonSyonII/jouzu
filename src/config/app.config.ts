import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { routes } from "@app/app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideServiceWorker } from "@angular/service-worker";
import { MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      ripple: false,
      theme: {
        preset: customPreset(),
        options: {
          prefix: "p",
          darkModeSelector: ".dark",
        },
      },
    }),
    provideClientHydration(withEventReplay()),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerImmediately:30000",
    }),
    MessageService,
  ],
};

function customPreset() {
  return definePreset(Aura, {
    semantic: {
      colorScheme: {
        light: {
          primary: {
            color: "var(--primary)",
            inverseColor: "var(--primary-foreground)",
            hoverColor: "var(--primary)",
            activeColor: "var(--primary)",
          },
          highlight: {
            background: "var(--primary)",
            focusBackground: "var(--primary)",
            color: "var(--primary-foreground)",
            focusColor: "var(--primary-foreground)",
          },
          content: {
            background: "var(--card)",
            hoverBackground: "var(--muted)",
            borderColor: "var(--border)",
            color: "var(--card-foreground)",
          },
          formField: {
            background: "var(--input)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            focusBorderColor: "var(--ring)",
          },
        },
        dark: {
          primary: {
            color: "var(--primary)",
            inverseColor: "var(--primary-foreground)",
            hoverColor: "var(--primary)",
            activeColor: "var(--primary)",
          },
          highlight: {
            background: "var(--primary)",
            focusBackground: "var(--primary)",
            color: "var(--primary-foreground)",
            focusColor: "var(--primary-foreground)",
          },
          content: {
            background: "var(--card)",
            hoverBackground: "var(--muted)",
            borderColor: "var(--border)",
            color: "var(--card-foreground)",
          },
          formField: {
            background: "var(--input)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
            focusBorderColor: "var(--ring)",
          },
        },
      },
    },
    components: {
      // Explicitly target the Divider component to enforce your border variable
      divider: {
        colorScheme: {
          light: {
            root: { borderColor: "var(--border)" },
          },
          dark: {
            root: { borderColor: "var(--border)" },
          },
        },
      },
      togglebutton: {
              colorScheme: {
                light: {
                  root: {
                    background: "var(--input)",
                    hoverBackground: "var(--muted)",
                    checkedBackground: "var(--input)",
                    color: "var(--foreground)",
                    hoverColor: "var(--primary)",
                    checkedColor: "var(--primary)",
                    borderColor: "var(--border)",
                    checkedBorderColor: "var(--primary)",
                  },
                  icon: {
                    color: "var(--foreground)",
                    hoverColor: "var(--foreground)",
                    checkedColor: "var(--primary-foreground)",
                  }
                },
                dark: {
                  root: {
                    background: "var(--input)",
                    hoverBackground: "var(--muted)",
                    checkedBackground: "var(--input)",
                    color: "var(--foreground)",
                    hoverColor: "var(--primary)",
                    checkedColor: "var(--primary)",
                    borderColor: "var(--border)",
                    checkedBorderColor: "var(--primary)",
                  },
                  icon: {
                    color: "var(--foreground)",
                    hoverColor: "var(--foreground)",
                    checkedColor: "var(--primary-foreground)",
                  }
                }
        },
      },
    },
  });
}
