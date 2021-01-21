import React, { Component } from 'react';
import moment from 'moment';
import './Sprints.css';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Select } from 'antd';
import {
  EditFilled,
  DeleteFilled,
  BugOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import SprintCreate from './SprintCreate';
import SprintEdit from './SprintEdit';

class Sprints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprints: [],
      teams: [],
      isViewDrawerCreate: false,
      isViewDrawerEdit: false,
      id: 0,
      selectedName: '',
      selectedDateStart: '',
      selectedDateEnd: '',
      selectedPercent: '',
      selectedTeamId: 0,
    }
  }

  componentDidMount() {
    this.getSprints();
    this.getTeams();
  }

  async getSprints() {
    const response = await fetch(`http://localhost:3001/sprints`);
    const sprints = await response.json();
    this.setState({sprints});
  }


  async getTeams() {
    const response = await fetch(`http://localhost:3001/teams`);
    const teams = await response.json();
    this.setState({teams});
  }

  createSprint = async (values) => {
    const data = {
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      percent: values.percent,
      name: values.name,
      teamId: values.team
    }

    const response = await fetch(`http://localhost:3001/sprints`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const sprints = await response.json();
    this.setState({sprints, isViewDrawerCreate: false});
  }

  editSprint = async (values) => {
    const data = {
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      percent: values.percent,
      name: values.name,
      teamId: values.team
    };

    const {id} = this.state;

    const response = await fetch(`http://localhost:3001/sprints/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const sprints = await response.json();
    this.setState({
      sprints,
      isViewDrawerEdit: false});
  }

  deleteSprint = async (id) => {
    const response = await fetch(`http://localhost:3001/sprints/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const sprints = await response.json();
    this.setState({sprints});
  }

  renderTable = () => {
    const {sprints} = this.state;
    const columns = [
      {
        title: 'Команда',
        key: 'team',
        dataIndex: 'team',
      },
      {
        title: 'Название',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Период',
        dataIndex: 'period',
        key: 'period',
        render: period => (
          <div className=''>
            <span>{`${period[0]}`} - </span>
            <span>{`${period[1]}`} </span>
          </div>
        ),
      },
      {
        title: 'Процент',
        key: 'percent',
        dataIndex: 'percent',
        align: 'center'
      },
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) =>
          this.state.sprints.length >= 1 ? (
            [<EditFilled className='kpiRead' onClick={() => this.handleRead(record)} />,
            <Popconfirm title="Удалить?" onConfirm={() => this.handleDelete(record.key)}>
              <DeleteFilled />
            </Popconfirm>
          ]
          ) : null,
      },
    ];
    const dataTable = [];

    sprints.length && sprints.forEach((item, i) => {
      dataTable.push({
        key: item.id,
        period: [item.dateStart, item.dateEnd],
        name: item.name,
        cause: item.cause,
        team: item.team.name,
        percent: item.percent ? `${item.percent}` : '0',
        teamId: item.teamId,
      })
    })

    return (<Table columns={columns} dataSource={dataTable} />)
  }

  onOpenDrawerCreate = (isViewDrawerCreate) => {
    this.setState({
      isViewDrawerCreate
    })
  }

  handleRead = (record) => {
    this.setState({
      selectedName: record.name,
      selectedDateStart: record.period[0],
      selectedDateEnd: record.period[1],
      selectedPercent: record.percent ? record.percent.replace('%', '') : record.percent,
      selectedTeamId: record.teamId,
      id: record.key,
      isViewDrawerEdit: true,
    })
  }

  handleDelete = (key) => {
    this.deleteSprint(key);
  };

  onOpenDrawerEdit = (isViewDrawerEdit) => {
    this.setState({
      selectedTeamId: '',
      isViewDrawerEdit
    })
  }

  render() {
    const {
      isViewDrawerCreate,
      isViewDrawerEdit,
      teams,
      selectedDateStart,
      selectedDateEnd,
      selectedName,
      selectedPercent,
      selectedTeamId,
    } = this.state;

    const editSettings = {
      selectedDateStart,
      selectedDateEnd,
      selectedName,
      selectedPercent,
      selectedTeamId,
    };

    return (
      <div className='releaseContainer'>
        <div className='releaseNav'>

        </div>
        <div className='releaseTitle'>
          <p>Спринты</p>
          <Button
            onClick={() => this.onOpenDrawerCreate(true)}
            style={{marginRight: '15px'}}
            type="primary">+ Добавить спринт</Button>
        </div>
        <div className='releaseContent'>
          {this.renderTable()}
        </div>
        <SprintCreate
          teams={teams}
          onOpenDrawerCreate={this.onOpenDrawerCreate}
          isOpen={isViewDrawerCreate}
          createSprint={this.createSprint}
        />
        <SprintEdit
          teams={teams}
          onOpenDrawerEdit={this.onOpenDrawerEdit}
          isOpen={isViewDrawerEdit}
          editSprint={this.editSprint}
          settings={editSettings}
        />
      </div>
    )
  }
}
export default Sprints;
