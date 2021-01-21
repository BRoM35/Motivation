import React, { Component } from 'react';
import './InfoCard.css';
import faceIconLg from '../../image/faceIconLg.svg';
import moment from 'moment';
import 'moment/locale/ru';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

moment.locale('ru');

class InfoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fio,
      bday,
      departament,
      city,
      position,
      countVacationDays,
      grade
    } = this.props;



    const depName = departament !== null ? departament.name : '';
    const cityName = city !== null ? city.name : '';
    const posName = position !== null ? position.name : '';
    const gradeName = grade !== null ? grade.name : '';
    const date = new Date(bday);
    const formatBday = moment(date).format("DD.MM.YYYY");
    const age = +moment().format("YYYY") - +moment(date).format("YYYY")

    return (
      <div className='infoCard'>
        <Row>
          <Col span={10}>
            <div className='infoCard-left'>
            <div className='infoCard-imageBlock'>
              <img className='infoCard-image' src={faceIconLg} alt='logo'/>
              <div className='infoCard-fio'>
                <span>{fio}</span>
                <span>{formatBday} ({age} лет)</span>
              </div>
            </div>
            <div className='infoCard-city'>
              <span className='infoCard-title'>Офис</span>
              <span>{cityName}</span>
            </div>
            <div className='infoCard-departament'>
              <span className='infoCard-title'>Департамент</span>
              <span>{depName}</span>
            </div>
            <div className='infoCard-position'>
              <span className='infoCard-title'>Должность</span>
              <span>{posName}</span>
            </div>
          </div>
          </Col>
          <Col span={14}>
            <div className='infoCard-right'>
            <span>
              Отпускных Дней: {countVacationDays}
            </span>
            <span>
              Должностное
            </span>
            <span>
              Команды
            </span>
            <span>
              Грейд: {gradeName}
            </span>
          </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default InfoCard;
