import AppInfo from '../app-info/app-info';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
import SearchPanel from '../search-panel/search-panel';
import {Component} from 'react';
import {v1} from 'uuid';

export type dataType = {
    name: string
    salary: number
    increase: boolean
    id: string
    maxId: number
}


class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [
                {name: 'Katy', salary: 800, increase: false, id: v1(), rise: true},
                {name: 'Vitalic', salary: 3000, increase: true, id: v1(), rise: false},
                {name: 'Dimon', salary: 5000, increase: false, id: v1(), rise: false}
            ]
        };
    }

    deleteItem = (id: string) => {
// @ts-ignore
        this.setState(({data}) => {
            // const index = data.findIndex((elem: any) => elem.id === id);
// const before = data.slice(0, index);
// const after = data.slice(index + 1)
//         const newArr = [...before, ...after]
//         return{
//     data: newArr
//         }
            return {
                data: data.filter((item: any) => item.id != id)
            };
        });
    };


    addItem = (name: string, salary: number) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: v1()
        };

        this.setState(({data}: any) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            };
        });

    };


    onToggleProp = (id: string, prop:any) => {
// @ts-ignore
//         this.setState(({data}) => {
    // const index = data.findIndex((elem: any) => elem.id === id)
    //
    //         const old = data[index];
    // const newItem = {...old, increase: !old.increase};
    // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
    //         return {
    //     data: newArr
    //         }
    //     })
        this.setState(({data}) =>({

data: data.map((item: any) => {
    if(item.id === id){
        return {...item, [prop]: !item[prop]
        }
        return item
    }
})


    }))

    }

    onToggleRise = (id: string) => {
        console.log(`Rise this ${id}`);
    };


    render() {
const employees = this.state.data.length
        const increased = this.state.data.filter((item:any) => item.increase).length;
        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList data={this.state.data}
                               onDelete={this.deleteItem}
                               onToggleIncrease={this.onToggleProp}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
