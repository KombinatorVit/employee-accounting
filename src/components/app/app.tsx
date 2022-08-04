import AppInfo from '../app-info/app-info';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import SearchPanel from '../search-panel/search-panel';

export type dataType = {
    name: string
    salary: number
    increase: boolean
    id: number
}


function App() {

    const data: Array<dataType> = [
        {name: 'Katy', salary: 800, increase: false, id: 1},
        {name: 'Vitalic', salary: 3000, increase: true, id: 2},
        {name: 'Dimon', salary: 5000, increase: false, id: 3},

    ];


    return (
        <div className="app">
            <AppInfo/>

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList data={data}/>
            <EmployeesAddForm/>
        </div>
    );
}

export default App;
