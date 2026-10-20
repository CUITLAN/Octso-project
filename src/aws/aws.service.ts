import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  private s3 = new S3Client({
    region: "us-east-1", 
    endpoint: "http://localhost:9000", 
    forcePathStyle: true, 
    credentials: {
      accessKeyId: process.env.accesskey_bucket,
      secretAccessKey: process.env.secretkey_bucket,
    }
  })

  async uploadFile(file: Express.Multer.File){
    const key =  file.originalname
    const url = `http://localhost:9000/nest-ocso-test/${key}` 
    const bucket = "nest-ocso-test"
    
    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: bucket,
    })
    await this.s3.send(command);
    return url;
  }
}