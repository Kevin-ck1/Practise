"""Price update

Revision ID: b91d32ffe03a
Revises: f6d115450664
Create Date: 2023-02-05 00:10:06.650620

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b91d32ffe03a'
down_revision = 'f6d115450664'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('price', schema=None) as batch_op:
        batch_op.add_column(sa.Column('supplier_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_price_supplier_id_company'), 'company', ['supplier_id'], ['id'])

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=64), nullable=True))
        batch_op.drop_column('nameP')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nameP', sa.VARCHAR(length=64), nullable=True))
        batch_op.drop_column('name')

    with op.batch_alter_table('price', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_price_supplier_id_company'), type_='foreignkey')
        batch_op.drop_column('supplier_id')

    # ### end Alembic commands ###