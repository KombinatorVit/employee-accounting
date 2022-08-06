import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import {v1} from 'uuid';

type dataType = {
    name: string
    salary: number
    increase: boolean
    rise: boolean
    id: string
    term: string
    filter: string
}

class App extends Component <any, any> {
    constructor(props: dataType) {
        super(props);
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
        // @ts-ignore
        this.setState(({data}) => {
            return {
                data: data.filter((item: any) => item.id !== id)
            };
        });
    };

    // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
    // @ts-ignore
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: v1()
        };
        // @ts-ignore
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });
    };

    // @ts-ignore
    onToggleProp = (id, prop) => {
        // @ts-ignore
        this.setState(({data}) => ({
            data: data.map((item: any) => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }));
    };

    searchEmp = (items: Array<any>, term: string) => {
        if (term.length === 0) return items;


        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    };

    onUpdateSearch = (term:any) => {
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
        // @ts-ignore
        const employees = this.state.data.length;
        // @ts-ignore
        const increased = this.state.data.filter(item => item.increase).length;
        // @ts-ignore
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