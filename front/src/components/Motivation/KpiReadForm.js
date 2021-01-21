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
      period: this.props.period || '',
      types: this.props.types || [],
      type: this.props.type || 0,
      currentType: ''
    }
  }

  formRef = React.createRef();

  onFinish = (fieldsValue) => {
    fieldsValue.period = this.state.period;
    fieldsValue.type = this.state.type;
    this.props.readKpi(fieldsValue);
  }

  changePeriod = (period) => {
    this.setState({
      period
    })
  }

  renderPeriodDate = () => {
    const {
      periods,
      period
    } = this.state;

    return (
      <Select onChange={this.changePeriod} className={'kpiButtonPeriod'} value={period} defaultValue={period}>
        {periods.length && periods.map(period => {
          return (
            <Option key={period} value={period}>{period}</Option>
          )
        })}
      </Select>
    )
  }

  changeTypes = (type) => {
    this.setState({
      type
    })
  }

  renderTypes = () => {
    const {
      types,
      type
    } = this.state;

    return (
      <Select onChange={this.changeTypes} className={'kpiButtonPeriod'} value={type} defaultValue={type}>
        {types.length && types.map(type => {
          return (
            <Option key={type.id} value={type.id}>{type.name}</Option>
          )
        })}
      </Select>
    )
  }

  render() {
    const {
      result, target,
    } = this.props;
    return (
      <>
        <Form
        initialValues={{ result, target }}
        {...formItemLayout}
        layout={'horizontal'}
        onFinish={this.onFinish}
        labelAlign={'left'}
      >
        <Form.Item labelAlign='left' name="period" label="Период">
          {this.renderPeriodDate()}
        </Form.Item>
        <Form.Item labelAlign='left' name="type" label="Тип">
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