import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { routes } from "@app/app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideServiceWorker } from "@angular/service-worker";
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { MessageService } from "primeng/api";
import { Preset } from "@primeuix/themes/types";

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
    provideAngularSvgIcon(),
    provideClientHydration(withEventReplay()),
    // provideServiceWorker("ngsw-worker.js", {
    //   enabled: !isDevMode(),
    //   registrationStrategy: "registerImmediately:30000",
    // }),
    MessageService,
  ],
};

function customPreset() {
  const preset = {
    semantic: {
      root: {
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
    components: {
      divider: {
        root: {
          borderColor: "var(--border)",
        },
      },
      togglebutton: {
        root: {
          background: "var(--input)",
          hoverBackground: "var(--muted)",
          checkedBackground: "var(--input)",
          color: "var(--foreground)",
          hoverColor: "var(--primary)",
          checkedColor: "var(--primary)",
          borderColor: "transparent",
          checkedBorderColor: "transparent",
          // borderColor: "var(--border)",
          // checkedBorderColor: "var(--primary)",
        },
        icon: {
          color: "var(--foreground)",
          hoverColor: "var(--foreground)",
          checkedColor: "var(--primary-foreground)",
        },
      },
      tooltip: {
        root: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        },
      },
      checkbox: {
        root: {
          borderColor: "var(--input-muted)",
          hoverBorderColor: "var(--primary)",
        },
      },
    },
  } satisfies Preset;

  return definePreset(Aura, {
    semantic: {
      colorScheme: {
        light: { ...preset.semantic.root },
        dark: { ...preset.semantic.root },
      },
    },
    components: Object.fromEntries(
      Object.entries(preset.components).map(([name, config]) => [
        name,
        {
          colorScheme: {
            light: { root: { ...config.root } },
            dark: { root: { ...config.root } },
          },
        },
      ]),
    ),
  });
}
