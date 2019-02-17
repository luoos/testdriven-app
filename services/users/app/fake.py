from faker import Faker

from . import db
from .models import Post


fake = Faker()


def posts(count=50):
    for i in range(count):
        p = Post(title=fake.sentence(),
                 content=fake.text(2000),
                 created_time=fake.past_date(),
                 last_updated_time=fake.past_date('-20d'))
        db.session.add(p)
    db.session.commit()
