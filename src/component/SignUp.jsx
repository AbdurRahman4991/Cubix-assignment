import React, { useState } from 'react';
import { Button, Input, Upload, Steps, Form, Progress, message } from 'antd';
import { LockOutlined, UserOutlined, CheckCircleOutlined, CameraOutlined, UploadOutlined } from '@ant-design/icons';

const { Step } = Steps;

const SignUp = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [photoFileList, setPhotoFileList] = useState([]);
    const [signatureFileList, setSignatureFileList] = useState([]);

    const handlePhotoUploadChange = (info) => {
        setPhotoFileList(info.fileList);
    };

    const handleSignatureUploadChange = (info) => {
        setSignatureFileList(info.fileList);
    };

    const steps = [
        {
            title: 'Account',
            content: (
                <Form
                    form={form}
                    layout="vertical"
                    name="accountForm"
                    initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
                >
                    <Form.Item
                        label="Email:"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Email" style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Username:"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" suffix={<UserOutlined />} style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Password:"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters long!' },
                        ]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password:"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" style={{ height: '50px', borderRadius: '0px' }} prefix={<LockOutlined />} />
                    </Form.Item>
                </Form>
            ),
            icon: <LockOutlined />,
        },
        {
            title: 'Personal',
            content: (
                <Form form={form} layout="vertical" name="personalForm">
                    <Form.Item
                        label="First Name:"
                        name="fname"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input placeholder="First name" style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Last Name:"
                        name="lname"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input placeholder="Last name" suffix={<UserOutlined />} style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Contact No:"
                        name="contact"
                        rules={[{ required: true, message: 'Please input your contact number!' }]}
                    >
                        <Input placeholder="Contact number" style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Alternate Contact No:"
                        name="alternateContact"
                        rules={[{ required: true, message: 'Please input your alternate contact number!' }]}
                    >
                        <Input placeholder="Alternate contact number" style={{ height: '50px', borderRadius: '0px' }} />
                    </Form.Item>
                </Form>
            ),
            icon: <UserOutlined />,
        },
        {
            title: 'Image',
            content: (
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Upload Your Photo:"
                        name="photoUpload"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please upload your photo!',
                            },
                            {
                                validator: (_, value) => {
                                    if (photoFileList.length > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Please upload a photo.'));
                                },
                            },
                        ]}
                    >
                        <Upload
                            action="#"
                            listType="picture"
                            fileList={photoFileList}
                            onChange={handlePhotoUploadChange}
                        >
                            <Button style={{ width: "100%" }} icon={<UploadOutlined />}>Choose file</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Upload Signature Photo:"
                        name="signatureUpload"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please upload your signature photo!',
                            },
                            {
                                validator: (_, value) => {
                                    if (signatureFileList.length > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Please upload a signature photo.'));
                                },
                            },
                        ]}
                    >
                        <Upload
                            action="#"
                            listType="picture"
                            fileList={signatureFileList}
                            onChange={handleSignatureUploadChange}
                        >
                            <Button style={{ width: "100%" }} icon={<UploadOutlined />}>Choose file</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            ),
            icon: <CameraOutlined />,
        },
        {
            title: 'Finish',
            content: (
                <div>
                    <h1 style={{ textAlign: "center", color: "#5a2e87" }}>SUCCESS</h1>
                </div>
            ),
            icon: <CheckCircleOutlined />,
        },
    ];

    const next = async () => {
        try {
            await form.validateFields();
            setCurrent(current + 1);
        } catch (errorInfo) {
            message.error('Please correct the errors before proceeding.');
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const progressPercentage = ((current + 1) / steps.length) * 100;

    return (
        <div className="signup-container" style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
            <div className="form-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h1 style={{ color: '#5e2da6' }}>SIGN UP YOUR USER ACCOUNT</h1>
                <p style={{ fontSize: '16px', color: '#8c8c8c' }}>Fill all form fields to go to the next step</p>
            </div>

            <Steps current={current} className="custom-steps">
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
            </Steps>

            <Progress percent={progressPercentage} showInfo={false} strokeColor="#5e2da6" style={{ marginTop: '24px' }} />

            <div className="steps-content" style={{ marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
                {steps[current].content}
            </div>

            <div className="steps-action" style={{ marginTop: '24px', textAlign: 'right' }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={next}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => alert('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prev}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SignUp;
