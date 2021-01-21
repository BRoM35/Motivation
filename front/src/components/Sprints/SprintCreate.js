import React from 'react';
import 'antd/dist/antd.css';
import './Sprints.css';
import { Form, Input, Button, Select, Drawer } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

class SprintCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: '',
      dateEnd: '',
    }
  }


  onFinish = (fieldsValue) => {
    fieldsValue.dateStart = this.state.dateStart;
    fieldsValue.dateEnd = this.state.dateEnd;

    if (!fieldsValue.name) {
      fieldsValue.name = '';
    }

    if (!fieldsValue.percent) {
      fieldsValue.percent = 0;
    }

    this.props.createSprint(fieldsValue);
  }

  onChangeDateStart = (date, dateString) => {
    this.setState({
      dateStart: dateString
    })
  }

  onChangeDateEnd = (date, dateString) => {
    this.setState({
      dateEnd: dateString
    })
  }

  renderTeams = () => {
    const {
      teams
    } = this.props;

    return (
      <Select className={'releaseFormTitle'}>
        {teams.length && teams.map(team => {
          return (
            <Option key={team.id} value={team.id}>{team.name}</Option>
          )
        })}
      </Select>
    )
  }

  render() {
    const {
      isOpen,
      onOpenDrawerCreate
    } = this.props;

    return (
      <>
        <Drawer
          width={450}
          title="Добавить инцидент"
          placement="right"
          closable={false}
          onClose={() => onOpenDrawerCreate(false)}
          visible={isOpen}
          destroyOnClose={true}
        >
          <Form
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={this.onFinish}
          >
            <Form.Item rules={[
              {
                required: true
              }
            ]} labelAlign='left' name="team" label="Команда">
              {this.renderTeams()}
            </Form.Item>
            <Form.Item rules={[
              {
                required: true
              }
            ]} labelAlign='left' name="name" label="Название">
              <Input />
            </Form.Item>
            <Form.Item rules={[
              {
                required: true
              }
            ]} labelAlign='left' name="dateStart" label="Дата начала">
              <DatePicker
                onChange={this.onChangeDateStart} />
            </Form.Item>
            <Form.Item rules={[
              {
                required: true
              }
            ]} labelAlign='left' name="dateEnd" label="Дата окончания">
              <DatePicker
                onChange={this.onChangeDateEnd} />
            </Form.Item>
            <Form.Item labelAlign='left' name="percent" label="Выполнение">
              <Input />
            </Form.Item>
            <Form.Item >
              <Button style={{marginRight: '15px'}} htmlType='submit' type="primary">Сохранить</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
};

export default SprintCreate;
