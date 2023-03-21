from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_comments():

    comments = [
    Comment(
        user_id=6,
        post_id=1,
        content="Hey Demo! Long time no see, how are you?",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Comment(
        user_id=4,
        post_id=2,
        content="Cool! Looking forward to them.",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Comment(
        user_id=7,
        post_id=2,
        content="Nice",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Comment(
        user_id=3,
        post_id=3,
        content="That is a very cool cat, thanks for sharing.",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Comment(
        user_id=2,
        post_id=4,
        content="Sunsets are the best.",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Comment(
        user_id=5,
        post_id=5,
        content="I don't think they've posted it yet.",
        created_at=date(2023,3,20),
        updated_at=date(2023,3,20)
    ),
    Comment(
        user_id=4,
        post_id=6,
        content="Me too!",
        created_at=date(2023,3,19),
        updated_at=date(2023,3,19)
    ),
    Comment(
        user_id=5,
        post_id=7,
        content="Going on a weekend trip!",
        created_at=date(2023,3,17),
        updated_at=date(2023,3,17)
    ),
    Comment(
        user_id=7,
        post_id=7,
        content="Definitely gonna be catching up on sleep after that PixelPal project.",
        created_at=date(2023,3,17),
        updated_at=date(2023,3,17)
    ),
    Comment(
        user_id=6,
        post_id=8,
        content="An LMS in 2023? Wild.",
        created_at=date(2023,3,16),
        updated_at=date(2023,3,16)
    )
    ]

    db.session.add_all(comments)
    db.session.commit()
    return comments


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
