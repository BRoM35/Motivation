import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Incidents.css';
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

class IncidentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.settings.selectedDate //чтобы при открытии лежала в стейте дата, переданная выше из настроек
    }
  }

  onFinish = (fieldsValue) => {
    const {settings} = this.props;

    if (!fieldsValue.date) {
      fieldsValue.date = settings.selectedDate;
    }

    if (!fieldsValue.decision) {
      fieldsValue.decision = settings.selectedDecision;
    }

    if (!fieldsValue.description) {
      fieldsValue.description = settings.selectedDescription;
    }

    if (!fieldsValue.cause) {
      fieldsValue.cause = settings.selectedCause;
    }

    if (!fieldsValue.status) {
      fieldsValue.status = settings.selectedStatus;
    }

    if (!fieldsValue.team) {
      fieldsValue.team = settings.selectedTeamId;
    }

    if (!fieldsValue.type) {
      fieldsValue.type = settings.selectedTypeId;
    }

    if (!fieldsValue.percent) {
      fieldsValue.percent = 0;
    }

    this.props.editIncident(fieldsValue);
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString
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

  renderTypes = () => {
    const {
      types,
      settings
    } = this.props;

    return (
      <Select defaultValue={settings.selectedTypeId} className={'releaseFormTitle'}>
        {types.length && types.map(type => {
          return (
            <Option key={type.id} value={type.id}>{type.name}</Option>
          )
        })}
      </Select>
    )
  }

  renderStatus = () => {
    const {
      settings,
    } = this.props;
    const statuses = [
      {id: 0, name: 'Не решено'},
      {id: 1, name: 'Решено'},
    ]

    return (
      <Select defaultValue={settings.selectedStatus} className={'releaseFormTitle'}>
        {statuses.map(type => {
          return (
            <Option value={+type.id}>{type.name}</Option>
          )
        })}
      </Select>
    )
  }

  renderDate = () => {
    const dateFormat = 'YYYY-MM-DD';
    const {settings} = this.props;
    const date = settings.selectedDate;

    if (date && date.length) {
      return (
        <DatePicker
          defaultValue={moment(moment(date).format(dateFormat), dateFormat)}
          onChange={this.onChangeDate} />
      )
    }
  }

  render() {
    const {
      isOpen,
      onOpenDrawerEdit,
      settings
    } = this.props;
    const cause = settings.selectedCause,
      description = settings.selectedDescription,
      decision = settings.selectedDecision,
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
            initialValues={{ cause, description, decision, percent }}
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={this.onFinish}
          >
            <Form.Item labelAlign='left' name="team" label="Команда">
              {this.renderTeams()}
            </Form.Item>
            <Form.Item labelAlign='left' name="date" label="Дата">
              {this.renderDate()}
            </Form.Item>
            <Form.Item labelAlign='left' name="type" label="Тип">
              {this.renderTypes()}
            </Form.Item>
            <Form.Item labelAlign='left' name="percent" label="Влияние">
              <Input />
            </Form.Item>
            <Form.Item labelAlign='left' name="status" label="Решено">
              {this.renderStatus()}
            </Form.Item>
            <Form.Item labelAlign='left' name="description" label="Описание">
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item labelAlign='left' name="cause" label="Причина">
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item labelAlign='left' name="decision" label="Решение">
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

export default IncidentEdit;
