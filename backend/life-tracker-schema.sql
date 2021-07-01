CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  username    TEXT NOT NULL UNIQUE,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()  
);

CREATE TABLE nutrition (
  id          SERIAL PRIMARY KEY,
  food_name   TEXT NOT NULL,
  calories    INT NOT NULL,
  categories  TEXT NOT NULL,
  image       TEXT NOT NULL,
  servings    INT NOT NULL ,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id     INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE userFeed (
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_pic   TEXT NOT NULL
);