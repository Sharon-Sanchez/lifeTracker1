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
  id              SERIAL PRIMARY KEY,
  food_name       TEXT NOT NULL,
  calories        INT NOT NULL,
  category        TEXT NOT NULL,
  serving_size    INT NOT NULL ,
  user_id         INT NOT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

