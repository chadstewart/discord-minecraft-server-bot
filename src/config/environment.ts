import 'dotenv/config';
import { z } from "zod";
import { cleanEnv, makeValidator, num } from 'envalid'

const notEmptyString = makeValidator(x => {
  try {
    z.string().parse(x)
    return x;
  } catch {
    throw new Error('Expected non-empty string')
  }
});

const validateSuperRoles = makeValidator(x => {
  try {
    z.string().parse(x)
    return x.split(',');
  } catch {
    throw new Error('Expected non-empty string')
  }
});

export default cleanEnv(process.env, {
  DISCORD_TOKEN: notEmptyString(),
  RCON_HOST:  notEmptyString(),
  RCON_PASS: notEmptyString(),
  RCON_PORT: num({ default: 25575 }),
  SUPER_ROLE_IDS: validateSuperRoles({ default: [] }),
});