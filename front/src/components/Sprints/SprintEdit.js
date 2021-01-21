import React, { Component } from 'react';
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

class SprintEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: this.props.settings.selectedDateStart,
      dateEnd: this.props.settings.selectedDateEnd,
    }
  }


  onFinish = (fieldsValue) => {
    const {settings} = this.props;

    if (!fieldsValue.dateStart) {
      fieldsValue.dateStart = settings.selectedDateStart;
    }

    if (!fieldsValue.dateEnd) {
      fieldsValue.dateEnd = settings.selectedDateEnd;
    }

    if (!fieldsValue.team) {
      fieldsValue.team = settings.selectedTeamId;
    }

    if (!fieldsValue.percent) {
      fieldsValue.percent = 0;
    }

    this.props.editSprint(fieldsValue);
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
      teams,
      settings
    } = this.props;

    return (
      <Select defaultValue={settings.selectedTeamId} className={'releaseFormTitle'}>
        {teams.length && teams.map(team => {
          return (
            <Option key={team.id} value={team.id}>{team.name}</Option>
          )
        })}
      </Select>
    )
  }

  renderDateStart = () => {
    const dateFormat = 'YYYY-MM-DD';
    const {settings} = this.props;
    const date = settings.selectedDateStart;

    if (date && date.length) {
      return (
        <DatePicker
          defaultValue={moment(moment(date).format(dateFormat), dateFormat)}
          onChange={this.onChangeDateStart} />
      )
    }
  }

  renderDateEnd = () => {
    const dateFormat = 'YYYY-MM-DD';
    const {settings} = this.props;
    const date = settings.selectedDateEnd;

    if (date && date.length) {
      return (
        <DatePicker
          defaultValue={moment(moment(date).format(dateFormat), dateFormat)}
          onChange={this.onChangeDateEnd} />
      )
    }
  }

  render() {
    const {
      isOpen,
      onOpenDrawerEdit,
      settings
    } = this.props;
    const name = settings.selectedName,
      percent = settings.selectedPercent;

    return (
      <>
        <Drawer
          width={450}
          title="Редактирование инцидента"
          placement="right"
          onClose={() => onOpenDrawerEdit(false)}
          visible={isOpen}
          destroyOnClose={true}
        >
          <Form
            initialValues={{ name, percent }}
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={this.onFinish}
          >
            <Form.Item labelAlign='left' name="team" label="Команда">
              {this.renderTeams()}
            </Form.Item>
            <Form.Item labelAlign='left' name="name" label="Название">
              <Input />
            </Form.Item>
            <Form.Item labelAlign='left' name="dateStart" label="Дата начала">
              {this.renderDateStart()}
            </Form.Item>
            <Form.Item labelAlign='left' name="dateEnd" label="Дата окончания">
              {this.renderDateEnd()}
            </Form.Item>
            <Form.Item labelAlign='left' name="percent" label="Влияние">
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

export default SprintEdit;
