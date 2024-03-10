from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
    User(
        username='Demo-Lition',
        first_name="Demo",
        last_name="Lition",
        email='demo@aa.io',
        password='password',
        birthdate=date(1990,1,1),
        bio="Demo fella that loves Goggbook",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/Demo-prof-pic.jpg',
    ),
    User(
        username='Marnie',
        first_name="Marnie",
        last_name="Smith",
        email='marnie@aa.io',
        password='password',
        birthdate=date(1991,5,15),
        bio="My name is Marnie and I love coding",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/M-prof-pic.png',
    ),
    User(
        username='Bobbie',
        first_name="Bobbie",
        last_name="Johnson",
        email='bobbie@aa.io',
        password='password',
        birthdate=date(1992,12,4),
        bio="I'm Bobbie and this is my bio",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/B-prof-pic.png',
    ),
    User(
        username='akim',
        first_name="Aileen",
        last_name="Kim",
        email='aileenkim@gmail.com',
        password='password1',
        birthdate=date(1998,2,21),
        bio="a/A '23",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/A-prof-pic.png',
    ),
    User(
        username='zmarediya',
        first_name="Zaineb",
        last_name="Marediya",
        email='zainebmarediya@gmail.com',
        password='password2',
        birthdate=date(1998,4,14),
        bio="a/A '23",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/Z-prof-pic.png'
    ),
    User(
        username='rgoggin',
        first_name="Ryan",
        last_name="Goggin",
        email='ryangoggin@gmail.com',
        password='password3',
        birthdate=date(1998,6,26),
        bio="Brown '20, a/A '23",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/R-prof-pic.png'
    ),
    User(
        username='kleong',
        first_name="Ken",
        last_name="Leong",
        email='kenleong@gmail.com',
        password='password4',
        birthdate=date(1998,10,5),
        bio="a/A '23",
        profile_pic='https://goggbook-aws-2.s3.amazonaws.com/K-prof-pic.png'
    )
    ]

    db.session.add_all(users)
    db.session.commit()
    return users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
