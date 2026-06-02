import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  ErrorHandler,
  Injectable,
  inject,
} from "@angular/core";
import { provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";
import AuraBase from "@primeuix/themes/aura/base";
import AuraButton from "@primeuix/themes/aura/button";
import AuraCheckbox from "@primeuix/themes/aura/checkbox";
import AuraDivider from "@primeuix/themes/aura/divider";
import AuraInputText from "@primeuix/themes/aura/inputtext";
import AuraMessage from "@primeuix/themes/aura/message";
import AuraSkeleton from "@primeuix/themes/aura/skeleton";
import AuraToast from "@primeuix/themes/aura/toast";
import AuraToggleButton from "@primeuix/themes/aura/togglebutton";
import AuraTooltip from "@primeuix/themes/aura/tooltip";
// import AuraAccordion from "@primeuix/themes/aura/accordion";
// import AuraAutoComplete from "@primeuix/themes/aura/autocomplete";
// import AuraAvatar from "@primeuix/themes/aura/avatar";
// import AuraBadge from "@primeuix/themes/aura/badge";
// import AuraBlockUI from "@primeuix/themes/aura/blockui";
// import AuraBreadcrumb from "@primeuix/themes/aura/breadcrumb";
// import AuraCard from "@primeuix/themes/aura/card";
// import AuraCarousel from "@primeuix/themes/aura/carousel";
// import AuraCascadeSelect from "@primeuix/themes/aura/cascadeselect";
// import AuraChip from "@primeuix/themes/aura/chip";
// import AuraColorPicker from "@primeuix/themes/aura/colorpicker";
// import AuraConfirmDialog from "@primeuix/themes/aura/confirmdialog";
// import AuraConfirmPopup from "@primeuix/themes/aura/confirmpopup";
// import AuraContextMenu from "@primeuix/themes/aura/contextmenu";
// import AuraDataTable from "@primeuix/themes/aura/datatable";
// import AuraDataView from "@primeuix/themes/aura/dataview";
// import AuraDatePicker from "@primeuix/themes/aura/datepicker";
// import AuraDialog from "@primeuix/themes/aura/dialog";
// import AuraDock from "@primeuix/themes/aura/dock";
// import AuraDrawer from "@primeuix/themes/aura/drawer";
// import AuraEditor from "@primeuix/themes/aura/editor";
// import AuraFieldset from "@primeuix/themes/aura/fieldset";
// import AuraFileUpload from "@primeuix/themes/aura/fileupload";
// import AuraFloatLabel from "@primeuix/themes/aura/floatlabel";
// import AuraGalleria from "@primeuix/themes/aura/galleria";
// import AuraIconField from "@primeuix/themes/aura/iconfield";
// import AuraIftaLabel from "@primeuix/themes/aura/iftalabel";
// import AuraImage from "@primeuix/themes/aura/image";
// import AuraImageCompare from "@primeuix/themes/aura/imagecompare";
// import AuraInlineMessage from "@primeuix/themes/aura/inlinemessage";
// import AuraInplace from "@primeuix/themes/aura/inplace";
// import AuraInputChips from "@primeuix/themes/aura/inputchips";
// import AuraInputGroup from "@primeuix/themes/aura/inputgroup";
// import AuraInputNumber from "@primeuix/themes/aura/inputnumber";
// import AuraInputOtp from "@primeuix/themes/aura/inputotp";
// import AuraKnob from "@primeuix/themes/aura/knob";
// import AuraListbox from "@primeuix/themes/aura/listbox";
// import AuraMegaMenu from "@primeuix/themes/aura/megamenu";
// import AuraMenu from "@primeuix/themes/aura/menu";
// import AuraMenubar from "@primeuix/themes/aura/menubar";
// import AuraMeterGroup from "@primeuix/themes/aura/metergroup";
// import AuraMultiSelect from "@primeuix/themes/aura/multiselect";
// import AuraOrderList from "@primeuix/themes/aura/orderlist";
// import AuraOrganizationChart from "@primeuix/themes/aura/organizationchart";
// import AuraOverlayBadge from "@primeuix/themes/aura/overlaybadge";
// import AuraPaginator from "@primeuix/themes/aura/paginator";
// import AuraPanel from "@primeuix/themes/aura/panel";
// import AuraPanelMenu from "@primeuix/themes/aura/panelmenu";
// import AuraPassword from "@primeuix/themes/aura/password";
// import AuraPickList from "@primeuix/themes/aura/picklist";
// import AuraPopover from "@primeuix/themes/aura/popover";
// import AuraProgressBar from "@primeuix/themes/aura/progressbar";
// import AuraProgressSpinner from "@primeuix/themes/aura/progressspinner";
// import AuraRadioButton from "@primeuix/themes/aura/radiobutton";
// import AuraRating from "@primeuix/themes/aura/rating";
// import AuraRipple from "@primeuix/themes/aura/ripple";
// import AuraScrollPanel from "@primeuix/themes/aura/scrollpanel";
// import AuraSelect from "@primeuix/themes/aura/select";
// import AuraSelectButton from "@primeuix/themes/aura/selectbutton";
// import AuraSlider from "@primeuix/themes/aura/slider";
// import AuraSpeedDial from "@primeuix/themes/aura/speeddial";
// import AuraSplitButton from "@primeuix/themes/aura/splitbutton";
// import AuraSplitter from "@primeuix/themes/aura/splitter";
// import AuraStepper from "@primeuix/themes/aura/stepper";
// import AuraSteps from "@primeuix/themes/aura/steps";
// import AuraTabMenu from "@primeuix/themes/aura/tabmenu";
// import AuraTabs from "@primeuix/themes/aura/tabs";
// import AuraTabView from "@primeuix/themes/aura/tabview";
// import AuraTag from "@primeuix/themes/aura/tag";
// import AuraTerminal from "@primeuix/themes/aura/terminal";
// import AuraTextarea from "@primeuix/themes/aura/textarea";
// import AuraTieredMenu from "@primeuix/themes/aura/tieredmenu";
// import AuraTimeline from "@primeuix/themes/aura/timeline";
// import AuraToggleSwitch from "@primeuix/themes/aura/toggleswitch";
// import AuraToolbar from "@primeuix/themes/aura/toolbar";
// import AuraTree from "@primeuix/themes/aura/tree";
// import AuraTreeSelect from "@primeuix/themes/aura/treeselect";
// import AuraTreeTable from "@primeuix/themes/aura/treetable";
// import AuraVirtualScroller from "@primeuix/themes/aura/virtualscroller";
import { routes } from "@app/app.routes";
import { provideClientHydration } from "@angular/platform-browser";
// import { provideServiceWorker } from "@angular/service-worker";
import { provideAngularSvgIcon } from "angular-svg-icon";
import { MessageService } from "primeng/api";
import { Preset } from "@primeuix/themes/types";
import { QuicklinkStrategy, quicklinkProviders } from "ngx-quicklink";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { GlobalErrorHandler } from "@services/error.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    quicklinkProviders,
    provideRouter(routes, withPreloading(QuicklinkStrategy), withComponentInputBinding()),
    provideHttpClient(withFetch()),
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
    provideClientHydration(),
    // provideServiceWorker("ngsw-worker.js", {
    //   enabled: !isDevMode(),
    //   registrationStrategy: "registerImmediately:30000",
    // }),
    MessageService,
  ],
};

