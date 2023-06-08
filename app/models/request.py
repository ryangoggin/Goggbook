from .db import db, environment, SCHEMA, add_prefix_for_prod

class Request(db.Model):
    __tablename__ = 'requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    sender_user = db.relationship('User', foreign_keys=[sender_id], lazy=True)
    receiver_user = db.relationship('User', foreign_keys=[receiver_id], lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'senderId': self.sender_id,
            'receiverId': self.receiver_id,
            'senderUser': self.sender_user.to_dict(),
            'receiverUser': self.receiver_user.to_dict()
        }

    def to_sender_name(self):
        return {
            'first_name': self.sender_user.first_name,
            'last_name': self.sender_user.last_name
        }

    def to_receiver_name(self):
        return {
            'first_name': self.receiver_user.first_name,
            'last_name': self.receiver_user.last_name
        }
