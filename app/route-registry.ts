export type AppRoute = {
    path: string;
    file: string;
    label?: string;
    nav?: boolean;
    index?: boolean;
};

export const APP_ROUTES: AppRoute[] = [
    {
        index: true,
        path: "",
        file: "routes/home.tsx",
        label: "Home",
        nav: true,
    },
    {
        path: "grade-analysis",
        file: "routes/grade-analysis/_index.tsx",
        label: "Grade Analysis",
        nav: true,
    },
];