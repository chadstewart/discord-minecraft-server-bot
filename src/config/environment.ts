import { z } from "zod";
import { fromZodError } from "zod-validation-error";
 
const envVariables = z.object({
  DISCORD_TOKEN: z.string().nonempty(),
  RCON_HOST:  z.string().nonempty(),
  RCON_PASS: z.string().nonempty(),
  RCON_PORT: z.string().nonempty().transform(value => parseInt(value)),
  SUPER_ROLE_IDS: z.string().transform(val => val.split(","))
});
 
try {
  envVariables.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const validationError = fromZodError(err)
    console.log(`${validationError}`)
    throw new Error("Bot failed to start")
  }
}
 
declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}