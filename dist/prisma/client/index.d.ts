import { PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<{
    log: ("info" | "query" | "warn" | "error")[];
    errorFormat: "minimal";
}, "info" | "query" | "warn" | "error", import("@prisma/client/runtime/library").DefaultArgs>;
export default prisma;
//# sourceMappingURL=index.d.ts.map