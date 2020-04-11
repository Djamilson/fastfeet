import Sequelize, { Model } from 'sequelize';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const aws = require('aws-sdk');
const s3 = new aws.S3();

function removeObjectS3(key) {
  if (process.env.STORAGE_TYPE == 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
      .promise()
      .then(response => {
        //console.log(response.status);
      })
      .catch(response => {
        //console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'resized', key)
    );
  }
}

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            if (process.env.LOCAL_DOS_ARQUIVOS == 'local') {
              return `${process.env.URL_LOCAL}/files/${this.path}`;
            }
            return `${process.env.URL_S3}/compressed/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    this.addHook('beforeUpdate', async file => {
      removeObjectS3(file.path);
    });

    this.addHook('afterDestroy', async file => {
      removeObjectS3(file.path);
    });

    return this;
  }
}

export default File;
