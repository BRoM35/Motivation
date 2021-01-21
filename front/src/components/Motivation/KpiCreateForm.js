import React from 'react';
import 'antd/dist/antd.css';
import './Kpi.css';
import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: this.props.periods || [],
      currentPeriod: this.props.currentPeriod || '',
      types: this.props.types || [],
      currentType: ''
    }
  }

  formRef = React.createRef();

  onFinish = (fieldsValue) => {
    this.props.createKPI(fieldsValue);
  }

  changePeriod = (currentPeriod) => {
    this.setState({
      currentPeriod
    })
  }

  renderPeriodDate = () => {
    const {
      currentPeriod,
      periods
    } = this.state;

    return (
      <Select onChange={this.changePeriod} className={'kpiButtonPeriod'} value={currentPeriod}>
        {periods.length && periods.map(period => {
          return (
            <Option key={period} value={period}>{period}</Option>
          )
        })}
      </Select>
    )
  }

  changeTypes = (currentType) => {
    this.setState({
      currentType
    })
  }

  renderTypes = () => {
    const {
      types,
      currentType
    } = this.state;

    return (
      <Select onChange={this.changeTypes} className={'kpiButtonPeriod'} value={currentType}>
        {types.length && types.map(type => {
          return (
            <Option key={type.id} value={type.id}>{type.name}</Option>
          )
        })}
      </Select>
    )
  }

  render() {
    return (
      <>
        <Form
        {...formItemLayout}
        layout={'horizontal'}
        onFinish={this.onFinish}
      >
        <Form.Item rules={[
          {
            required: true
          }
        ]} labelAlign='left' name="period" label="Период">
          {this.renderPeriodDate()}
        </Form.Item>
        <Form.Item rules={[
          {
            required: true
          }
        ]} labelAlign='left' name="type" label="Тип">
          {this.renderTypes()}
        </Form.Item>
        <Form.Item rules={[
          {
            required: true
          }
        ]} labelAlign='left' name="result" label="Результат">
          <TextArea rows={1} />
        </Form.Item>
        <Form.Item rules={[
          {
            required: true
          }
        ]} labelAlign='left' name="target" label="Цель">
          <TextArea rows={1} />
        </Form.Item>
        <Form.Item >
          <Button style={{marginRight: '15px'}} htmlType='submit' type="primary">Сохранить</Button>
        </Form.Item>
      </Form>
      </>
    );
  }
};

export default EditForm;