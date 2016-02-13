from yoyo import step

step(
    """
    ALTER TABLE User CHANGE zip zipcode varchar(10) not null default '12345-1234'
    """,

    """
    ALTER TABLE User CHANGE zipcode zip varchar(10) not null default '12345-1234'
    """
)
