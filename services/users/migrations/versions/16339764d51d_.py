"""empty message

Revision ID: 16339764d51d
Revises: 
Create Date: 2020-11-14 04:52:28.887601

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16339764d51d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'users', ['email'])
    op.create_unique_constraint(None, 'users', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_constraint(None, 'users', type_='unique')
    # ### end Alembic commands ###
