from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():

    # to make querying for friends easier, both friend/user id combinations are entered/deleted into the db together (ex: user_id=1, friend_id=2 and user_id=2, friend_id=1)
    friends = [
    Friend(
        user_id=1,
        friend_id=2
    ),
    Friend(
        user_id=2,
        friend_id=1
    ),
    Friend(
        user_id=1,
        friend_id=3
    ),
    Friend(
        user_id=3,
        friend_id=1
    ),
    Friend(
        user_id=1,
        friend_id=4
    ),
    Friend(
        user_id=4,
        friend_id=1
    ),
    Friend(
        user_id=1,
        friend_id=5
    ),
    Friend(
        user_id=5,
        friend_id=1
    ),
    Friend(
        user_id=1,
        friend_id=6
    ),
    Friend(
        user_id=6,
        friend_id=1
    ),
    Friend(
        user_id=1,
        friend_id=7
    ),
    Friend(
        user_id=7,
        friend_id=1
    ),
    Friend(
        user_id=2,
        friend_id=3
    ),
    Friend(
        user_id=3,
        friend_id=2
    ),
    Friend(
        user_id=4,
        friend_id=5
    ),
    Friend(
        user_id=5,
        friend_id=4
    ),
    Friend(
        user_id=4,
        friend_id=6
    ),
    Friend(
        user_id=6,
        friend_id=4
    ),
    Friend(
        user_id=4,
        friend_id=7
    ),
    Friend(
        user_id=7,
        friend_id=4
    ),
    Friend(
        user_id=5,
        friend_id=6
    ),
    Friend(
        user_id=6,
        friend_id=5
    ),
    Friend(
        user_id=5,
        friend_id=7
    ),
    Friend(
        user_id=7,
        friend_id=5
    ),
    Friend(
        user_id=6,
        friend_id=7
    ),
    Friend(
        user_id=7,
        friend_id=6
    ),
    ]

    db.session.add_all(friends)
    db.session.commit()
    return friends


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
