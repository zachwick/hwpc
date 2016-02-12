from yoyo import step

step(
    """
    CREATE TABLE IF NOT EXISTS User (
    id int(10) unsigned not null auto_increment,
    fname varchar(100) not null default "first",
    lname varchar(100) not null default "last",
    address1 varchar(100) not null default "123 Main St.",
    address2 varchar(100) default null,
    city varchar(100) not null default "Anywhere",
    state varchar(2) not null default "MI",
    zip varchar(10) not null default "12345-1234",
    country varchar(3) not null default "USA",
    primary key (id)
    )
    """,

    "DROP TABLE User",
)
