#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ZzzImgStack } from '../lib/zzz_img-stack';

const app = new cdk.App();
new ZzzImgStack(app, 'ZzzImgStack');