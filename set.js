const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NjS0VsM1plck9nRXVraTlxUmRHc0NjclZiL2VxZzExdGh4SUtDV2ZrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjFFODFuWXowRWY2eGRHZVoxVWVlcXlyN01aT3RFc21EMDhVSXRabTBpOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQTVKbXFna28wNVBLU210ZXRtQ29tQ2tWeE5SbmZXVm11ZEwzQjJ1UkdNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSHJvWG5SUTZrZW93M2NZUG1rZ3FOT3RxSFBZZ1VtSHBzNEprdldmc0RNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldHdXIxYjNQRFRIV3B0dDloZmZrL3luNGg3OS9JcFdoNnp4WG42L0FsR1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFpMlJ3Wmx2Si8rMVpXSitTZnZaTWtxQStaZktONmxQaVpjdWt0aGRoM0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VJS2c3VllPZU1HR3FGQUt6MWhobHJzVzN3VmduM0xhVzM0ak9oYWdFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmJDWkVEVVNUK3graHN2RVE5bWdwSkhldkVjMGxpWklPWUMxeTN0KzlXYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im03L3QxaDA1UFJwK3UyVWpTVWZmNjFzZThWSlJUQ2V2bnVQN1pjY2UzNnU4OEdsYTd2cU5OTXYwbkJ4SWFUVE5WTFMrY0RlWTNoYk9Tdno5WkxENGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJTdDFBQWIxV3U1aklOVmdYVXcvZjBQRkVIdThuM1hzRDFmZVhpL2RtdjY4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxNTEwNjYxMTdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E2OUQ2OEJGNDQ1QkQ5MTE3N0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNTQzMzcwNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiTmo2UlNiRWtRUkdneVd6MTN5WklCZyIsInBob25lSWQiOiIxOGM1NzU4ZS01MmZiLTQzMmUtOTYzMy1mZTQyOWE5NTFlMWQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHNGRzdsM0FxMHc3TzZ3bUt0WDdKWDFlZXAwPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWRUhCYm5CS3JYMDBTajBrVUhSNlQ2UFQ2Kzg9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNObTg2T1FERU5maC9iRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTa2orYUd2N21CdFhEMVI5SkRabFk3T2k3eG1PNXhEVGpKT0JpaXZKOG1BPSIsImFjY291bnRTaWduYXR1cmUiOiJJOERsWTRQRDRqaE1keEJyNnFSKzUzRFoxRHIwcWlOZm9TbFg5ZzhZRWk0b2Q5WHQ5bUVFM3RVK2J2Z3dQN2dabnBUR1VFN01LcnNqYlc2MzBBcXJBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVmZ0TVNzeVJuRStEdEc3YVlNUTZCTEVTVEdqbVR2YTV0QnlNbjIzN3ZQcU1QVDN6NUtUQVlQbmxMcXJLaGpiZ1hGd2lqSThxNnhlN29GelFvNGYzalE9PSJ9LCJtZSI6eyJpZCI6IjIzNDkxNTEwNjYxMTc6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ3lwaGVyIMOMbMOpcsOtb2zDundhIPCfjYDwn5KO4p2k77iP8J+TjCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTUxMDY2MTE3OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVwSS9taHIrNWdiVnc5VWZTUTJaV096b3U4Wmp1Y1EwNHlUZ1lvcnlmSmcifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTQzMzY5OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEdngifQ==',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Cypher Ilerioluwa🤖🌹🍀",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349151066117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'false',
    BOT : process.env.BOT_NAME || 'ÀKÀNDÉ-MIDÉ-BOT🤖🌹🍀',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/8fed3725a6d912aedc601.jpg',
    MODE: process.env.PUBLIC_MODE || "true",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "true",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'true',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
