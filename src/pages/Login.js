import React from 'react';
import { useStores } from '../stores';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  max-width:600px;
  margin:30px auto;
  box-shadow:2px 2px 4px 0 rgba(0,0,0,0.2);
  border-radius:4px;
  padding: 20px;
  `;
const Title = styled.h1`
  text-align:center;
  margin-bottom:30px;
`;

const Component = () => {
  const { AuthStore } = useStores();
  const history = useHistory();
  const onFinish = (values) => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.login()
      .then(() => {
        console.log('登录成功');
        history.push('/');
      }
        // , () => { console.log('登录失败，请重试'); }
      )
      .catch((e) => {
        console.log(e);
        console.log('登陆失败，请重试');
      }
      );
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validatorUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if (value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符');
    return Promise.resolve();
  };
  return (
    <Wrapper>
      <Title>登录</Title>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,//必须填写
              message: '请输入用户名!',
            },
            {
              validator: validatorUsername
            }
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 4,
              message: '最少4个字符',
            },
            {
              max: 16,
              message: '最多16个字符',
            }

          ]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form></Wrapper>

  );
};

export default Component;