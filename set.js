const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNrWjl6OVhOZTUwem5wcGxKeE13N0RKK0xpSHZJY1VicEVQcHU0OEdYbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTBQVE94QTNla0lqajB2TVljdktzbkdMRUxyWnduam1qaUdnekVFNFFBZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRVNDNEJha0E4L3pLd0NTR0haR21kR1AvWFdDQThaelhnWGxWSk1hQUdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMZmowYlVjY1UwU1NTN3U0Qit0V3EweVp0dGxVYVhhRzlPNGNLQm1aYzBnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllJbDFhRWVwRjhzbUNub3BRZDRaejdBVGFHOWcvaUgvZ1NSRDdjQmtjVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpEMEpkZVpvV3FlQ05rb01kaUVBSkxsaS9tKytNY3NOTmMyWTg0RmU1ajQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NNdEtvNlZud2NrRnBvaWlQUUtibWNZcjN4dXpnaVlrT1FXaFZlT3ozZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzVZYXJmRWlNMU56RHhZcE8xeFRFa3JnNjZWNFVHUWR6UDNuZWZNMERBWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InYydVExSnRxVW9sT08xRm1vQUdWTzFZSXBDcW1OT2F6T0FJOEN2dVZ4VXZ3d1EzQ0YzdVRvZklaMjRGdkk2ZzE3ejdYMlZuM0RJbVVTOGtPdnJyQ2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJUMXN5RGhTTkZKOUIzQUs1cE0xOVdhK0M1VjkzTmFGeHpTU2lrQ1g4STEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxNTEwNjYxMTdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0EyRjE5RjdGMkM4MzVFM0Y5RTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNTM2MzE5M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTE1MTA2NjExN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTZBODY0QkM3RkIwQzZFMDE4MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1MzYzMTk2fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxaVgyZ1JjeFRuU0NDVVc0dk9UYktnIiwicGhvbmVJZCI6IjllNTczYzRlLTRjNjItNDk2MC05MmRmLTU0ZmRkODk2MmUxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGaGdIcUFoSkt1bmlhZHl1UzlTZVpVZFVCTmM9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpyWldub0ZkTnQ0RWx0TjcwelNpbkNrODk4dz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01lbHZ1TUlFT3E2K2JFR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNraithR3Y3bUJ0WEQxUjlKRFpsWTdPaTd4bU81eERUakpPQmlpdko4bUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtDTzR2cG9Za3lPQzVnbUEwdTBpSEZRajZXcXlRWjdjQVlnYWRHbWRHNHFhUVU4eG9VUHJKY3BFbHYyS042Z3h3RGFnby9EYnpVSENiNnFKa0ZpckRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqenZPTGVaRmIwdDBRRk43Qy8xWVlKb2pDSE5FSVRSb0tRYkU1djdZQm83TjlBbGFtaGhGcjFVYXNkdjZ1b0VONktEL2k0TzUzVHNZeEtvWnhnR2lodz09In0sIm1lIjp7ImlkIjoiMjM0OTE1MTA2NjExNzoxMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDeXBoZXIgw4xsw6lyw61vbMO6d2Eg8J+NgPCfko7inaTvuI/wn5OMIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNTEwNjYxMTc6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXBJL21ocis1Z2JWdzlVZlNRMlpXT3pvdThaanVjUTA0eVRnWW9yeWZKZyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE1MzYzMTkwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZrYiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Cypher Ilerioluwa",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2349151066117",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'false',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
