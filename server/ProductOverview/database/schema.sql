-- USE product_overview;

DROP TABLE IF EXISTS products, features, styles, photos, skus CASCADE;

CREATE TABLE products(
  product_id serial not null,
  "name" varchar(45),
  slogan varchar(200),
  "description" text,
  category varchar(20),
  default_price int,
  primary key (product_id)
);

CREATE TABLE features(
  feature_id serial not null,
  product_id int not null,
  feature varchar(50),
  "value" varchar(75),
  primary key (feature_id),
  foreign key (product_id) references products (product_id)
);

CREATE TABLE styles(
  style_id serial not null,
  product_id int not null,
  "name" varchar(35),
  sale_price int,
  original_price int,
  "default?" boolean,
  primary key (style_id),
  foreign key (product_id) references products(product_id)
);

CREATE TABLE photos(
  photo_id varchar(13),
  style_id int,
  thumbnail_url text,
  "url" text,
  primary key (photo_id),
  foreign key (style_id) references styles(style_id)
);

CREATE TABLE skus(
  sku_id serial not null,
  style_id int not null,
  size varchar(20),
  quantity int,
  primary key (sku_id),
  foreign key (style_id) references styles (style_id)
);

COPY products(product_id, "name", slogan, "description", category, default_price) FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/product.csv'
DELIMITER ','
CSV HEADER;

COPY styles(style_id, product_id, "name", sale_price, original_price, "default?") FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/styles.csv'
DELIMITER ','
NULL as 'null'
CSV HEADER;

COPY skus(sku_id, style_id, size, quantity) FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos(photo_id, style_id, thumbnail_url, "url") FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/photos.csv'
DELIMITER ','
CSV HEADER;


COPY features(feature_id, product_id, feature, "value") FROM '/Users/Alex/HackReactor/RFP57/SDC/Abuela-Fashion/server/ProductOverview/database/features.csv'
DELIMITER ','
CSV HEADER;
