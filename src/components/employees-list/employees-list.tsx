import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';
import {dataType} from '../app/app';

const EmployeesList = ({data, onDelete, onToggleProp}: any) => {
    const elements = data.map((item: dataType) => {
        const{id, ...itemProps} = item;
        return (
            <EmployeesListItem key={id}
                               {...itemProps}
            onDelete={()=> onDelete(id)}
                               onToggleProp={(e:any)=>{onToggleProp(id,e.currentTarget.getAttribute('data-toggle') )}}
            />
        );
    });
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default EmployeesList;