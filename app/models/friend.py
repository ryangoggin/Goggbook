from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'friendId': self.friend_id
        }
