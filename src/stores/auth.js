import { observable, action } from 'mobx';
import { Auth } from '../models';
import UserStore from './user';
import HistoryStore from './history';
import ImageStore from './image';
import { message } from 'antd';
//维护登录信息，用户名和密码
class AuthStore {
  //状态
  @observable values = {
    username: '',
    password: ''
  };
  //行为
  @action setUsername(username) {
    this.values.username = username;
  }
  @action setPassword(password) {
    this.values.password = password;
  }
  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(user => {
        console.log('注册成功');
        UserStore.pullUser();
        resolve(user);
      }).catch(err => {
        message.error('注册失败');
        UserStore.resetUser();
        reject(err);
      });
    });
  }
  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password).then(user => {
        UserStore.pullUser();
        resolve(user);
      }).catch(err => {
        message.error('用户名或密码错误');
        reject(err);
      });
    });
  }
  @action logout() {
    Auth.logout();
    UserStore.resetUser();
    HistoryStore.reset();
    ImageStore.reset();
  }
}

export default new AuthStore();
