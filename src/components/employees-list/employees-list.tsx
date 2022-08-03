import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';
import {dataType} from '../app/app';

const EmployeesList = ({data}: any) => {

    const elements = data.map((item: dataType) => {
        return (
            <EmployeesListItem {...item}/>
        );
    });
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default EmployeesList;