import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3} from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_iam as iam } from "aws-cdk-lib";
import { AnyPrincipal } from 'aws-cdk-lib/aws-iam';

export class ZzzImgStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zzzimgBucket = new s3.Bucket(this, 'zzzimg-storage', {
      // s3 configs
    });

    const zzzimgUser = new iam.User(this, "zzzimg user", {});

    const uploadFunctionExecutionRole = new iam.Role(this, "upload function execution role", {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
      ]
    });
    const uploadFunction = new lambda.Function(this, "uploadImage", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset("src/lambdas"),
      handler: "upload.handler",
      role: uploadFunctionExecutionRole
    });

    const uploadFunctionUrl = uploadFunction.addFunctionUrl();
    uploadFunctionUrl.grantInvokeUrl(zzzimgUser);

    zzzimgBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [zzzimgBucket.arnForObjects('*')],
      principals: [new AnyPrincipal()]
    }));
    zzzimgBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject', 's3:GetObjectAttributes', 's3:PutObject'],
      resources: [zzzimgBucket.arnForObjects('*')],
      principals: [uploadFunctionExecutionRole]
    }));
    zzzimgBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:PutObject'],
      resources: [zzzimgBucket.arnForObjects('*')],
      principals: [zzzimgUser]
    }));

    new CfnOutput(this, 'functionUrl', { value: uploadFunctionUrl.url });
    new CfnOutput(this, 's3 bucket arn', { value: zzzimgBucket.bucketArn });
  }
}
