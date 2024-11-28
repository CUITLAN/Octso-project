import { Injectable } from '@nestjs/common';
import * as Aws from "@aws-sdk/client-s3"
import { response } from 'express';

@Injectable()
export class AwsService {

    private s3 = new Aws.S3Client({
        region:  " us-east-1",
        credentials:{
            accessKeyId: process.env.accessKeyBucket,
            secretAccessKey: process.env.secretKeyBucket,

        }
    })

    async uploadFile(file: Express.Multer.File){
        const key = file.originalname
        const url = (`https://nest-ocso-test-cuitlan.s3.us-east-1.amazonaws.com/${key}`)
        const bucket = "nest-ocso-test-cuitlan"
        const command = new Aws.PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket,
        })
        await this.s3.send(command)
        return url;
    }
}
