import { Component } from 'react';

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
    rise:boolean
    id: string
}

class App extends Component <any, any>{
    constructor(props: dataType) {
        super(props);
        this.state= {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: v1()},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: v1()},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: v1()}
            ]
        }
    }

    deleteItem = (id:string) => {
        // @ts-ignore
        this.setState(({data}) => {
            return {
                data: data.filter((item: any) => item.id !== id)
            }
        })
    }

    // Да, пока могут добавляться пустые пользователи. Мы это еще исправим
    // @ts-ignore
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: v1()
        }
        // @ts-ignore
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    // @ts-ignore
    onToggleProp = (id, prop) => {
        // @ts-ignore
        this.setState(({data}) => ({
            data: data.map((item: any) => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        // @ts-ignore
        const employees = this.state.data.length;
        // @ts-ignore
        const increased = this.state.data.filter(item => item.increase).length;
        // @ts-ignore
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;