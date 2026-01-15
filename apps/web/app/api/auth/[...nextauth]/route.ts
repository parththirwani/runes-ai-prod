import { handlers } from "@/app/lib/auth";
console.log("Imported handlers:", handlers); // should NOT be undefined
export const { GET, POST } = handlers;