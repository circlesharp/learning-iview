import React from 'react';
import { isValidDate } from '../utility';

class PriceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validatePass: true,
      errorMessage: '',
    };
  }

  submitForm = event => {
    const { item, onFormSubmit } = this.props;
    const editMode = item && !!item.id;
    const title = this.titleInput.value.trim();
    const price = + this.priceInput.value.trim();
    const date = this.dateInput.value.trim();

    event.preventDefault();

    if (title && price && date) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: '价格数字必须大于0',
        });
      } else if (!isValidDate(date)) {
        console.log(date, 123);
        this.setState({
          validatePass: false,
          errorMessage: '请填写正确的日期格式',
        });
      } else {
        this.setState({
          validatePass: true,
          errorMessage: '',
        });

        if (editMode)
          onFormSubmit({ ...item, title, price, date }, true);
        else
          onFormSubmit({ title, price, date }, false);
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: '请输入所有必选项',
      });
    }
  };

  render() {
    const { title, price, date } = this.props.item || {};

    return (
      <form
        className="price-form-component"
        onSubmit={event => this.submitForm(event)}
        noValidate
      >
        {/* 1 标题 */}
        <div className="form-group">
          <label htmlFor="title">标题 *</label>
          <input
            id="title"
            type="text"
            className="form-control"
            defaultValue={title}
            ref={titleInput => { this.titleInput = titleInput; }}
          />
        </div>

        {/* 2 价格 */}
        <div className="form-group">
          <label htmlFor="price">价格 *</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">￥</span>
            </div>
          </div>
          <input
            id="price"
            type="number"
            className="form-control"
            defaultValue={price}
            placeholde="请输入价格"
            ref={priceInput => { this.priceInput = priceInput; }}
          />
        </div>

        {/* 3 日期 */}
        <div className="form-group">
          <label htmlFor="date">日期 *</label>
          <input
            id="date"
            type="date"
            className="form-control"
            placeholder="请输入日期"
            defaultValue={date}
            ref={dateInput => { this.dateInput = dateInput; }}
          />
        </div>

        {/* 4 按钮组 */}
        <button type="submit" className="btn btn-primary mr-3">提交</button>
        <button
          className="btn btn-secondary"
          onClick={this.props.onCancelSubmit}
        >取消</button>

        {/* 5 alert */}
        {
          !this.state.validatePass &&
          <div className="alert alert-danger mt-5" role="alert">
            {this.state.errorMessage}
          </div>
        }
      </form>
    );
  }
}

export default PriceForm;
