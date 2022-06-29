CREATE TABLE users (
    id varchar(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone varchar(100) NOT NULL,
    photo varchar(255),
    UNIQUE (email)
);

ALTER TABLE users 
ADD CONSTRAINT users_id_pk
PRIMARY KEY (id);

CREATE TABLE recipes (
    id varchar(255) not null,
    title VARCHAR(255) NOT NULL,
    image varchar(255) not null,
    ingredient text NOT NULL,
    video varchar(255) not null,
    id_user varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    post_at timestamp default current_timestamp,
    UNIQUE (id)
);

CREATE TABLE saved (
    id SERIAL NOT NULL,
    id_user varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_recipe varchar(255) not null REFERENCES recipes (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE likes (
    id SERIAL NOT NULL,
    id_user varchar(255) not null REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id_recipe varchar(255) not null REFERENCES recipes (id) ON DELETE CASCADE ON UPDATE CASCADE
);