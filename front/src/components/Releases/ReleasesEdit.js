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

class ReleaseEdit extends React.Component {
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
    const {settings} = this.props;

    if (!fieldsValue.date) {
      fieldsValue.date = settings.selectedDate;
    }

    if (!fieldsValue.user) {
      fieldsValue.user = settings.selectedUser;
    }

    if (!fieldsValue.type) {
      fieldsValue.type = settings.selectedType;
    }

    if (!fieldsValue.comment) {
      fieldsValue.comment = '';
    }

    this.props.editRelease(fieldsValue);
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString
    })
  }

  renderUsers = () => {
    const {
      users,
      settings
    } = this.props;

    return (
      <Select value={settings.selectedUser} defaultValue={settings.selectedUser} className={'releaseFormTitle'}>
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
      teams,
      settings
    } = this.props;

    return (
      <Select value={settings.selectedTeam} defaultValue={settings.selectedTeam} className={'releaseFormTitle'}>
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
      types,
      settings
    } = this.props;

    return (
      <Select value={settings.selectedType} defaultValue={settings.selectedType} className={'releaseFormTitle'}>
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
      onOpenDrawerEdit,
      settings
    } = this.props;
    const percent = settings.selectedPercent,
      comment = settings.selectedComment,
      coefficient = settings.selectedCoefficient,
      date = settings.selectedDate;


    return (
      <>
        <Drawer
          width={450}
          title="Редактивание релиза"
          placement="right"
          closable={false}
          onClose={() => onOpenDrawerEdit(false)}
          visible={isOpen}
          destroyOnClose={true}
        >
          <Form
            initialValues={{ percent, comment, coefficient }}
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={this.onFinish}
          >
            <Form.Item labelAlign='left' name="user" label="Сотрудник">
              {this.renderUsers()}
            </Form.Item>
            <Form.Item labelAlign='left' name="team" label="Команда">
              {this.renderTeams()}
            </Form.Item>
            <Form.Item labelAlign='left' name="date" label="Дата">
              <DatePicker defaultValue={moment(date)} onChange={this.onChangeDate} />
            </Form.Item>
            <Form.Item  labelAlign='left' name="type" label="Тип">
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

export default ReleaseEdit;
