import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Salary.css';
import { Form, Input, Button, Select, Drawer } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

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

class SalaryTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTestSalary: false,
      incident: 0,
      incidentDiff: 0,
      rate: 0,
      sprint: 0,
      sprintDiff: 0,
      sum: 0,
    }
  }

  testSalary = async () => {
    const {userSettings} = this.props;
    const userId = userSettings.id;
    const response = await fetch(`http://localhost:3001/salary/${userId}`);
    const data = await response.json();
    this.setState({
      isTestSalary: true,
      ...data.result//... раскрывает объект
    })
  }

  render() {
    const {
      isOpen,
      onOpenDrawer,
      userSettings
    } = this.props;

    const {
      isTestSalary,
      incident,
      incidentDiff,
      rate,
      sprint,
      sprintDiff,
      sum
    } = this.state;
    return (
      <>
        <Drawer
          width={450}
          title="Тестовый расчёт"
          placement="right"
          onClose={() => onOpenDrawer(false)}
          visible={isOpen}
          destroyOnClose={true}
        >
          <Button
            style={{marginRight: '15px'}}
            onClick={this.testSalary}
            type="primary">
            Рассчитать
          </Button>
          {
            isTestSalary ?
              <div className='salaryBlock'>
                <div className='salaryRow'>
                  <span className='salaryTitle'>Оклад: </span>
                  <span className='salaryValue'>{rate}</span>
                </div>
                <div className='salaryRow'>
                  <span className='salaryTitle'>Спринт: </span>
                  <span className='salaryValue'>{sprint * sprintDiff} ({sprintDiff})</span>
                </div>
                <div className='salaryRow'>
                  <span className='salaryTitle'>Инциденты: </span>
                  <span className='salaryValue'>{incident * incidentDiff} ({incidentDiff})</span>
                </div>
                <div className='salaryRowSum'>
                  <span className='salaryTitleSum'>Сумма: </span>
                  <span className='salaryValue'>{sum}</span>
                </div>
              </div> : null
          }

        </Drawer>
      </>
    );
  }
};

export default SalaryTest;
