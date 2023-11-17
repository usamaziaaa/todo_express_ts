import dotenv from 'dotenv';
dotenv.config();

export const config = {
  Port: process.env.PORT_NUMBER,
  Users: {
    filePath: process.env.USERS_FILE_PATH,
  },
  JWT: {
    key: process.env.SECRET_KEY,
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  Todos:{
    filePath: process.env.TODOS_FILE_PATH,
  }
};