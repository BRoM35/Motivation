import React, { Component } from 'react';
import './Incidents.css';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Select } from 'antd';
import {
  EditFilled,
  DeleteFilled,
  BugOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import IncidentCreate from './IncidentCreate';
import IncidentEdit from './IncidentEdit';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

class Incidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      users: [],
      teams: [],
      types: [],
      isViewDrawerCreate: false,
      isViewDrawerEdit: false,
      id: 0,
      selectedCause: '',
      selectedDecision: '',
      selectedDescription: '',
      selectedPercent: '',
      selectedStatus: 0,
      selectedTeamId: 0,
      selectedTypeId: 0,
      selectedDate: ''
    }
  }

  componentDidMount() {
    this.getIncidents();
    this.getTeams();
    this.getTypes();
  }

  async getIncidents() {
    const response = await fetch(`http://localhost:3001/incidents`);
    const incidents = await response.json();
    this.setState({incidents});
  }

  async getTeams() {
    const response = await fetch(`http://localhost:3001/teams`);
    const teams = await response.json();
    this.setState({teams});
  }

  async getTypes() {
    const response = await fetch(`http://localhost:3001/incidents/types`);
    const types = await response.json();
    this.setState({types});
  }

  createIncident = async (values) => {
    const data = {
      date: values.date,
      percent: values.percent,
      description: values.description,
      teamId: values.team,
      incidentTypeId: values.type,
      releaseTypeId: values.type,
      status: !!values.status,
      cause: values.cause,
      decision: values.decision,
    }

    const response = await fetch(`http://localhost:3001/incidents`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const incidents = await response.json();
    this.setState({incidents, isViewDrawerCreate: false});
  }

  editIncident = async (values) => {
    const data = {
      date: values.date,
      percent: values.percent,
      description: values.description,
      teamId: values.team,
      incidentTypeId: values.type,
      releaseTypeId: values.type,
      status: !!values.status,
      cause: values.cause,
      decision: values.decision,
    };

    const {id} = this.state;

    const response = await fetch(`http://localhost:3001/incidents/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const incidents = await response.json();
    this.setState({
      incidents,
      isViewDrawerEdit: false
    });
  }

  deleteIncident = async (id) => {
    const response = await fetch(`http://localhost:3001/incidents/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const incidents = await response.json();
    this.setState({incidents});
  }

  renderTable = () => {
    const {incidents} = this.state;
    const columns = [
      {
        title: 'Команда',
        dataIndex: 'teams',
        key: 'teams',
        render: teams => (
          <div className='incidentTeamsBlock'>
            {teams.map(team => {
              return (
              <span>{`${team}`}</span>
              );
            })}
          </div>
        ),
      },
      {
        title: '',
        dataIndex: 'statuses',
        key: 'statuses',
        align: 'center',
        render: statuses => (
          <div className='incidentTeamsBlock'>
            <span>
              {statuses.status ? `✓` : ''}
            </span>
            <span>
              {statuses.type === 1 ?
                <BugOutlined title={statuses.typeName} /> :
                <ExclamationCircleOutlined title={statuses.typeName} />
              }
            </span>
          </div>
        ),
      },
      {
        title: 'Описание',
        key: 'description',
        dataIndex: 'description',
      },
      {
        title: 'Причина',
        key: 'cause',
        dataIndex: 'cause',

      },
      {
        title: 'Решение',
        key: 'decision',
        dataIndex: 'decision',
        align: 'center'
      },
      {
        title: '%',
        key: 'percent',
        dataIndex: 'percent',
        align: 'center'
      },
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) =>
          this.state.incidents.length >= 1 ? (
            [<EditFilled className='kpiRead' onClick={() => this.handleRead(record)} />,
            <Popconfirm title="Удалить?" onConfirm={() => this.handleDelete(record.key)}>
              <DeleteFilled />
            </Popconfirm>
          ]
          ) : null,
      },
    ];
    const dataTable = [];
  

    incidents.length && incidents.forEach((item, i) => {
      dataTable.push({
        key: item.id,
        teams: [item.team.name, moment(item.date).format('YYYY-MM-DD')],
        statuses: {
          status: item.status,
          type: item.incidentType.id,
          typeName: item.incidentType.name,
        },
        description: item.description,
        cause: item.cause,
        decision: item.decision,
        percent: item.percent ? `${item.percent}` : '',
        teamId: item.teamId,
        typeId: item.incidentTypeId,
        date:item.date
      })
    })

    return (<Table columns={columns} dataSource={dataTable} />)
  }

  //на кнопку добавить инцидент
  onOpenDrawerCreate = (isViewDrawerCreate) => {
    this.setState({
      isViewDrawerCreate
    })
  }

  handleRead = (record) => {
    this.setState({
      selectedCause: record.cause,
      selectedDate: record.date,
      selectedDecision: record.decision,
      selectedDescription: record.description,
      selectedPercent: record.percent ? record.percent.replace('%', '') : record.percent,
      selectedStatus: +record.statuses.status,
      selectedTeamId: record.teamId,
      selectedTypeId: record.typeId,
      id: record.key,
      isViewDrawerEdit: true,
    })
  }

  handleDelete = (key) => {
    this.deleteIncident(key);
  };

  onOpenDrawerEdit = (isViewDrawerEdit) => {
    this.setState({
      isViewDrawerEdit
    })
  }

  render() {
    const {
      isViewDrawerCreate,
      teams,
      types,
      isViewDrawerEdit,
      selectedCause,
      selectedDecision,
      selectedDescription,
      selectedPercent,
      selectedStatus,
      selectedTeamId,
      selectedTypeId,
      selectedDate
    } = this.state;//достаем из стейта чтобы положить в переменную

    const editSettings = {
      selectedCause,
      selectedDecision,
      selectedDescription,
      selectedPercent,
      selectedStatus,
      selectedTeamId,
      selectedTypeId,
      selectedDate
    };

    return (
      <div className='releaseContainer'>
        <div className='releaseNav'>

        </div>
        <div className='releaseTitle'>
          <p>Инциденты</p>
          <Button
            onClick={() => this.onOpenDrawerCreate(true)}
            style={{marginRight: '15px'}}
            type="primary">+ Добавить инцидент</Button>
        </div>
        <div className='releaseContent'>
          {this.renderTable()}
        </div>
        <IncidentCreate
          teams={teams}
          types={types}
          onOpenDrawerCreate={this.onOpenDrawerCreate}
          isOpen={isViewDrawerCreate}
          createIncident={this.createIncident}
        />
        <IncidentEdit
          teams={teams}
          types={types}
          onOpenDrawerEdit={this.onOpenDrawerEdit}
          isOpen={isViewDrawerEdit}
          editIncident={this.editIncident}
          settings={editSettings}
        />
      </div>
    )
  }
}
export default Incidents;
