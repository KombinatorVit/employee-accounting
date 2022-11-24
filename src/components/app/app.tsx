import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import {v1} from 'uuid';
type StateType = {
    data: dataType[]
    term: string
    filter: string
}
type dataType = {
    name: string
    salary: number
    increase: boolean
    rise: boolean
    id: string
}

class App extends Component <{ },StateType > {
    constructor(props: {}) {
        super(props)
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: v1()},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: v1()},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: v1()}
            ],
            term: '',
            filter: 'all'
        };
    }

    deleteItem = (id: string) => {
        this.setState(({data}) => {
            return {
                data: data.filter((item: any) => item.id !== id)
            };
        });
    };

    addItem = (name:string, salary:number) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: v1()
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });
    };

    onToggleProp = (id:string, prop:number) => {
        this.setState(({data}) => ({
            data: data.map((item: any) => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }));
    };

    searchEmp = (items: Array<dataType>, term: string) => {
        if (term.length === 0) return items;


        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    };

    onUpdateSearch = (term:string) => {
        this.setState({term})
    }


    filterPost = (items:Array<dataType>, filter: string) => {
switch (filter) {
    case 'rise':
        return items.filter(item => item.rise);
        break;
    case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
        break;
    default:
        return items
}
    }

    onFilterSelect = (filter: string) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterPost(this.searchEmp(data, term),filter)
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;