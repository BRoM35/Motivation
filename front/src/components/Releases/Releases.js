import React, { Component } from 'react';
import moment from 'moment';
import './Releases.css';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Button, Select } from 'antd';
import {
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons';
import ReleaseCreate from './ReleasesCreate';
import ReleaseEdit from './ReleasesEdit';

class Releases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releases: [],
      users: [],
      teams: [],
      types: [],
      isViewDrawerCreate: false,
      isViewDrawerEdit: false,
      selectedUser: 0,
      selectedTeam: 0,
      selectedDate: '',
      selectedType: 0,
      selectedPercent: '',
      selectedCoefficient: '',
      selectedComment: '',
      id: 0,
    }
  }

  componentDidMount() {
    this.getReleases();
    this.getUsers();
    this.getTeams();
    this.getTypes();
  }

  async getReleases() {
    const response = await fetch(`http://localhost:3001/release`);
    const releases = await response.json();
    this.setState({releases});
  }

  async getUsers() {
    const response = await fetch(`http://localhost:3001/users`);
    const users = await response.json();

    this.setState({users});
  }

  async getTeams() {
    const response = await fetch(`http://localhost:3001/teams`);
    const teams = await response.json();
    this.setState({teams});
  }

  async getTypes() {
    const response = await fetch(`http://localhost:3001/release/types`);
    const types = await response.json();
    this.setState({types});
  }

  createRelease = (values) => {
    this.saveNewRelease(values);
  }

  editRelease = (values) => {
    this.saveReadRelease(values);
  }

  async saveNewRelease(values) {
    const data = {
      date: values.date,
      percent: values.percent,
      coefficient: values.coefficient,
      userId: values.user,
      teamId: values.team,
      releaseTypeId: values.type,
      comment: values.comment
    }

    const response = await fetch(`http://localhost:3001/release`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const releases = await response.json();
    this.setState({releases, isViewDrawerCreate: false});
  }

  async saveReadRelease(values) {
    const data = {
      date: values.date,
      coefficient: values.coefficient,
      percent: values.percent,
      comment: values.comment,
      userId: values.user,
      teamId: values.team,
      releaseTypeId: values.type
    };
    const {id} = this.state;

    const response = await fetch(`http://localhost:3001/release/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const releases = await response.json();
    this.setState({releases, isViewDrawerEdit: false});
  }

  async deleteRelease(key) {
    const response = await fetch(`http://localhost:3001/release/${key}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const releases = await response.json();
    this.setState({releases});
  }

  renderTable = () => {
    const {releases} = this.state;
    const columns = [
      {
        title: 'Сотрудник',
        dataIndex: 'user',
        key: 'user',
      },
      {
        title: 'Команда',
        dataIndex: 'team',
        key: 'team',
        align: 'center'
      },
      {
        title: 'Дата',
        key: 'date',
        dataIndex: 'date',
      },
      {
        title: 'Тип',
        key: 'type',
        dataIndex: 'type',

      },
      {
        title: 'Процент участия',
        key: 'percent',
        dataIndex: 'percent',
        align: 'center'
      },
      {
        title: 'Коэффициент',
        key: 'coefficient',
        dataIndex: 'coefficient',
        align: 'center'
      },
      {
        title: 'Комментарий',
        key: 'comment',
        dataIndex: 'comment',
      },
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) =>
          this.state.releases.length >= 1 ? (
            [<EditFilled className='kpiRead' onClick={() => this.handleRead(record)} />,
            <Popconfirm title="Удалить?" onConfirm={() => this.handleDelete(record.key)}>
              <DeleteFilled />
            </Popconfirm>
          ]
          ) : null,
      },
    ];
    const dataTable = [];

    releases.length && releases.forEach((item, i) => {
      dataTable.push({
        key: item.id,
        user: item.user.fio,
        team: item.team.name,
        date: item.date,
        type: item.releaseType.name,
        percent: `${item.percent}%`,
        coefficient: item.coefficient,
        comment: item.comment,
        releaseTypeId: item.releaseTypeId,
        teamId: item.teamId,
        userId: item.userId
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
      selectedUser: record.userId,
      selectedTeam: record.teamId,
      selectedDate: record.date,
      selectedType: record.releaseTypeId,
      selectedPercent: record.percent.replace('%', ''),
      selectedCoefficient: record.coefficient,
      selectedComment: record.comment === null ? '' : record.comment,
      id: record.key,
      isViewDrawerEdit: true
    })
  }

  handleDelete = (key) => {
    this.deleteRelease(key);
  };

  onOpenDrawerEdit = (isViewDrawerEdit) => {
    this.setState({
      isViewDrawerEdit
    })
  }

  render() {
    const {
      isViewDrawerCreate,
      users,
      teams,
      types,
      isViewDrawerEdit,
      selectedUser,
      selectedTeam,
      selectedDate,
      selectedType,
      selectedPercent,
      selectedCoefficient,
      selectedComment,
    } = this.state;

    const editSettings = {
      selectedUser,
      selectedTeam,
      selectedDate,
      selectedType,
      selectedPercent,
      selectedCoefficient,
      selectedComment,
    };

    return (
      <div className='releaseContainer'>
        <div className='releaseNav'>

        </div>
        <div className='releaseTitle'>
          <p>Релизы</p>
          <Button
            onClick={() => this.onOpenDrawerCreate(true)}
            style={{marginRight: '15px'}}
            type="primary">+ Добавить релиз</Button>
        </div>
        <div className='releaseContent'>
          {this.renderTable()}
        </div>
        <ReleaseCreate
          users={users}
          teams={teams}
          types={types}
          onOpenDrawerCreate={this.onOpenDrawerCreate}
          isOpen={isViewDrawerCreate}
          createRelease={this.createRelease}
        />
        <ReleaseEdit
          users={users}
          teams={teams}
          types={types}
          onOpenDrawerEdit={this.onOpenDrawerEdit}
          isOpen={isViewDrawerEdit}
          editRelease={this.editRelease}
          settings={editSettings}
        />
      </div>
    )
  }
}
export default Releases;
