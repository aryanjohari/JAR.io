import boto3
from botocore.exceptions import ClientError

def create_messages_table():
    dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
    try:
        table = dynamodb.create_table(
            TableName='Messages',
            KeySchema=[
                {'AttributeName': 'id', 'KeyType': 'HASH'}
            ],
            AttributeDefinitions=[
                {'AttributeName': 'id', 'AttributeType': 'S'}
            ],
            BillingMode='PAY_PER_REQUEST'
        )
        table.wait_until_exists()
        print("Table 'Messages' created successfully.")
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceInUseException':
            print("Table 'Messages' already exists.")
        else:
            raise e

if __name__ == '__main__':
    create_messages_table()