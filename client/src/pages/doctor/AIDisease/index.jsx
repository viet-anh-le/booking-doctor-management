import { Flex, Splitter, Typography, Image} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload, Button } from 'antd';
import { useState } from 'react';
const { Dragger } = Upload;

const Desc = props => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

function AIDiseaseDetection() {
  const [imageUpload, setImageUpload] = useState("");
  const [imageResult, setImageResult] = useState("");
  const props = {
    name: 'files',
    multiple: false,
    action: 'http://0.0.0.0:8000/object-to-filepath',  // Đảm bảo đúng URL
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImageResult(info.file.response.image_urls[0]);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove() {
      setImageUpload(""); // Xóa preview
      setImageResult(""); // Xóa prediction
    },
  };
  const handlePreviewImage = (file) => {
    const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
    setImageUpload(imageUrl); // Lưu URL tạm thời vào state
  };
  return (
    <>
      <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
          <div>
            <Dragger
              {...props}
              beforeUpload={(file) => {
                handlePreviewImage(file);
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Dragger>
            {imageUpload && (
              <Image
                src={imageUpload}
                alt="Uploaded Image Preview"
                style={{ maxWidth: '100%', marginTop: '20px' }}
              />
            )}
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div className='h-16 flex justify-center items-center' style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
            <h2 className='font-bold'>Prediction</h2>
          </div>
          <div>
            {imageResult && (
              <Image
                src={imageResult}
                alt="Prediction Result"
                style={{ margin: '20px' }}
              />
            )}
          </div>
        </Splitter.Panel>
      </Splitter>
    </>
  )
}

export default AIDiseaseDetection