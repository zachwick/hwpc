from yoyo import step

step(
    """
    ALTER TABLE User ADD COLUMN registerDate timestamp not null default current_timestamp
    """,

    "ALTER TABLE User DROP COLUMN registerDate",
)
