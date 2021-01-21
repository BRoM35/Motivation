import React, { Component } from 'react';
import './Profile.css';
import faceIcon from '../../image/faceIcon.svg';
import InfoCard from './InfoCard';
import Kpi from './Kpi';
import Attandance from './Attendance';
import Salary from './Salary';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import moment from 'moment';
moment.locale('ru');

const { TabPane } = Tabs;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      fio: '',
      city: {},
      countVacationDays: 2,
      createdAt: null,
      departament: {},
      employmentDate: null,
      grade: {},
      userId: 1,
      phone: "88005553535",
      position: {},
      updatedAt: null,
      bday: null,
    }
  }

  componentDidMount() {
    this.getUsers(1);
  }

  async getUsers(id) {
    const response = await fetch(`http://localhost:3001/users/${id}`);
    const data = await response.json();
    if (data.length) {
      const settings = data[0];
      this.setState({
        fio: settings.fio,
        city: settings.city,
        countVacationDays: settings.countVacationDays,
        createdAt: settings.createdAt,
        departament: settings.departament,
        employmentDate: settings.employmentDate,
        grade: settings.grade,
        userId: settings.id,
        phone: settings.phone,
        position: settings.position,
        updatedAt: settings.updatedAt,
        bday: settings.bday,
        userSettings: settings,
      })
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    })
  };

  changeTabs = (key) => {
    console.log(key)
  }

  render() {
    const {
      fio,
      bday,
      departament,
      city,
      position,
      countVacationDays,
      tabValue,
      userId,
      grade,
      userSettings
    } = this.state;

    return (
      <div className='profile'>
        <div className='profileNav'>
          <div className='profileNav-image'>
            <img src={faceIcon} alt='logo'/>
          </div>
          <div className='profileNav-title'>
            <span>
              Болвин Роман
            </span>
          </div>
        </div>
        <Tabs className='profileNav-tabs'  defaultActiveKey="1" onChange={this.changeTabs} >
          <TabPane tab="Профиль" key="1">
            <InfoCard fio={fio}
              bday={bday}
              departament={departament}
              city={city}
              position={position}
              countVacationDays={countVacationDays}
              grade={grade}
            />
          </TabPane>
          <TabPane tab="Табель учета времени" key="2">
            <Attandance countVacationDays={countVacationDays} />
          </TabPane>
          <TabPane tab="KPI" key="3">
            <Kpi
              userId={userId}
            />
          </TabPane>
          <TabPane tab="Мотивация" key="4">
            <Salary
              userId={userId}
              userSettings={userSettings}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Profile;
