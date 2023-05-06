import RconWrapper from "./config/rcon";

export const rcon = new RconWrapper(process.env.RCON_HOST, process.env.RCON_PORT, process.env.RCON_PASS);

export const verifyConnection = async ():Promise<boolean> => {

  const initStatus = await rcon.isConnected();

  let confirmedStatus: boolean = initStatus;

  if (!initStatus) {
    await rcon.connect().catch(console.error);
    confirmedStatus = await rcon.isConnected();
  }

  return confirmedStatus
}