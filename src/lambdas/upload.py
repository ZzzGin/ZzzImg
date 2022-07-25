# import boto3;
from ast import dump
import json

def handler(event, context):
    print('request: {}'.format(json.dumps(event)))
    print('context: {}'.format(json.dumps(context)))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/plain'
        },
        'body': 'Hello world! lambda function is invoked.'
    } 