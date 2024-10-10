import  { useState } from 'react';
import { Upload, Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const UploadPhoto = () => {
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('photos', file.originFileObj);
        });

        try {
            //форм дата тут щоб не виконувалась при рендері
            const formData = new FormData();
            //це чисто шоб зробити лог і побачит шо працює
            fileList.forEach(file => {
                console.log('Файл для завантаження:', file);
                formData.append('photos', file.originFileObj);
            });

            //тут буде запит куда там треба
            console.log('FormData:', formData);

            message.success('Фото успішно завантажене');
        } catch (error) {
            message.error('Помилка завантаження');
            console.error('Помилка завантаження:', error); // Лог помилки
        }
    };

    return (
        <Form>
            <Form.Item>
                <Upload
                    fileList={fileList}
                    listType="picture-card"
                    onChange={handleChange}
                    beforeUpload={() => false}
                    //якщо тобі потрібно щоб файл одразу оброблявся то прописати тут beforeUpload={(file) => {
                    //    //фолсе це вирубає і тоді обробка фото буде по кнопці знизу
                    //      //тут прописуєш шо нада зробить з фото зразу і  return true;
                    //   }}
                >
                    {fileList.length >= 5 ? null : (

                        <div className="add-img-btn">
                            <PlusOutlined/>
                        </div>
                    )}
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleUpload}>
                    Завантажити
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UploadPhoto;