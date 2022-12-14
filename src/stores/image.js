import { message } from 'antd';
import { observable, action } from 'mobx';
import { Uploader } from '../models';

class ImageStore {
    @observable filename = "";
    @observable file = null;
    @observable isUpoading = false;//上传状态
    @observable serverFile = null;
    @action setFilename(newFilename) {
        this.filename = newFilename;
    }
    @action setFile(newFile) {
        this.file = newFile;
    }
    @action upload() {
        this.isUpoading = true;
        this.serverFile = null;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename)
                .then(serverFile => {
                    this.serverFile = serverFile;
                    resolve(serverFile);
                }).catch(err => {
                    message.error('上传失败');
                    reject(err);
                }).finally(() => {
                    this.isUpoading = false;
                });
        });
    }
    @action reset() {
        this.isUpoading = false;
        this.serverFile = null;
    }
}
export default new ImageStore();