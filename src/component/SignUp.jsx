import React, { useState } from 'react';
import { Button, Input, Steps, Form, Progress, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, CheckCircleOutlined, CameraOutlined } from '@ant-design/icons';

const { Step } = Steps;

const steps = [
  {
    title: 'Account',
    content: (
      <Form
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
          <Input placeholder="Email Id" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label="Username:"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
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
          <Input.Password placeholder="Confirm Password" prefix={<LockOutlined />} />
        </Form.Item>
      </Form>
    ),
    icon: <LockOutlined />,
  },
  {
    title: 'Personal',
    content: 'Personal Information Content',
    icon: <UserOutlined />,
  },
  {
    title: 'Image',
    content: 'Image Upload Content',
    icon: <CameraOutlined />,
  },
  {
    title: 'Finish',
    content: 'Finish your signup process',
    icon: <CheckCircleOutlined />,
  },
];

const SignUp = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    try {
      // Validate the current step form
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

      {/* Progress bar */}
      <Progress
        percent={progressPercentage}
        showInfo={false}
        strokeColor="#5e2da6"
        style={{ marginBottom: '24px' }}
      />

      <Steps current={current} className="custom-steps">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>

      <div className="steps-content" style={{ marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        {React.cloneElement(steps[current].content, { form })}
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
