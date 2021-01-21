import React from 'react';
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

class IncidentCreate extends React.Component {
  constructor(props) {
    super(props);
    //свой стейт
    this.state = {
      date: '',
      percent: 0,
      comment: ''
    }
  }


  onFinish = (fieldsValue) => {
    fieldsValue.date = this.state.date;
   //чтобы избежать undefined
    if (!fieldsValue.decision) {
      fieldsValue.decision = '';
    }

    if (!fieldsValue.description) {
      fieldsValue.description = '';
    }

    if (!fieldsValue.cause) {
      fieldsValue.cause = '';
    }

    if (!fieldsValue.percent) {
      fieldsValue.percent = 0;
    }

    this.props.createIncident(fieldsValue);
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString
    })
  }

  //селект с командами
  renderTeams = () => {
    const {
      teams
    } = this.props;

    return (
      <Select onChange={this.changeTeam} className={'releaseFormTitle'}>
        {teams.length && teams.map(team => {
          return (
            <Option key={team.id} value={team.id}>{team.name}</Option>
          )
        })}
      </Select>
    )
  }

  //селект с типами инцидентов
  renderTypes = () => {
    const {
      types
    } = this.props;

    return (
      <Select onChange={this.changeType} className={'releaseFormTitle'}>
        {types.length && types.map(type => {
          return (
            <Option key={type.id} value={type.id}>{type.name}</Option>
          )
        })}
      </Select>
    )
  }
  //Решено/Не решено
  renderStatus = () => {
    const status = [
      {id: 0, name: 'Не решено'},
      {id: 1, name: 'Решено'},
    ]

    return (
      <Select onChange={this.changeType} className={'releaseFormTitle'}>
        {status.map(type => {
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

export default IncidentCreate;
