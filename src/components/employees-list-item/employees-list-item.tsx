import './employees-list-item.css';
import React, {Component} from 'react';

type EmployeesListItemPropsType = {
    key:number
    name: string
    salary: number
    increase:boolean
}

class EmployeesListItem extends Component <any,any>{
constructor(props:any) {
    super(props)
    this.state = {
        increase: false,
        raise:false
    }
}

    onIncrease =()=> {
    // @ts-ignore
        this.setState(({increase}) => ( {
                increase: !increase

        }))
    }
    onPromotionHandler = () => {
        // @ts-ignore
        this.setState(({raise}) => ( {
            raise: !raise

        }))
    }


    render(){
        const {name,salary} = this.props
        const {increase, raise} = this.state

        let classNames = "list-group-item d-flex justify-content-between"
    if(increase){
        classNames+= ' increase'
    }

    if(raise){
        classNames += ' like'
    }

    return (
<li className={classNames}>
<span className='list-group-item-label' onClick={this.onPromotionHandler}>{name}
</span>
<input type="text" className="list-group-item-input" defaultValue={`${salary}$`}/>
<div className="d-flex justify-content-center align-items-center">
    <button type="button"
            className="btn-cookie btn-sm " onClick={this.onIncrease}>
        <i className="fas fa-cookie"></i>
    </button>

    <button type="button"
            className="btn-trash btn-sm ">
        <i className="fas fa-trash"></i>
    </button>
    <i className="fas fa-star"></i>
</div>
</li>
);


}
}
export default EmployeesListItem;