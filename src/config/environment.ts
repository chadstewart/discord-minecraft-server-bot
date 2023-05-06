import { z } from "zod";
 
const envVariables = z.object({
  DISCORD_TOKEN: z.string().nonempty(),
  RCON_HOST:  z.string().nonempty(),
  RCON_PASS: z.string().nonempty(),
  RCON_PORT: z.number().default(25575),
  SUPER_ROLE_IDS: z.string().transform(val => val.split(","))
});
 
envVariables.parse(process.env);
 
declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}