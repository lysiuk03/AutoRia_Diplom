import { Button, Checkbox, Form, Input, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {ISellCarFormValues} from "../../interfaces/formTypes.ts";

const SellCarForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values : ISellCarFormValues) => {
        console.log("Form values:", values);
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item label="Додайте 3 фото авто з відкритими дверцями, номером">
                <Upload multiple>
                    <Button icon={<UploadOutlined />}>Додати фото</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Основна інформація">
                <Form.Item name="transportType" label="Тип транспорту" noStyle>
                    <Input />
                </Form.Item>
                <Form.Item name="manufacturerCountry" label="Країна виробник">
                    <Input />
                </Form.Item>
                <Form.Item name="brand" label="Марка">
                    <Input />
                </Form.Item>
                <Form.Item name="model" label="Модель авто">
                    <Input />
                </Form.Item>
                <Form.Item name="year" label="Рік випуску">
                    <InputNumber min={1900} max={new Date().getFullYear()} />
                </Form.Item>
                <Form.Item name="mileage" label="Пробіг">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="bodyType" label="Тип кузова">
                    <Input />
                </Form.Item>
                <Form.Item name="modification" label="Модифікація">
                    <Input />
                </Form.Item>
                <Form.Item name="city" label="Місто">
                    <Input />
                </Form.Item>
                <Form.Item name="region" label="Регіон">
                    <Input />
                </Form.Item>
                <Form.Item name="vin" label="VIN-код">
                    <Input />
                </Form.Item>
            </Form.Item>

            <Form.Item name="description" label="Опис авто">
                <TextArea rows={4} maxLength={2000} placeholder="Опис українською" />
            </Form.Item>

            <Form.Item label="Характеристика">
                <Form.Item name="color" valuePropName="checked" noStyle>
                    <Checkbox>Колір</Checkbox>
                </Form.Item>
                <Form.Item name="coating" valuePropName="checked" noStyle>
                    <Checkbox>Лакофарбове покриття</Checkbox>
                </Form.Item>
                <Form.Item name="accidentParticipation" valuePropName="checked" noStyle>
                    <Checkbox>Участь у ДТП</Checkbox>
                </Form.Item>
                <Form.Item name="technicalCondition" valuePropName="checked" noStyle>
                    <Checkbox>Технічний стан</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SellCarForm;
