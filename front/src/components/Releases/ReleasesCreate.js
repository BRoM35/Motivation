import React from 'react';
import 'antd/dist/antd.css';
import './Releases.css';
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

class ReleaseCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      percent: 0,
      coefficient: 1,
      comment: '',
    }
  }


  onFinish = (fieldsValue) => {
    fieldsValue.date = this.state.date;
    if (!fieldsValue.comment) {
      fieldsValue.comment = '';
    }

    this.props.createRelease(fieldsValue);
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString
    })
  }

  renderUsers = () => {
    const {
      users
    } = this.props;

    return (
      <Select className={'releaseFormTitle'}>
        {users.length && users.map(user => {
          return (
            <Option key={user.id} value={user.id}>{user.fio}</Option>
          )
        })}
      </Select>
    )
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

  renderTypes = () => {
    const {
      types
    } = this.props;

    return (
      <Select className={'releaseFormTitle'}>
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
      isOpen,
      onOpenDrawerCreate
    } = this.props;

    const dateFormat = 'YYYY-MM-DD';

    return (
      <>
        <Drawer
          width={450}
          title="Добавить релиз"
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
            ]} labelAlign='left' name="user" label="Сотрудник">
              {this.renderUsers()}
            </Form.Item>
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
            ]} labelAlign='left' name="date" label="Дата">
              <DatePicker
                defaultValue={moment(moment().format(dateFormat), dateFormat)}
                onChange={this.onChangeDate} />
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
            ]} labelAlign='left' name="percent" label="Процент участия">
              <Input />
            </Form.Item>
            <Form.Item rules={[
              {
                required: true
              }
            ]} labelAlign='left' name="coefficient" label="Коэффициент">
              <Input />
            </Form.Item>
            <Form.Item labelAlign='left' name="comment" label="Комментарий">
              <TextArea rows={1} />
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

export default ReleaseCreate;
