from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_posts():

    posts = [
    Post(
        user_id=1,
        content="Hello Goggbook! This is my first post, looking forward to connecting with and talking with my friends!",
        created_at=date(2023,4,21),
        updated_at=date(2023,4,21)
    ),
    Post(
        user_id=6,
        content="Working on two new features for y'all get ready for them next week!",
        post_pic='https://goggbook-aws.s3.amazonaws.com/code-post-pic.jpg',
        created_at=date(2023,4,15),
        updated_at=date(2023,4,15)
    ),
    Post(
        user_id=2,
        content="Look at my cat!",
        post_pic='https://goggbook-aws.s3.amazonaws.com/cat-post-pic.jpg',
        created_at=date(2023,4,10),
        updated_at=date(2023,4,10)
    ),
    Post(
        user_id=3,
        content="Went to the beach last weekend, look at how pretty this sunset was",
        post_pic='https://goggbook-aws.s3.amazonaws.com/sunset-post-pic.jpg',
        created_at=date(2023,4,4),
        updated_at=date(2023,4,4)
    ),
    Post(
        user_id=4,
        content="Does anyone know if the practice assessment's been posted yet?",
        created_at=date(2023,4,2),
        updated_at=date(2023,4,2)
    ),
    Post(
        user_id=5,
        content="So excited to be graduating from App Academy in April!",
        created_at=date(2023,3,28),
        updated_at=date(2023,3,28)
    ),
    Post(
        user_id=6,
        content="Anyone have fun plans for the weekend?",
        created_at=date(2023,3,22),
        updated_at=date(2023,3,22)
    ),
    Post(
        user_id=7,
        content="LMS for a truth is",
        created_at=date(2023,3,20),
        updated_at=date(2023,3,20)
    ),
    Post(
        user_id=6,
        content="I really need to get other people to make accounts on here so I'm not just talking to myself",
        created_at=date(2023,3,15),
        updated_at=date(2023,3,15)
    ),
    Post(
        user_id=6,
        content="Welcome to the first post on Goggbook, glad you scrolled your way down here :)",
        created_at=date(2023,3,14),
        updated_at=date(2023,3,14)
    ),
    ]

    db.session.add_all(posts)
    db.session.commit()
    return posts


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
