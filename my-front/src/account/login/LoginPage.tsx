import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input , message} from 'antd';
import http_common from "../../http_common.ts";

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    try {
        await http_common.post("/api/Accounts/SignIn",values);
        message.success('Вхід успішний!');

    } catch (ex) {
        message.error('Помилка входу!');
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage: React.FC = () => (
    <>
   <h1 style={{ textAlign: 'center' }}> Вхід на сайт WheelDeal</h1>
    <Form
        name="login_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"

    >
        <Form.Item<FieldType>
            label="Логін"
            name="email"
            rules={[{ required: true, message: 'Введіть своє ім\'я користувача!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    </>

);

export default LoginPage;