function customPreset() {
  const aura = {
    ...AuraBase,
    components: {
      button: AuraButton,
      checkbox: AuraCheckbox,
      divider: AuraDivider,
      inputtext: AuraInputText,
      message: AuraMessage,
      skeleton: AuraSkeleton,
      toast: AuraToast,
      togglebutton: AuraToggleButton,
      tooltip: AuraTooltip,
      // accordion: AuraAccordion,
      // autocomplete: AuraAutoComplete,
      // avatar: AuraAvatar,
      // badge: AuraBadge,
      // blockui: AuraBlockUI,
      // breadcrumb: AuraBreadcrumb,
      // card: AuraCard,
      // carousel: AuraCarousel,
      // cascadeselect: AuraCascadeSelect,
      // chip: AuraChip,
      // colorpicker: AuraColorPicker,
      // confirmdialog: AuraConfirmDialog,
      // confirmpopup: AuraConfirmPopup,
      // contextmenu: AuraContextMenu,
      // datatable: AuraDataTable,
      // dataview: AuraDataView,
      // datepicker: AuraDatePicker,
      // dialog: AuraDialog,
      // dock: AuraDock,
      // drawer: AuraDrawer,
      // editor: AuraEditor,
      // fieldset: AuraFieldset,
      // fileupload: AuraFileUpload,
      // floatlabel: AuraFloatLabel,
      // galleria: AuraGalleria,
      // iconfield: AuraIconField,
      // iftalabel: AuraIftaLabel,
      // image: AuraImage,
      // imagecompare: AuraImageCompare,
      // inlinemessage: AuraInlineMessage,
      // inplace: AuraInplace,
      // inputchips: AuraInputChips,
      // inputgroup: AuraInputGroup,
      // inputnumber: AuraInputNumber,
      // inputotp: AuraInputOtp,
      // knob: AuraKnob,
      // listbox: AuraListbox,
      // megamenu: AuraMegaMenu,
      // menu: AuraMenu,
      // menubar: AuraMenubar,
      // metergroup: AuraMeterGroup,
      // multiselect: AuraMultiSelect,
      // orderlist: AuraOrderList,
      // organizationchart: AuraOrganizationChart,
      // overlaybadge: AuraOverlayBadge,
      // paginator: AuraPaginator,
      // panel: AuraPanel,
      // panelmenu: AuraPanelMenu,
      // password: AuraPassword,
      // picklist: AuraPickList,
      // popover: AuraPopover,
      // progressbar: AuraProgressBar,
      // progressspinner: AuraProgressSpinner,
      // radiobutton: AuraRadioButton,
      // rating: AuraRating,
      // ripple: AuraRipple,
      // scrollpanel: AuraScrollPanel,
      // select: AuraSelect,
      // selectbutton: AuraSelectButton,
      // slider: AuraSlider,
      // speeddial: AuraSpeedDial,
      // splitbutton: AuraSplitButton,
      // splitter: AuraSplitter,
      // stepper: AuraStepper,
      // steps: AuraSteps,
      // tabmenu: AuraTabMenu,
      // tabs: AuraTabs,
      // tabview: AuraTabView,
      // tag: AuraTag,
      // terminal: AuraTerminal,
      // textarea: AuraTextarea,
      // tieredmenu: AuraTieredMenu,
      // timeline: AuraTimeline,
      // toggleswitch: AuraToggleSwitch,
      // toolbar: AuraToolbar,
      // tree: AuraTree,
      // treeselect: AuraTreeSelect,
      // treetable: AuraTreeTable,
      // virtualscroller: AuraVirtualScroller,
    },
  } satisfies Preset;

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

  return definePreset(aura, {
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
            light: { ...config },
            dark: { ...config },
          },
        },
      ]),
    ),
  });
}
