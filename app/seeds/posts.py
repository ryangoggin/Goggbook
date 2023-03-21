from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_posts():

    posts = [
    Post(
        user_id=1,
        content="Hello Goggbook! This is my first post, looking forward to connecting with and talking with my friends!",
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Post(
        user_id=6,
        content="Working on two new features for y'all (requests and direct) get ready for them next week!",
        post_pic='https://ih1.redbubble.net/image.805682878.5807/raf,750x1000,075,t,FFFFFF:97ab1c12de.u1.jpg',
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Post(
        user_id=2,
        content="Look at my cat!",
        post_pic='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg',
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Post(
        user_id=3,
        content="Went to the beach last weekend, look at how pretty this sunset was",
        post_pic='https://i.pinimg.com/736x/c8/d6/bc/c8d6bc6ad3b08172bdbc1665f3ed080b.jpg',
        created_at=date(2023,3,21),
        updated_at=date(2023,3,21)
    ),
    Post(
        user_id=4,
        content="Does anyone know if the practice assessment's been posted yet?",
        created_at=date(2023,3,20),
        updated_at=date(2023,3,20)
    ),
    Post(
        user_id=5,
        content="So excited to be graduating from App Academy in April!",
        created_at=date(2023,3,19),
        updated_at=date(2023,3,19)
    ),
    Post(
        user_id=6,
        content="Anyone have fun plans for the weekend?",
        created_at=date(2023,3,17),
        updated_at=date(2023,3,17)
    ),
    Post(
        user_id=7,
        content="LMS for a truth is",
        created_at=date(2023,3,16),
        updated_at=date(2023,3,16)
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
