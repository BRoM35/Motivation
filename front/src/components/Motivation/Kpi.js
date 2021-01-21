import React, { Component } from 'react';
import './Kpi.css';
import moment from 'moment';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Drawer, Select } from 'antd';
import KpiCreateForm from './KpiCreateForm';
import KpiReadForm from './KpiReadForm';
import {
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons';

moment.locale('ru');

const { Option } = Select;

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isShowDrawerCreate: false,
      isShowDrawerRead: false,
      periods: [],
      currentPeriod: '',
      types: [],
      type: 0,
      result: '',
      target: '',
      period: '',
      id: 0,
    }
  }


  componentDidMount() {
    this.getKpi(1);
    this.getTypes();
    this.setPeriodDate();
  }

  async getKpi(id) {
    const response = await fetch(`http://localhost:3001/kpi/${id}`);
    const data = await response.json();
    this.setState({data: data});
  }

  async setKpi(values) {
    const response = await fetch(`http://localhost:3001/kpi/1`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typeId: values.type,
        period: values.period,
        result: values.result,
        target: values.target,
        userId: 1
      })
    });

    const data = await response.json();
    this.setState({data});
  }

  async setReadKpi(values) {
    const response = await fetch(`http://localhost:3001/kpi/1`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: values.id,
        typeId: values.type,
        period: values.period,
        result: values.result,
        target: values.target
      })
    });

    const data = await response.json();

    this.setState({data});
  }

  async deleteKpi(key) {
    const response = await fetch(`http://localhost:3001/kpi/1`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteId: key
      })
    });

    const data = await response.json();
    this.setState({data});
  }

  async getTypes() {
    const response = await fetch(`http://localhost:3001/types`);
    const types = await response.json();
    this.setState({types});
  }


  onDrawerCreateChange = (isOpen) => {
    this.setState({
      isShowDrawerCreate: isOpen
    })
  }

  handleDelete = (key) => {
    this.deleteKpi(key);
  };


  renderTable = () => {
    const {data, currentPeriod} = this.state;
    const currentData = data.filter(item => item.period === currentPeriod)
    const columns = [
      {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Цель',
        dataIndex: 'target',
        key: 'target',
      },
      {
        title: 'Дата создания',
        key: 'datecreate',
        dataIndex: 'datecreate',
      },
      {
        title: 'Результат',
        key: 'result',
        dataIndex: 'result',

      },
      {
        title: 'Период',
        key: 'period',
        dataIndex: 'period',
      },
      {
        title: '',
        dataIndex: 'delete',
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            [<EditFilled className='kpiRead' onClick={() => this.handleRead(record)} />,
            <Popconfirm title="Удалить?" onConfirm={() => this.handleDelete(record.key)}>
              <DeleteFilled />
            </Popconfirm>
          ]
          ) : null,
      },
    ];
    const dataTable = [];

    currentData.length && currentData.forEach((item, i) => {
      dataTable.push({
        key: item.id,
        type: item.type.name,
        target: item.target,
        datecreate: moment(item.dateCreate).format("DD.MM.YYYY"),
        result: item.result,
        period: item.period,
        typeId: item.type.id
      })
    })

    return (<Table columns={columns} dataSource={dataTable} />)
  }

  setPeriodDate = () => {
    const allPeriod = [];
    const currentMonth = moment().format('MMMM');
    const currentDayInMonth = moment().daysInMonth();
    const currentYear = moment().year();
    const currentPeriod = `1-${currentDayInMonth} ${currentMonth} ${currentYear}`;

    for (let i = 7; i > -7; i--) {
      const month = moment().subtract(i, 'months').format('MMMM');
      const dayInMonth = moment().subtract(i, 'months').daysInMonth();
      const year = moment().subtract(i, 'months').year();
      allPeriod.unshift(
        `1-${dayInMonth} ${month} ${year}`
      )
    }

    this.setState({
      periods: allPeriod,
      currentPeriod
    })

  }

  changePeriod = (currentPeriod) => {
    this.setState({
      currentPeriod
    })
  }

  renderPeriodDate = () => {
    const {
      currentPeriod,
      periods
    } = this.state;

    return (
      <Select onChange={this.changePeriod} className={'kpiButtonPeriod'} value={currentPeriod}>
        {periods.length && periods.map(period => {
          return (
            <Option key={period} value={period}>{period}</Option>
          )
        })}
      </Select>
    )
  }

  handleRead = (record) => {
    this.setState({
      type: record.typeId,
      result: record.result,
      target: record.target,
      period: record.period,
      id: record.key,
    })

    this.onDrawerReadChange(true);
  }

  onDrawerReadChange = (isOpen) => {
    this.setState({
      isShowDrawerRead: isOpen,
    })
  }


  createKPI = (values) => {
    this.setKpi(values);

    this.setState({
      isShowDrawerCreate: false
    })
  }

  readKpi = (values) => {
    values.id = this.state.id;
    this.setReadKpi(values);

    this.setState({
      isShowDrawerRead: false
    })
  }

  render() {
    const {
      data,
      isShowDrawerCreate,
      isShowDrawerRead,
      currentPeriod,
      periods,
      types,
      type,
      result,
      target,
      period,
    } = this.state;

    return (
      <div className='kpiBlock'>
        <div className='kpiHeader'>KPI</div>
        <div className='kpiContent'>
          <div className='kpiContentHeader'>
            <button onClick={() => this.onDrawerCreateChange(true)} className='kpiButtonAdd'>Добавить KPI</button>
            <div className='kpiPeriod'>
              Период
              {this.renderPeriodDate()}
            </div>
          </div>
          <div className='kpiTableContainer'>
            {this.renderTable()}
          </div>
        </div>
        {isShowDrawerCreate ?
          <Drawer
          width={450}
          title="Добавить KPI"
          placement="right"
          closable={false}
          onClose={() => this.onDrawerCreateChange(false)}
          visible={isShowDrawerCreate}
          destroyOnClose={true}
        >
          <KpiCreateForm
            createKPI={this.createKPI}
            currentPeriod={currentPeriod}
            periods={periods}
            types={types}
          />
        </Drawer> : null
        }

        {isShowDrawerRead ?
          <Drawer
          width={450}
          title="Добавить KPI"
          placement="right"
          closable={false}
          onClose={() => this.onDrawerReadChange(false)}
          visible={isShowDrawerRead}
          destroyOnClose={true}
        >
          <KpiReadForm
            readKpi={this.readKpi}
            currentPeriod={currentPeriod}
            periods={periods}
            types={types}
            type={type}
            result={result}
            target={target}
            period={period}
          />
        </Drawer> : null
        }

      </div>
    )
  }
}
export default InfoCard;
