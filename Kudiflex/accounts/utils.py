from .models import Transaction

def add_transaction(user, transaction_type, amount):
    Transaction.objects.create(
        user=user,
        transaction_type=transaction_type,
        amount=amount
    )
