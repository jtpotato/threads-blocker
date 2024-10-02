DROP TABLE IF EXISTS blocked_users;
CREATE TABLE IF NOT EXISTS blocked_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    blocked_times INTEGER NOT NULL
    );
INSERT INTO blocked_users (username, blocked_times) VALUES ('ekaniyereo', 1);