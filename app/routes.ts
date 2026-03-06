import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { APP_ROUTES } from "./route-registry";

export default
    APP_ROUTES.map(r => {
        if (r.index) return index(r.file)
        return route(r.path, r.file)
    }) satisfies RouteConfig;
