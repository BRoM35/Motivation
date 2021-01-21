import React, { Component } from 'react';
import './Attandance.css';
import moment from 'moment';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { DatePicker } from 'antd';

moment.locale('ru');

class Attandance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM')
    }
  }

  onChangeDate = (date, dateString) => {
    this.setState({
      date: dateString.substr(0, dateString.length - 3)
    })
  }

  renderNewVacantionDate = () => {
    const {
      date
    } = this.state;
    const {
      countVacationDays
    } = this.props;

    const currentDate = moment().format('YYYY-MM');
    const endDate = moment(date);
    const diff = Math.round(moment.duration(endDate.diff(currentDate)).asMonths());

    return countVacationDays + diff*2;
  }

  render() {
    const {
      countVacationDays
    } = this.props;

    return (
      <div className='infoCard'>
        <div className='vacantionTitle'>Расчёт отпускных дней</div>
        <Row>
          <Col span={10}>
            <div className='vacRow'>
              <span className='vacantionCurrentTitle'>
                На данный момент
              </span>
              <span>{countVacationDays}</span>
            </div>
            <div className='vacRow'>
              <span className='vacantionCurrentTitle'>
                На <DatePicker defaultValue={moment()} onChange={this.onChangeDate} />
              </span>
              <span>{this.renderNewVacantionDate()}</span>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Attandance;
