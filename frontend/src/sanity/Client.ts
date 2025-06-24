import { createClient } from "@sanity/client";

export const Client = createClient({
    projectId:'c4hzuxqf',
    dataset:'production',
    apiVersion:'2025-06-24',
    useCdn:true,
});