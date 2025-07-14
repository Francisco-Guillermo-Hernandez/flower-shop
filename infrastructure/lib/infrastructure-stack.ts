import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration, RestApi, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { Cors } from 'aws-cdk-lib/aws-apigateway';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * 
     */
    const TRPCLambdaFunction = new Function(this, 'trpc-lambda-handler', {
      runtime: Runtime.NODEJS_22_X,
      handler: 'server.handler',
      code: Code.fromAsset(join(__dirname, '../../backend/production/')),
      memorySize: 128,
      timeout: cdk.Duration.minutes(1),
      environment: {
        MODE:  'production',
        MONGODB_URI_DEV: process.env.MONGODB_URI_DEV ?? '',
      }
    });


    /**
     * 
     */
    const api = new LambdaRestApi(this, 'flower-shop-api-trpc', {
      handler: TRPCLambdaFunction,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: ['localhost'],
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    });


    /**
     * 
     */
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
    });
  }
}
