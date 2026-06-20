export interface SocialProvider {
    id: string;
    label: string;
    icon: string;
}

export const socialProviders: SocialProvider[] = [
    {
        id: "google",
        label: "Continue with Google",
        icon: "logos:google-icon",
    },
    {
        id: "facebook",
        label: "Continue with Facebook",
        icon: "logos:facebook",
    },
    {
        id: "microsoft",
        label: "Continue with Microsoft",
        icon: "logos:microsoft-icon",
    },
    {
        id: "github",
        label: "Continue with Github",
        icon: "mdi:github",
    },
    {
        id: "linkedin",
        label: "Continue with LinkedIn",
        icon: "logos:linkedin-icon",
    },
];