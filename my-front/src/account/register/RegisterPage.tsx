import React from 'react';
import { Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import http_common from "../../http_common.ts";

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append('firstname', values.firstname);
        formData.append('lastname', values.lastname);
        formData.append('image', values.image[0].originFileObj); // Extract the File object
        formData.append('email', values.email);
        formData.append('username', values.username);
        formData.append('password', values.password);

        try {
            const response = await http_common.post("/api/Accounts/Registration", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("User created successfully", response.data);
            message.success('Реєстрація успішна!');
            form.resetFields();
            navigate("/");
        } catch (ex) {
            message.error('Помилка реєстрації!');
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList.slice(-1);
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Реєстрація на сайті WheelDeal</h1>
        <Form
            form={form}
            name="registration_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
        >
            <Form.Item
                name="firstname"
                label="Ім'я"
                rules={[{ required: true, message: 'Будь ласка, введіть своє ім\'я!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Прізвище"
                rules={[{ required: true, message: 'Введіть своє прізвище!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="image"
                label="Фото"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    { required: true, message: 'Будь ласка, завантажте своє зображення!' },
                    {
                        validator: (_, fileList) => {
                            if (fileList.length !== 1) {
                                return Promise.reject(new Error('Будь ласка, завантажте лише одне зображення!'));
                            }
                            const file = fileList[0];
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                                return Promise.reject(new Error('Будь ласка, завантажте файл зображення!'));
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Upload name="image" listType="picture" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    { type: 'email', message: 'Будь ласка, введіть дійсну адресу електронної пошти!' },
                    { required: true, message: 'Будь ласка, введіть свою електронну адресу!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="username"
                label="Нікнейм"
                rules={[{ required: true, message: 'Введіть своє ім\'я користувача!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Підтвердьте пароль"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Будь ласка, підтвердьте свій пароль!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Два паролі не збігаються!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Зареєструватися
                </Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default RegisterPage;
