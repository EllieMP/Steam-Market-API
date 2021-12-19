CREATE DATABASE IF NOT EXISTS eparker_cs355fa21;
USE eparker_cs355fa21;

DROP TABLE IF EXISTS MKT_trade_items;
DROP TABLE IF EXISTS MKT_item;
DROP TABLE IF EXISTS MKT_trade;
DROP TABLE IF EXISTS MKT_ban;
DROP TABLE IF EXISTS MKT_user;
DROP TABLE IF EXISTS MKT_bot;


CREATE TABLE IF NOT EXISTS MKT_bot (
    steam_id varchar(30),
    bot_status tinyint,
    PRIMARY KEY (steam_id)
);

CREATE TABLE IF NOT EXISTS MKT_user (
    steam_id varchar(30), -- User's steam ID
    trade_url varchar(150), -- User's tradeurl
    balance int DEFAULT 0,

    PRIMARY KEY (steam_id)
);

CREATE TABLE IF NOT EXISTS MKT_user_tags (
    steam_id varchar(30),
    tag varchar(30)
);

CREATE TABLE IF NOT EXISTS MKT_ban (
    ban_start timestamp DEFAULT CURRENT_TIMESTAMP, -- NODEJS code is already configured to use timestamps instead of time
    ban_length int, -- Ban length in seconds
    ban_reason varchar(300), -- Brief explenation of ban reason
    user_steam_id varchar(30) UNIQUE, -- Bans should clear after they end.

    PRIMARY KEY (user_steam_id),
    FOREIGN KEY (user_steam_id) 
        REFERENCES MKT_user(steam_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MKT_item (
    app_id varchar(15), -- Leaves room for future steam game appIDs
    context_id varchar(10), -- Stored as a string to avoid confusion with NODEJS code
    asset_id varchar(50),
    amount int,
    market_name varchar(512), -- Max item market_name found
    class_id varchar(50),
    instance_id varchar(50),
    bot_id varchar(30),

    PRIMARY KEY (app_id, context_id, asset_id),
    FOREIGN KEY (bot_id)
        REFERENCES MKT_bot(steam_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MKT_trade(
    trade_id varchar(100),
    trade_time timestamp, -- NODEJS code is already configured to use timestamps instead of time
    trade_status int, -- Could be an ENUM, but int future proofs this attribute
    bot_id varchar(30),
    partner_id varchar(30),

    PRIMARY KEY (trade_id),
    FOREIGN KEY (bot_id)
        REFERENCES MKT_bot(steam_id),
    FOREIGN KEY (partner_id)
        REFERENCES MKT_user(steam_id)
);

CREATE TABLE IF NOT EXISTS MKT_trade_items(
    trade_id varchar(100),
    app_id varchar(15),
    context_id varchar(10),
    asset_id varchar(50),

    FOREIGN KEY (trade_id)
        REFERENCES MKT_trade(trade_id),
    FOREIGN KEY (app_id, context_id, asset_id)
        REFERENCES MKT_item(app_id, context_id, asset_id)
);
--/home/student/ellieparker/cs355/project2/.git/
-- View shows all users with a trade_url
CREATE OR REPLACE VIEW MKT_users_with_url AS SELECT * FROM MKT_user WHERE trade_url IS NOT NULL;