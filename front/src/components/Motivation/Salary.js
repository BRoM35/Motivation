import React, { Component } from 'react';
import moment from 'moment';
import './Salary.css';
import '../Releases/Releases.css'
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Table, Button } from 'antd';

import SalaryTest from "./SalaryTest";

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaries: [],
      isDrawerView: false,
    }
  }

  componentDidMount() {
    this.getSalaries();
  }

  async getSalaries() {
    const {userId} = this.props;
    const response = await fetch(`http://localhost:3001/salaries/${userId}`);
    const salaries = await response.json();
    this.setState({salaries});
  }

  renderTable = () => {
    const {salaries} = this.state;
    const columns = [
      {
        title: 'Статус',
        key: 'status',
        dataIndex: 'status',
      },
      {
        title: 'Итого',
        key: 'summ',
        dataIndex: 'summ',
      },
      {
        title: 'Комментарий',
        key: 'comment',
        dataIndex: 'comment',
      },
      {
        title: 'Инциденты',
        key: 'incident',
        dataIndex: 'incident',
      },
      {
        title: 'Спринты',
        key: 'sprint',
        dataIndex: 'sprint',
      },
      {
        title: 'Дата',
        key: 'date',
        dataIndex: 'date',
      }
    ];

    const dataTable = [];

    salaries.length && salaries.forEach((item, i) => {
      dataTable.push({
        key: item.id,
        status: item.status,
        summ: item.summ,
        comment: item.comment,
        incident: item.incident,
        sprint: item.sprint,
        date: moment(item.createdAt).format('YYYY-MM-DD')
      })
    })

    return (<Table columns={columns} dataSource={dataTable} />)
  }

  onOpenDrawer = (isDrawerView) => {
    this.setState({
      isDrawerView
    })
  }

  render() {
    const {
      isDrawerView,
    } = this.state;
    const {
      userSettings
    } = this.props;

    return (
      <div className='salaryContainer'>
        <div className='releaseTitle'>
          <p>Мотивация</p>
          <Button
            onClick={() => this.onOpenDrawer(true)}
            style={{marginRight: '15px'}}
            type="primary">Тестовый расчёт</Button>
        </div>
        <div className='releaseContent'>
          {this.renderTable()}
        </div>
        <SalaryTest
          userSettings={userSettings}
          isOpen={isDrawerView}
          onOpenDrawer={this.onOpenDrawer}
        />
      </div>
    )
  }
}
export default Salary;
